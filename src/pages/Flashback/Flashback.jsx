import CinematicTransition from '../../components/common/CinematicTransition/CinematicTransition';

export default function Flashback() {
  return (
    <CinematicTransition>
      <section className="page-section flashback">
        <h1 className="cinematic-section-title">Flashback</h1>
        <p className="body-text" style={{ marginTop: '2rem' }}>
          We will be coming soon with your request, just hang on for a bit.
          For now, for going back press the back button and enjoy other pages.
        </p>
      </section>
    </CinematicTransition>
  );
}
