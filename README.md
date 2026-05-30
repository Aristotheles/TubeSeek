# 🚀 TubeSeed — YouTube SEO & Konu Keşif Aracı (MVP)

**TubeSeed**, YouTube içerik üreticilerinin video fikirleri bulmasını, rakiplerini izlenme performanslarına göre analiz etmesini ve en yüksek tıklama oranını (CTR) yakalayacak şık başlıklar üretmesini sağlayan **ücretsiz, açık kaynaklı ve BYOK (kendi anahtarını getir)** yapısında geliştirilmiş modern bir web uygulamasıdır.

Tasarım olarak **Cyberpunk Dark Slate ve Glassmorphism** stiline sahip olan TubeSeed, tamamen tarayıcınızda (istemci tarafında) çalışır. Hiçbir sunucuya veri göndermez, güvenli ve bağımsızdır.

---

## ✨ Özellikler ve Modüller

### 🛡️ 1. API Anahtarı Kurulum Sihirbazı (BYOK)
*   **İstemci Taraflı Depolama:** YouTube Data API anahtarınız doğrudan kendi tarayıcınızın `localStorage` alanında saklanır ve asla hiçbir harici sunucuya gönderilmez.
*   **Entegrasyon Testi:** Anahtar girildiğinde arka planda anlık bir test araması yapılarak API bağlantısı otomatik doğrulanır.
*   **Güvenlik ve Kısıtlama Rehberi:** Google Cloud Console üzerinden API anahtarınızı nasıl API kısıtlaması (sadece YouTube Data API v3 izni) ile sınırlandıracağınızı anlatan adım adım bir rehber içerir. Bu sayede anahtarınız tamamen güvence altına alınır.

### 🎯 2. Modül A — Başlık Skorlayıcı (Title Scorer)
*   **Anlık Puanlama:** Yazılan başlığı 0-100 arasında anlık olarak skorlar.
*   **Gelişmiş Kurallar:**
    *   *Mobil Kesilme Sınırı:* Başlığın mobilde üç nokta ile kesilmesini önlemek için 60 karakter sınırı kontrolü.
    *   *Görsel CTR Unsurları:* Tıklama oranını artıran sayı (örn: "5 adımda") ve parantez/köşeli parantez (örn: "[Rehber]") kullanımı ödüllendirilir.
    *   *Merak ve Güç Kelimeleri:* Türkçe ve İngilizce zengin bir güç kelimeleri sözlüğü ile merak uyandırma gücü test edilir.
    *   *SEO Uyumu:* Tohum kelimenin başlığın en başında yer alıp almadığı kontrol edilir.
    *   *Clickbait & Biçimlendirme:* Bağıran (ALL CAPS) başlıklar ve aşırı abartı clickbait kelimeler ("BU VİDEOYU MUTLAKA İZLEYİN") tespit edilerek hafifçe cezalandırılır.

### 📊 3. Modül B — Rakip Karşılaştırma (Competitors)
*   **Günlük İzlenme Sıralaması (VPD):** Rakiplerin popülerlik sıralamasını toplam izlenmeye göre değil, **Günlük İzlenme Oranına (İzlenme / Yayında Kaldığı Gün)** göre dizer. Böylece yeni yüklenmiş ve hızla yükselen "fırsat" videolarını anında bulursunuz!
*   **Frekans Analizi (Word Cloud):** En popüler 15 rakip videonun başlıklarında en sık geçen kelimeleri (bağlaçlar temizlenmiş şekilde) süzerek bir etiket bulutu halinde sunar.
*   **Outlier Tespiti:** Günlük izlenme hızı aşırı yüksek olan videoları şık zümrüt yeşili neon efektlerle görsel olarak öne çıkarır.

### 🔍 4. Modül C — Konu Keşfi (Discovery)
*   **CORS Bypassed:** Google otomatik arama önerileri ucu CORS vermediği için özel yazılan **JSONP (dinamik script enjeksiyonu)** yöntemiyle sunucusuz arama önerileri listelenir.
*   **Gerçek Canlı Aramalar:** Gerçek YouTube kullanıcılarının arama kutusuna yazdığı tamamlayıcı aramaları getirir.
*   **Tek Tıkla Aktarım:** Beğendiğiniz bir konuyu tek tıkla Başlık Skorlayıcı modülüne aktarıp hemen optimize etmeye başlayabilirsiniz.
*   **Kota Dostu:** Bu işlem YouTube Data API kotanızdan yemez, tamamen sınırsızdır.

---

## 🛠️ Klasör Yapısı

```text
tubeseed/
├── index.html          # Giriş sayfası ve Google Font yüklemeleri
├── package.json        # Paket bağımlılıkları (lucide-react dahil)
├── vite.config.js      # Vite yapılandırması
├── README.md           # Proje dokümantasyonu
└── src/
    ├── main.jsx        # React giriş noktası
    ├── App.jsx         # Ana Dashboard yapısı, sekmeler ve durum yönetimi
    ├── styles.css      # Custom neon glassmorphism tasarım sistemi (Vanilla CSS)
    ├── index.css       # styles.css dosyasını sarmalayan dosya
    ├── lib/
    │   ├── youtube.js  # YouTube Arama, Detaylar ve JSONP Autocomplete API'leri
    │   ├── scorer.js   # Kural tabanlı 100 puanlık başlık skorlama motoru
    │   └── storage.js  # API anahtarı okuma, yazma ve doğrulama katmanı
    └── components/
        ├── KeySetup.jsx    # API anahtarı kurulum ekranı ve sihirbazı
        ├── TitleScorer.jsx # Başlık skorlama sekmesi (dairesel SVG grafikli)
        ├── Competitors.jsx # Rakiplerin VPD sıralı listesi ve kelime analiz paneli
        └── Discovery.jsx   # Canlı YouTube otomatik tamamlama önerileri
```

---

## 🚀 Yerel Kurulum (Local Setup)

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları uygulayabilirsiniz:

1.  **Gerekli Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirici Sunucusunu Başlatın (Hot Reload):**
    ```bash
    npm run dev
    ```
    Tarayıcınızda açılan adrese (genellikle `http://localhost:5173`) giderek TubeSeed'i kullanmaya başlayabilirsiniz!

3.  **Üretim Sürümü (Production Build):**
    ```bash
    npm run build
    ```

---

## 💖 Destek & Bağış (Support)

TubeSeek tamamen ücretsiz, reklamsız ve açık kaynaklı bir projedir. Sunucu maliyeti olmadan "kendi anahtarını getir" (BYOK) yapısıyla çalışmaktadır. Eğer bu aracı beğendiyseniz ve geliştiriciye destek olmak isterseniz Bitcoin (BTC) ile bağışta bulunabilirsiniz:

*   🪙 **Bitcoin (BTC) Cüzdan Adresi:** `bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa`

---

## 📄 Lisans (License)

Bu proje **MIT Lisansı** ile lisanslanmıştır. Tamamen ücretsiz olup, kodlarını istediğiniz gibi değiştirebilir, dağıtabilir veya kendi projelerinizde kullanabilirsiniz.

