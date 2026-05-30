import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info, Send, Copy, Check, RefreshCw } from 'lucide-react';
import { scoreTitle } from '../lib/scorer';
import { translations } from '../lib/translations';

const EXAMPLE_TITLES = {
  tr: [
    {
      title: 'React Öğreniyorum',
      desc: 'Çok kısa, zayıf kelimeler, SEO ve dikkat çekicilik unsurları eksik.'
    },
    {
      title: '5 Adımda Sıfırdan Uzmanlığa React Rehberi! (2026)',
      desc: 'Mükemmel! Sayı var, parantez var, güç kelimeleri ve ideal uzunluk.'
    },
    {
      title: 'BU VİDEOYU SAKIN İZLEMEYİN!!! KESİN ŞOK OLACAKSINIZ',
      desc: 'ALL CAPS (bağıran) clickbait biçimlendirme ve aşırı abartı cezası.'
    }
  ],
  en: [
    {
      title: 'Learning React',
      desc: 'Too short, weak words, lacking SEO and visual visual hooks.'
    },
    {
      title: '5 Steps to Master React from Scratch! (2026)',
      desc: 'Excellent! Numbers, parentheses, power words, and ideal length.'
    },
    {
      title: 'DON\'T WATCH THIS VIDEO!!! YOU WILL BE TOTALLY SHOCKED',
      desc: 'ALL CAPS (shouting) formatting and clickbait warnings.'
    }
  ]
};

export default function TitleScorer({ seedKeyword, initialTitle = '', lang = 'tr' }) {
  const t = translations[lang] || translations.en;
  
  const [titleInput, setTitleInput] = useState(initialTitle);
  const [scoreResult, setScoreResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState([]);

  const selectRandomSuggestions = (allSuggs) => {
    if (!allSuggs || allSuggs.length === 0) return [];
    const shuffled = [...allSuggs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  useEffect(() => {
    const allSuggs = scoreTitle("", seedKeyword, lang).suggestions;
    setDisplayedSuggestions(selectRandomSuggestions(allSuggs));
  }, [seedKeyword, lang]);

  const handleRefreshSuggestions = () => {
    const allSuggs = scoreTitle("", seedKeyword, lang).suggestions;
    setDisplayedSuggestions(selectRandomSuggestions(allSuggs));
  };

  useEffect(() => {
    if (titleInput) {
      const result = scoreTitle(titleInput, seedKeyword, lang);
      setScoreResult(result);
    } else {
      setScoreResult(null);
    }
  }, [titleInput, seedKeyword, lang]);

  const handleCopy = () => {
    if (!titleInput) return;
    navigator.clipboard.writeText(titleInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Skor dairesi için SVG hesaplamaları
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const score = scoreResult ? scoreResult.score : 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Skora göre renk belirleme
  const getScoreColorClass = (val) => {
    if (val >= 80) return { stroke: '#10b981', text: 'var(--color-success)', label: lang === 'tr' ? 'Çok Güçlü' : 'Very Strong' };
    if (val >= 50) return { stroke: '#f59e0b', text: 'var(--color-warning)', label: lang === 'tr' ? 'Geliştirilebilir' : 'Need Work' };
    return { stroke: '#ef4444', text: 'var(--color-danger)', label: lang === 'tr' ? 'Zayıf' : 'Weak' };
  };

  const scoreDetails = getScoreColorClass(score);
  const activeExamples = EXAMPLE_TITLES[lang] || EXAMPLE_TITLES.en;

  return (
    <div className="discovery-layout">
      <div className="glass-card">
        <h2 className="panel-title" style={{ fontSize: '20px' }}>
          <Sparkles size={20} className="logo-icon" /> {t.scorer_title}
        </h2>
        <p className="step-desc" style={{ marginBottom: '20px' }}>
          {t.scorer_desc}
        </p>

        {/* Başlık Girdi Kutusu */}
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <div className="form-label">
            <span>{t.scorer_input_label}</span>
            <span style={{ 
              fontWeight: '600', 
              color: titleInput.length > 55 ? 'var(--color-warning)' : 'var(--text-secondary)' 
            }}>
              {titleInput.length} / 60 Karakter ({t.scorer_ideal})
            </span>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-control"
              style={{ paddingLeft: '16px', paddingRight: '50px', fontSize: '16px' }}
              placeholder={t.scorer_placeholder}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            {titleInput && (
              <button 
                onClick={handleCopy} 
                className="discovery-action" 
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                title="Başlığı Kopyala"
              >
                {copied ? <Check size={18} style={{ color: 'var(--color-success)' }} /> : <Copy size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Hızlı Örnekler */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            {t.scorer_examples}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setTitleInput(ex.title)}
                className="btn-secondary"
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.01)'
                }}
              >
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{ex.title}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ex.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {scoreResult ? (
        <div className="scorer-layout">
          {/* Sol Kolon - Dairesel Grafik ve İlerlemeler */}
          <div className="score-circle-wrapper glass-card">
            <div className="radial-score">
              <svg width="160" height="160" className="svg-circle">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="circle-bg"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="circle-progress"
                  stroke={scoreDetails.stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="score-display">
                <span className="score-num" style={{ color: scoreDetails.text }}>{score}</span>
                <span className="score-lbl">{t.scorer_score_label}</span>
              </div>
            </div>
            
            <div className="score-text" style={{ color: scoreDetails.text }}>
              {scoreDetails.label}
            </div>

            {/* Kategori Bazlı Dağılım */}
            <div className="rating-details">
              <div className="rating-row">
                <div className="rating-row-header">
                  <span>{t.scorer_g_len}</span>
                  <span>{scoreResult.details.lengthScore} / 30 Puan</span>
                </div>
                <div className="rating-bar-bg">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: `${(scoreResult.details.lengthScore / 30) * 100}%`,
                      backgroundColor: scoreResult.details.lengthScore >= 20 ? 'var(--color-success)' : 'var(--color-danger)'
                    }} 
                  />
                </div>
              </div>

              <div className="rating-row">
                <div className="rating-row-header">
                  <span>{t.scorer_g_ctr}</span>
                  <span>{scoreResult.details.saliencyScore} / 20 Puan</span>
                </div>
                <div className="rating-bar-bg">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: `${(scoreResult.details.saliencyScore / 20) * 100}%`,
                      backgroundColor: scoreResult.details.saliencyScore >= 10 ? 'var(--color-success)' : 'var(--color-warning)'
                    }} 
                  />
                </div>
              </div>

              <div className="rating-row">
                <div className="rating-row-header">
                  <span>{t.scorer_g_power}</span>
                  <span>{scoreResult.details.powerWordsScore} / 25 Puan</span>
                </div>
                <div className="rating-bar-bg">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: `${(scoreResult.details.powerWordsScore / 25) * 100}%`,
                      backgroundColor: scoreResult.details.powerWordsScore >= 15 ? 'var(--color-success)' : 'var(--color-danger)'
                    }} 
                  />
                </div>
              </div>

              <div className="rating-row">
                <div className="rating-row-header">
                  <span>{t.scorer_g_seo}</span>
                  <span>{scoreResult.details.keywordScore} / 15 Puan</span>
                </div>
                <div className="rating-bar-bg">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: `${(scoreResult.details.keywordScore / 15) * 100}%`,
                      backgroundColor: scoreResult.details.keywordScore >= 15 ? 'var(--color-success)' : 'var(--color-warning)'
                    }} 
                  />
                </div>
              </div>

              <div className="rating-row">
                <div className="rating-row-header">
                  <span>{t.scorer_g_format}</span>
                  <span>{scoreResult.details.formatScore} / 10 Puan</span>
                </div>
                <div className="rating-bar-bg">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: `${(scoreResult.details.formatScore / 10) * 100}%`,
                      backgroundColor: scoreResult.details.formatScore >= 7 ? 'var(--color-success)' : 'var(--color-danger)'
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Detaylı İpuçları, Hatalar ve Somut Öneriler */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Somut Başlık Önerileri Kartı */}
            <div 
              className="glass-card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                border: '1px solid rgba(6, 182, 212, 0.25)', 
                background: 'rgba(6, 182, 212, 0.03)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="panel-title" style={{ fontSize: '15px', margin: 0, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> {t.scorer_sug_title}
                </h3>
                <button 
                  onClick={handleRefreshSuggestions} 
                  className="btn-secondary" 
                  style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title={lang === 'tr' ? 'Önerileri Yenile' : 'Refresh Suggestions'}
                >
                  <RefreshCw size={12} />
                  {lang === 'tr' ? 'Yenile' : 'Refresh'}
                </button>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                {t.scorer_sug_desc}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                {displayedSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTitleInput(sug)}
                    className="btn-secondary"
                    style={{ 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '10px 14px', 
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                    title="Bu başlığı anında uygula"
                  >
                    <span 
                      style={{ 
                        fontSize: '13.5px', 
                        fontWeight: '500', 
                        color: 'var(--text-primary)', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        flexGrow: 1
                      }}
                    >
                      {sug}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        color: 'var(--color-accent)', 
                        fontWeight: '700', 
                        flexShrink: 0, 
                        background: 'rgba(6, 182, 212, 0.1)', 
                        padding: '3px 8px', 
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {t.scorer_btn_apply}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Geliştirme Önerileri Kartı */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="panel-title" style={{ fontSize: '16px', margin: 0 }}>
                {t.scorer_feedback_title} ({scoreResult.feedback.length})
              </h3>
              
              <div className="feedback-list">
                {scoreResult.feedback.map((item, idx) => (
                  <div key={idx} className={`feedback-card ${item.type}`}>
                    {item.type === 'success' && <CheckCircle2 size={18} className="feedback-icon" style={{ marginTop: '2px' }} />}
                    {item.type === 'warning' && <AlertCircle size={18} className="feedback-icon" style={{ marginTop: '2px' }} />}
                    {item.type === 'info' && <Info size={18} className="feedback-icon" style={{ marginTop: '2px' }} />}
                    <div className="feedback-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state glass-card">
          <Sparkles className="empty-state-icon" size={36} />
          <h3 className="empty-state-title">{t.scorer_empty_title}</h3>
          <p className="empty-state-desc">
            {t.scorer_empty_desc}
          </p>
        </div>
      )}
    </div>
  );
}
