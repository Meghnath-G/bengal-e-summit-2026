import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function ChakraModel() {
  const modelRef = useRef();
  
  // Note: Model will be loaded from public/models/sudarshan_chakra/Chakra.glb
  // Uncomment and adjust path once model is placed:
  // const { scene } = useGLTF('/models/sudarshan_chakra/Chakra.glb');

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2; // Slow cinematic rotation
    }
  });

  return (
    <group ref={modelRef}>
      {/* <primitive object={scene} /> */}
      {/* Placeholder mesh until actual model is migrated */}
      <mesh>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color="#dfb15b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
