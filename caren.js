// ---------- Disappearing Sidebar on Scroll ----------
const sideNav = document.getElementById('sideNav');
let lastScrollTop = 0;
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // scrolling down -> hide sidebar
                sideNav.classList.add('hidden');
            } else if (scrollTop < lastScrollTop) {
                // scrolling up -> show sidebar
                sideNav.classList.remove('hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        });
        ticking = true;
    }
});

// ---------- Skill Bars Animation on Scroll ----------
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !bar.style.width) {
            bar.style.width = width + '%';
        }
    });
};
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ---------- Scroll‑triggered Fade‑in for Sections ----------
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation to reduce load
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ---------- Smooth Scroll for Anchor Links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---------- Contact Form Alert (demo) ----------
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}