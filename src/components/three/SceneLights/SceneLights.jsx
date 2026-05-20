export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2.5} 
        color="#dfb15b" 
        castShadow
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={1.5} 
        color="#b36b3f" 
      />
      <pointLight position={[0, -2, 2]} intensity={1} color="#f4f4f6" />
    </>
  );
}
