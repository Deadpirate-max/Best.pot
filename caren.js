// Wrap everything in an IIFE to avoid variable redeclaration conflicts
(function() {
    // ---------- DOM Elements ----------
    const sideNav = document.getElementById('sideNav');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('closeSidebar');

    // ---------- Mobile Menu Toggle ----------
    const overlay = document.getElementById('navOverlay');

    function openNav() {
        if (sideNav) {
            sideNav.classList.add('open');
            document.body.classList.add('sidebar-open');
    }
        if (overlay) overlay.classList.add('active');
    }

    function closeNav() {
        if (sideNav) {
            sideNav.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        }
        if (overlay) overlay.classList.remove('active');
    }

// Close when clicking the overlay
if (overlay) {
    overlay.addEventListener('click', closeNav);
}
    function openNav() {
        if (sideNav) sideNav.classList.add('open');
    }
    function closeNav() {
        if (sideNav) sideNav.classList.remove('open');
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', openNav);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
function openNav() {
    if (sideNav) {
        sideNav.classList.add('open');
        document.body.classList.add('sidebar-open');
    }
}
function closeNav() {
    if (sideNav) {
        sideNav.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
}
    // Close sidebar when a nav link is clicked (on mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) closeNav();
        });
    });
    const cards = document.querySelectorAll('.skill-card');
const bars  = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    card.classList.add('visible');

    // animate bars inside this card after a short delay
    setTimeout(() => {
      card.querySelectorAll('.skill-progress').forEach(bar => {
        const w = bar.getAttribute('data-width');
        if (w) bar.style.width = w + '%';
      });
      card.classList.add('animated');
    }, 300);

    observer.unobserve(card);
  });
}, { threshold: 0.15 });

cards.forEach(c => observer.observe(c));

    // ---------- Disappearing Sidebar on Scroll (desktop only) ----------
    let previousScrollTop = 0;
    let scrollTicking = false;

    window.addEventListener('scroll', function() {
        if (!sideNav) return;
        if (window.innerWidth > 992) {
            if (!scrollTicking) {
                requestAnimationFrame(function() {
                    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScrollTop > previousScrollTop && currentScrollTop > 100) {
                        sideNav.classList.add('hidden');
                    } else if (currentScrollTop < previousScrollTop) {
                        sideNav.classList.remove('hidden');
                    }
                    previousScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        } else {
            sideNav.classList.remove('hidden');
        }
    });

    // ---------- Skill Bars Animation on Scroll ----------
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (!width) return;
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

    // ---------- Contact Form Alert ----------
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
})();
