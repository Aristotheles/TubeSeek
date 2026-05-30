/**
 * YouTube Başlık Skorlama Algoritması (Saf JS, Kural Tabanlı)
 */
/**
 * Türkçe kelimelerdeki yapım ve çekim eklerini (lar/ler, lı/li, lık/lik, dan/de, a/e, vb.)
 * sağdan sola aşamalı olarak budayan saf JS Türkçe Kök Bulucu (Stemmer).
 * @param {string} word - Temizlenecek kelime
 * @returns {string} Kelimenin kökü
 */
export function getTurkishRoot(word) {
  if (!word) return '';
  let root = word.toLowerCase().trim();
  
  const suffixRules = [
    /(lar|ler)(ı|i|u|ü|a|e|da|de|dan|den|la|le)?$/,
    /(imiz|umuz|ümüz|ınız|iniz|unuz|ünüz|ımız)(da|de|dan|den|a|e|ı|i|u|ü)?$/,
    /(cılık|cilik|culuk|cülük|çılık|çilik|çuluk|çülük)$/,
    /(lık|lik|luk|lük|lı|li|lu|lü|suz|siz|suz|süz|cı|ci|cu|cü|çı|çi|çu|çü)$/,
    /(ca|ce|ça|çe)$/,
    /(dan|den|tan|ten|da|de|ta|te|a|e|ı|i|u|ü|ın|in|un|ün|ım|im|um|üm|la|le)$/,
    /(dır|dir|dur|dür|tır|tir|tur|tür|ken|la|le|se|sa)$/
  ];
  
  let changed = true;
  let iterations = 0;
  while (changed && iterations < 5) {
    changed = false;
    for (const regex of suffixRules) {
      const match = root.match(regex);
      if (match) {
        const candidate = root.replace(regex, '');
        // Kök uzunluğu 3 karakterin altında kalmasın (örn: sır, yol, tez)
        if (candidate.length >= 3) {
          root = candidate;
          changed = true;
        }
      }
    }
    iterations++;
  }
  
  // Ünsüz türemesini sadeleştir (örn: sırrı -> sırr -> sır, hakkı -> hakk -> hak)
  if (root.length >= 3) {
    const lastTwo = root.slice(-2);
    if (lastTwo[0] === lastTwo[1]) {
      root = root.slice(0, -1);
    }
  }
  
  return root;
}

// Türkçe ve İngilizce merak / güç (power) kelimeleri listesi
const POWER_WORDS = [
  // Türkçe
  'şok', 'inanılmaz', 'sakın', 'gizli', 'kolay', 'hızlı', 'tüyo', 'formül', 
  'sır', 'kesin', 'taktik', 'asla', 'bedava', 'ücretsiz', 'rehber', 'kanıt', 
  'kanıtlı', 'aşamalı', 'en iyi', 'rehberi', 'yöntem', 'hile', 'adım adım', 
  'şaşıracaksınız', 'yapmayın', 'hata', 'hatalar', 'kritik', 'can alıcı',
  // İngilizce
  'shock', 'shocking', 'incredible', 'secret', 'easy', 'fast', 'quick', 'formula', 
  'absolute', 'never', 'free', 'guide', 'proof', 'proven', 'step-by-step', 'best', 
  'reveal', 'hack', 'cheat', 'bypass', 'master', 'mistake', 'avoid', 'critical'
];

// Aşırı clickbait/spam kelime veya kalıpları
const CLICKBAIT_WARNINGS = [
  'mutlaka izleyin', 'inanamayacaksınız', 'şoke olacaksınız', 'bu videoyu',
  'don\'t watch', 'watch this', 'click here', 'tıklayın', 'şok şok'
];

/**
 * Bir YouTube başlığını kural tabanlı olarak 0-100 arasında skorlar.
 * @param {string} title - Analiz edilecek başlık
 * @param {string} [seedKeyword] - (İsteğe bağlı) Tohum anahtar kelime
 * @param {'tr'|'en'} [lang] - Dil seçeneği ('tr' veya 'en')
 * @returns {{
 *   score: number,
 *   details: {
 *     lengthScore: number,
 *     saliencyScore: number,
 *     powerWordsScore: number,
 *     keywordScore: number,
 *     formatScore: number
 *   },
 *   feedback: Array<{type: 'success'|'warning'|'info', text: string}>,
 *   suggestions: Array<string>
 * }}
 */
export function scoreTitle(title, seedKeyword = '', lang = 'tr') {
  // Dil bazlı metin seçici
  const txt = (trStr, enStr) => (lang === 'tr' ? trStr : enStr);

  // Başlık boşsa temel nesneyi dön
  if (!title || title.trim() === '') {
    return {
      score: 0,
      details: { lengthScore: 0, saliencyScore: 0, powerWordsScore: 0, keywordScore: 0, formatScore: 0 },
      feedback: [{ type: 'info', text: txt('Analize başlamak için bir başlık yazın.', 'Type a title to start the analysis.') }],
      suggestions: []
    };
  }

  const cleanTitle = title.trim();
  const lowerTitle = cleanTitle.toLowerCase();
  
  let score = 0;
  const feedback = [];
  
  // 1. UZUNLUK ANALİZİ (Maksimum 30 Puan)
  let lengthScore = 0;
  const len = cleanTitle.length;

  if (len < 15) {
    lengthScore = 10;
    feedback.push({ 
      type: 'warning', 
      text: txt(
        `Başlığınız çok kısa (${len} karakter). Konuyu daha açıklayıcı hale getirin ve izleyicilerin ilgisini çekecek detaylar ekleyin.`,
        `Your title is too short (${len} characters). Make it more descriptive and add details that will interest viewers.`
      )
    });
  } else if (len >= 15 && len < 30) {
    lengthScore = 22;
    feedback.push({ 
      type: 'info', 
      text: txt(
        `Başlık boyutu fena değil (${len} karakter). Ancak 30-55 karakter arası ideal aralığa ulaşarak daha fazla detay verebilirsiniz.`,
        `Title size is not bad (${len} characters). However, you can give more details by reaching the ideal range of 30-55 characters.`
      )
    });
  } else if (len >= 30 && len <= 55) {
    lengthScore = 30;
    feedback.push({ 
      type: 'success', 
      text: txt(
        `Harika başlık uzunluğu (${len} karakter)! Hem masaüstünde hem de mobil aramalarda kesilmeden tam görünecektir.`,
        `Great title length (${len} characters)! It will be fully visible without truncation on both desktop and mobile search.`
      )
    });
  } else if (len > 55 && len <= 65) {
    lengthScore = 20;
    feedback.push({ 
      type: 'warning', 
      text: txt(
        `Başlığınız sınırda (${len} karakter). Bazı mobil cihazlarda son kelimeler üç nokta (...) ile kesilebilir. 55 karakterin altında tutmaya çalışın.`,
        `Your title is borderline (${len} characters). On some mobile devices, the last words may be truncated with ellipsis (...). Try to keep it below 55 characters.`
      )
    });
  } else {
    lengthScore = 8;
    feedback.push({ 
      type: 'warning', 
      text: txt(
        `Başlığınız çok uzun (${len} karakter). Mobilde ve arama sonuçlarında kesinlikle kesilecektir. İzleyiciler başlığın sonunu göremez.`,
        `Your title is too long (${len} characters). It will definitely be truncated on mobile and search results. Viewers won't see the end.`
      )
    });
  }
  score += lengthScore;

  // 2. DİKKAT ÇEKİCİ UNSURLAR (Sayılar, Parantezler) (Maksimum 20 Puan)
  let saliencyScore = 0;
  
  // Sayı kontrolü (örn: "5 Adımda", "2026'da")
  const hasNumber = /\d+/.test(cleanTitle);
  if (hasNumber) {
    saliencyScore += 10;
  }
  
  // Parantez kontrolü (örn: [Rehber], (Önemli))
  const hasBrackets = /[\(\[\{\}\]\)]/.test(cleanTitle);
  if (hasBrackets) {
    saliencyScore += 10;
  }

  // Geri bildirimler
  if (hasNumber && hasBrackets) {
    feedback.push({ 
      type: 'success', 
      text: txt(
        'Başlığınızda hem sayı hem de parantez kullandınız! Bu iki görsel unsur arama sonuçlarında tıklama oranınızı (CTR) ciddi ölçüde artırır.',
        'You used both a number and parentheses in your title! These two visual elements significantly boost your click-through rate (CTR) in search results.'
      )
    });
  } else if (hasNumber) {
    feedback.push({ 
      type: 'success', 
      text: txt(
        'Sayı kullanımı harika! "5 İpucu" gibi listelemeler veya yıllar (2026 gibi) izleyicide somut bir beklenti oluşturur.',
        'Great use of numbers! Lists like "5 Tips" or years (like 2026) create a concrete expectation in the viewer\'s mind.'
      )
    });
    feedback.push({ 
      type: 'info', 
      text: txt(
        'Ekstra İpucu: Başlığınıza "(Kanıtlı)" veya "[Rehber]" gibi parantez içi ifadeler ekleyerek görsel çekiciliği daha da artırabilirsiniz.',
        'Extra Tip: You can increase the visual appeal even further by adding parentheses like "(Proven)" or "[Guide]" to your title.'
      )
    });
  } else if (hasBrackets) {
    feedback.push({ 
      type: 'success', 
      text: txt(
        'Parantez kullanımı çok iyi! Başlığı bölümlere ayırmak ve parantez içi ekstra bilgi eklemek gözü oraya çeker.',
        'Parentheses usage is very good! Segmenting the title and adding extra information inside brackets draws the eye.'
      )
    });
    feedback.push({ 
      type: 'info', 
      text: txt(
        'Ekstra İpucu: Başlığınıza bir sayı (Örn: "7 Tüyo", "3 Hata") eklemek, tıklama iştahını kabartır.',
        'Extra Tip: Adding a number (e.g. "7 Hacks", "3 Mistakes") to your title whets the click appetite.'
      )
    });
  } else {
    feedback.push({ 
      type: 'warning', 
      text: txt(
        'Başlığınızda hiç sayı veya parantez bulunmuyor. Arama listelerinde öne çıkmak için "[Rehber]" veya bir sayı ("5 Kolay Yol") eklemeyi düşünün.',
        'No numbers or parentheses found in your title. Consider adding "[Guide]" or a number ("5 Easy Ways") to stand out in search listings.'
      )
    });
  }
  score += saliencyScore;

  // 3. MERAK VE GÜÇ KELİMELERİ (POWER WORDS) (Maksimum 25 Puan)
  let powerWordsScore = 0;
  const foundPowerWords = [];

  POWER_WORDS.forEach(word => {
    // TÜRKÇE YAPIM VE ÇEKİM EKLERİ ÇÖZÜMÜ:
    // Sözcük sınırını \b ile sadece kelime BAŞINDA arayacak şekilde güncelledik (\\b + word).
    // Böylece "sır" kökü "sırlı", "sırlar", "sırrı" kelimelerini de başarıyla yakalar!
    const regex = new RegExp(`\\b${word}`, 'i');
    if (regex.test(lowerTitle)) {
      foundPowerWords.push(word);
    }
  });

  if (foundPowerWords.length === 0) {
    powerWordsScore = 0;
    feedback.push({ 
      type: 'warning', 
      text: txt(
        'Başlığınızda hiç "Güçlü/Merak Uyandıran" kelime (örn: gizli, sır, en iyi, kolay, taktik) tespit edilemedi. Başlığı daha çekici yapabilirsiniz.',
        'No "Power/Curiosity" words (e.g. secret, best, easy, trick, avoid) detected in your title. You can make it more enticing.'
      )
    });
  } else if (foundPowerWords.length === 1) {
    powerWordsScore = 15;
    feedback.push({ 
      type: 'success', 
      text: txt(
        `Başlıkta merak uyandıran güçlü bir kelime kullandınız: "${foundPowerWords[0]}".`,
        `You used a powerful curiosity word in your title: "${foundPowerWords[0]}".`
      )
    });
  } else {
    powerWordsScore = 25;
    feedback.push({ 
      type: 'success', 
      text: txt(
        `Harika! Başlığınızda birden fazla güçlü/merak uyandıran kelime var: ${foundPowerWords.map(w => `"${w}"`).join(', ')}. Bu kelimeler merak duygusunu tetikler.`,
        `Awesome! You have multiple powerful/curiosity words in your title: ${foundPowerWords.map(w => `"${w}"`).join(', ')}. These trigger curiosity.`
      )
    });
  }
  score += powerWordsScore;

  // 4. TOHUM ANAHTAR KELİME ANALİZİ (Maksimum 15 Puan)
  let keywordScore = 0;

  if (seedKeyword && seedKeyword.trim() !== '') {
    const cleanKeyword = seedKeyword.trim().toLowerCase();
    
    // 1. Yol: Tam/Kısmi Kelime Eşleşmesi (Geleneksel)
    const exactMatchIndex = lowerTitle.indexOf(cleanKeyword);
    const hasExactMatch = exactMatchIndex !== -1;

    // 2. Yol: Kök Bazlı Eşleşme (Sondan Eklemeli Türkçe Çözümü)
    const keywordWords = cleanKeyword.split(/\s+/).map(w => w.trim()).filter(Boolean);
    const keywordRoots = keywordWords.map(w => getTurkishRoot(w));
    
    const titleWords = lowerTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g, ' ').split(/\s+/).map(w => w.trim()).filter(Boolean);
    const titleRoots = titleWords.map(w => getTurkishRoot(w));

    let hasRootMatch = false;
    let rootMatchIndex = -1;
    
    if (keywordRoots.length > 0 && titleRoots.length >= keywordRoots.length) {
      for (let i = 0; i <= titleRoots.length - keywordRoots.length; i++) {
        let segmentMatch = true;
        for (let j = 0; j < keywordRoots.length; j++) {
          if (titleRoots[i + j] !== keywordRoots[j]) {
            segmentMatch = false;
            break;
          }
        }
        if (segmentMatch) {
          hasRootMatch = true;
          rootMatchIndex = i;
          break;
        }
      }
    }

    const isMatched = hasExactMatch || hasRootMatch;

    if (!isMatched) {
      keywordScore = 0;
      feedback.push({ 
        type: 'warning', 
        text: txt(
          `Hedef anahtar kelimeniz olan "${seedKeyword}" başlıkta geçmiyor! Arama motoru optimizasyonu (SEO) için mutlaka başlığa ekleyin.`,
          `Your target keyword "${seedKeyword}" is missing from the title! Make sure to add it for search engine optimization (SEO).`
        )
      });
    } else {
      // Kelimenin başa yakınlığı hesabı
      let isNearStart = false;
      
      if (hasExactMatch) {
        const words = lowerTitle.split(/\s+/);
        const kwWords = cleanKeyword.split(/\s+/);
        const indexInWords = words.indexOf(kwWords[0]);
        if ((indexInWords >= 0 && indexInWords <= 2) || exactMatchIndex < 15) {
          isNearStart = true;
        }
      } else if (hasRootMatch) {
        if (rootMatchIndex >= 0 && rootMatchIndex <= 2) {
          isNearStart = true;
        }
      }

      if (isNearStart) {
        keywordScore = 15;
        feedback.push({ 
          type: 'success', 
          text: txt(
            `Mükemmel SEO! Hedef kelimeniz "${seedKeyword}" başlığın en başında yer alıyor. YouTube bunu çok sever.`,
            `Excellent SEO! Your target keyword "${seedKeyword}" is located at the very start of the title. YouTube loves this.`
          )
        });
      } else {
        keywordScore = 8;
        feedback.push({ 
          type: 'info', 
          text: txt(
            `Hedef kelimeniz başlıkta geçiyor fakat ortalarda/sonda yer alıyor. Mümkünse "${seedKeyword}" kelimesini daha başa çekin.`,
            `Your target keyword is in the title but located in the middle/end. If possible, pull "${seedKeyword}" closer to the front.`
          )
        });
      }
    }
  } else {
    keywordScore = 15;
    feedback.push({ 
      type: 'info', 
      text: txt(
        'SEO analizi için sol menüden tohum kelime belirleyebilirsiniz. Şu an genel analiz yapılıyor.',
        'You can set a seed keyword in the left panel for SEO analysis. Currently running generic analysis.'
      )
    });
  }
  score += keywordScore;


  // 5. BİÇİMLENDİRME & CLICKBAIT KONTROLÜ (Maksimum 10 Puan)
  let formatScore = 0;
  
  const wordsOnly = cleanTitle.replace(/[^a-zA-ZĞÜŞİÖÇğüşıöç\s]/g, '').trim();
  const isAllCaps = wordsOnly.length > 5 && wordsOnly === wordsOnly.toUpperCase();
  
  const isCapitalized = wordsOnly.split(/\s+/).every(word => {
    if (word.length === 0) return true;
    const firstChar = word[0];
    return firstChar === firstChar.toUpperCase();
  });

  const foundClickbait = [];
  CLICKBAIT_WARNINGS.forEach(phrase => {
    if (lowerTitle.includes(phrase)) {
      foundClickbait.push(phrase);
    }
  });

  if (isAllCaps) {
    formatScore = 3;
    feedback.push({ 
      type: 'warning', 
      text: txt(
        'DİKKAT: Başlığın TAMAMI BÜYÜK HARFLERDEN oluşuyor. Bu durum aramalarda "bağırma" hissi uyandırır ve izleyicilerde spam algısı yaratabilir. Kelimelerin sadece ilk harflerini büyük yapmayı deneyin.',
        'WARNING: Your title is in ALL CAPS. This creates a "shouting" feeling in searches and can trigger spam warnings for viewers. Try capitalization of only the first letters.'
      )
    });
  } else if (isCapitalized) {
    formatScore = 10;
    feedback.push({ 
      type: 'success', 
      text: txt(
        'Mükemmel biçimlendirme! Her kelimenin ilk harfinin büyük olması başlığın son derece profesyonel ve premium görünmesini sağlar.',
        'Excellent formatting! Having the first letter of each word capitalized makes the title look highly professional and premium.'
      )
    });
  } else {
    formatScore = 7;
    feedback.push({ 
      type: 'info', 
      text: txt(
        'Öneri: Başlığınızdaki anahtar kelimelerin ilk harflerini büyük yaparak ("Örnek Başlık Tasarımı" şeklinde) görsel olarak daha okunabilir hale getirin.',
        'Suggestion: Capitalize the first letter of key words in your title (like "Example Title Design") to make it visually more readable.'
      )
    });
  }

  if (foundClickbait.length > 0) {
    const penalty = foundClickbait.length * 5;
    formatScore = Math.max(0, formatScore - penalty);
    feedback.push({ 
      type: 'warning', 
      text: txt(
        `Clickbait Uyarısı: Başlığınızda aşırı abartılı clickbait kalıpları tespit edildi ("${foundClickbait.join(', ')}"). YouTube algoritması son zamanlarda bu tür aşırı abartıları aramalarda geriye itebilmektedir. Daha doğal bir merak uyandırın.`,
        `Clickbait Warning: Exaggerated clickbait patterns detected in your title ("${foundClickbait.join(', ')}"). The YouTube algorithm pushes down extreme clickbaits. Build a more natural curiosity.`
      )
    });
  }

  score += formatScore;

  // Skor sınırlarını güvenceye al (0-100)
  score = Math.min(100, Math.max(0, Math.round(score)));

  // 6. DİNAMİK BAŞLIK ÖNERİLERİ ÜRETİCİSİ (Zengin 16 Formüllü Havuz - VidIQ Stili)
  const suggestionsList = [];
  const kw = (seedKeyword && seedKeyword.trim() !== '') ? seedKeyword.trim() : '';
  
  if (kw) {
    const capitalizedKw = kw.split(/\s+/).map(word => {
      if (word.length === 0) return '';
      const firstChar = word[0].toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstChar + rest;
    }).join(' ');

    suggestionsList.push(txt(`5 Adımda Sıfırdan Uzmanlığa ${capitalizedKw} Rehberi! (2026)`, `5 Steps to Master ${capitalizedKw} from Scratch! (2026)`));
    suggestionsList.push(txt(`Gözden Kaçan En İyi 10 ${capitalizedKw} İpucu [Asla Kaçırmayın]`, `Top 10 Hidden ${capitalizedKw} Tips [Do Not Miss]`));
    suggestionsList.push(txt(`${capitalizedKw} Konusunda Yapılan En Kritik 3 Hata (Kanıtlı)`, `Top 3 Critical Mistakes Made in ${capitalizedKw} (Proven)`));
    suggestionsList.push(txt(`Kimsenin Anlatmadığı Gizli ${capitalizedKw} Taktikleri! [Şaşıracaksınız]`, `Secret ${capitalizedKw} Tactics Nobody Tells You! [Shocking]`));
    suggestionsList.push(txt(`Sıfır Bütçe İle En Kolay ${capitalizedKw} Yöntemi (Adım Adım)`, `Easiest ${capitalizedKw} Method with Zero Budget (Step-by-Step)`));
    suggestionsList.push(txt(`Hayatınızı Kolaylaştıracak 7 Benzersiz ${capitalizedKw} Formülü`, `7 Unique ${capitalizedKw} Formulas to Simplify Your Life`));
    suggestionsList.push(txt(`Sakın İzlemeden Başlamayın: Yeni Başlayanlar İçin ${capitalizedKw} Sırları`, `Don't Start Without Watching: ${capitalizedKw} Secrets for Beginners`));
    suggestionsList.push(txt(`Hızlı ve Kesin Sonuç Veren ${capitalizedKw} Tüyoları (Denendi)`, `Fast and Proven ${capitalizedKw} Hacks (Tested)`));
    suggestionsList.push(txt(`2026'da Yükselmek İçin ${capitalizedKw} Rehberi (Kaçırmayın!)`, `How to Scale ${capitalizedKw} in 2026 (Ultimate Guide)`));
    suggestionsList.push(txt(`Tüm Gerçekler: ${capitalizedKw} Hakkında Bilmeniz Gereken Her Şey`, `The Whole Truth: Everything You Need to Know About ${capitalizedKw}`));
    suggestionsList.push(txt(`Sadece Profesyonellerin Kullandığı 5 ${capitalizedKw} Hilesi`, `5 ${capitalizedKw} Hacks Only Pros Use`));
    suggestionsList.push(txt(`Neden ${capitalizedKw} Yapmalısınız? (Şoke Eden Sonuçlar)`, `Why You Should Start ${capitalizedKw} Right Now (Shocking Results)`));
    suggestionsList.push(txt(`Para Kazanma Yolu: Adım Adım ${capitalizedKw} Stratejisi`, `Monetize It: Step-by-Step ${capitalizedKw} Strategy`));
    suggestionsList.push(txt(`Denemediyseniz Çok Geç! En Etkili ${capitalizedKw} Tüyoları`, `Too Late If You Miss This! Most Effective ${capitalizedKw} Tips`));
    suggestionsList.push(txt(`1 Günde ${capitalizedKw} Öğrenmek Mümkün mü? (Deneyip Gördüm)`, `Is It Possible to Learn ${capitalizedKw} in 1 Day? (My Experience)`));
    suggestionsList.push(txt(`Herkesin Aradığı O ${capitalizedKw} Yöntemi [Kanıtlı Sonuç]`, `The Exact ${capitalizedKw} Method Everyone is Searching For [Proven]`));
  } else {
    suggestionsList.push(txt(`5 Adımda Sıfırdan Uzmanlığa Yeni Konu Rehberi! (2026)`, `5 Steps to Master New Topic from Scratch! (2026)`));
    suggestionsList.push(txt(`Gözden Kaçan En İyi 10 Teknik İpucu [Asla Kaçırmayın]`, `Top 10 Hidden Technical Tips [Do Not Miss]`));
    suggestionsList.push(txt(`Bu Konuda Yapılan En Kritik 3 Hata (Kanıtlı)`, `Top 3 Critical Mistakes Made in This Field (Proven)`));
    suggestionsList.push(txt(`Kimsenin Anlatmadığı Gizli Yöntemler! [Şaşıracaksınız]`, `Secret Tactics Nobody Tells You! [Shocking]`));
    suggestionsList.push(txt(`Sıfır Bütçe İle En Kolay Başlangıç Yolu (Adım Adım)`, `Easiest Method with Zero Budget (Step-by-Step)`));
    suggestionsList.push(txt(`Hayatınızı Kolaylaştıracak 7 Benzersiz Formül`, `7 Unique Formulas to Simplify Your Life`));
    suggestionsList.push(txt(`Sakın İzlemeden Başlamayın: Yeni Başlayanlar İçin Sırlar`, `Don't Start Without Watching: Secrets for Beginners`));
    suggestionsList.push(txt(`Hızlı ve Kesin Sonuç Veren Tüyolar (Denendi)`, `Fast and Proven Hacks (Tested)`));
  }

  return {
    score,
    details: {
      lengthScore,
      saliencyScore,
      powerWordsScore,
      keywordScore,
      formatScore
    },
    feedback: feedback.sort((a, b) => {
      const order = { warning: 0, success: 1, info: 2 };
      return order[a.type] - order[b.type];
    }),
    suggestions: suggestionsList
  };
}
