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
  const particleCount = 80;

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
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      this.opacity += (Math.random() - 0.5) * 0.02;
      this.opacity = Math.max(0.05, Math.min(0.6, this.opacity));
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.strokeStyle = `rgba(24, 194, 92, ${0.1 * (1 - distance / 150)})`;
          ctx.globalAlpha = 0.1 * (1 - distance / 150);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
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
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Magnetic hover for interactive elements
  document.querySelectorAll('a, button, .fluid-hover, .brand-card, .service-card, .slide-btn, .review-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2.8)';
      dot.style.background = 'rgba(24, 194, 92, 0.9)';
      dot.style.boxShadow = '0 0 20px rgba(24, 194, 92, 0.8)';
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(24, 194, 92, 0.9)';
      ring.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.background = 'var(--accent)';
      dot.style.boxShadow = '0 0 10px rgba(24, 194, 92, 0.6)';
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'var(--accent)';
      ring.style.opacity = '0.7';
    });
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.4)';
    ring.style.width = '28px';
    ring.style.height = '28px';
  });

  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.width = '40px';
    ring.style.height = '40px';
  });
})();

/* ============================================
   MOBILE MENU
   ============================================ */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('active');

  if (menu.classList.contains('active')) {
    hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    hamburger.children[1].style.opacity = '0';
    hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    hamburger.children[0].style.transform = 'none';
    hamburger.children[1].style.opacity = '1';
    hamburger.children[2].style.transform = 'none';
  }
}

/* ============================================
   SCROLL FUNCTIONS
   ============================================ */
function scrollToWorkshop() {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   SLIDESHOW
   ============================================ */
const track = document.getElementById('slideshowTrack');
if (track) {
  function moveSlide(direction) {
    const scrollAmount = track.clientWidth;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { root: null, rootMargin: '50px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-drop, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
});

/* ============================================
   SCROLL SPY NAV
   ============================================ */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-ghost-btn');

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => spy.observe(s));
})();

/* ============================================
   PARALLAX EFFECT
   ============================================ */
(function initCinematicParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const parallaxImages = document.querySelectorAll('.about-image-wrap img, .founder-img-wrapper img');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        if (heroBg) {
          heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.3}px)`;
        }

        parallaxImages.forEach(img => {
          const rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const distance = (window.innerHeight - rect.top) * 0.08;
            img.style.transform = `translateY(${distance}px)`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ============================================
   MODAL FUNCTIONS
   ============================================ */
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = '';
}

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

/* ============================================
   BOOKING FORM (WHATSAPP)
   ============================================ */
function handleWhatsappSubmit(e, formElement, nameId, mobileId, messageId, isModal) {
  e.preventDefault();
  const name = document.getElementById(nameId).value;
  const mobile = document.getElementById(mobileId).value;
  const message = document.getElementById(messageId).value;

  const shopNumber = '919842238460';
  const whatsappText = `Hi S.S Tyre Care!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile:* ${encodeURIComponent(mobile)}%0A*Vehicle Issue:* ${encodeURIComponent(message)}%0A%0AI would like to book a service appointment.`;

  window.open(`https://wa.me/${shopNumber}?text=${whatsappText}`, '_blank');
  if (isModal) closeModal('bookingModal');
  formElement.reset();
}

const modalWhatsappForm = document.getElementById('modalWhatsappForm');
if (modalWhatsappForm) {
  modalWhatsappForm.addEventListener('submit', function(e) {
    handleWhatsappSubmit(e, this, 'modalName', 'modalMobile', 'modalMessage', true);
  });
}

const pageWhatsappForm = document.getElementById('pageWhatsappForm');
if (pageWhatsappForm) {
  pageWhatsappForm.addEventListener('submit', function(e) {
    handleWhatsappSubmit(e, this, 'name', 'mobile', 'message', false);
  });
}

/* ============================================
   SUPABASE API INTEGRATION
   ============================================ */
const SUPABASE_URL = "https://uanfnhqulovxoltdeqal.supabase.co/rest/v1/reviews";
const SUPABASE_ANON_KEY = "sb_publishable_TE3UFs5E6Ctg5IUClHeHmw_Mexcm-kj";

// Load reviews
async function loadTopReviews() {
  const container = document.getElementById('dynamicReviewsContainer');
  if (!container) return;

  try {
    const response = await fetch(`${SUPABASE_URL}?select=*&limit=6&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) throw new Error("API Connection Failed");
    const reviews = await response.json();
    container.innerHTML = '';

    if (!reviews || reviews.length === 0) {
      container.innerHTML = `<p style="text-align:center; color: var(--text-secondary); grid-column: 1 / -1;">Be the first to leave a review below!</p>`;
      return;
    }

    reviews.forEach(review => {
      const safeRating = Number(review.rating) || 5;
      const safeName = review.name ? review.name : "Anonymous";
      const initial = safeName.charAt(0).toUpperCase();
      const stars = '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);

      const cardHTML = `
        <div class="review-card reveal-drop active">
          <div class="review-stars">${stars}</div>
          <p class="review-text">"${review.message || ""}"</p>
          <div class="review-author">
            <span class="author-avatar">${initial}</span>
            <strong>${safeName}</strong>
          </div>
        </div>
      `;
      container.innerHTML += cardHTML;
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    container.innerHTML = `<p style="text-align:center; color: var(--text-secondary); grid-column: 1 / -1;">Unable to load reviews right now.</p>`;
  }
}

// Submit review
async function handleFeedbackSubmit(e, formElement) {
  e.preventDefault();
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;

  submitBtn.innerHTML = 'Sending...';
  submitBtn.style.opacity = '0.7';

  const nameInput = formElement.querySelector('input[type="text"]').value;
  const messageInput = formElement.querySelector('textarea').value;
  const rawRating = formElement.querySelector('select').value;
  const numericRating = parseInt(rawRating.replace(/[^0-9]/g, '').charAt(0)) || 5;

  const reviewData = {
    name: nameInput,
    rating: numericRating,
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

    submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> Feedback Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #14a34d, #0d7a3a)';
    submitBtn.style.opacity = '1';

    loadTopReviews();

  } catch (error) {
    console.error("Submission error:", error);
    submitBtn.innerHTML = 'Error. Try Again.';
    submitBtn.style.background = '#ff4757';
    submitBtn.style.opacity = '1';
  }

  setTimeout(() => {
    formElement.reset();
    submitBtn.innerHTML = originalHTML;
    submitBtn.style.background = '';
    if (formElement.id === 'modalFeedbackForm') closeModal('feedbackModal');
  }, 2600);
}

setTimeout(loadTopReviews, 500);

const modalFeedbackForm = document.getElementById('modalFeedbackForm');
if (modalFeedbackForm) {
  modalFeedbackForm.addEventListener('submit', function(e) {
    handleFeedbackSubmit(e, this);
  });
}

const pageFeedbackForm = document.getElementById('pageFeedbackForm');
if (pageFeedbackForm) {
  pageFeedbackForm.addEventListener('submit', function(e) {
    handleFeedbackSubmit(e, this);
  });
}

/* ============================================
   SMOOTH ANCHOR NAVIGATION
   ============================================ */
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
   GLITCH EFFECT ON HERO TITLE (Optional)
   ============================================ */
(function addGlitchEffect() {
  const title = document.querySelector('.clean-title');
  if (!title) return;

  title.addEventListener('mouseenter', () => {
    title.style.animation = 'textGlitch 0.3s ease-in-out';
  });

  title.addEventListener('animationend', () => {
    title.style.animation = 'none';
  });
})();