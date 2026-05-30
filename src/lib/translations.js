// TubeSeed — Çoklu Dil ve Çeviri Sözlüğü (Bilingual Localization Dictionary)

export const translations = {
  tr: {
    logo_sub: 'MVP',
    api_connected: 'YouTube API Bağlı',
    logout: 'Çıkış',
    logout_confirm: 'API anahtarınızı silmek istediğinize emin misiniz?',
    
    // Sidebar
    search_filter: 'Arama Filtresi',
    seed_label: 'Tohum Kelime (Keyword)',
    seed_placeholder: 'Örn: React Dersleri, Kripto...',
    search_btn: 'Fırsatları Ara',
    active_seed: 'Aktif Tohum Kelime:',
    
    how_it_works: 'Nasıl Çalışır?',
    step1: 'Bir tohum kelime belirleyip aratın.',
    step2: 'Rakipler sekmesinde günlük en çok izlenen güncel videoları analiz edin.',
    step3: 'Konu Keşfi sekmesinde gerçek insanların aradığı yan fikirleri kopyalayın.',
    step4: 'Fikirleri Başlık Skorlayıcıya gönderip en yüksek tıklamayı alacak şekilde düzenleyin!',
    
    // Tabs
    tab_scorer: 'Başlık Skorlayıcı',
    tab_competitors: 'Rakip Karşılaştırma',
    tab_discovery: 'Konu Keşfi',
    tab_disabled_tip: 'Lütfen önce tohum kelime aratın',

    // KeySetup
    setup_title: 'TubeSeed Kurulumu',
    setup_desc: 'TubeSeed, doğrudan tarayıcınızda çalışan sunucusuz (backend-less) bir araçtır. Verileri çekmek için kendinize ait bir YouTube API anahtarı kullanmanız gerekir (BYOK).',
    setup_label: 'YouTube API Anahtarınız (Data API v3)',
    setup_sublabel: '* Tarayıcınızda güvenle saklanır',
    setup_placeholder: 'AIzaSy... girin',
    setup_btn_validate: 'Doğrula ve Başla',
    setup_btn_validating: 'Anahtar Doğrulanıyor...',
    setup_empty_error: 'Lütfen boş bir API anahtarı girmeyin.',
    setup_network_error: 'Ağ hatası veya geçersiz sunucu yanıtı.',
    setup_wizard_title: '2 Dakikada Ücretsiz API Anahtarı Alın',
    setup_step1_title: "Google Cloud Console'a Giriş Yapın",
    setup_step1_desc: "Kişisel Google hesabınızla Google Cloud Console'a girin ve üst panelden ücretsiz bir proje oluşturun.",
    setup_step2_title: "YouTube Data API v3'ü Etkinleştirin",
    setup_step2_desc: 'Üstteki arama kutusuna "YouTube Data API v3" yazıp aratın, çıkan sonuca tıklayıp mavi "Etkinleştir" (Enable) butonuna basın.',
    setup_step3_title: 'Kimlik Bilgisi (API Key) Oluşturun',
    setup_step3_desc: 'Sol menüdeki "Kimlik Bilgileri" (Credentials) sekmesine gidin. Üstteki "+ Kimlik Bilgisi Oluştur" butonuna basın ve "API Anahtarı" (API Key) seçeneğini seçin.',
    setup_step4_title: 'Anahtarı Kopyalayıp Buraya Yapıştırın',
    setup_step4_desc: 'Ekranda beliren AIzaSy... ile başlayan anahtarı kopyalayıp yukarıdaki kutuya yapıştırın. İşte bu kadar!',
    setup_footer: '* API anahtarınız doğrudan tarayıcınızın localStorage alanına kaydedilir. Hiçbir sunucuya gönderilmez, güvenle saklanır. İstediğiniz an sol menüden silebilirsiniz.',

    // TitleScorer
    scorer_title: 'Başlık Skorlayıcı (Title Scorer)',
    scorer_desc: 'YouTube video başlığınızın tıklama oranını (CTR) ve arama optimizasyonunu (SEO) anlık test edin. LLM/AI gerektirmeden, kural tabanlı hızlı algoritma ile çalışır.',
    scorer_input_label: 'Video Başlığınızı Yazın',
    scorer_ideal: 'İdeal',
    scorer_placeholder: 'İzleyicilerin ilgisini çekecek harika bir başlık girin...',
    scorer_examples: 'Hızlı Test İçin Örneklere Tıklayın:',
    scorer_empty_title: 'Başlığınızı Yazın',
    scorer_empty_desc: 'Yukarıdaki kutuya bir video başlığı yazın veya örneklerden birini seçin. Algoritmamız saniyeler içinde analiz edip puanlayacaktır.',
    scorer_score_label: 'Skor',
    scorer_g_len: 'Uzunluk Ölçümü',
    scorer_g_ctr: 'Görsel CTR (Sayı/Parantez)',
    scorer_g_power: 'Merak & Güç Kelimeleri',
    scorer_g_seo: 'SEO Kelime Uyumu',
    scorer_g_format: 'Biçim ve Clickbait',
    scorer_feedback_title: 'Geliştirme Önerileri',
    scorer_sug_title: 'Somut Başlık Önerileri (Yüksek Skor)',
    scorer_sug_desc: 'Aşağıdaki yüksek tıklama (CTR) potansiyeline sahip şablonları doğrudan kullanabilir veya tıklayarak anında üstteki arama kutusuna uygulayabilirsiniz:',
    scorer_btn_apply: 'Uygula',

    // Competitors
    comp_title: 'Rakip Karşılaştırma (Competitors)',
    comp_desc: 'Tohum kelimeniz için en popüler ilk 15 rakip videonun analizidir.',
    comp_btn_refresh: 'Yenile',
    comp_vpd_info: 'Videolar "Günlük İzlenme" oranına (Toplam İzlenme / Gün) göre sıralanmıştır.',
    comp_loading: 'YouTube Data API üzerinden rakipler taranıyor, izlenme istatistikleri hesaplanıyor...',
    comp_error_title: 'Yükleme Başarısız Oldu',
    comp_error_quota_desc: '* YouTube Data API günlük ücretsiz 10.000 kredi (quota) verir. Arama sorguları 100 kredi harcar. Kotanız aşılmışsa ertesi günü beklemeniz veya yeni bir API anahtarı eklemeniz gerekir.',
    comp_empty_title: 'Arama Yapılmadı',
    comp_empty_desc: 'Rakipleri karşılaştırmak için sol panelden bir tohum kelime girin ve "Fırsatları Ara" butonuna basın.',
    comp_freq_title: 'Rakiplerin En Çok Kullandığı Kelimeler (Frekans)',
    comp_table_title: 'En Popüler 15 Rakip Video Listesi',
    comp_col_rank: 'Sıra',
    comp_col_video: 'Rakip Video',
    comp_col_channel: 'Kanal',
    comp_col_views: 'Toplam İzlenme',
    comp_col_vpd: 'Günlük İzlenme (VPD)',
    comp_col_age: 'Yayında (Gün)',
    comp_day_suffix: 'gün',
    comp_vpd_suffix: '/ gün',
    comp_outlier_title: 'Aşırı hızlı yükselen (Outlier) video!',

    // SEO Meta Box
    seo_box_title: '🏷️ SEO Meta Kutusu (Hashtag\'ler & Etiketler)',
    seo_box_desc: 'Videonuzun aramalarda daha yukarılarda çıkması için arama algoritması dostu açıklamalar, etiketler ve hashtag\'ler.',
    seo_tags_title: 'Video Etiketleri (Tags)',
    seo_tags_copied: 'Kopyalandı',
    seo_tags_copy: 'Kopyala',
    seo_hash_title: 'Popüler Hashtag\'ler',
    seo_desc_title: 'Hazır SEO Açıklama Taslağı (Description)',
    seo_desc_template_start: 'Merhaba! Bu videoda YouTube aramalarında son derece popüler olan',
    seo_desc_template_mid1: 'konusunu tüm detaylarıyla ele alıyoruz.',
    seo_desc_template_mid2: 'İzleyicilerimizin en çok ilgi gösterdiği',
    seo_desc_template_mid3: 'gibi anahtar temaları bir araya getirerek hazırladığımız bu özel içerikte, sizler için en kaliteli derlemeyi sunduk.',
    seo_desc_template_end: 'Eğer bu tarz içeriklerin devamının gelmesini istiyorsanız kanala ABONE OLMAYI, videoyu BEĞENMEYİ ve aşağıya yorum bırakmayı unutmayın! İyi seyirler!',

    // Discovery
    disc_title: 'Konu Keşfi & Otomatik Tamamlama (Discovery)',
    disc_desc: 'İzleyicilerin YouTube arama çubuğuna yazdığı gerçek ve canlı arama terimlerini çekin.',
    disc_quota_free: 'Bu işlem tamamen ÜCRETSİZDİR ve YouTube Data API kotanızdan YEMEZ!',
    disc_loading: 'Google otomatik tamamlama sunucularından canlı veriler toplanıyor...',
    disc_empty_title: 'Arama Yapılmadı',
    disc_empty_desc: 'YouTube otomatik arama önerilerini listelemek için sol panelden bir tohum kelime girin.',
    disc_banner: '👉 Aşağıdaki listelenen kelimeler, YouTube\'da kullanıcıların bu konuyla ilgili en çok arattığı popüler arama kalıplarıdır. Bu kelimeleri doğrudan video başlığınızda geçirerek veya yeni video fikirleri üreterek yüksek izlenme elde edebilirsiniz.',
    disc_action_copy: 'Kelimeleri Kopyala',
    disc_action_send: 'Başlık Skorlayıcıya Gönder ve Test Et'
  },
  en: {
    logo_sub: 'MVP',
    api_connected: 'YouTube API Connected',
    logout: 'Logout',
    logout_confirm: 'Are you sure you want to delete your API key?',
    
    // Sidebar
    search_filter: 'Search Filter',
    seed_label: 'Seed Keyword',
    seed_placeholder: 'e.g. React Tutorials, Crypto...',
    search_btn: 'Search Opportunities',
    active_seed: 'Active Seed Keyword:',
    
    how_it_works: 'How It Works',
    step1: 'Define a seed keyword and search.',
    step2: 'Analyze the most-viewed recent competitor videos in the Competitors tab.',
    step3: 'Copy real terms that actual people search in the Discovery tab.',
    step4: 'Send keywords to the Title Scorer and optimize for maximum clicks!',
    
    // Tabs
    tab_scorer: 'Title Scorer',
    tab_competitors: 'Competitor Comparison',
    tab_discovery: 'Topic Discovery',
    tab_disabled_tip: 'Please search a seed keyword first',

    // KeySetup
    setup_title: 'TubeSeed Installation',
    setup_desc: 'TubeSeed is a serverless (backend-less) tool that runs directly in your browser. You need to use your own YouTube API key to fetch data (BYOK).',
    setup_label: 'Your YouTube API Key (Data API v3)',
    setup_sublabel: '* Stored securely in your browser',
    setup_placeholder: 'Enter AIzaSy...',
    setup_btn_validate: 'Validate & Start',
    setup_btn_validating: 'Validating Key...',
    setup_empty_error: 'Please do not enter an empty API key.',
    setup_network_error: 'Network error or invalid server response.',
    setup_wizard_title: 'Get a Free API Key in 2 Minutes',
    setup_step1_title: 'Login to Google Cloud Console',
    setup_step1_desc: 'Access Google Cloud Console with your personal Google account and create a free project from the top panel.',
    setup_step2_title: 'Enable YouTube Data API v3',
    setup_step2_desc: 'Search for "YouTube Data API v3" in the top search box, click the result, and press the blue "Enable" button.',
    setup_step3_title: 'Create an API Key Credential',
    setup_step3_desc: 'Go to the "Credentials" tab on the left menu. Click "+ Create Credentials" at the top and select the "API Key" option.',
    setup_step4_title: 'Copy & Paste the Key Here',
    setup_step4_desc: 'Copy the key starting with AIzaSy... that appears on the screen and paste it into the box above. That\'s it!',
    setup_footer: '* Your API key is saved directly in your browser\'s localStorage. It is never sent to any server and is kept safe. You can delete it at any time from the left menu.',

    // TitleScorer
    scorer_title: 'Title Scorer',
    scorer_desc: 'Test your YouTube video title\'s Click-Through Rate (CTR) and Search Engine Optimization (SEO) instantly. Runs on a rule-based fast algorithm without LLM/AI.',
    scorer_input_label: 'Write Your Video Title',
    scorer_ideal: 'Ideal',
    scorer_placeholder: 'Enter a great title that will capture viewers\' interest...',
    scorer_examples: 'Click Examples for Quick Testing:',
    scorer_empty_title: 'Write Your Title',
    scorer_empty_desc: 'Write a video title in the box above or choose one of the examples. Our algorithm will analyze and score it in seconds.',
    scorer_score_label: 'Score',
    scorer_g_len: 'Length Analysis',
    scorer_g_ctr: 'Visual CTR (Number/Brackets)',
    scorer_g_power: 'Curiosity & Power Words',
    scorer_g_seo: 'SEO Keyword Match',
    scorer_g_format: 'Formatting & Clickbait',
    scorer_feedback_title: 'Optimization Tips',
    scorer_sug_title: 'Concrete Title Suggestions (High Score)',
    scorer_sug_desc: 'You can directly use the following high-CTR potential templates or click them to apply to the input box above instantly:',
    scorer_btn_apply: 'Apply',

    // Competitors
    comp_title: 'Competitor Comparison',
    comp_desc: 'Analysis of the top 15 competitor videos for your seed keyword.',
    comp_btn_refresh: 'Refresh',
    comp_vpd_info: 'Videos are sorted by "Daily Views" rate (Total Views / Days Old).',
    comp_loading: 'Scanning competitors on YouTube Data API, calculating view statistics...',
    comp_error_title: 'Loading Failed',
    comp_error_quota_desc: '* YouTube Data API grants 10,000 free credits daily. Search queries spend 100 credits. If your quota is exceeded, wait for Pacific midnight or add a new key.',
    comp_empty_title: 'No Search Done',
    comp_empty_desc: 'Enter a seed keyword in the left panel and click "Search Opportunities" to compare competitors.',
    comp_freq_title: 'Keywords Most Used by Competitors (Frequency)',
    comp_table_title: 'Top 15 Competitor Video List',
    comp_col_rank: 'Rank',
    comp_col_video: 'Competitor Video',
    comp_col_channel: 'Channel',
    comp_col_views: 'Total Views',
    comp_col_vpd: 'Daily Views (VPD)',
    comp_col_age: 'Days Old',
    comp_day_suffix: 'days',
    comp_vpd_suffix: '/ day',
    comp_outlier_title: 'Highly trending outlier video!',

    // SEO Meta Box
    seo_box_title: '🏷️ SEO Meta Box (Hashtags & Tags)',
    seo_box_desc: 'Search algorithm friendly descriptions, tags, and hashtags to make your video rank higher in search results.',
    seo_tags_title: 'Video Tags',
    seo_tags_copied: 'Copied',
    seo_tags_copy: 'Copy',
    seo_hash_title: 'Popular Hashtags',
    seo_desc_title: 'Ready SEO Description Draft',
    seo_desc_template_start: 'Hello! In this video, we cover the highly popular topic of',
    seo_desc_template_mid1: 'in full detail.',
    seo_desc_template_mid2: 'In this special content prepared by bringing together key themes such as',
    seo_desc_template_mid3: 'which are of most interest to our viewers, we have presented the best compilation for you.',
    seo_desc_template_end: 'If you want to see more of this content, don\'t forget to SUBSCRIBE to the channel, LIKE the video, and leave a comment below! Enjoy the video!',

    // Discovery
    disc_title: 'Topic Discovery & Autocomplete',
    disc_desc: 'Fetch actual and live search terms that real viewers type in the YouTube search bar.',
    disc_quota_free: 'This operation is completely FREE and does NOT consume your YouTube API quota!',
    disc_loading: 'Gathering live autocomplete data from Google suggestion servers...',
    disc_empty_title: 'No Search Done',
    disc_empty_desc: 'Enter a seed keyword in the left panel to display YouTube autocomplete suggestions.',
    disc_banner: '👉 The keywords listed below are the most popular search patterns that YouTube users search for. You can use these terms directly in your video title or to generate new video ideas.',
    disc_action_copy: 'Copy Words',
    disc_action_send: 'Send to Title Scorer and Test'
  }
};

/**
 * Tarayıcı veya PC dilini algılayıp, Türkçe değilse varsayılan olarak İngilizce döndürür.
 * @returns {'tr'|'en'} Algılanan dil kodu
 */
export function detectLanguage() {
  const sysLang = navigator.language || navigator.userLanguage || 'en';
  const cleanLang = sysLang.toLowerCase();
  
  if (cleanLang.startsWith('tr')) {
    return 'tr';
  }
  return 'en';
}
