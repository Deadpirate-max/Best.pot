// Wrap everything in an IIFE to avoid variable redeclaration conflicts
(function() {
    // ---------- DOM Elements ----------
    const sideNav = document.getElementById('sideNav');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('closeSidebar');

    // ---------- Mobile Menu Toggle ----------
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

    // Close sidebar when a nav link is clicked (on mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) closeNav();
        });
    });

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