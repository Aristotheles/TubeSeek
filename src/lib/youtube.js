/**
 * YouTube API v3 ve Otomatik Tamamlama (Autocomplete) İşlemleri
 */

import { getTurkishRoot } from './scorer';

// Türkçe ve İngilizce yaygın duraklama kelimeleri (stop words)
const STOP_WORDS = new Set([
  // Türkçe
  'bir', 've', 'bu', 'da', 'de', 'için', 'ile', 'en', 'o', 'ama', 'ki', 'mı', 'mi', 
  'mu', 'mü', 'ne', 'o', 'bu', 'şu', 'gibi', 'çok', 'daha', 'kadar', 'her', 'ise', 
  'yok', 'var', 'ya', 'veya', 'ise', 'olan', 'olarak', 'tarafından', 'ile', 'neler',
  // İngilizce
  'a', 'an', 'the', 'and', 'or', 'in', 'of', 'to', 'for', 'on', 'with', 'at', 'by', 
  'from', 'up', 'about', 'out', 'into', 'over', 'after', 'is', 'are', 'was', 'were', 
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'how', 
  'why', 'what', 'who', 'where', 'which', 'this', 'that', 'these', 'those', 'you',
  'your', 'my', 'me', 'we', 'our', 'us', 'they', 'them', 'their'
]);

/**
 * YouTube API v3 üzerinden bir tohum kelime ile ilk 15 videoyu arar ve detaylarını çeker.
 * @param {string} apiKey - YouTube API Anahtarı
 * @param {string} keyword - Aranacak kelime
 * @returns {Promise<Array<Object>>} Videoların detaylı listesi (günlük izlenmeye göre sıralı)
 */
export async function fetchCompetitors(apiKey, keyword) {
  if (!apiKey) throw new Error('API anahtarı bulunamadı.');
  if (!keyword) throw new Error('Arama kelimesi boş olamaz.');

  const cleanKeyword = keyword.trim();
  
  // 1. Adım: Arama API'si ile video listesini çek (Snippet + Video ID)
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(cleanKeyword)}&maxResults=15&type=video&key=${apiKey}`;
  
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) {
    const errorData = await searchRes.json();
    throw new Error(errorData.error?.message || 'Arama isteği başarısız oldu.');
  }
  
  const searchData = await searchRes.json();
  const items = searchData.items || [];
  
  if (items.length === 0) {
    return [];
  }

  // Arama sonuçlarından video ID'lerini topla
  const videoIds = items.map(item => item.id.videoId).filter(Boolean);
  
  // 2. Adım: Videolar API'si ile detaylı izlenme sayılarını çek (Statistics)
  const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(',')}&key=${apiKey}`;
  
  const statsRes = await fetch(statsUrl);
  if (!statsRes.ok) {
    const errorData = await statsRes.json();
    throw new Error(errorData.error?.message || 'Video detayları çekilemedi.');
  }

  const statsData = await statsRes.json();
  const videosDetail = statsData.items || [];

  // 3. Adım: Verileri zenginleştir ve Günlük İzlenme (Views per Day) hesapla
  const now = new Date();
  
  const processedVideos = videosDetail.map(video => {
    const stats = video.statistics || {};
    const snippet = video.snippet || {};
    const views = parseInt(stats.viewCount || '0', 10);
    const publishedAt = new Date(snippet.publishedAt);
    
    // Kaç gün önce yüklendiğini bul
    const diffTime = Math.abs(now - publishedAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const daysSincePublished = diffDays > 0 ? diffDays : 1; // 0 güne bölünmeyi önle
    
    const viewsPerDay = Math.round(views / daysSincePublished);

    return {
      id: video.id,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      daysOld: daysSincePublished,
      views,
      viewsPerDay,
      thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
      channelId: snippet.channelId,
      likes: parseInt(stats.likeCount || '0', 10),
      comments: parseInt(stats.commentCount || '0', 10)
    };
  });

  // Günlük izlenme sayısına göre çoktan aza sırala
  return processedVideos.sort((a, b) => b.viewsPerDay - a.viewsPerDay);
}

/**
 * YouTube Autocomplete (Otomatik Tamamlama) ucundan gerçek arama önerilerini JSONP ile çeker.
 * CORS engelini tarayıcıda aşmak için dinamik script enjeksiyonu kullanır.
 * @param {string} query - Arama kelimesi
 * @returns {Promise<Array<string>>} Öneri listesi
 */
export function fetchAutocomplete(query) {
  return new Promise((resolve, reject) => {
    if (!query || query.trim() === '') {
      return resolve([]);
    }

    // Benzersiz bir JSONP callback ismi üretelim (kriptografik olarak güvenli)
    const array = new Uint32Array(1);
    (window.crypto || window.msCrypto).getRandomValues(array);
    const callbackName = 'jsonp_suggest_' + array[0];
    
    // Script çağrıldığında çalışacak global fonksiyon
    window[callbackName] = function(data) {
      // Temizlik
      delete window[callbackName];
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      try {
        const rawSuggestions = data && data[1] ? data[1] : [];
        const suggestions = rawSuggestions.map(item => {
          if (Array.isArray(item)) {
            return item[0];
          }
          return item;
        }).filter(Boolean);
        resolve(suggestions);
      } catch (err) {
        reject(err);
      }
    };

    // Script elementini oluştur
    const script = document.createElement('script');
    script.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(query)}&callback=${callbackName}`;
    script.async = true;
    
    // Hata durumunda scripti kaldır
    script.onerror = (err) => {
      delete window[callbackName];
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(new Error('Otomatik tamamlama yüklenirken bir hata oluştu.'));
    };

    // Sayfaya ekle (bu anlık olarak isteği tetikler)
    document.body.appendChild(script);
  });
}

/**
 * Verilen video başlıklarındaki kelimeleri analiz edip en popüler olanları ayıklar.
 * @param {Array<string>} titles - Video başlıkları
 * @returns {Array<{text: string, count: number}>} Kelimeler ve frekansları
 */
export function analyzeKeywordFrequency(titles) {
  if (!titles || titles.length === 0) return [];

  const wordCounts = {};

  titles.forEach(title => {
    // HTML entity'leri temizle ve noktalama işaretlerini boşluk yap
    const cleanTitle = title
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g, ' ')
      .toLowerCase();

    // Boşluklara göre kelimelere ayır
    const words = cleanTitle.split(/\s+/);

    words.forEach(word => {
      // Kelime temizleme
      const trimmed = word.trim();
      
      // 3 karakterden kısa kelimeleri, sayıları ve duraklama kelimelerini filtrele
      if (
        trimmed.length > 2 && 
        !STOP_WORDS.has(trimmed) && 
        isNaN(trimmed)
      ) {
        const root = getTurkishRoot(trimmed);
        if (root && root.length > 2) {
          wordCounts[root] = (wordCounts[root] || 0) + 1;
        }
      }
    });
  });

  // Nesneyi diziye çevirip en çok kullanılandan aza doğru sıralayalım
  return Object.entries(wordCounts)
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12); // İlk 12 kelimeyi gösterelim
}
