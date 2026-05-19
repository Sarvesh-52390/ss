// Toggle Fluid Mobile Menu
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Smooth Scrolling Functions
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToWorkshop() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// ----------------------------------------------------
// WhatsApp Inquiry Form Logic
// ----------------------------------------------------
const inquiryForm = document.getElementById('whatsappForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const message = document.getElementById('message').value;

        const url = `https://wa.me/919003352390?text=🚗 *S.S TYRE CARE INQUIRY*%0A%0A👤 Name: ${name}%0A📞 Mobile: ${mobile}%0A🛠️ Issue: ${message}`;
        window.open(url, '_blank');
        inquiryForm.reset(); 
    });
}

// ----------------------------------------------------
// WhatsApp Feedback Form Logic
// ----------------------------------------------------
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const feedName = document.getElementById('feedName').value;
        const feedRating = document.getElementById('feedRating').value;
        const feedMessage = document.getElementById('feedMessage').value;

        const url = `https://wa.me/919003352390?text=⭐ *S.S TYRE CARE FEEDBACK*%0A%0A👤 Customer: ${feedName}%0A📊 Rating: ${feedRating}%0A💬 Comments: ${feedMessage}`;
        window.open(url, '_blank');
        feedbackForm.reset(); 
    });
}

// ----------------------------------------------------
// Scroll Reveal "Water Drop" Animation Logic
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Triggers the hero animation instantly
    setTimeout(() => {
        document.querySelectorAll('.reveal-drop').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Triggers elements dynamically as you scroll down
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
  
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
  
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});