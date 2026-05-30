# 🚀 TubeSeek — YouTube SEO, Rakip Analiz & Konu Keşif Aracı

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

**TubeSeek**, YouTube içerik üreticilerinin video fikirleri bulmasını, rakiplerini izlenme performanslarına göre analiz etmesini, doğal etiketleri hasat etmesini ve en yüksek tıklama oranını (CTR) yakalayacak şık başlıklar üretmesini sağlayan **ücretsiz, açık kaynaklı ve BYOK (kendi anahtarını getir)** yapısında geliştirilmiş modern bir web uygulamasıdır.

Tasarım olarak **Cyberpunk Dark Slate ve Glassmorphism** stiline sahip olan TubeSeek, tamamen tarayıcınızda (istemci tarafında) çalışır. Hiçbir sunucuya veri göndermez, gizliliğinizi korur ve tamamen bağımsızdır.

---

## ✨ Özellikler ve Modüller

### 🛡️ 1. API Anahtarı Kurulum Sihirbazı & Güvenlik (BYOK)
*   **İstemci Taraflı Depolama:** YouTube Data API anahtarınız doğrudan kendi tarayıcınızın `localStorage` alanında saklanır. Harici hiçbir sunucuya veri aktarılmaz.
*   **API Kısıtlama Rehberi:** Google Cloud Console üzerinden API anahtarınızı nasıl sadece *YouTube Data API v3* ile sınırlandıracağınızı anlatan adım adım görsel bir rehber içerir.
*   **Sıkı Güvenlik Politikası (CSP):** Uygulamada askeri düzeyde bir İçerik Güvenliği Politikası (CSP) tanımlıdır. Olası XSS açıklarına karşı API anahtarınız tarayıcı seviyesinde güvence altındadır.

### 🎯 2. Başlık Skorlayıcı (Title Scorer)
*   **Anlık 100 Puan Skorlaması:** Başlığınızı mobil kesilme sınırı (ideal karakter uzunluğu), CTR artırıcı unsurlar (parantez, sayılar), clickbait tespiti ve SEO uyumuna göre anlık olarak skorlar.
*   **Türkçe Kök Bulucu (Turkish Stemmer):** Türkçe sondan eklemeli bir dil olduğu için aradığınız tohum kelimeye gelen çekim ve yapım eklerini (`sır` -> `sırlı`, `sırlar`, `sırrı`) algılayarak SEO puanınızı kırmaz!
*   **Şablon Havuzu & Yenileme:** VidIQ tarzı 16 adet yüksek CTR'lı başlık formülünden rastgele seçilen önerileri tek tıkla **"Yenile"** butonuyla karıştırabilirsiniz.

### 📊 3. Rakip Karşılaştırma & Premium Etiket Hasatlayıcı (Competitors)
*   **VPD Sıralaması (Views Per Day):** Rakip videoları toplam izlenmelerine göre değil, **Günlük İzlenme Oranına** göre sıralayarak hızla yükselen popüler trendleri yakalamanızı sağlar.
*   **Doğal Etiket Hasatlayıcı (Premium Tag Harvester):** Yapay ve bozuk kelime kombinasyonları yerine, en başarılı rakip videoların başlıklarından **doğal, insan yapımı anlamlı segmentleri** cımbızla çeker.
*   **Kelime Frekans Bulutu:** Rakiplerin başlıklarında en sık geçen anahtar kelimeleri Türkçe kök analizinden geçirerek kümülatif güçleriyle listeler.
*   **Açıklama & Etiket Yenileyici:** 4 farklı tondaki (Samimi, Profesyonel, Clickbait, Hikayeci) SEO uyumlu açıklama taslaklarını ve etiket havuzunu bağımsız butonlarla dilediğinizce yenileyebilirsiniz.

### 🔍 4. Sınırsız Konu Keşfi (Discovery)
*   **CORS Engeli Aşılmış JSONP:** YouTube arama kutusuna yazılan canlı otomatik tamamlama önerilerini tarayıcı sınırlarına takılmadan ve API kotanızı harcamadan listeler.
*   **Tek Tıkla Aktarım:** Fikirleri tek tıkla Başlık Skorlayıcıya gönderip optimize etmeye başlayabilirsiniz.

---

## 🛠️ Klasör Yapısı

```text
tubeseek/
├── index.html          # Giriş sayfası, CSP politikaları ve Google Font yüklemeleri
├── package.json        # Paket bağımlılıkları (lucide-react & gh-pages dahil)
├── vite.config.js      # Vite yapılandırması (base path dahil)
├── README.md           # Proje dokümantasyonu
└── src/
    ├── main.jsx        # React giriş noktası
    ├── App.jsx         # Ana Dashboard yapısı, sekmeler, clipboard ve Bitcoin bağış arayüzü
    ├── styles.css      # Custom neon glassmorphism tasarım sistemi (Vanilla CSS)
    ├── index.css       # styles.css dosyasını sarmalayan dosya
    ├── lib/
    │   ├── youtube.js  # YouTube Arama, Detaylar, Kelime Analizi ve JSONP Autocomplete
    │   ├── scorer.js   # Kural tabanlı 100 puanlık Türkçe root-destekli skorlama motoru
    │   └── storage.js  # API anahtarı okuma, yazma ve doğrulama katmanı
    └── components/
        ├── KeySetup.jsx    # API anahtarı kurulum ekranı, kısıtlama adımları ve sihirbazı
        ├── TitleScorer.jsx # Başlık skorlama sekmesi (dairesel SVG grafikli & CTR şablonlu)
        ├── Competitors.jsx # Rakiplerin VPD sıralı listesi, hasatlayıcı ve açıklama yenileyici
        └── Discovery.jsx   # Canlı YouTube otomatik tamamlama önerileri ve hızlı aktarım
```

---

## 🚀 Yerel Kurulum & Çalıştırma (Local Setup)

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları uygulayabilirsiniz:

1.  **Gerekli Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirici Sunucusunu Başlatın (Hot Reload):**
    ```bash
    npm run dev
    ```
    Tarayıcınızda açılan adrese (genellikle `http://localhost:5173`) giderek TubeSeek'i kullanmaya başlayabilirsiniz!

3.  **Üretim Sürümü Derlemesi (Build):**
    ```bash
    npm run build
    ```

4.  **GitHub Pages Dağıtımı (Deploy):**
    ```bash
    npm run deploy
    ```

---

## 💖 Destek & Bağış (Support)

TubeSeek tamamen ücretsiz, reklamsız ve açık kaynaklı bir projedir. Sunucu maliyeti olmadan "kendi anahtarını getir" (BYOK) yapısıyla çalışmaktadır. Eğer bu aracı beğendiyseniz ve geliştiriciye destek olmak isterseniz Patreon üzerinden destekçi olabilir veya Bitcoin (BTC) ile bağışta bulunabilirsiniz:

*   🧡 **Patreon Destekçisi Ol:** [Patreon (opensource2)](https://patreon.com/opensource2)
*   🪙 **Bitcoin (BTC) Cüzdan Adresi (BlueWallet):**
    `bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa`
    *(Uygulama içerisindeki panodan tek tıkla kopyalayabilir veya doğrudan ekran üzerindeki QR kodu taratabilirsiniz!)*

---

## 🛠️ Diğer Projelerimiz & Üretimlerimiz (Our Other Projects)

Geliştirdiğimiz diğer açık kaynaklı ve ticari çözümlere aşağıdaki bağlantılardan göz atabilirsiniz:

*   🌉 **[Caption Bridge](https://github.com/Aristotheles/CaptionBridge)** (Açık Kaynak) — Video altyazı ve çeviri köprüsü.
*   📝 **[PostIT Pro](https://github.com/Aristotheles/PostIT-Pro)** (Açık Kaynak) — Sosyal medya gönderi planlayıcı.
*   🗣️ **[YazılıOkuPro](https://yaziliokupro.com)** (Ticari) — Doğal Türkçe seslendirme platformu. [Web Sitesi](https://yaziliokupro.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.yaziliokupro.app)
*   🇩🇪 **[GermanChunks](https://germanchunks.com)** (Açık Kaynak) — Almanca cümle segment analiz aracı. [Web Sitesi](https://germanchunks.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.germanchunks.app) | [GitHub Reposu](https://github.com/Aristotheles/GermanChunks)

---

## 📄 Lisans (License)

Bu proje **MIT Lisansı** ile lisanslanmıştır. Tamamen ücretsiz olup, kodlarını istediğiniz gibi değiştirebilir, dağıtabilir veya kendi projelerinizde kullanabilirsiniz.
