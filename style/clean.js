/* ==========================================================================
   Clean My Chimney - Multi-Page Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Page Link Highlighter
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-drawer-menu a');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Highlight active menu item based on current HTML file page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    link.classList.remove('active');

    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else if (linkHref.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      // In-page hash link handling for single-page sections if present
    }
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-drawer-menu a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Image Lightbox Modal for Real Field Work Gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightboxModal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.dataset.img || (item.querySelector('img') ? item.querySelector('img').src : '');
        const title = item.dataset.title || 'Field Service Snapshot';
        const desc = item.dataset.desc || 'Clean My Chimney certified technician at work.';

        if (lightboxImg) lightboxImg.src = imgSrc;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Interactive Cost Estimator Calculator
  const calcType = document.getElementById('calcType');
  const calcService = document.getElementById('calcService');
  const calcAmount = document.getElementById('calcAmount');
  const calcBookBtn = document.getElementById('calcBookBtn');

  const basePrices = {
    'wall': { 'deep_clean': 999, 'motor_repair': 1499, 'duct_install': 899 },
    'island': { 'deep_clean': 1499, 'motor_repair': 1999, 'duct_install': 1299 },
    'straight': { 'deep_clean': 799, 'motor_repair': 1299, 'duct_install': 799 },
    'auto_clean': { 'deep_clean': 1199, 'motor_repair': 1699, 'duct_install': 999 }
  };

  function updateCostEstimate() {
    if (!calcType || !calcService || !calcAmount) return;
    const typeVal = calcType.value;
    const serviceVal = calcService.value;
    if (basePrices[typeVal] && basePrices[typeVal][serviceVal]) {
      const estimated = basePrices[typeVal][serviceVal];
      calcAmount.textContent = `₹${estimated.toLocaleString('en-IN')}`;
    }
  }

  if (calcType && calcService) {
    calcType.addEventListener('change', updateCostEstimate);
    calcService.addEventListener('change', updateCostEstimate);
    updateCostEstimate();
  }

  if (calcBookBtn) {
    calcBookBtn.addEventListener('click', () => {
      const selectedService = calcService ? calcService.value : '';
      let targetParam = 'cleaning';
      if (selectedService === 'deep_clean') targetParam = 'cleaning';
      else if (selectedService === 'motor_repair') targetParam = 'motor';
      else if (selectedService === 'duct_install') targetParam = 'installation';

      window.location.href = `contact.html?service=${targetParam}#booking-form`;
    });
  }

  // 5. FAQ Accordion Handler
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Contact Form Submission & Toast Notifications
  const contactForm = document.getElementById('contactForm');
  const btnWhatsApp = document.getElementById('btnWhatsApp');
  const toastNotification = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (!toastNotification || !toastMsg) return;
    toastMsg.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    // Auto-select service if URL query param exists (e.g. contact.html?service=motor)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('service');
    if (serviceParam && serviceSelect) {
      serviceSelect.value = serviceParam;
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const serviceSelect = document.getElementById('service');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceSelect ? serviceSelect.value : '';

      if (!name || !phone || !service) {
        showToast('Please fill in your Name, Phone Number, and Service required.');
        return;
      }

      showToast(`Thank you, ${name}! Your callback request has been received. Our technician will call you shortly.`);
      contactForm.reset();
    });
  }

  // WhatsApp Booking Action (Emoji Free)
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const serviceSelect = document.getElementById('service');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : 'Customer';
      const phone = phoneInput ? phoneInput.value.trim() : 'Not specified';
      const service = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex].text : 'General Service';
      const message = messageInput ? messageInput.value.trim() : 'Please arrange a service booking.';

      const waText = `*New Booking Request - Clean My Chimney*\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDetails: ${message}`;
      const waUrl = `https://wa.me/918607673545?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 7. Auto Pause Other Videos When One Video Plays
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    video.addEventListener('play', () => {
      allVideos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });
});

// Helper Function for Quick Booking buttons across pages
function selectServiceAndBook(serviceValue) {
  window.location.href = `contact.html?service=${serviceValue}#booking-form`;
}
