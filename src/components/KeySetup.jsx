import React, { useState } from 'react';
import { Key, HelpCircle, CheckCircle, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { validateApiKey, saveApiKey } from '../lib/storage';
import { translations } from '../lib/translations';

export default function KeySetup({ onKeySet, lang = 'tr' }) {
  const t = translations[lang] || translations.en;
  
  const [keyInput, setKeyInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const cleanKey = keyInput.trim();
    if (!cleanKey) {
      setError(t.setup_empty_error);
      return;
    }

    setIsValidating(true);
    
    try {
      const result = await validateApiKey(cleanKey);
      if (result.valid) {
        saveApiKey(cleanKey);
        onKeySet(cleanKey);
      } else {
        // Hata durumunu dile göre özelleştirelim
        if (lang === 'en') {
          if (result.error.includes('geçersiz')) {
            setError('The API key you entered is invalid. Please make sure you copied it correctly.');
          } else if (result.error.includes('kota')) {
            setError('Daily quota exceeded for this API key. Please try another key.');
          } else {
            setError(`API Error: ${result.error.replace('API Hatası: ', '')}`);
          }
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(t.setup_network_error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="setup-container glass-card">
      <div className="setup-logo">
        <Key size={48} className="logo-icon" />
      </div>
      
      <h2 className="setup-header-text">{t.setup_title}</h2>
      <p className="setup-subtitle">
        {t.setup_desc}
      </p>

      {error && (
        <div className="setup-error">
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginBottom: '32px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="apiKeyInput">
            <span>{t.setup_label}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.setup_sublabel}</span>
          </label>
          <div className="input-wrapper">
            <Key className="input-icon" size={18} />
            <input
              id="apiKeyInput"
              type="password"
              className="input-control"
              placeholder={t.setup_placeholder}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              disabled={isValidating}
            />
          </div>
        </div>
        
        <button type="submit" className="btn-primary" disabled={isValidating}>
          {isValidating ? (
            <>
              <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
              {t.setup_btn_validating}
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              {t.setup_btn_validate}
            </>
          )}
        </button>
      </form>

      <div className="setup-wizard-steps">
        <h3 className="panel-title" style={{ fontSize: '15px', marginBottom: '16px' }}>
          <HelpCircle size={16} /> {t.setup_wizard_title}
        </h3>

        <div className="wizard-step">
          <div className="step-num">1</div>
          <div className="step-content">
            <span className="step-title">{t.setup_step1_title}</span>
            <span className="step-desc">
              {lang === 'tr' ? (
                <>
                  Kişisel Google hesabınızla{' '}
                  <a 
                    href="https://console.cloud.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="step-link"
                  >
                    Google Cloud Console'a <ExternalLink size={11} style={{ display: 'inline' }} />
                  </a>{' '}
                  girin ve üst panelden ücretsiz bir proje oluşturun.
                </>
              ) : (
                <>
                  Sign in to{' '}
                  <a 
                    href="https://console.cloud.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="step-link"
                  >
                    Google Cloud Console <ExternalLink size={11} style={{ display: 'inline' }} />
                  </a>{' '}
                  with your Google account and create a free project from the top bar.
                </>
              )}
            </span>
          </div>
        </div>

        <div className="wizard-step">
          <div className="step-num">2</div>
          <div className="step-content">
            <span className="step-title">{t.setup_step2_title}</span>
            <span className="step-desc">
              {t.setup_step2_desc}
            </span>
          </div>
        </div>

        <div className="wizard-step">
          <div className="step-num">3</div>
          <div className="step-content">
            <span className="step-title">{t.setup_step3_title}</span>
            <span className="step-desc">
              {t.setup_step3_desc}
            </span>
          </div>
        </div>

        <div className="wizard-step">
          <div className="step-num">4</div>
          <div className="step-content">
            <span className="step-title">{t.setup_step4_title}</span>
            <span className="step-desc">
              {t.setup_step4_desc}
            </span>
          </div>
        </div>

        <div className="wizard-step" style={{ borderLeft: '2px dashed var(--color-warning)' }}>
          <div className="step-num" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid var(--color-warning)' }}>5</div>
          <div className="step-content">
            <span className="step-title" style={{ color: 'var(--color-warning)' }}>
              {lang === 'tr' ? '🔒 API Anahtarı Kısıtlaması (Şiddetle Önerilir)' : '🔒 API Key Restriction (Highly Recommended)'}
            </span>
            <span className="step-desc">
              {lang === 'tr' ? (
                <>
                  Anahtarınızın güvenliği için Google Cloud Console'da oluşturduğunuz anahtarı düzenleyin ve <strong>API Kısıtlamaları</strong> bölümünden yalnızca <strong>"YouTube Data API v3"</strong> servisine izin verin. Bu sayede anahtarınız çalınsa bile başka Google servislerinde kesinlikle kullanılamaz.
                </>
              ) : (
                <>
                  For maximum security, edit your API key in Google Cloud Console and set <strong>API Restrictions</strong> to only allow <strong>"YouTube Data API v3"</strong>. This ensures that even if your key is leaked, it cannot be used for any other Google services.
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      
      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        {t.setup_footer}
      </p>
    </div>
  );
}
