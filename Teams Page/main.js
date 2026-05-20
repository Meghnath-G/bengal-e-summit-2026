document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add staggered delay if it's a card in a grid
                let delay = 0;
                if (target.classList.contains('team-card')) {
                    const grid = target.closest('.card-grid');
                    if (grid) {
                        const cards = Array.from(grid.querySelectorAll('.team-card'));
                        const index = cards.indexOf(target);
                        if (index > -1) {
                            delay = index * 80;
                        }
                    }
                }

                // Using Web Animations API for scroll reveal to strictly follow 
                // "CSS transitions only for hover effects" and "No JS animation libraries" rule.
                target.animate([
                    { opacity: 0, transform: 'translateY(28px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 600,
                    easing: 'ease-out',
                    fill: 'forwards',
                    delay: delay
                });
                
                // Apply final state statically after animation finishes
                setTimeout(() => {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }, delay + 600);

                // Unobserve after revealing
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.section-title, .glowing-divider, .team-card, .coming-soon-container');
    
    revealElements.forEach(el => {
        // CSS initially sets opacity: 0 and transform: translateY(28px)
        revealObserver.observe(el);
    });
});
