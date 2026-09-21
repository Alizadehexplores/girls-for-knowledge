const GFK = {
  whatsapp: '93806385912',
  translations: {
    en: {
      announcement: 'Draft website — board and partner profiles are placeholders until official details are provided.',
      home: 'Home', about: 'About Us', founders: 'Founders', involved: 'Get Involved', board: 'Board Members', friends: 'Friends', donate: 'Donate', contact: 'Contact Us', ourWork: 'Our Work',
      footerText: 'Girls for Knowledge supports learning, confidence, and community for girls and young women.',
      rights: 'Girls for Knowledge. All rights reserved.',
      whatsapp: 'WhatsApp'
    },
    fa: {
      announcement: 'نسخهٔ آزمایشی وب‌سایت — مشخصات اعضای هیئت و همکاران تا دریافت معلومات رسمی، نمونه‌ای است.',
      home: 'صفحه اصلی', about: 'درباره ما', founders: 'بنیان‌گذار', involved: 'همکاری با ما', board: 'اعضای هیئت', friends: 'دوستان و همکاران', donate: 'کمک مالی', contact: 'تماس با ما', ourWork: 'فعالیت‌های ما',
      footerText: 'دختران برای دانش از یادگیری، اعتمادبه‌نفس و ایجاد جامعهٔ حمایتی برای دختران و زنان جوان پشتیبانی می‌کند.',
      rights: 'Girls for Knowledge. تمامی حقوق محفوظ است.',
      whatsapp: 'واتساپ'
    }
  }
};
function applyLanguage(lang){
  const isFa=lang==='fa';
  document.documentElement.lang=isFa?'fa':'en';
  document.body.dir=isFa?'rtl':'ltr';
  document.querySelectorAll('[data-en][data-fa]').forEach(el=>{
    el.innerHTML=isFa?el.dataset.fa:el.dataset.en;
  });
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n; if(GFK.translations[lang][key]) el.textContent=GFK.translations[lang][key];
  });
  const btn=document.querySelector('.lang-btn'); if(btn) btn.textContent=isFa?'EN':'دری';
  localStorage.setItem('gfk-lang',lang);
}
function init(){
  const lang=localStorage.getItem('gfk-lang')||'en'; applyLanguage(lang);
  document.querySelector('.lang-btn')?.addEventListener('click',()=>applyLanguage((localStorage.getItem('gfk-lang')||'en')==='en'?'fa':'en'));
  const menu=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>{links?.classList.toggle('open');menu.setAttribute('aria-expanded',links?.classList.contains('open')?'true':'false')});
  const dd=document.querySelector('.dropdown-toggle'); dd?.addEventListener('click',(e)=>{if(window.innerWidth<=980){e.preventDefault();dd.parentElement.classList.toggle('open')}});
  document.querySelectorAll('form[data-whatsapp-form]').forEach(form=>{
    form.addEventListener('submit',(e)=>{
      e.preventDefault(); const fd=new FormData(form);
      const langNow=localStorage.getItem('gfk-lang')||'en';
      const text=langNow==='fa'
        ? `سلام، نام من ${fd.get('name')} است.\n${fd.get('message')}`
        : `Hello, my name is ${fd.get('name')}.\n${fd.get('message')}`;
      window.open(`https://wa.me/${GFK.whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener');
    })
  });
}
document.addEventListener('DOMContentLoaded',init);
