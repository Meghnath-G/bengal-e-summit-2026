import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StatisticsSection.css';

gsap.registerPlugin(ScrollTrigger);

// Custom internal component to handle loading and rendering the Chakra model with dynamic materials & mouse-tracking
function ChakraContainer() {
  const groupRef = useRef();
  const { mouse } = useThree();

  // Load the model and high-fidelity PBR textures using standard Drei loader hooks
  const { scene } = useGLTF('/models/sudarshan_chakra/Chakra.glb');

  const [colorMap, metalRoughMap, normalMap] = useTexture([
    '/models/sudarshan_chakra/DefaultMaterial_Base_color_1.png',
    '/models/sudarshan_chakra/DefaultMaterial_Metallic-DefaultMaterial_Roughness_2@channel.png',
    '/models/sudarshan_chakra/DefaultMaterial_Normal_OpenGL_0.png',
  ]);

  useEffect(() => {
    if (!scene || !colorMap) return;

    // Apply color spaces and flip settings to avoid muddy coloring & silhouette behavior in Three r184
    colorMap.colorSpace = 'srgb';
    colorMap.flipY = false;
    metalRoughMap.flipY = false;
    normalMap.flipY = false;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: colorMap,
          metalnessMap: metalRoughMap,
          roughnessMap: metalRoughMap,
          normalMap: normalMap,
          metalness: 1.0,
          roughness: 1.0,
          envMapIntensity: 2.5, // Boost metallic reflection intensity
        });
        child.material.needsUpdate = true;
      }
    });

    // Dynamic auto-centering & cinematic scale lock matching main.js math
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const scale = 3.5 / maxDim;
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      scene.scale.set(scale, scale, scale);
    }
  }, [scene, colorMap, metalRoughMap, normalMap]);

  // Buttery-smooth cinematic frame rotation and mouse follow interpolations
  useFrame(() => {
    if (groupRef.current) {
      // Auto rotation
      groupRef.current.rotation.y += 0.002;

      // Normalized mouse coords follow logic
      const targetX = mouse.x * 0.12;
      const targetY = mouse.y * 0.12;

      // Base tilts: x = 0.3, z = -0.1
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x + 0.3);
      groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z - 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// Fallback loader component for graceful rendering
function ModelLoader() {
  return null;
}

export default function StatisticsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Stat Blocks GSAP staggered ScrollTrigger animations matching main.js exactly
    const triggers = [];
    const blocks = gsap.utils.toArray('.stat-block');
    blocks.forEach((block, i) => {
      const anim = gsap.to(block, {
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: i * 0.2, // Staggered delay
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // Highly efficient IntersectionObserver to dynamically pause R3F rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '300px' } // Preload buffer
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      triggers.forEach(t => t.kill());
      observer.disconnect();
    };
  }, []);

  return (
    <section className="statistics-showcase" id="statistics-showcase" ref={sectionRef}>
      <div className="stats-container">

        {/* Left Side: Dynamic React Three Fiber Canvas with the Sudarshan Chakra Model */}
        <div className="stats-model-container" id="chakra-container">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
              powerPreference: "high-performance",
            }}
            frameloop={inView ? 'always' : 'never'}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Cinematic scene lighting setup */}
            <ambientLight intensity={1.2} color="#404040" />
            <hemisphereLight intensity={1.5} color="#ffe194" groundColor="#080820" />
            <directionalLight intensity={2.5} color="#ffe194" position={[5, 5, 5]} />
            <directionalLight intensity={1.0} color="#d4a853" position={[-5, -5, -5]} />

            {/* Standard pre-built ambient map environment for metallic glints */}
            <Environment preset="city" />

            <Suspense fallback={<ModelLoader />}>
              <ChakraContainer />
            </Suspense>
          </Canvas>
        </div>

        {/* Right Side: Editorial Stats Blocks */}
        <div className="stats-content">
          <div className="stat-block">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-text">Total Participants</p>
          </div>
          <div className="stat-block">
            <h3 className="stat-number">30+</h3>
            <p className="stat-text">Total Industry Leaders</p>
          </div>
          <div className="stat-block">
            <h3 className="stat-number">13+</h3>
            <p className="stat-text">Mega Events</p>
          </div>
        </div>

      </div>
    </section>
  );
}
