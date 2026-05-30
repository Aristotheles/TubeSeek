import React, { useState, useEffect } from 'react';
import { 
  Users, 
  RefreshCw, 
  Eye, 
  Calendar, 
  TrendingUp, 
  Tag, 
  HelpCircle, 
  Copy, 
  Check, 
  FileText, 
  Hash, 
  Bookmark 
} from 'lucide-react';
import { fetchCompetitors, analyzeKeywordFrequency } from '../lib/youtube';
import { translations } from '../lib/translations';

// Safe HTML entity decoder (only replaces safe visual characters, no HTML execution)
const decodeHtmlEntities = (str) => {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'");
};


export default function Competitors({ apiKey, seedKeyword, lang = 'tr' }) {
  const t = translations[lang] || translations.en;
  
  const [videos, setVideos] = useState([]);
  const [wordCloud, setWordCloud] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Kopyalama bildirimleri için state'ler
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [descTemplateIndex, setDescTemplateIndex] = useState(0);
  const [generatedTags, setGeneratedTags] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState('');

  const loadCompetitors = async () => {
    if (!apiKey) {
      setError(lang === 'tr' ? 'Lütfen önce ayarlar panelinden geçerli bir API anahtarı girin.' : 'Please enter a valid API key from the settings panel first.');
      return;
    }
    if (!seedKeyword || seedKeyword.trim() === '') {
      setError(lang === 'tr' ? 'Lütfen sol panelden bir tohum kelime girin.' : 'Please enter a seed keyword from the left panel.');
      return;
    }

    setLoading(true);
    setError('');
    setVideos([]);
    setWordCloud([]);

    try {
      const data = await fetchCompetitors(apiKey, seedKeyword);
      setVideos(data);
      
      // Kelime bulutu analizini yapalım
      const titles = data.map(v => v.title);
      const frequencies = analyzeKeywordFrequency(titles);
      setWordCloud(frequencies);
    } catch (err) {
      if (lang === 'en' && err.message.includes('kotanız')) {
        setError('YouTube API quota exceeded or connection failed.');
      } else {
        setError(err.message || 'YouTube verileri alınırken bir hata oluştu. Kotanız dolmuş olabilir.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seedKeyword && apiKey) {
      loadCompetitors();
    }
  }, [seedKeyword, apiKey]);

  // Harvest high-quality human-written tags from competitor titles
  const harvestTags = () => {
    if (!videos || videos.length === 0) return [];
    
    const harvested = [];
    
    // 1. Tohum kelimenin kendisini ekle
    if (seedKeyword) {
      harvested.push(seedKeyword.trim());
    }
    
    videos.forEach(v => {
      if (!v.title) return;
      
      const segments = v.title
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .split(/[|\-\[\]\(\):,\u2013\u2014]/);
        
      segments.forEach(seg => {
        const clean = seg.replace(/[^a-zA-ZĞÜŞİÖÇğüşıöç\d\s]/g, '').trim();
        // 5 karakterden büyük, 35 karakterden küçük anlamlı kelime grupları
        if (clean.length >= 5 && clean.length <= 35 && clean.split(/\s+/).length <= 5) {
          const capitalized = clean.split(/\s+/).map(w => {
            if (w.length === 0) return '';
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
          }).join(' ');
          
          harvested.push(capitalized);
        }
      });
    });
    
    // 2. Eğer yeterince etiket çıkmadıysa, kelime bulutundaki kelimeleri akıllıca birleştirerek ekle
    if (harvested.length < 10 && wordCloud && wordCloud.length > 0) {
      wordCloud.forEach(w => {
        if (w.text && w.text.length >= 4) {
          const capText = w.text[0].toUpperCase() + w.text.slice(1).toLowerCase();
          if (seedKeyword) {
            const capitalizedSeed = seedKeyword.split(/\s+/).map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' ');
            harvested.push(`${capitalizedSeed} ${capText}`);
          }
          harvested.push(capText);
        }
      });
    }
    
    return harvested.filter((val, idx, self) => self.indexOf(val) === idx);
  };

  const harvestHashtags = (tagsList) => {
    const hashtags = [];
    if (seedKeyword) {
      hashtags.push(toHashtag(seedKeyword));
    }
    
    tagsList.forEach(t => {
      const hash = toHashtag(t);
      if (hash && hash.length > 2 && hash.length < 25) {
        hashtags.push(hash);
      }
    });
    
    hashtags.push('#YoutubeSeo', '#Trend');
    return hashtags.filter((val, idx, self) => self.indexOf(val) === idx);
  };

  const shuffleArray = (arr) => {
    return [...arr].sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    if (videos && videos.length > 0) {
      const tags = harvestTags();
      const hashes = harvestHashtags(tags);
      
      setGeneratedTags(tags.slice(0, 15).join(', '));
      setGeneratedHashtags(hashes.slice(0, 6).join(' '));
    } else {
      setGeneratedTags('');
      setGeneratedHashtags('');
    }
  }, [videos, seedKeyword, wordCloud]);

  const handleRefreshTags = () => {
    const tags = harvestTags();
    const shuffled = shuffleArray(tags);
    setGeneratedTags(shuffled.slice(0, 15).join(', '));
  };

  const handleRefreshHashtags = () => {
    const tags = harvestTags();
    const hashes = harvestHashtags(tags);
    const shuffled = shuffleArray(hashes);
    setGeneratedHashtags(shuffled.slice(0, 6).join(' '));
  };

  // Sayı formatlayıcı (Örn: 1.250.000)
  const formatNumber = (num) => {
    const localeCode = lang === 'tr' ? 'tr-TR' : 'en-US';
    return new Intl.NumberFormat(localeCode).format(num);
  };

  // SEO Meta Verilerinin Dinamik Hesaplanması (Video etiketleri, hashtag'ler ve açıklama paragrafları)
  const toHashtag = (str) => {
    if (!str) return '';
    // Boşluk ve noktalama işaretlerini kaldırıp PascalCase hashtag yapalım
    return '#' + str.split(/[^a-zA-ZĞÜŞİÖÇğüşıöç\d]+/).map(word => {
      if (!word) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
  };
  
  // (Bu satırlar kaldırıldı, yerine dinamik state kullanılıyor)

  // Büyük Harfli Tohum Kelime
  const capKeyword = seedKeyword ? seedKeyword.split(/\s+/).map(w => {
    if (w.length === 0) return '';
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ') : 'Topic';

  // Otomatik SEO Açıklama Metni Paragrafı (Zengin 4 Konseptli Havuz)
  const wordsText = wordCloud.slice(0, 4).map(w => `"${w.text}"`).join(', ');
  const wordsListText = wordCloud.slice(0, 4).map(w => `• ${w.text}`).join('\n');
  
  const descTemplates = {
    tr: [
      `Merhaba! Bu videoda YouTube aramalarında son derece popüler olan "${capKeyword}" konusunu tüm detaylarıyla ele alıyoruz. \n\nİzleyicilerimizin en çok ilgi gösterdiği ${wordsText || '"önerilen anahtar kelimeler"'} gibi anahtar temaları bir araya getirerek hazırladığımız bu özel içerikte, sizler için en kaliteli derlemeyi sunduk. \n\nEğer bu tarz içeriklerin devamının gelmesini istiyorsanız kanala ABONE OLMAYI, videoyu BEĞENMEYİ ve aşağıya yorum bırakmayı unutmayın! İyi seyirler! \n\n${generatedHashtags}`,
      
      `Bu video rehberinde, dijital dünyada öne çıkan "${capKeyword}" konusunun pratik ve teknik yönlerini masaya yatırıyoruz. \n\nİncelediğimiz ana başlıklar ve popüler konular:\n${wordsListText || '• Temel Kavramlar\n• Önemli Adımlar'}\n\nİçerik boyunca uyguladığımız taktikler sayesinde kendi stratejinizi kolayca oluşturabilirsiniz. Destek olmak için videoyu BEĞENMEYİ ve ABONE OLMAYI unutmayın!\n\n${generatedHashtags}`,
      
      `YouTube'da son zamanların en çok aranan konusu "${capKeyword}" hakkında kaçırılmaması gereken dev analiz yayında! \n\nHepinizin merak ettiği ${wordsText || 'en önemli'} detaylarını ve izlenme sırlarını adım adım paylaşıyoruz. Sakın bu videoyu sonuna kadar izlemeden başlamayın! \n\nKanala abone olarak en yeni tüyoları kaçırmayın. Keyifli seyirler!\n\n${generatedHashtags}`,
      
      `Eğer siz de "${capKeyword}" konusunda sorunlar yaşıyor veya nereden başlayacağınızı bilmiyorsanız, doğru yerdesiniz! \n\nBu içerikte, izleyicilerimizden gelen geri bildirimler doğrultusunda ${wordsText || 'akıllardaki'} konularını inceliyor ve en etkili çözümleri üretiyoruz. \n\nYorumlarda kendi fikirlerinizi paylaşmayı ve kanalımıza destek olmak için abone olmayı unutmayın!\n\n${generatedHashtags}`
    ],
    en: [
      `Hello! In this video, we cover the highly popular topic of "${capKeyword}" in full detail. \n\nIn this special content prepared by bringing together key themes such as ${wordsText || 'recommended keywords'}, which are of most interest to our viewers, we have presented the best compilation for you. \n\nIf you want to see more of this content, don't forget to SUBSCRIBE to the channel, LIKE the video, and leave a comment below! Enjoy the video! \n\n${generatedHashtags}`,
      
      `In this video guide, we examine the practical and technical aspects of "${capKeyword}" which stands out in the digital world. \n\nKey topics and concepts we will cover:\n${wordsListText || '• Key Concepts\n• Main Steps'}\n\nThanks to the steps we apply throughout the content, you can easily create your own strategy. Don't forget to LIKE and SUBSCRIBE to support us!\n\n${generatedHashtags}`,
      
      `The giant analysis about "${capKeyword}", the most searched topic on YouTube that you shouldn't miss, is live! \n\nWe share step-by-step the details and success secrets of ${wordsText || 'key factors'} that everyone is curious about. Don't start without watching this video till the end! \n\nSubscribe to our channel so you don't miss the latest hacks!\n\n${generatedHashtags}`,
      
      `If you are having problems with "${capKeyword}" or don't know where to start, you are in the right place! \n\nIn this content, we analyze key areas such as ${wordsText || 'popular topics'} based on viewer feedback and produce the most effective solutions. \n\nDon't forget to share your ideas in the comments and subscribe to support us!\n\n${generatedHashtags}`
    ]
  };

  const activeTemplates = descTemplates[lang] || descTemplates.en;
  const generatedDesc = activeTemplates[descTemplateIndex] || activeTemplates[0];

  const handleCopyTags = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(generatedHashtags);
    setCopiedHashtags(true);
    setTimeout(() => setCopiedHashtags(false), 2000);
  };

  const handleCopyDesc = () => {
    navigator.clipboard.writeText(generatedDesc);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  return (
    <div className="discovery-layout">
      {/* Üst Başlık & Yenileme Butonu */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <div className="competitors-header">
          <div>
            <h2 className="panel-title" style={{ fontSize: '20px', margin: 0 }}>
              <Users size={20} className="logo-icon" /> {t.comp_title}
            </h2>
            <p className="step-desc" style={{ marginTop: '4px' }}>
              {lang === 'tr' ? 'Tohum kelimeniz olan' : 'Analysis for your seed keyword'} <strong>"{seedKeyword || 'Girilmedi'}"</strong> {lang === 'tr' ? 'araması için en popüler ilk 15 rakip videonun analizidir.' : 'to list the top 15 most popular competitors.'}
            </p>
          </div>
          {seedKeyword && (
            <button 
              className="btn-secondary" 
              onClick={loadCompetitors} 
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spinner' : ''} />
              {t.comp_btn_refresh}
            </button>
          )}
        </div>

        {/* Kota ve Limit Bilgilendirmesi */}
        <div className="quota-badge" style={{ display: 'inline-flex', marginTop: '0px' }}>
          <TrendingUp size={12} />
          <span>{t.comp_vpd_info}</span>
        </div>
      </div>

      {loading && (
        <div className="loading-wrapper glass-card">
          <div className="spinner" />
          <span className="loading-text">{t.comp_loading}</span>
        </div>
      )}

      {error && (
        <div className="empty-state glass-card" style={{ borderStyle: 'solid', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <HelpCircle size={36} className="empty-state-icon" style={{ color: 'var(--color-danger)' }} />
          <h3 className="empty-state-title" style={{ color: '#fca5a5' }}>{t.comp_error_title}</h3>
          <p className="empty-state-desc" style={{ marginBottom: '16px' }}>{error}</p>
          {error.includes('quota') && (
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '500px' }}>
              {t.comp_error_quota_desc}
            </div>
          )}
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="empty-state glass-card">
          <Users className="empty-state-icon" size={36} />
          <h3 className="empty-state-title">{t.comp_empty_title}</h3>
          <p className="empty-state-desc">
            {t.comp_empty_desc}
          </p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <>
          {/* Kelime Frekans Bulutu */}
          {wordCloud.length > 0 && (
            <div className="word-cloud-card glass-card" style={{ marginBottom: '20px' }}>
              <h3 className="cloud-title">
                <Tag size={14} className="logo-icon" /> {t.comp_freq_title}
              </h3>
              <div className="cloud-tags">
                {wordCloud.map((word, idx) => (
                  <span key={idx} className="cloud-tag" title={lang === 'tr' ? `${word.count} rakip videoda kullanıldı` : `Used in ${word.count} competitor videos`}>
                    {word.text}
                    <span className="cloud-tag-count">{word.count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SEO Meta Üretici Kutusu (Hashtags, Tags & Açıklama) - Üstte Konumlandırıldı! */}
          <div 
            className="glass-card" 
            style={{ 
              marginBottom: '20px', 
              border: '1px solid rgba(99, 102, 241, 0.25)', 
              background: 'rgba(99, 102, 241, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h3 className="panel-title" style={{ fontSize: '18px', color: 'var(--color-primary)', margin: 0 }}>
                <Bookmark size={18} /> {t.seo_box_title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {t.seo_box_desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Etiketler (Tags) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} /> {t.seo_tags_title}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={handleRefreshTags} 
                      className="btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      title={lang === 'tr' ? 'Etiketleri Yenile' : 'Refresh Tags'}
                    >
                      <RefreshCw size={11} />
                      {lang === 'tr' ? 'Yenile' : 'Refresh'}
                    </button>
                    <button onClick={handleCopyTags} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      {copiedTags ? <Check size={12} style={{ color: 'var(--color-success)' }} /> : <Copy size={12} />}
                      {copiedTags ? t.seo_tags_copied : t.seo_tags_copy}
                    </button>
                  </div>
                </div>
                <textarea 
                  readOnly 
                  className="input-control" 
                  style={{ 
                    height: '80px', 
                    padding: '10px', 
                    fontSize: '12.5px', 
                    fontFamily: 'var(--font-mono)', 
                    resize: 'none',
                    lineHeight: '1.4'
                  }} 
                  value={generatedTags}
                />
              </div>

              {/* Hashtag'ler */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Hash size={14} /> {t.seo_hash_title}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={handleRefreshHashtags} 
                      className="btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      title={lang === 'tr' ? 'Hashtagleri Yenile' : 'Refresh Hashtags'}
                    >
                      <RefreshCw size={11} />
                      {lang === 'tr' ? 'Yenile' : 'Refresh'}
                    </button>
                    <button onClick={handleCopyHashtags} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      {copiedHashtags ? <Check size={12} style={{ color: 'var(--color-success)' }} /> : <Copy size={12} />}
                      {copiedHashtags ? t.seo_tags_copied : t.seo_tags_copy}
                    </button>
                  </div>
                </div>
                <textarea 
                  readOnly 
                  className="input-control" 
                  style={{ 
                    height: '80px', 
                    padding: '10px', 
                    fontSize: '13px', 
                    fontFamily: 'var(--font-mono)', 
                    resize: 'none',
                    lineHeight: '1.4',
                    color: 'var(--color-accent)'
                  }} 
                  value={generatedHashtags}
                />
              </div>
            </div>

            {/* SEO Açıklama Taslağı */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> {t.seo_desc_title}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '400' }}>
                    ({lang === 'tr' ? `Konsept ${descTemplateIndex + 1}/4` : `Concept ${descTemplateIndex + 1}/4`})
                  </span>
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setDescTemplateIndex(prev => (prev + 1) % 4)} 
                    className="btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    title={lang === 'tr' ? 'Açıklama Konseptini Değiştir' : 'Change Description Concept'}
                  >
                    <RefreshCw size={12} />
                    {lang === 'tr' ? 'Yenile' : 'Refresh'}
                  </button>
                  <button onClick={handleCopyDesc} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                    {copiedDesc ? <Check size={12} style={{ color: 'var(--color-success)' }} /> : <Copy size={12} />}
                    {copiedDesc ? t.seo_tags_copied : t.seo_tags_copy}
                  </button>
                </div>
              </div>
              <textarea 
                readOnly 
                className="input-control" 
                style={{ 
                  height: '140px', 
                  padding: '12px', 
                  fontSize: '13px', 
                  resize: 'none',
                  lineHeight: '1.5'
                }} 
                value={generatedDesc}
              />
            </div>
          </div>

          {/* Rakipler Tablosu */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <h3 className="panel-title" style={{ fontSize: '16px', marginBottom: '16px', paddingLeft: '8px' }}>
              {t.comp_table_title}
            </h3>
            
            <div className="table-responsive">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>{t.comp_col_rank}</th>
                    <th>{t.comp_col_video}</th>
                    <th>{t.comp_col_channel}</th>
                    <th style={{ textAlign: 'right' }}>{t.comp_col_views}</th>
                    <th style={{ textAlign: 'right' }}>{t.comp_col_vpd}</th>
                    <th style={{ textAlign: 'center' }}>{t.comp_col_age}</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => {
                    const isHighPerformer = video.viewsPerDay > 1500;

                    return (
                      <tr key={video.id}>
                        <td style={{ textAlign: 'center', fontWeight: '700', color: index === 0 ? 'var(--color-accent)' : 'var(--text-muted)' }}>
                          {index + 1}
                        </td>
                        <td>
                          <div className="video-cell">
                            <img src={video.thumbnail} alt={video.title} className="video-thumb" />
                            <div className="video-info-wrapper">
                              <a 
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-title-link"
                              >
                                {decodeHtmlEntities(video.title)}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="video-channel">{video.channelTitle}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }} className="badge-viewcount">
                          {formatNumber(video.views)}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <span 
                            className="badge-vpd"
                            style={isHighPerformer ? { 
                              backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                              borderColor: 'var(--color-success)', 
                              color: 'var(--color-success)',
                              boxShadow: '0 0 10px rgba(16, 185, 129, 0.05)'
                            } : {}}
                            title={isHighPerformer ? t.comp_outlier_title : ''}
                          >
                            {formatNumber(video.viewsPerDay)} {t.comp_vpd_suffix}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {video.daysOld} {t.comp_day_suffix}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
