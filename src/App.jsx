import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Users, 
  Search, 
  Key, 
  LogOut, 
  TrendingUp, 
  Compass, 
  Video,
  SearchCode,
  Sun,
  Moon,
  Languages,
  Heart,
  Copy,
  Check,
  QrCode
} from 'lucide-react';
import { getApiKey, clearApiKey } from './lib/storage';
import { translations, detectLanguage } from './lib/translations';
import KeySetup from './components/KeySetup';
import TitleScorer from './components/TitleScorer';
import Competitors from './components/Competitors';
import Discovery from './components/Discovery';

export default function App() {
  const [copiedBtc, setCopiedBtc] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const handleCopyBtc = () => {
    navigator.clipboard.writeText('bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa');
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2000);
  };

  // 1. Dil Seçeneği (Auto-detection & Persistence)
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('tubeseed_lang');
    if (savedLang) return savedLang;
    return detectLanguage(); // Türkçe değilse varsayılan İngilizce
  });

  const t = translations[lang] || translations.en;

  // 2. Tema Seçeneği (Dark / Light Theme Toggle & Persistence)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tubeseed_theme') || 'light';
  });

  const [apiKey, setApiKey] = useState(null);
  const [seedInput, setSeedInput] = useState('');
  const [seedKeyword, setSeedKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('scorer');
  
  // Konu keşfinden başlık skorlayıcıya kelime aktarımı için state
  const [presetTitle, setPresetTitle] = useState('');

  // Sayfa yüklendiğinde ve tema değiştiğinde body sınıfını güncelle
  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('tubeseed_theme', theme);
  }, [theme]);

  // Dil tercihini yerel hafızaya kaydet
  useEffect(() => {
    localStorage.setItem('tubeseed_lang', lang);
  }, [lang]);

  // Sayfa yüklendiğinde localStorage'dan anahtarı oku
  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleKeySet = (newKey) => {
    setApiKey(newKey);
  };

  const handleLogout = () => {
    if (window.confirm(t.logout_confirm)) {
      clearApiKey();
      setApiKey(null);
      setSeedKeyword('');
      setSeedInput('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (seedInput.trim()) {
      setSeedKeyword(seedInput.trim());
      // Arama yapıldığında kullanıcıyı rakipler sekmesine yönlendirelim
      setActiveTab('competitors');
    }
  };

  // Konu keşfinden başlığa aktarım tetikleyicisi
  const handleSelectKeyword = (keyword) => {
    setPresetTitle(keyword);
    // Başlık skorlama sekmesine geç
    setActiveTab('scorer');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  // API Anahtarı kurulu değilse kurulum ekranını göster
  if (!apiKey) {
    return (
      <div className="app-container" style={{ justifyContent: 'center' }}>
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
        
        {/* Dil ve Tema Seçici - Kurulum Ekranında da Üstte Dursun */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '10px' }}>
          <button onClick={toggleLanguage} className="btn-secondary" title={lang === 'tr' ? 'English' : 'Türkçe'}>
            <Languages size={15} />
            <span>{lang === 'tr' ? 'EN' : 'TR'}</span>
          </button>
          <button onClick={toggleTheme} className="btn-secondary" title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <KeySetup onKeySet={handleKeySet} lang={lang} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Arka plan glow efektleri */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Şık Üst Panel (Header) */}
      <header className="app-header">
        <div className="logo-section">
          <Video className="logo-icon" size={28} style={{ color: '#ef4444' }} />
          <h1 className="logo-text" style={{ fontSize: '24px', margin: 0 }}>TubeSeek</h1>
        </div>

        <div className="header-status">
          {/* Dil Değiştirici Buton */}
          <button onClick={toggleLanguage} className="btn-secondary" title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}>
            <Languages size={14} />
            <span>{lang === 'tr' ? 'EN' : 'TR'}</span>
          </button>

          {/* Tema Değiştirici Buton */}
          <button onClick={toggleTheme} className="btn-secondary" title={theme === 'dark' ? 'Açık Tema' : 'Karanlık Tema'}>
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <div className="status-indicator">
            <div className="status-dot active"></div>
            <span style={{ color: 'var(--text-secondary)' }} className="mobile-hide">{t.api_connected}</span>
          </div>

          <button onClick={handleLogout} className="btn-danger-outline" title={t.logout}>
            <LogOut size={14} />
            <span className="mobile-hide">{t.logout}</span>
          </button>
        </div>
      </header>

      {/* Dashboard Düzeni */}
      <main className="dashboard-grid">
        {/* Sol Sütun: Arama & Ayarlar */}
        <section className="sidebar">
          {/* Tohum Kelime Kartı */}
          <div className="glass-card">
            <h3 className="panel-title">
              <Compass size={16} className="logo-icon" /> {t.search_filter}
            </h3>
            
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="seedInput">{t.seed_label}</label>
                <div className="input-wrapper">
                  <Search className="input-icon" size={16} />
                  <input
                    id="seedInput"
                    type="text"
                    className="input-control"
                    placeholder={t.seed_placeholder}
                    value={seedInput}
                    onChange={(e) => setSeedInput(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={!seedInput.trim()}>
                <SearchCode size={16} />
                {t.search_btn}
              </button>
            </form>

            {seedKeyword && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  {t.active_seed}
                </span>
                <span className="logo-badge" style={{ display: 'inline-block', textTransform: 'none', background: 'var(--color-primary-glow)', borderColor: 'var(--border-glow)', color: 'var(--text-primary)', padding: '4px 10px', fontSize: '13px' }}>
                  {seedKeyword}
                </span>
              </div>
            )}
          </div>

          {/* Yardım Kartı */}
          <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={12} className="logo-icon" /> {t.how_it_works}
            </h4>
            <ol style={{ fontSize: '12px', color: 'var(--text-muted)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
              <li>{t.step4}</li>
            </ol>
          </div>

          {/* Destek & Bağış Kartı */}
          <div className="glass-card" style={{ border: '1px solid rgba(245, 158, 11, 0.25)', background: 'rgba(245, 158, 11, 0.02)' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--color-warning)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Heart size={14} fill="var(--color-warning)" style={{ color: 'var(--color-warning)' }} /> 
              {lang === 'tr' ? "TubeSeek'i Destekle" : 'Support TubeSeek'}
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '10px' }}>
              {lang === 'tr' 
                ? 'Bu araç tamamen ücretsiz ve sunucusuzdur. Geliştiriciye destek olmak isterseniz Bitcoin (BTC) ile bağış yapabilirsiniz:' 
                : 'This tool is completely free and serverless. If you wish to support the developer, you can donate Bitcoin (BTC):'}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '6px 10px', width: '100%' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }} title="bc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa">
                bc1q7kpfdc9...2ht8xxa
              </span>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <button 
                  onClick={() => setShowQr(prev => !prev)} 
                  className="discovery-action" 
                  style={{ padding: '4px', color: showQr ? 'var(--color-warning)' : 'var(--text-muted)' }}
                  title={lang === 'tr' ? 'QR Kod Göster' : 'Show QR Code'}
                >
                  <QrCode size={14} />
                </button>
                <button 
                  onClick={handleCopyBtc} 
                  className="discovery-action" 
                  style={{ padding: '4px' }}
                  title={lang === 'tr' ? 'Adresi Kopyala' : 'Copy Address'}
                >
                  {copiedBtc ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {showQr && (
              <div style={{ 
                marginTop: '12px', 
                padding: '12px', 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid var(--border-light)', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                animation: 'fadeIn 0.2s ease'
              }}>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=bitcoin%3Abc1q7kpfdc9stpnexvwgpzxl8nzaua8wfyp2ht8xxa&color=f59e0b&bgcolor=ffffff" 
                  alt="Bitcoin QR Code" 
                  style={{ 
                    width: '130px', 
                    height: '130px', 
                    borderRadius: '6px',
                    border: '4px solid #ffffff'
                  }} 
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '500' }}>
                  {lang === 'tr' ? 'Telefonunuzla tarayarak bağış yapın' : 'Scan with your wallet to donate'}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Sağ Sütun: Sekmeler ve İçerik */}
        <section className="main-content">
          {/* Sekmeler */}
          <nav className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'scorer' ? 'active' : ''}`}
              onClick={() => setActiveTab('scorer')}
            >
              <Sparkles size={16} />
              <span>{t.tab_scorer}</span>
            </button>
            
            <button 
              className={`tab-btn ${activeTab === 'competitors' ? 'active' : ''}`}
              onClick={() => setActiveTab('competitors')}
              disabled={!seedKeyword}
              title={!seedKeyword ? t.tab_disabled_tip : ''}
              style={!seedKeyword ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <Users size={16} />
              <span>{t.tab_competitors}</span>
            </button>

            <button 
              className={`tab-btn ${activeTab === 'discovery' ? 'active' : ''}`}
              onClick={() => setActiveTab('discovery')}
              disabled={!seedKeyword}
              title={!seedKeyword ? t.tab_disabled_tip : ''}
              style={!seedKeyword ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <Search size={16} />
              <span>{t.tab_discovery}</span>
            </button>
          </nav>

          {/* Aktif Arayüz Modülleri */}
          <div className="tab-content-wrapper">
            {activeTab === 'scorer' && (
              <TitleScorerWrapper 
                seedKeyword={seedKeyword} 
                presetTitle={presetTitle} 
                clearPreset={() => setPresetTitle('')} 
                lang={lang}
              />
            )}
            
            {activeTab === 'competitors' && (
              <Competitors apiKey={apiKey} seedKeyword={seedKeyword} lang={lang} />
            )}

            {activeTab === 'discovery' && (
              <Discovery 
                seedKeyword={seedKeyword} 
                onSelectKeyword={handleSelectKeyword} 
                lang={lang}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// TitleScorer wrapper component to pass presetTitle and key reset mechanism
function TitleScorerWrapper({ seedKeyword, presetTitle, clearPreset, lang }) {
  const [initialTitle, setInitialTitle] = useState('');

  useEffect(() => {
    if (presetTitle) {
      setInitialTitle(presetTitle);
      clearPreset();
    }
  }, [presetTitle]);

  return (
    <TitleScorer 
      seedKeyword={seedKeyword} 
      initialTitle={initialTitle}
      lang={lang}
      key={initialTitle + '_' + lang /* Dil veya başlık değiştiğinde skorlayıcıyı baştan kur */} 
    />
  );
}
