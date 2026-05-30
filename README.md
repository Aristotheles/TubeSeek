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

## 🛠️ Temel Özellikler & Premium Modüller

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

## 💻 Yerel Kurulum & Çalıştırma (Local Setup)

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları uygulayabilirsiniz:

1.  **Gerekli Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirici Sunucusunu Başlatın (Hot Reload):**
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:5173` adresine giderek TubeSeek'i kullanmaya başlayabilirsiniz!

3.  **Üretim Sürümü Derlemesi (Build):**
    ```bash
    npm run build
    ```

4.  **GitHub Pages Dağıtımı (Deploy):**
    ```bash
    npm run deploy
    ```

---

## 👨‍💻 Geliştirici Hakkında: Vibe Hoca! 👋
### 🚀 Açık Kaynak Geliştirici, Dijital Üretici & Eğitmen

Merhaba! Ben dünya çapındaki geliştiriciler ve içerik üreticileri için gizlilik odaklı, erişilebilir ve ücretsiz araçlar üreten bağımsız bir açık kaynak geliştiricisiyim. Yazılımdaki analitik yaklaşımımı, iş akışı otomasyonlarını ve içerik üreticiliği deneyimimi bir araya getirerek hayatı kolaylaştıran çözümler üretiyorum.

### 📺 Aktif YouTube Kanallarım
Dijital sanat, maneviyat ve müzik dünyasındaki üretimlerime aşağıdaki kanallarımdan ulaşabilirsiniz:
*   🌌 **[Breath of Rumi](https://www.youtube.com/@BreathofRumi)** — Gönül dünyasına hitap eden tasavvufi derinlik, ney nağmeleri ve ruhu dinlendiren mistik paylaşımlar.
*   🎵 **[Kalpten Nağme](https://www.youtube.com/@KalptenNa%C4%9Fme)** — Klasik Türk Müziği'nin eşsiz makamları, kalbe dokunan geleneksel enstrümantal icralar ve tınılar.
*(Eski projemiz olan Ottoman Makam Beats'in fişini çektik; artık tüm gücümüzle bu iki harika kanalda yayındayız!)*

### 🛠️ Teknolojik Alet Çantası (Tech Stack)
<p align="left">
  <img src="https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white" alt="Flutter" />
  <img src="https://img.shields.io/badge/Dart-%230175C2.svg?style=for-the-badge&logo=Dart&logoColor=white" alt="Dart" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini API" />
</p>

---

## 💖 Açık Kaynak Misyonuma Destek Olun

Bu proje tamamen reklamsız, açık kaynaklı ve herkesin kullanımına ücretsiz olarak sunulmuştur. Eğer geliştirdiğim araçlar size zaman kazandırıyor, işlerinizi kolaylaştırıyor veya içerik üretim süreçlerinizi zenginleştiriyorsa, bu geliştirme yolculuğuna destek olabilirsiniz!

Yapacağınız her destek doğrudan açık kaynaklı projelerin devamlılığına katkı sağlamakta ve **kızımın mühendislik & mimarlık alanındaki uluslararası yükseköğrenimini** finanse etmeye yardımcı olmaktadır. Nitelikli kodun herkes için özgür ve hayatta kalmasına katkıda bulunduğunuz için yürekten teşekkür ederim!

*   🪙 **Bitcoin (BTC) Cüzdan Adresi (BlueWallet):**
    `bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa`
    *(Uygulama içerisinden tek tıkla kopyalayabilir veya doğrudan ekran üzerindeki dinamik QR kodu taratabilirsiniz!)*

---

<p align="center">
  <i>"Harika yazılımlar pahalı abonelik duvarlarının arkasına gizlenmemeli. Gelin web'i birlikte daha açık hale getirelim."</i> <br>
  📬 İş birlikleri ve geri bildirimleriniz için bir GitHub Issue açmaktan çekinmeyin!
</p>
