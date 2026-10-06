/**
 * نَفَس نقي - سكريبت التفاعل والحاسبة وعداد الطوارئ
 * City: Jeddah, KSA | Phone: 0578656614
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initFAQAccordion();
  initMobileMenu();
  initSmoothScroll();
});

/**
 * 1. تايمر العرض الحصري (Urgency Countdown Timer)
 * يحسب العد التنازلي لساعات ودقائق وثواني حية تشد انتباه العميل لطلب الخصم فوراً
 */
function initCountdownTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  let endTime = sessionStorage.getItem('nafas_urgency_timer_end');
  
  if (!endTime) {
    const now = new Date().getTime();
    endTime = now + (5 * 60 * 60 * 1000) + (42 * 60 * 1000) + (18 * 1000);
    sessionStorage.setItem('nafas_urgency_timer_end', endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function updateTimer() {
    const now = new Date().getTime();
    let distance = endTime - now;

    if (distance <= 0) {
      endTime = now + (6 * 60 * 60 * 1000);
      sessionStorage.setItem('nafas_urgency_timer_end', endTime);
      distance = endTime - now;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * 2. الأكورديون للأسئلة الشائعة (FAQ Accordion)
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * 4. القائمة الجانبية للشاشات الصغيرة (Mobile Menu Drawer)
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function toggleMenu() {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  closeLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * 5. التمرير السلس للروابط (Smooth Scroll)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. Google Ads Click-to-Call & WhatsApp Conversion Tracking
 * دالة مساعدة لربط إعلانات جوجل وتتبع التحويلات بدقة
 */
function trackConversion(actionType) {
  // If gtag is configured in Google Ads:
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
      'event_category': 'Contact',
      'event_label': actionType
    });
  }
}
window.trackConversion = trackConversion;
