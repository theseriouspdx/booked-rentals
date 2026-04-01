/* ====== DOM ELEMENTS ====== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const heroForm = document.getElementById('heroForm');
const captureForm = document.getElementById('captureForm');

/* ====== HAMBURGER MENU TOGGLE ====== */
if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

/* ====== MOBILE NAV CLOSE ON LINK CLICK ====== */
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

/* ====== FORM SUBMISSIONS ====== */
function handleFormSubmit(form, successText) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');
        const originalText = btn.textContent;

        // Visual feedback instead of alert
        btn.textContent = successText;
        btn.style.opacity = '0.8';
        input.disabled = true;
        btn.disabled = true;

        // Reset after 3 seconds
        setTimeout(function() {
            form.reset();
            btn.textContent = originalText;
            btn.style.opacity = '';
            input.disabled = false;
            btn.disabled = false;
        }, 3000);
    });
}

if (heroForm) handleFormSubmit(heroForm, 'You\'re in!');
if (captureForm) handleFormSubmit(captureForm, 'Check your inbox!');

/* ====== SCROLL ANIMATIONS ====== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animatableElements = document.querySelectorAll(
    '.article-card, .product-card, .news-card, .category-card, .quarter-card, .university-card'
);

animatableElements.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Observe element
    observer.observe(element);
});

/* ====== SMOOTH SCROLL BEHAVIOR FOR LINKS ====== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip smooth scroll for hamburger nav links (they have other behavior)
        if (href === '#' || href === '') {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for sticky nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ====== ACTIVE NAV LINK HIGHLIGHT ====== */
window.addEventListener('scroll', function() {
    let currentSection = '';

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.style.color = 'var(--teal)';
        } else {
            link.style.color = '';
        }
    });
});

/* ====== LAZY LOAD IMAGES (if needed in future) ====== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ====== CLOSE MOBILE MENU ON OUTSIDE CLICK ====== */
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');

        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});