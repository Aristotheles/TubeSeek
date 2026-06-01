# 🚀 TubeSeek — YouTube SEO, Competitor Analysis & Topic Discovery Tool

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <b><a href="#-english-documentation">🇬🇧 English Documentation</a></b> | 
  <b><a href="#-tubeseek-türkçe-dokümantasyon">🇹🇷 Türkçe Dokümantasyon</a></b>
</p>

---

## 🇬🇧 English Documentation

**TubeSeek** is a free, open-source, and serverless **Bring Your Own Key (BYOK)** web application designed for YouTube content creators to discover fresh video ideas, analyze competitors based on real-time view velocity, harvest organic tags, and craft high-CTR titles.

Built with a sleek **Cyberpunk Dark Slate & Glassmorphism** aesthetic, TubeSeek runs entirely client-side inside your browser. It transmits no data to external servers, prioritizing user privacy and key security.

### 🌟 Key Features

*   🛡️ **Secure BYOK & Content Security Policy (CSP):** Your YouTube Data API key is stored exclusively in your browser's local `localStorage`. A strict CSP meta policy protects your keys from browser XSS leaks.
*   🎯 **Title Scorer with Turkish Suffix Stemmer:** Instantly scores video titles (0-100) based on character limits, power words, and structure. Features a custom **Turkish Root Stemmer** (`getTurkishRoot`) resolving complex agglutinations (e.g., `sır` matching `sırlı`, `sırlar`, `sırrı`) so you don't lose SEO points!
*   📊 **Competitor Views-Per-Day (VPD) Analyzer:** Ranks top competitor videos by daily view velocity (VPD) rather than lifetime views, exposing emerging high-performance trends.
*   🌾 **Natural Tag Harvester (Tag Harvester):** Avoids ungrammatical keyword spam by extracting organic, human-written title segments from top-performing competitors.
*   🔍 **CORS-Bypassed Topic Discovery:** Fetches real-time YouTube auto-complete search suggestions using a secure JSONP callback method without spending your Google API quota.
*   💖 **Support & Shuffling:** Rotate through 16 CTR title models, 4 description templates, and toggle an interactive Monospaced Bitcoin Address clipboard with a scanning QR drawer.

### 🚀 Local Installation & Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
3.  **Compile Production Bundle:**
    ```bash
    npm run build
    ```
4.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```

### 🛠️ Our Other Projects & Creations

Discover our other open-source and commercial products:
*   🌉 **[Caption Bridge](https://github.com/Aristotheles/CaptionBridge)** (Open Source) — Video subtitle management and translation bridge.
*   📝 **[PostIT Pro](https://github.com/Aristotheles/PostIT-Pro)** (Open Source) — Social media scheduler and post designer.
*   🗣️ **[YazılıOkuPro](https://yaziliokupro.com)** (Commercial) — Premium Turkish Text-to-Speech platform. [Website](https://yaziliokupro.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.yaziliokupro.app)
*   🇩🇪 **[GermanChunks](https://germanchunks.com)** (Open Source) — German syntax chunker and language assistant. [Website](https://germanchunks.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.germanchunks.app) | [GitHub](https://github.com/Aristotheles/GermanChunks)

### 💖 Sponsor & Support

If this tool improves your creative workflow, please consider fueling our open-source journey. Your sponsorships directly support my open-source sessions and my daughter's international engineering and architecture higher education:
*   🧡 **Become a Patron:** [Patreon (opensource2)](https://patreon.com/opensource2)
*   🪙 **Bitcoin (BTC) Address:** `bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa`

---

## 🇹🇷 TubeSeek Türkçe Dokümantasyon

**TubeSeek**, YouTube içerik üreticilerinin video fikirleri bulmasını, rakiplerini izlenme performanslarına göre analiz etmesini, doğal etiketleri hasat etmesini ve en yüksek tıklama oranını (CTR) yakalayacak şık başlıklar üretmesini sağlayan **ücretsiz, açık kaynaklı ve BYOK (kendi anahtarını getir)** yapısında geliştirilmiş modern bir web uygulamasıdır.

Tasarım olarak **Cyberpunk Dark Slate ve Glassmorphism** stiline sahip olan TubeSeek, tamamen tarayıcınızda (istemci tarafında) çalışır. Hiçbir sunucuya veri göndermez, gizliliğinizi korur ve tamamen bağımsızdır.

### ✨ Özellikler ve Modüller

*   🛡️ **API Anahtarı Kurulum Sihirbazı & Güvenlik (BYOK):** YouTube Data API anahtarınız doğrudan kendi tarayıcınızın `localStorage` alanında saklanır. Sıkı CSP (Content Security Policy) politikasıyla API anahtarınız tarayıcı seviyesinde güvence altındadır.
*   🎯 **Başlık Skorlayıcı (Title Scorer) & Türkçe Kök Bulucu:** Başlığınızı karakter limitleri, CTR artırıcı unsurlar ve SEO uyumuna göre skorlar. Saf JS Türkçe Kök Bulucu (`getTurkishRoot`) sayesinde aradığınız kelimeye gelen çekim/yapım eklerini (`sır` -> `sırlı`, `sırlar`, `sırrı`) otomatik algılar, SEO puanınızı kırmaz!
*   📊 **VPD Sıralaması (Views Per Day):** Rakip videoları günlük izlenme hızlarına göre dizerek en sıcak trendleri anında yakalamanızı sağlar.
*   🌾 **Doğal Etiket Hasatlayıcı (Premium Tag Harvester):** Yapay kelime kombinasyonları yerine, en başarılı rakip videoların başlıklarından **doğal, insan yapımı anlamlı segmentleri** cımbızla çeker.
*   🔍 **Sınırsız Konu Keşfi (Discovery):** Canlı otomatik tamamlama önerilerini tarayıcı sınırlarına takılmadan (CORS bypassed JSONP) ve API kotanızı harcamadan listeler.
*   💖 **Şablon Yenileme & Bitcoin:** 16 CTR başlık şablonunu, 4 farklı tondaki açıklamaları tek tıkla yenileyebilir; monospaced kopyalanabilir ve QR kodlu Bitcoin bağış kartını kullanabilirsiniz.

### 🛠️ Klasör Yapısı

```text
tubeseek/
├── index.html          # Giriş sayfası, CSP politikaları ve Google Font yüklemeleri
├── package.json        # Paket bağımlılıkları (lucide-react & gh-pages dahil)
├── vite.config.js      # Vite yapılandırması (base path dahil)
├── README.md           # Çift dilli (bilingual) proje dokümantasyonu
└── src/
    ├── main.jsx        # React giriş noktası
    ├── App.jsx         # Ana Dashboard, sekmeler, clipboard ve Bitcoin bağış arayüzü
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

### 🚀 Yerel Kurulum & Çalıştırma (Local Setup)

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

### 🛠️ Diğer Projelerimiz & Üretimlerimiz

Geliştirdiğimiz diğer açık kaynaklı ve ticari çözümlere aşağıdaki bağlantılardan göz atabilirsiniz:
*   🌉 **[Caption Bridge](https://github.com/Aristotheles/CaptionBridge)** (Açık Kaynak) — Video altyazı ve çeviri köprüsü.
*   📝 **[PostIT Pro](https://github.com/Aristotheles/PostIT-Pro)** (Açık Kaynak) — Sosyal medya gönderi planlayıcı.
*   🗣️ **[YazılıOkuPro](https://yaziliokupro.com)** (Ticari) — Doğal Türkçe seslendirme platformu. [Web Sitesi](https://yaziliokupro.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.yaziliokupro.app)
*   🇩🇪 **[GermanChunks](https://germanchunks.com)** (Açık Kaynak) — Almanca cümle segment analiz aracı. [Web Sitesi](https://germanchunks.com) | [Google Play Store](https://play.google.com/store/apps/details?id=com.germanchunks.app) | [GitHub Reposu](https://github.com/Aristotheles/GermanChunks)

### 💖 Destek & Bağış (Support)

Eğet bu aracı beğendiyseniz ve geliştiriciye destek olmak isterseniz Patreon üzerinden destekçi olabilir veya Bitcoin (BTC) ile bağışta bulunabilirsiniz. Desteğiniz açık kaynaklı projelerin devamlılığına katkı sağlamakta ve kızımın mühendislik & mimarlık alanındaki uluslararası yükseköğrenimini finanse etmeye yardımcı olmaktadır:
*   🧡 **Patreon Destekçisi Ol:** [Patreon (opensource2)](https://patreon.com/opensource2)
*   🪙 **Bitcoin (BTC) Cüzdan Adresi:** `bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa`
    *(Uygulama içerisindeki panodan tek tıkla kopyalayabilir veya doğrudan ekran üzerindeki QR kodu taratabilirsiniz!)*

---

## 📄 Lisans (License)

Bu proje **MIT Lisansı** ile lisanslanmıştır. Tamamen ücretsiz olup, kodlarını istediğiniz gibi değiştirebilir, dağıtabilir veya kendi projelerinizde kullanabilirsiniz.
