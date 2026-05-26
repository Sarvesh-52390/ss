// ====================================================
// 1. MOBILE MENU & SMOOTH SCROLLING
// ====================================================

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

// ====================================================
// 2. WHATSAPP DIRECT MESSAGING LOGIC
// ====================================================

// WhatsApp Inquiry Form Logic
const inquiryForm = document.getElementById('whatsappForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const message = document.getElementById('message').value;

        const url = `https://wa.me/919842238460?text=🚗 *S.S TYRE CARE INQUIRY*%0A%0A👤 Name: ${name}%0A📞 Mobile: ${mobile}%0A🛠️ Issue: ${message}`;
        window.open(url, '_blank');
        inquiryForm.reset(); 
    });
}

// WhatsApp Feedback Form Logic
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const feedName = document.getElementById('feedName').value;
        const feedRating = document.getElementById('feedRating').value;
        const feedMessage = document.getElementById('feedMessage').value;

        const url = `https://wa.me/919842238460?text=⭐ *S.S TYRE CARE FEEDBACK*%0A%0A👤 Customer: ${feedName}%0A📊 Rating: ${feedRating}%0A💬 Comments: ${feedMessage}`;
        window.open(url, '_blank');
        feedbackForm.reset(); 
    });
}

// ====================================================
// 3. SCROLL REVEAL "WATER DROP" ANIMATIONS
// ====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Triggers the hero animation instantly on load
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

// ====================================================
// 4. AUTOMATED LIQUID GLASS SLIDESHOW
// ====================================================

let slideshowTimer;
const autoplaySpeed = 4000; // Time in milliseconds (4 seconds per slide)

function startSlideshow() {
    slideshowTimer = setInterval(() => {
        const track = document.getElementById('slideshowTrack');
        if (!track) return;

        const slideWidth = track.clientWidth;
        
        // If we've reached the end of the scroll width, snap back smoothly to the beginning
        if (track.scrollLeft + slideWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Otherwise, slide over to the next image
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    }, autoplaySpeed);
}

function moveSlide(direction) {
    const track = document.getElementById('slideshowTrack');
    if (!track) return;
    
    const slideWidth = track.clientWidth; 
    
    // Manual Navigation with Loop Checks
    if (direction === 1 && track.scrollLeft + slideWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && track.scrollLeft <= 10) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: slideWidth * direction, behavior: 'smooth' });
    }
    
    // SAFETY RESET: Clear and restart the timer so clicking doesn't cause chaotic fast-forwarding
    clearInterval(slideshowTimer);
    startSlideshow();
}

// Initialize Autoplay on page load and handle touch interactions
document.addEventListener('DOMContentLoaded', () => {
    startSlideshow();

    const track = document.getElementById('slideshowTrack');
    if (track) {
        // Pauses the automated slide changes while a mobile user actively drags their finger
        track.addEventListener('touchstart', () => {
            clearInterval(slideshowTimer);
        });
        
        // Resumes automated slide changes once they lift their finger off the screen
        track.addEventListener('touchend', () => {
            startSlideshow();
        });
    }
});