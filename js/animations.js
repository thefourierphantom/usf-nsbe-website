(function () {
    'use strict';

    var SELECTORS = [
        /* Cards & grid items */
        '.featured-initiative-card',
        '.tier-card',
        '.impact-category',
        '.faq-accordion-item',
        '.stat-item',
        '.chapter-stat',
        '.home-inquiry-card',
        '.home-social-item',
        '.conference-highlight-inner-container',
        /* Section-level blocks */
        '.category-section',
        '.chapter-stats-strip',
        '.photo-deck',
        '.conference-next',
        '.conference',
        '.sponsor-contact-block',
        '.wwad-container',
        '.support-container',
        '.about-cta-banner',
        '.chapter-identity',
        '.team-zone',
    ].join(', ');

    function init() {
        if (!window.IntersectionObserver) return; // graceful fallback for old browsers

        var els = Array.prototype.slice.call(document.querySelectorAll(SELECTORS));

        /* Stagger siblings that share the same direct parent */
        var parentMap = {};
        els.forEach(function (el) {
            var key = el.parentElement ? el.parentElement : '__root__';
            if (!parentMap[key]) parentMap[key] = [];
            parentMap[key].push(el);
        });
        Object.keys(parentMap).forEach(function (key) {
            var siblings = parentMap[key];
            if (siblings.length > 1) {
                siblings.forEach(function (el, i) {
                    el.style.transitionDelay = (i * 0.07) + 's';
                });
            }
        });

        /* Mark hidden */
        els.forEach(function (el) {
            el.classList.add('sr-hidden');
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('sr-hidden');
                    entry.target.classList.add('sr-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        els.forEach(function (el) { observer.observe(el); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
