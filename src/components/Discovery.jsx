import React, { useState, useEffect } from 'react';
import { Search, Copy, Check, Sparkles, Send, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchAutocomplete } from '../lib/youtube';
import { translations } from '../lib/translations';

export default function Discovery({ seedKeyword, onSelectKeyword, lang = 'tr' }) {
  const t = translations[lang] || translations.en;
  
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [error, setError] = useState('');

  const loadAutocomplete = async () => {
    if (!seedKeyword || seedKeyword.trim() === '') {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await fetchAutocomplete(seedKeyword);
      setSuggestions(data);
    } catch (err) {
      setError(lang === 'tr' ? 'Öneriler yüklenirken CORS veya sunucu hatası oluştu.' : 'CORS or server error occurred while fetching suggestions.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seedKeyword) {
      loadAutocomplete();
    } else {
      setSuggestions([]);
    }
  }, [seedKeyword]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="discovery-layout">
      {/* Üst Kart — Tanım */}
      <div className="glass-card">
        <div className="competitors-header" style={{ margin: 0 }}>
          <div>
            <h2 className="panel-title" style={{ fontSize: '20px', margin: 0 }}>
              <Search size={20} className="logo-icon" /> {t.disc_title}
            </h2>
            <p className="step-desc" style={{ marginTop: '4px' }}>
              {t.disc_desc}
            </p>
          </div>
          {seedKeyword && (
            <button 
              className="btn-secondary" 
              onClick={loadAutocomplete} 
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spinner' : ''} />
              {lang === 'tr' ? 'Yenile' : 'Refresh'}
            </button>
          )}
        </div>

        <div className="quota-badge" style={{ display: 'inline-flex', marginTop: '14px' }}>
          <Sparkles size={12} />
          <span>{t.disc_quota_free}</span>
        </div>
      </div>

      {loading && (
        <div className="loading-wrapper glass-card">
          <div className="spinner" />
          <span className="loading-text">{t.disc_loading}</span>
        </div>
      )}

      {error && (
        <div className="setup-error" style={{ margin: '0 0 20px 0' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && suggestions.length === 0 && (
        <div className="empty-state glass-card">
          <Search className="empty-state-icon" size={36} />
          <h3 className="empty-state-title">{t.disc_empty_title}</h3>
          <p className="empty-state-desc">
            {t.disc_empty_desc}
          </p>
        </div>
      )}

      {!loading && !error && suggestions.length > 0 && (
        <div className="discovery-layout">
          {/* Bilgilendirme Kutusu */}
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.03)', 
            border: '1px solid rgba(99, 102, 241, 0.12)', 
            borderRadius: '12px', 
            padding: '16px',
            fontSize: '13.5px',
            color: 'var(--text-secondary)'
          }}>
            {t.disc_banner}
          </div>

          {/* Kartlar Izgarası */}
          <div className="discovery-grid">
            {suggestions.map((item, index) => (
              <div key={index} className="discovery-card">
                <span className="discovery-text">{item}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Kopyala */}
                  <button 
                    onClick={() => handleCopy(item, index)} 
                    className="discovery-action"
                    title={t.disc_action_copy}
                    style={{ padding: '4px' }}
                  >
                    {copiedIndex === index ? (
                      <Check size={16} style={{ color: 'var(--color-success)' }} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>

                  {/* Başlık Skorlayıcıya Gönder */}
                  <button 
                    onClick={() => onSelectKeyword(item)} 
                    className="discovery-action"
                    title={t.disc_action_send}
                    style={{ padding: '4px' }}
                  >
                    <Send size={16} style={{ color: 'var(--color-accent)' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
