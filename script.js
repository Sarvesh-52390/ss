/* ============================================
   PARTICLE CANVAS ANIMATION
   ============================================ */
(function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 70;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? 
        `rgba(24, 194, 92, ${this.opacity})` : 
        `rgba(127, 245, 176, ${this.opacity * 0.5})`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

/* ============================================
   CUSTOM MAGNETIC CURSOR
   ============================================ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

/* ============================================
   UI HELPERS & MODALS
   ============================================ */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// Close modals on clicking outside or pressing Escape
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-drop, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
});

// Smooth Anchor Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    const menu = document.getElementById('mobileMenu');
    if (menu && menu.classList.contains('active')) toggleMenu();
  });
});

/* ============================================
   WHATSAPP INTEGRATION
   ============================================ */
function handleWhatsapp(e, nameId, mobileId, messageId) {
  e.preventDefault();
  const name = document.getElementById(nameId).value;
  const mobile = document.getElementById(mobileId).value;
  const msg = document.getElementById(messageId).value;
  const text = `Hi S.S Tyre Care!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile:* ${encodeURIComponent(mobile)}%0A*Issue:* ${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/919842238460?text=${text}`, '_blank');
}

document.getElementById('pageWhatsappForm')?.addEventListener('submit', e => handleWhatsapp(e, 'name', 'mobile', 'message'));
document.getElementById('modalWhatsappForm')?.addEventListener('submit', e => { handleWhatsapp(e, 'modalName', 'modalMobile', 'modalMessage'); closeModal('bookingModal'); });

/* ============================================
   SUPABASE REVIEWS & FEEDBACK INTEGRATION
   ============================================ */
const SUPABASE_URL = "https://uanfnhqulovxoltdeqal.supabase.co/rest/v1/reviews";
const SUPABASE_ANON_KEY = "sb_publishable_TE3UFs5E6Ctg5IUClHeHmw_Mexcm-kj";

// 1. Fetch and Display Reviews
async function loadTopReviews() {
  const container = document.getElementById('dynamicReviewsContainer');
  if (!container) return;

  try {
    const response = await fetch(`${SUPABASE_URL}?select=*&limit=6&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });

    if (!response.ok) throw new Error("API Connection Failed");
    const reviews = await response.json();
    container.innerHTML = '';

    if (!reviews || reviews.length === 0) {
      container.innerHTML = `<p style="text-align:center; color: var(--text-secondary); grid-column: 1 / -1;">Be the first to leave a review!</p>`;
      return;
    }

    reviews.forEach(review => {
      const safeRating = Number(review.rating) || 5;
      const safeName = review.name ? review.name : "Anonymous";
      const initial = safeName.charAt(0).toUpperCase();
      const stars = '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);

      container.innerHTML += `
        <div class="review-card reveal active">
          <div class="review-stars">${stars}</div>
          <p class="review-text">"${review.message || ""}"</p>
          <div class="review-author">
            <span class="author-avatar">${initial}</span>
            <strong>${safeName}</strong>
          </div>
        </div>
      `;
    });
  } catch (error) {
    container.innerHTML = `<p style="text-align:center; color: #ff4757; grid-column: 1 / -1;">Unable to load reviews right now.</p>`;
  }
}

// Load reviews initially
setTimeout(loadTopReviews, 500);

// 2. Handle Feedback Form Submissions
async function handleFeedbackSubmit(e, formElement) {
  e.preventDefault();
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;

  submitBtn.innerHTML = 'Sending...';
  submitBtn.style.opacity = '0.7';

  const isModal = formElement.id === 'modalFeedbackForm';
  const nameInput = document.getElementById(isModal ? 'modalFeedName' : 'feedName').value;
  const ratingInput = document.getElementById(isModal ? 'modalFeedRating' : 'feedRating').value;
  const messageInput = document.getElementById(isModal ? 'modalFeedMessage' : 'feedMessage').value;

  const reviewData = {
    name: nameInput,
    rating: parseInt(ratingInput) || 5,
    message: messageInput
  };

  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) throw new Error("Submission Rejected");

    submitBtn.innerHTML = '✅ Feedback Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #14a34d, #0d7a3a)';
    submitBtn.style.color = '#fff';
    submitBtn.style.opacity = '1';

    loadTopReviews();

  } catch (error) {
    submitBtn.innerHTML = 'Error. Try Again.';
    submitBtn.style.background = '#ff4757';
    submitBtn.style.opacity = '1';
  }

  setTimeout(() => {
    formElement.reset();
    submitBtn.innerHTML = originalHTML;
    submitBtn.style.background = '';
    submitBtn.style.color = '';
    if (isModal) closeModal('feedbackModal');
  }, 2500);
}

document.getElementById('modalFeedbackForm')?.addEventListener('submit', function(e) { handleFeedbackSubmit(e, this); });
document.getElementById('pageFeedbackForm')?.addEventListener('submit', function(e) { handleFeedbackSubmit(e, this); });


/* ============================================
   MULTI-CINEMATIC CAROUSEL ENGINE 
   (Services & Gallery)
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initCinematicCarousels();
});

function initCinematicCarousels() {
  const carousels = document.querySelectorAll('.cinematic-carousel');

  carousels.forEach(carousel => {
    const cards = carousel.querySelectorAll('.c-card');
    const timerBar = carousel.querySelector('.pill-timer-fill');
    const nextBtn = carousel.querySelector('.c-next-btn');
    
    if (!cards.length) return;

    let currentIndex = 0;
    let autoPlayInterval;
    const SLIDE_DURATION = 4000;

    function updateCarousel() {
      cards.forEach((card, index) => {
        const diff = index - currentIndex;

        if (diff === 0) {
          card.style.transform = `translateX(0) scale(1) translateZ(0)`;
          card.style.opacity = 1;
          card.style.zIndex = 10;
          card.style.filter = "blur(0px)";
          card.classList.add('active');
        } else {
          const offset = window.innerWidth > 768 ? 65 : 85; 
          const direction = diff > 0 ? 1 : -1; 
          const depth = Math.abs(diff); 

          card.style.transform = `translateX(${direction * (offset + (depth * 15))}%) scale(${1 - (depth * 0.15)}) translateZ(-${depth * 100}px)`;
          card.style.opacity = depth > 2 ? 0 : 1 - (depth * 0.3); 
          card.style.zIndex = 10 - depth;
          card.style.filter = `blur(${depth * 2}px)`; 
          card.classList.remove('active');
        }
      });
    }

    function nextSlide() { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); startTimer(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); startTimer(); }

    function startTimer() {
      clearInterval(autoPlayInterval);
      if (timerBar) {
        timerBar.style.transition = 'none';
        timerBar.style.width = '0%';
        setTimeout(() => {
          timerBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
          timerBar.style.width = '100%';
        }, 50);
      }
      autoPlayInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Button & Card Clicks
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index !== currentIndex) { currentIndex = index; updateCarousel(); startTimer(); }
      });
    });

    // Touch Swiping Logic
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      clearInterval(autoPlayInterval);
      if (timerBar) {
        const computedWidth = window.getComputedStyle(timerBar).width;
        timerBar.style.transition = 'none';
        timerBar.style.width = computedWidth;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      let touchEndX = e.changedTouches[0].clientX;
      let touchEndY = e.changedTouches[0].clientY;
      let moveX = touchEndX - touchStartX;
      let moveY = touchEndY - touchStartY;

      if (Math.abs(moveX) > 40 && Math.abs(moveX) > Math.abs(moveY)) {
        if (moveX < 0) nextSlide(); else prevSlide();
      } else {
        startTimer();
      }
    }, { passive: true });

    // Desktop Mouse Drag
    carousel.addEventListener('mousedown', e => {
      isDragging = true; touchStartX = e.clientX;
      clearInterval(autoPlayInterval);
      if (timerBar) {
        const computedWidth = window.getComputedStyle(timerBar).width;
        timerBar.style.transition = 'none';
        timerBar.style.width = computedWidth;
      }
    });

    carousel.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      let moveX = e.clientX - touchStartX;
      if (Math.abs(moveX) > 50) { if (moveX < 0) nextSlide(); else prevSlide(); } else startTimer();
    });

    carousel.addEventListener('mouseleave', () => { if (isDragging) { isDragging = false; startTimer(); } });

    // Init
    updateCarousel(); startTimer(); window.addEventListener('resize', updateCarousel);
  });
}