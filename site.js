/* مشترك بين كل الصفحات */
(function () {
  const S = window.SITE || {};

  // الإعلانات: بتتحمّل في الصفحة الرئيسية بس (body[data-ads="true"]) ولما تكون متفعّلة في الإعدادات
  function loadAds() {
    if (!document.body.dataset.ads) return;
    if (!S.ADS_ENABLED || !/^https:\/\//.test(S.AD_SCRIPT_URL || '')) return;
    const sc = document.createElement('script');
    sc.src = S.AD_SCRIPT_URL;
    sc.async = true;
    document.head.appendChild(sc);
  }

  // بيانات التواصل والسوشيال في الفوتر
  function fillFooter() {
    const box = document.getElementById('footLinks');
    if (!box) return;
    const items = [];
    if (S.TIKTOK_URL) items.push(`<a href="${S.TIKTOK_URL}" target="_blank" rel="noopener">تيك توك</a>`);
    if (S.INSTAGRAM_URL) items.push(`<a href="${S.INSTAGRAM_URL}" target="_blank" rel="noopener">إنستجرام</a>`);
    box.innerHTML = items.join(' · ');
    document.querySelectorAll('[data-email]').forEach(el => {
      if (S.CONTACT_EMAIL) { el.innerHTML = `<a href="mailto:${S.CONTACT_EMAIL}">${S.CONTACT_EMAIL}</a>`; }
      else { el.textContent = 'قريباً'; }
    });
    document.querySelectorAll('[data-ads-only]').forEach(el => { el.hidden = !S.ADS_ENABLED; });
    document.querySelectorAll('[data-handle]').forEach(el => { el.textContent = S.HANDLE || ''; });
  }

  document.addEventListener('DOMContentLoaded', () => { fillFooter(); loadAds(); });
})();
