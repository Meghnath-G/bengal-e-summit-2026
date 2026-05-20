document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll per constraints
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    // 2. Scroll Animations (IntersectionObserver API threshold 0.1)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || '0';
                
                // Add the revealed class using the configured delay
                setTimeout(() => {
                    el.classList.add("revealed");
                }, parseInt(delay));

                // Unobserve after animating once
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Speakers Cards Stagger: 60ms per card
    const speakerCards = document.querySelectorAll(".speaker-card.scroll-reveal");
    speakerCards.forEach((card, index) => {
        // Since they appear in rows of 6, stagger delay based on index
        const delay = (index % 6) * 60; 
        card.setAttribute('data-delay', delay);
        elementObserver.observe(card);
    });

    // Partner Boxes Stagger: 80ms per box
    const partnerBoxes = document.querySelectorAll('.logo-box.scroll-reveal');
    partnerBoxes.forEach((box, index) => {
        const delay = (index % 6) * 80;
        box.setAttribute('data-delay', delay);
        elementObserver.observe(box);
    });

    // Section Headings: no stagger specified, default 0ms delay
    const sectionHeadings = document.querySelectorAll(".section-heading-reveal");
    sectionHeadings.forEach(heading => {
        elementObserver.observe(heading);
    });
});
