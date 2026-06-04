document.addEventListener('DOMContentLoaded', () => {
    // KALKI CINEMATIC PRELOADER
    const preloader = document.getElementById("kalki-cinematic-preloader");
    const loadingBar = document.getElementById("kalki-loading-bar");
    const progressText = document.getElementById("kalki-progress-text");
    const lightningOverlay = document.getElementById("kalki-lightning");
    const particlesContainer = document.getElementById("kalki-particles");
    const whiteFlash = document.getElementById("kalki-white-flash");

    if (preloader && loadingBar && progressText) {

        // 1. Generate Floating Divine Particles
        if (particlesContainer) {
            const particleCount = 45;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.classList.add("kalki-particle");

                // Randomize properties for organic feel
                const size = Math.random() * 4 + 1; // 1px to 5px
                const posX = Math.random() * 100; // 0 to 100vw
                const posY = Math.random() * 100; // 0 to 100vh
                const delay = Math.random() * 5; // 0 to 5s delay
                const duration = Math.random() * 4 + 6; // 6s to 10s duration
                const maxOpacity = Math.random() * 0.6 + 0.2; // 0.2 to 0.8 peak opacity

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}vw`;
                particle.style.top = `${posY}vh`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.setProperty('--max-opacity', maxOpacity);

                particlesContainer.appendChild(particle);
            }
        }

        // 2. Subtle Cinematic Lightning Flashes
        let flashInterval;
        if (lightningOverlay) {
            flashInterval = setInterval(() => {
                if (Math.random() > 0.75) { // 25% chance to flash every tick
                    lightningOverlay.style.opacity = (Math.random() * 0.12 + 0.05).toString();
                    setTimeout(() => {
                        lightningOverlay.style.opacity = "0";
                    }, Math.random() * 150 + 50);
                }
            }, 1000);
        }

        // 3. Smooth Energy Loading Bar
        let progress = 0;
        const totalDuration = 7000; // 7 seconds for a highly cinematic slow buildup
        const intervalTime = 30;
        const increment = 100 / (totalDuration / intervalTime);

        const loadingInterval = setInterval(() => {
            progress += increment;

            let displayProgress = Math.floor(progress);
            if (displayProgress > 100) displayProgress = 100;

            // Update UI
            progressText.innerText = displayProgress.toString().padStart(2, '0') + "%";
            loadingBar.style.width = displayProgress + "%";

            // 4. Climax Transition at 100%
            if (progress >= 100) {
                clearInterval(loadingInterval);
                if (flashInterval) clearInterval(flashInterval);

                progressText.innerText = "100%";
                loadingBar.style.width = "100%";

                // Trigger Massive Cinematic Flash
                if (whiteFlash) {
                    whiteFlash.classList.add('flashed');
                }

                // Fade out after flash hits peak
                setTimeout(() => {
                    preloader.classList.add("hidden");

                    // Optional: remove a "loading" class from your body tag here
                    if (document.body.classList.contains("loading")) {
                        document.body.classList.remove("loading");
                    }

                    // Cleanup DOM
                    setTimeout(() => {
                        preloader.remove();
                    }, 1000);
                }, 300);
            }
        }, intervalTime);
    }
});
