// ==========================
// SCROLL BUTTONS
// ==========================

function scrollToContact(){

  document
  .getElementById('contact')
  .scrollIntoView({
    behavior:'smooth'
  });

}

function scrollToWorkshop(){

  document
  .getElementById('gallery')
  .scrollIntoView({
    behavior:'smooth'
  });

}

// ==========================
// REVEAL ANIMATION
// ==========================

const revealElements =
document.querySelectorAll(
'.service-card,.why-card,.gallery-grid img,.about-image img,.contact-card,.brand-grid img'
);

revealElements.forEach(el=>{

  el.style.opacity='0';

  el.style.transform='translateY(60px)';

  el.style.transition='all 0.9s ease';

});

const revealObserver =
new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.style.opacity='1';

      entry.target.style.transform='translateY(0px)';

    }

  });

},{
  threshold:0.15
});

revealElements.forEach(el=>{
  revealObserver.observe(el);
});

// ==========================
// NAVBAR EFFECT
// ==========================

const navbar =
document.querySelector('nav');

window.addEventListener('scroll',()=>{

  if(window.scrollY > 50){

    navbar.style.background =
    'rgba(0,0,0,0.92)';

    navbar.style.boxShadow =
    '0 0 25px rgba(24,194,92,0.18)';

  }

  else{

    navbar.style.background =
    'rgba(0,0,0,0.78)';

    navbar.style.boxShadow='none';

  }

});

// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections =
document.querySelectorAll('section');

const navLinks =
document.querySelectorAll('.nav-links a');

window.addEventListener('scroll',()=>{

  let current='';

  sections.forEach(section=>{

    const sectionTop =
    section.offsetTop - 150;

    if(window.scrollY >= sectionTop){

      current =
      section.getAttribute('id');

    }

  });

  navLinks.forEach(link=>{

    link.classList.remove(
      'active-link'
    );

    if(
      link.getAttribute('href')
      === `#${current}`
    ){

      link.classList.add(
        'active-link'
      );

    }

  });

});

// ==========================
// IMAGE TILT EFFECT
// ==========================

const tiltImages =
document.querySelectorAll(
'.gallery-grid img,.about-image img'
);

tiltImages.forEach(image=>{

  image.addEventListener('mousemove',(e)=>{

    const rect =
    image.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateX =
    ((y - centerY) / 20);

    const rotateY =
    ((centerX - x) / 20);

    image.style.transform =
    `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.04)
    `;

  });

  image.addEventListener('mouseleave',()=>{

    image.style.transform =
    `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
    `;

  });

});

// ==========================
// WHATSAPP FORM
// ==========================

const whatsappForm =
document.getElementById(
'whatsappForm'
);

whatsappForm.addEventListener(
'submit',
function(e){

  e.preventDefault();

  const name =
  document.getElementById('name').value;

  const mobile =
  document.getElementById('mobile').value;

  const message =
  document.getElementById('message').value;

  const whatsappMessage =
`🚗 *S.S TYRE CARE INQUIRY* %0A%0A
👤 Name: ${name} %0A
📞 Mobile: ${mobile} %0A
🛠️ Problem: ${message}`;

  const whatsappURL =
`https://wa.me/919003352390?text=${whatsappMessage}`;

  window.open(
    whatsappURL,
    '_blank'
  );

  whatsappForm.reset();

});

// ==========================
// CONSOLE
// ==========================

console.log(
'Luxury S.S TYRE CARE Website Loaded'
);