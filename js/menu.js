document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu
    var burgerToggle = document.getElementById('burgerToggle');
    var mobileMenu = document.getElementById('mobileMenu');

    if (burgerToggle && mobileMenu) {
        burgerToggle.addEventListener('click', function () {
            burgerToggle.classList.toggle('menu-open');
            mobileMenu.classList.toggle('menu-open');
        });

        var menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                burgerToggle.classList.remove('menu-open');
                mobileMenu.classList.remove('menu-open');
            });
        });
    }

    // Scroll reveal
    if (!window.IntersectionObserver) return;

    var selectors = [
        // Home page
        '.highlights-section',
        '.mission-split',
        '.mission-practice-section',
        '.practice-card',
        '.president-card',
        '.partner-strip',
        '.home-contact-section',
        '.home-inquiry-card',
        '.home-social-item',
        // About page
        '.chapter-identity',
        '.chapter-stats-strip',
        '.photo-deck',
        '.about-cta-banner',
        '.team-zone',
        // Initiatives page
        '.featured-initiative-card',
        '.category-section',
        // Sponsors page
        '.tier-card',
        '.impact-category',
        '.sponsor-contact-block',
        '.support-container',
        '.tiers-grid',
        // Conference page
        '.conference .conference-content',
        '.conference-highlight-inner-container',
        '.faqs',
        '.conference-next',
        // Contact page
        '.inquiry-card',
        '.social-item',
        '.contacts-section',
        // Shared
        '.stat-item',
        '.chapter-stat',
        '.faq-accordion-item'
    ].join(', ');

    var els = Array.prototype.slice.call(document.querySelectorAll(selectors));
    if (!els.length) return;

    // Stagger siblings sharing the same direct parent
    var seen = [];
    els.forEach(function (el) {
        var par = el.parentElement;
        if (!par || seen.indexOf(par) !== -1) return;
        var siblings = els.filter(function (s) { return s.parentElement === par; });
        if (siblings.length > 1) {
            seen.push(par);
            siblings.forEach(function (s, i) {
                s.style.transitionDelay = (i * 0.07) + 's';
            });
        }
    });

    // Mark all hidden first, then observe — rAF ensures CSS transition fires
    els.forEach(function (el) { el.classList.add('sr-hidden'); });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                // Small delay so the hidden state renders before we flip visible
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        el.classList.remove('sr-hidden');
                        el.classList.add('sr-visible');
                    });
                });
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) { observer.observe(el); });
});
