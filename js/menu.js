document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */
    var burgerToggle = document.getElementById('burgerToggle');
    var mobileMenu   = document.getElementById('mobileMenu');

    if (burgerToggle && mobileMenu) {
        burgerToggle.addEventListener('click', function () {
            burgerToggle.classList.toggle('menu-open');
            mobileMenu.classList.toggle('menu-open');
            burgerToggle.setAttribute('aria-expanded',
                burgerToggle.classList.contains('menu-open') ? 'true' : 'false');
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                burgerToggle.classList.remove('menu-open');
                mobileMenu.classList.remove('menu-open');
                burgerToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */
    var header = document.querySelector('header');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('header--scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once in case page loads scrolled
    }

    /* =====================================================
       SCROLL REVEAL — directional variant system
       ===================================================== */
    if (!window.IntersectionObserver) return;

    /* Map: CSS selector -> which sr- class to apply
       'up'    = sr-up    (fade + translateY)
       'left'  = sr-left  (fade + translateX negative)
       'right' = sr-right (fade + translateX positive)
       'scale' = sr-scale (fade + scale down)
       'fade'  = sr-fade  (opacity only)
    */
    var revealMap = [
        // ---- HOME ----
        { sel: '.hero-overlay',                         dir: 'fade'  },
        { sel: '.highlights-section',                   dir: 'up'    },
        { sel: '.mission-split-left',                   dir: 'left'  },
        { sel: '.mission-split-right',                  dir: 'right' },
        { sel: '.president-card',                       dir: 'scale' },
        { sel: '.partner-strip',                        dir: 'fade'  },
        { sel: '.partner-logo-item',                    dir: 'up'    },
        { sel: '.mission-practice-header',              dir: 'up'    },
        { sel: '.practice-card',                        dir: 'scale' },
        { sel: '.mission-practice-cta',                 dir: 'up'    },
        { sel: '.home-contact-header',                  dir: 'up'    },
        { sel: '.home-social-item',                     dir: 'scale' },
        { sel: '.home-inquiry-card',                    dir: 'up'    },
        // ---- ABOUT ----
        { sel: '.chapter-identity-text',                dir: 'left'  },
        { sel: '.photo-deck',                           dir: 'right' },
        { sel: '.chapter-stats-strip',                  dir: 'up'    },
        { sel: '.chapter-stat',                         dir: 'up'    },
        { sel: '.zone-title',                           dir: 'left'  },
        { sel: '.team-member',                          dir: 'scale' },
        { sel: '.about-cta-banner',                     dir: 'up'    },
        // ---- INITIATIVES ----
        { sel: '.category-header',                      dir: 'left'  },
        { sel: '.featured-initiative-card',             dir: 'scale' },
        { sel: '.wwad-content',                         dir: 'up'    },
        // ---- SPONSORS ----
        { sel: '.sponsor-content h1',                   dir: 'up'    },
        { sel: '.stat-item',                            dir: 'up'    },
        { sel: '.sponsor-grid',                         dir: 'up'    },
        { sel: '.sponsor-logo',                         dir: 'scale' },
        { sel: '.sponsor-title',                        dir: 'up'    },
        { sel: '.tier-card',                            dir: 'scale' },
        { sel: '.impact-category',                      dir: 'up'    },
        { sel: '.sponsor-contact-block',                dir: 'up'    },
        { sel: '.packet-embed-section',                 dir: 'up'    },
        { sel: '.packet-deck',                          dir: 'scale' },
        // ---- CONFERENCE ----
        { sel: '.conference-content',                   dir: 'up'    },
        { sel: '.conference-highlight-inner-container', dir: 'up'    },
        { sel: '.faq-accordion-item',                   dir: 'up'    },
        { sel: '.conference-next',                      dir: 'up'    },
        // ---- CONTACT ----
        { sel: '.contact-title',                        dir: 'up'    },
        { sel: '.social-item',                          dir: 'scale' },
        { sel: '.inquiry-card',                         dir: 'up'    },
    ];

    var dirClass = { up: 'sr-up', left: 'sr-left', right: 'sr-right', scale: 'sr-scale', fade: 'sr-fade' };

    // Collect all elements with their direction
    var items = [];
    revealMap.forEach(function (rule) {
        document.querySelectorAll(rule.sel).forEach(function (el) {
            // Don't double-register
            if (!el.dataset.srDir) {
                el.dataset.srDir = rule.dir;
                items.push(el);
            }
        });
    });

    if (!items.length) return;

    // Stagger siblings sharing the same direct parent
    var parentsSeen = [];
    items.forEach(function (el) {
        var par = el.parentElement;
        if (!par || parentsSeen.indexOf(par) !== -1) return;
        var siblings = items.filter(function (s) { return s.parentElement === par; });
        if (siblings.length > 1) {
            parentsSeen.push(par);
            siblings.forEach(function (s, i) {
                s.style.transitionDelay = (i * 0.085) + 's';
            });
        }
    });

    // Apply hidden classes
    items.forEach(function (el) {
        el.classList.add(dirClass[el.dataset.srDir] || 'sr-up');
    });

    // Observe and reveal
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    el.classList.remove(dirClass[el.dataset.srDir] || 'sr-up');
                    el.classList.add('sr-visible');
                });
            });
            observer.unobserve(el);
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });

    /* =====================================================
       STAT COUNTER ANIMATION
       Counts up numeric stat-numbers when they enter view
       ===================================================== */
    var statNumbers = document.querySelectorAll('.stat-number, .chapter-stat-number');
    if (statNumbers.length) {
        var parseTarget = function (text) {
            // e.g. "300+", "3.52", "90%", "20+"
            var cleaned = text.replace(/[^0-9.]/g, '');
            return parseFloat(cleaned) || 0;
        };
        var getSuffix = function (text) {
            return text.replace(/[0-9.]/g, '');
        };

        var countUp = function (el, target, suffix, decimals, duration) {
            var start = 0;
            var startTime = null;
            var step = function (ts) {
                if (!startTime) startTime = ts;
                var progress = Math.min((ts - startTime) / duration, 1);
                // Ease out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = start + (target - start) * eased;
                el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var original = el.dataset.originalText || el.textContent;
                el.dataset.originalText = original;
                var target   = parseTarget(original);
                var suffix   = getSuffix(original);
                var decimals = (original.indexOf('.') !== -1) ? 2 : 0;
                countUp(el, target, suffix, decimals, 1200);
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) { counterObserver.observe(el); });
    }

});
