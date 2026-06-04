// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Configuration for frames
const frameCount = 181;
const framePrefix = "video_project/web_frame_loading-page";
const frameExtension = ".jpg";
const images = [];
const frames = {
    currentIndex: 0
};

// Canvas Setup
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d", { alpha: false }); // Optimization for opaque JPG frames

// Ensure canvas fills the screen cinematically (cover mode) with High-DPI support
function resizeCanvas() {
    // STRICT HIGH-DPI / RETINA SCALING LOCK
    const dpr = Math.max(window.devicePixelRatio || 1, 2); // Minimum DPR of 2
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    render(); // Re-render current frame on resize
}
window.addEventListener('resize', resizeCanvas);

// Helper to format frame numbers (e.g., 1 -> "00001")
function padFrame(number) {
    return number.toString().padStart(5, '0');
}

// Preload Images
function preloadImages() {
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `${framePrefix}${padFrame(i)}${frameExtension}`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1) {
                // Render the first frame as soon as it loads
                resizeCanvas();
            }
            if (loadedCount === frameCount) {
                // All images loaded, initialization could happen here if we wanted to wait
                initScrollAnimations();
            }
        };
        images.push(img);
    }
}

// Render function mimicking object-fit: cover
function render() {
    // Math.round ensures smooth floating point GSAP tweening maps cleanly to discrete frame integers
    const frameIndex = Math.round(frames.currentIndex);
    if (!images[frameIndex] || !images[frameIndex].complete) return;

    const img = images[frameIndex];

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        // Canvas is wider than image (fit width)
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        // Image is wider than canvas (fit height)
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    // MAXIMUM SHARPNESS & QUALITY LOCK
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Removed context.clearRect() for performance boost since 'cover' guarantees full canvas draw
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// Initialize ScrollTrigger Animations
function initScrollAnimations() {
    const sequenceContainer = document.getElementById("scroll-sequence");

    // 1. Frame Sequence Animation
    gsap.to(frames, {
        currentIndex: frameCount - 1,
        // Removed snap to allow buttery smooth float interpolation, reducing micro-stutter
        ease: "none",
        scrollTrigger: {
            trigger: sequenceContainer,
            start: "top top",
            end: () => "+=" + window.innerHeight * 4, // Exactly matches the original 400vh scroll scrub
            scrub: 1.2, // Increased slightly for premium Apple-like cinematic fluidity
        },
        onUpdate: render
    });

    // 2. Hero Section Fade Out (Early in the scroll)
    gsap.to(".hero-section", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: sequenceContainer,
            start: () => "+=" + window.innerHeight * 0.1, // Original 2%
            end: () => "+=" + window.innerHeight * 0.75, // Original 15%
            scrub: 1
        }
    });

    // 3. Plot Section Fade In and Out
    const plotTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: sequenceContainer,
            start: () => "+=" + window.innerHeight * 1.0, // Original 20%
            end: () => "+=" + window.innerHeight * 3.25, // Original 65%
            scrub: 1.5
        }
    });

    plotTimeline
        .to(".plot-section", { opacity: 1, duration: 1.5, ease: "power2.out" })
        .to(".continue-text", { opacity: 0.5, duration: 1.5, ease: "power2.out" }, "<")
        .to(".plot-section, .continue-text", { opacity: 0, duration: 1.5, ease: "power2.in" }, "+=2"); // Hold then fade out

    // 4. Blackout Transition (Extended)
    gsap.to(".blackout-overlay", {
        opacity: 1, // Completely fade to black, NO trace of background
        ease: "none",
        scrollTrigger: {
            trigger: sequenceContainer,
            start: () => "+=" + window.innerHeight * 3.8, // Begin fading out city earlier
            end: () => "+=" + window.innerHeight * 4.2, // Guaranteed fully black at 420vh
            scrub: true // Strict 1:1 scroll synchronization without lerping lag
        }
    });

    // 5. Climax Section Fade In & Out
    const climaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: sequenceContainer,
            start: () => "+=" + window.innerHeight * 4.6, // Explicit 40vh physical scroll gap after blackout finishes!
            end: "bottom bottom", // Fills the massive new remaining space dynamically
            scrub: 1.5 // Smooth lerp-based interpolation
        }
    });

    climaxTimeline
        .to(".climax-section", { opacity: 1, duration: 0.1, ease: "none" }) // Enable container visibility

        // Sentence 1
        .fromTo(".climax-intro.line-1",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 2, ease: "power1.inOut" })

        // Extended pause for reading
        .to({}, { duration: 3 })

        // Sentence 2
        .fromTo(".climax-intro.line-2",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 2, ease: "power1.inOut" })

        // Massive emotional pause before climax
        .to({}, { duration: 5 })

        // Final Reveal
        .fromTo(".climax-reveal",
            { opacity: 0, scale: 0.92, y: 30, filter: "blur(8px)" },
            { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 5, ease: "power2.out" })

        // Hold on screen, then fade out
        .to({}, { duration: 2 })
        .to(".climax-section", { opacity: 0, duration: 2, ease: "power2.inOut" });

    // Initial Climax Scale Setup
    gsap.set(".climax-reveal", { scale: 0.85 });

    // 6. About Section Cinematic Entry
    // The about-section is 250vh tall. about-content is sticky.
    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top top", // When the black canvas un-pins, this starts
            end: "bottom bottom",
            scrub: 1.5
        }
    });

    // Staggered cinematic reveal from darkness
    aboutTimeline
        .fromTo(".about-tag", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" })
        .fromTo(".about-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "-=0.5")
        .fromTo(".about-text", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" }, "-=1")
        .fromTo(".about-footer", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "-=1.5")
        // add a small pause at the end so it's fully visible before scrolling past
        .to({}, { duration: 1 });
}

// Start sequence
preloadImages();

/**
 * Navigation Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navRight = document.getElementById('nav-right');

    if (mobileMenuBtn && navRight) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = mobileMenuBtn.classList.toggle('active');
            navRight.classList.toggle('active');

            // Prevent scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : 'auto';

            // Add cinematic fade to background if needed
            const navbar = document.querySelector('.navbar');
            if (isActive) {
                navbar.style.background = 'rgba(4, 6, 14, 0.98)';
            } else {
                navbar.style.background = 'rgba(4, 6, 14, 0.55)';
            }
        });

        // Close menu when a link is clicked
        const navLinks = navRight.querySelectorAll('.nav-link, .btn-register');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navRight.classList.remove('active');
                document.body.style.overflow = 'auto';
                document.querySelector('.navbar').style.background = 'rgba(4, 6, 14, 0.55)';
            });
        });
    }
});
// ============================================
// COUNTDOWN TIMER WITH SCROLL/ROLL ANIMATION
// ============================================

// SET YOUR TARGET DATE HERE
const TARGET_DATE = new Date('2026-03-15T10:00:00');

// Track previous values to detect changes
let prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

// Build digit track for each unit
// Each track contains: prev digit, current digit, next digit
// so we can animate up or down
function buildTrack(trackEl, value) {
    const padded = String(value).padStart(2, '0');
    trackEl.innerHTML = '';
    // Add digit above (for roll-in animation)
    const above = document.createElement('div');
    above.className = 'tile-digit';
    above.textContent = padded;
    // Current digit
    const current = document.createElement('div');
    current.className = 'tile-digit';
    current.textContent = padded;
    // Add digit below
    const below = document.createElement('div');
    below.className = 'tile-digit';
    below.textContent = padded;
    trackEl.appendChild(above);
    trackEl.appendChild(current);
    trackEl.appendChild(below);
    // Start at middle (current digit visible)
    const h = trackEl.parentElement.offsetHeight || 110;
    trackEl.style.transform = `translateY(-${h}px) translateZ(0)`;
    trackEl.style.transition = 'none';
}

// Animate the track rolling up to new value
function rollTo(trackEl, newValue) {
    const padded = String(newValue).padStart(2, '0');
    const h = trackEl.parentElement.offsetHeight || 110;
    // Update the bottom digit to new value
    const digits = trackEl.querySelectorAll('.tile-digit');
    if (digits[2]) digits[2].textContent = padded;
    // Trigger roll animation
    trackEl.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    trackEl.style.transform = `translateY(-${h * 2}px) translateZ(0)`;
    // After animation: reset track silently
    setTimeout(() => {
        if (digits[0]) digits[0].textContent = padded;
        if (digits[1]) digits[1].textContent = padded;
        if (digits[2]) digits[2].textContent = padded;
        trackEl.style.transition = 'none';
        trackEl.style.transform = `translateY(-${h}px) translateZ(0)`;
    }, 520);
}

// Initialize all four tracks
function initTracks() {
    const now = new Date();
    const diff = TARGET_DATE - now;
    if (diff <= 0) {
        buildTrack(document.getElementById('days-track'), 0);
        buildTrack(document.getElementById('hours-track'), 0);
        buildTrack(document.getElementById('minutes-track'), 0);
        buildTrack(document.getElementById('seconds-track'), 0);
        return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    buildTrack(document.getElementById('days-track'), d);
    buildTrack(document.getElementById('hours-track'), h);
    buildTrack(document.getElementById('minutes-track'), m);
    buildTrack(document.getElementById('seconds-track'), s);
    prevValues = { days: d, hours: h, minutes: m, seconds: s };
}

// Update every second — only roll if value changed
function updateCountdown() {
    const now = new Date();
    const diff = TARGET_DATE - now;
    if (diff <= 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(unit => {
            const track = document.getElementById(`${unit}-track`);
            if (prevValues[unit] !== 0) {
                rollTo(track, 0);
                prevValues[unit] = 0;
            }
        });
        return;
    }
    const values = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
    Object.keys(values).forEach(unit => {
        if (values[unit] !== prevValues[unit]) {
            rollTo(document.getElementById(`${unit}-track`), values[unit]);
            prevValues[unit] = values[unit];
        }
    });
}

// GSAP scroll animation for the section
gsap.from('.countdown-section', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.countdown-section',
        start: 'top 80%'
    }
});

gsap.from('.countdown-tile', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
    clearProps: 'transform', // CRITICAL: Removes inline transform to restore CSS translateZ(0) hardware layer
    scrollTrigger: {
        trigger: '.countdown-tiles',
        start: 'top 85%'
    }
});

// Boot
window.addEventListener('DOMContentLoaded', () => {
    initTracks();
    setInterval(updateCountdown, 1000);
});

// =============================================
// STORY PANELS — PURE CSS 3D CAROUSEL
// =============================================

(function () {
    const section = document.getElementById('story');
    if (!section) return;

    const panels = Array.from(document.querySelectorAll('.story-panel'));
    const navItems = Array.from(document.querySelectorAll('.story-nav-item'));
    const totalPanels = panels.length;
    let currentPanel = 0;

    function updateCarousel(index) {
        currentPanel = index;

        // Update Nav Dots
        navItems.forEach((n, i) => {
            if (i === index) n.classList.add('active');
            else n.classList.remove('active');
        });

        // Update Panels using Pure CSS Classes
        panels.forEach((panel, i) => {
            // Clean previous state classes
            panel.classList.remove('panel-center', 'panel-left', 'panel-right');

            if (i === currentPanel) {
                panel.classList.add('panel-center');
            } else {
                // Calculate shortest distance in a circular carousel
                // (if more than 3, we'd need more logic, but user stated EXACTLY 3)
                // If diff is 1, it's right. If diff is -1, it's left.
                // If current is 0 and i is 2, diff is 2 -> left (-1 equivalent mod 3).

                let diff = i - currentPanel;

                // Handle wrap around for exactly 3 items
                if (diff === 2) diff = -1;
                if (diff === -2) diff = 1;

                if (diff === -1) {
                    panel.classList.add('panel-left');
                } else if (diff === 1) {
                    panel.classList.add('panel-right');
                }
            }
        });
    }

    // --- Cinematic Auto-Rotation System ---
    let autoRotateInterval;
    let interactionTimeout;
    const ROTATION_DELAY = 2000; // EXACTLY 2 seconds as requested
    const INACTIVITY_DELAY = 5000;

    function startAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            updateCarousel((currentPanel + 1) % totalPanels);
        }, ROTATION_DELAY);
    }

    function pauseAutoRotate() {
        clearInterval(autoRotateInterval);
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
            startAutoRotate();
        }, INACTIVITY_DELAY);
    }

    // Init
    updateCarousel(0);
    startAutoRotate(); // Start cinematic progression immediately after load

    // Global Section Hover - Pause rotation when cursor is inside the storytelling area
    section.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    section.addEventListener('mouseleave', () => {
        clearTimeout(interactionTimeout);
        startAutoRotate();
    });

    // Click panel to bring to center (Manual override)
    panels.forEach((panel, index) => {
        panel.addEventListener('click', () => {
            pauseAutoRotate(); // Defer auto-rotation on interaction
            if (currentPanel !== index) updateCarousel(index);
        });
        // Mobile touch interaction
        panel.addEventListener('touchstart', pauseAutoRotate, { passive: true });
    });

    // Nav dots
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            pauseAutoRotate();
            if (currentPanel !== index) updateCarousel(index);
        });
    });

    // CTAs
    document.querySelectorAll('.panel-cta, .panel-next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent panel click
            pauseAutoRotate();
            if (currentPanel < panels.length - 1) {
                updateCarousel(currentPanel + 1);
            }
        });
    });

})();

//////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Generate cards for tracks
    const imageFiles = [
        'img1_jpg.JPG', 'img2_jpg.JPG', 'img3_jpg.JPG', 'img4_jpg.JPG', 'img5_jpg.JPG',
        'img6_jpg.JPG', 'img7_jpg.JPG', 'img8_jpg.JPG', 'img9_jpg.JPG', 'img10_jpg.JPG',
        'img11_jpg.JPG', 'img12_jpg.JPG', 'img13_jpg.JPG', 'img14_jpg.JPG', 'img15_jpg.JPG',
        'img16_jpg.JPG', 'img17_webp.webp', 'img18_webp.webp', 'img19_webp.webp', 'img20_webp.webp',
        'img21_webp.webp', 'img22_webp.webp', 'img23_webp.webp', 'img24_webp.webp', 'img25_webp.webp',
        'img26_webp.webp', 'img27_webp.webp', 'img28_webp.webp', 'img29_webp.webp', 'img30_jpg.JPG',
    ];

    const rows = [
        { selector: '.row-1 .carousel-track', startIndex: 0, endIndex: 10 },
        { selector: '.row-2 .carousel-track', startIndex: 10, endIndex: 20 },
        { selector: '.row-3 .carousel-track', startIndex: 20, endIndex: 30 }
    ];

    rows.forEach(rowInfo => {
        const track = document.querySelector(rowInfo.selector);
        if (!track) return;

        let html = '';
        for (let i = rowInfo.startIndex; i < rowInfo.endIndex; i++) {
            const filename = imageFiles[i];
            // Fix spaces in URL path by using %20 or template literal
            html += `
                <div class="card">
                    <img src="images/for carousel/${filename}" alt="Flashback ${i + 1}" loading="lazy">
                </div>
            `;
        }

        // Populate the track with original cards
        track.innerHTML = html;

        // Duplicate the cards for seamless CSS scroll loop
        track.innerHTML += track.innerHTML;
    });

    // Hover and Touch support to pause rows
    const carouselRows = document.querySelectorAll('.carousel-row');

    carouselRows.forEach(row => {
        // Desktop hover
        row.addEventListener('mouseenter', () => {
            row.classList.add('is-paused');
        });
        row.addEventListener('mouseleave', () => {
            row.classList.remove('is-paused');
        });

        // Touch devices
        row.addEventListener('touchstart', () => {
            row.classList.add('is-paused');
        }, { passive: true });
        row.addEventListener('touchend', () => {
            row.classList.remove('is-paused');
        }, { passive: true });
        row.addEventListener('touchcancel', () => {
            row.classList.remove('is-paused');
        }, { passive: true });
    });

    // Video Play/Pause functionality
    const video = document.querySelector('.video-wrapper video');
    const playPauseBtn = document.querySelector('.play-pause-btn');

    if (video && playPauseBtn) {
        const togglePlay = () => {
            if (video.paused) {
                video.play();
                playPauseBtn.classList.add('paused');
                playPauseBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"/>
                        <rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"/>
                    </svg>
                `;
            } else {
                video.pause();
                playPauseBtn.classList.remove('paused');
                playPauseBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M5 3l14 9-14 9V3z" stroke-linejoin="round" stroke-linecap="round"/>
                    </svg>
                `;
            }
        };

        playPauseBtn.addEventListener('click', togglePlay);

        // Toggle on video click too for better UX
        video.addEventListener('click', togglePlay);
    }
});

// ==========================================
// 3D SUDARSHAN CHAKRA INITIALIZATION
// ==========================================
function initChakraModel() {
    const container = document.getElementById('chakra-container');
    if (!container) return;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();

    // Transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Cinematic output encoding
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2); // soft dark ambient light
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffe194, 0x080820, 1.5); // Warm gold from above, dark blue from below
    scene.add(hemiLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffe194, 2.5); // warm gold light
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xd4a853, 1); // secondary cool/warm rim light
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Procedural Environment for metallic reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x050505);
    const envLight1 = new THREE.DirectionalLight(0xffe194, 3);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xd4a853, 2);
    envLight2.position.set(-1, -0.5, -1);
    envScene.add(envLight2);
    scene.environment = pmremGenerator.fromScene(envScene).texture;

    let chakraModel = null;

    // Load PBR Textures Manually
    const texLoader = new THREE.TextureLoader();
    const basePath = 'models/sudarshan_chakra/';

    const colorMap = texLoader.load(basePath + 'DefaultMaterial_Base_color_1.png');
    colorMap.encoding = THREE.sRGBEncoding;
    colorMap.flipY = false;

    const metalRoughMap = texLoader.load(basePath + 'DefaultMaterial_Metallic-DefaultMaterial_Roughness_2@channel.png');
    metalRoughMap.flipY = false;

    const normalMap = texLoader.load(basePath + 'DefaultMaterial_Normal_OpenGL_0.png');
    normalMap.flipY = false;

    // Load Model
    const loader = new THREE.GLTFLoader();
    loader.load(basePath + 'Chakra.glb', function (gltf) {
        chakraModel = gltf.scene;

        // Attach PBR textures and configure materials for cinematic look
        chakraModel.traverse((child) => {
            if (child.isMesh) {
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial();
                }
                child.material.map = colorMap;
                child.material.metalnessMap = metalRoughMap;
                child.material.roughnessMap = metalRoughMap;
                child.material.normalMap = normalMap;

                child.material.metalness = 1.0;
                child.material.roughness = 1.0;
                child.material.envMapIntensity = 1.5; // Boost metallic reflections
                child.material.needsUpdate = true;
            }
        });

        // Center and scale the model dynamically
        const box = new THREE.Box3().setFromObject(chakraModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        if (maxDim > 0) {
            const scale = 3.5 / maxDim; // Make it large enough to dominate the left side

            chakraModel.position.x = -center.x * scale;
            chakraModel.position.y = -center.y * scale;
            chakraModel.position.z = -center.z * scale;
            chakraModel.scale.set(scale, scale, scale);
        }

        const wrapper = new THREE.Group();
        wrapper.add(chakraModel);

        // Tilt slightly for cinematic perspective
        wrapper.rotation.x = 0.3;
        wrapper.rotation.z = -0.1;

        scene.add(wrapper);
        chakraModel = wrapper; // for rotation in loop
    }, undefined, function (error) {
        console.error('Error loading Chakra model:', error);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Optional subtle mouse interaction
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    function animate() {
        requestAnimationFrame(animate);

        if (chakraModel) {
            // Auto rotation (slow)
            chakraModel.rotation.y += 0.002;

            // Subtle mouse follow (smooth easing)
            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;
            chakraModel.rotation.x += 0.05 * (targetY - chakraModel.rotation.x + 0.3); // Maintain the base 0.3 tilt
            chakraModel.rotation.z += 0.05 * (targetX - chakraModel.rotation.z - 0.1); // Maintain the base -0.1 tilt
        }

        renderer.render(scene, camera);
    }
    animate();
}

// Initialize Statistics and 3D Model independently
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the element exists
    if (document.getElementById('statistics-showcase')) {
        initChakraModel();

        // Stats Scroll Animations (GSAP)
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.utils.toArray('.stat-block').forEach((block, i) => {
                gsap.to(block, {
                    scrollTrigger: {
                        trigger: block,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: i * 0.2 // Staggered fade in
                });
            });
        }
    }
});
