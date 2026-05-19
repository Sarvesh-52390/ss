// Smooth Scrolling Functions
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToWorkshop() {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// WhatsApp Form Submission Logic
const form = document.getElementById('whatsappForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const message = document.getElementById('message').value;

  const url = `https://wa.me/919003352390?text=🚗 *S.S TYRE CARE INQUIRY*%0A%0A👤 Name: ${name}%0A📞 Mobile: ${mobile}%0A🛠️ Issue: ${message}`;

  window.open(url, '_blank');
  
  // Clear the form after sending
  form.reset();
});

// Scroll Reveal Animation Logic
document.addEventListener('DOMContentLoaded', function() {
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        // Stop observing once it has been revealed
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
});