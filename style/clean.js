/* ==========================================================================
   Clean My Chimney - Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Section Tracker
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-drawer-menu a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link update
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
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

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.img || item.querySelector('img').src;
      const title = item.dataset.title || 'Field Service Snapshot';
      const desc = item.dataset.desc || 'Clean My Chimney certified technician at work.';

      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
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

  if (lightboxModal) {
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
    if (!calcType || !calcService) return;
    const typeVal = calcType.value;
    const serviceVal = calcService.value;
    const estimated = basePrices[typeVal][serviceVal];
    calcAmount.textContent = `₹${estimated.toLocaleString('en-IN')}`;
  }

  if (calcType && calcService) {
    calcType.addEventListener('change', updateCostEstimate);
    calcService.addEventListener('change', updateCostEstimate);
    updateCostEstimate();
  }

  if (calcBookBtn) {
    calcBookBtn.addEventListener('click', () => {
      const serviceSelect = document.getElementById('service');
      const selectedService = calcService ? calcService.value : '';
      if (serviceSelect && selectedService) {
        if (selectedService === 'deep_clean') serviceSelect.value = 'cleaning';
        else if (selectedService === 'motor_repair') serviceSelect.value = 'motor';
        else if (selectedService === 'duct_install') serviceSelect.value = 'installation';
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
    if (!toastNotification) return;
    toastMsg.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;

      if (!name || !phone || !service) {
        showToast('Please fill in your Name, Phone Number, and Service required.');
        return;
      }

      showToast(`Thank you, ${name}! Your callback request has been received. Our technician will call you shortly.`);
      contactForm.reset();
    });
  }

  // WhatsApp Booking Action
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim() || 'Customer';
      const phone = document.getElementById('phone').value.trim() || 'Not specified';
      const service = document.getElementById('service').options[document.getElementById('service').selectedIndex]?.text || 'General Service';
      const message = document.getElementById('message').value.trim() || 'Please arrange a service booking.';

      const waText = `*New Booking Request - Clean My Chimney*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🔧 *Service:* ${service}\n📝 *Details:* ${message}`;
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

// Helper Function for Quick Booking buttons
function selectServiceAndBook(serviceValue) {
  const serviceSelect = document.getElementById('service');
  if (serviceSelect && serviceValue) {
    serviceSelect.value = serviceValue;
  }
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
