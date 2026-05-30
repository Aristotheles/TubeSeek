const STORAGE_KEY = 'tubeseed_api_key';

/**
 * Tarayıcı localStorage alanından API anahtarını çeker.
 * @returns {string|null} API anahtarı veya null
 */
export function getApiKey() {
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * API anahtarını localStorage alanına kaydeder.
 * @param {string} key - YouTube API Anahtarı
 */
export function saveApiKey(key) {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

/**
 * API anahtarını siler.
 */
export function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Girilen API anahtarını YouTube Data API v3 üzerinden küçük bir istek ile test eder.
 * @param {string} key - Test edilecek API anahtarı
 * @returns {Promise<{valid: boolean, error?: string}>} Doğrulama sonucu
 */
export async function validateApiKey(key) {
  if (!key || typeof key !== 'string' || key.trim() === '') {
    return { valid: false, error: 'Lütfen geçerli bir API anahtarı girin.' };
  }

  const cleanKey = key.trim();
  const testUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${cleanKey}`;

  try {
    const response = await fetch(testUrl);
    const data = await response.json();

    if (response.ok) {
      return { valid: true };
    } else {
      // YouTube API hata mesajlarını anlamlı hale getirelim
      const apiError = data.error?.errors?.[0];
      const reason = apiError?.reason || '';
      const message = data.error?.message || '';

      if (reason === 'keyInvalid' || message.includes('API key not valid')) {
        return { valid: false, error: 'Girdiğiniz API anahtarı geçersiz. Lütfen doğru kopyaladığınızdan emin olun.' };
      }
      if (reason === 'quotaExceeded' || message.includes('quota')) {
        return { valid: false, error: 'Bu API anahtarının günlük kotası (Quota Exceeded) dolmuş. Lütfen başka bir anahtar kullanın.' };
      }
      return { valid: false, error: `API Hatası: ${message || 'Bilinmeyen bir hata oluştu.'}` };
    }
  } catch (err) {
    return { valid: false, error: 'YouTube sunucularına bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.' };
  }
}
