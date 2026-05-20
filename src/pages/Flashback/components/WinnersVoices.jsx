import { useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/WinnersVoices.css';

export default function WinnersVoices() {
  useEffect(() => {
    // Top Champions Card slide-in from left
    gsap.fromTo('#winners-card',
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#champions', start: 'top 80%' }
      }
    );

    // Left Voices Card slide-in from left
    gsap.fromTo('#left-voices-card',
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#guests-investors', start: 'top 80%' }
      }
    );

    // Right Investors Card slide-in from right
    gsap.fromTo('#right-voices-card',
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#guests-investors', start: 'top 80%' }
      }
    );
  }, []);

  return (
    <>
      {/* ═══════════ PREVIOUS YEAR CHAMPIONS ═══════════ */}
      <section id="champions" className="section-wv">
        <div className="wv-container">
          <div className="wv-card" id="winners-card">
            <div className="card-header">
              <span className="card-icon">🏆</span>
              <h2 className="card-title">PREVIOUS YEAR CHAMPIONS</h2>
            </div>
            <div className="champions-grid">

              <div className="winner-row">
                <p className="winner-prize">INVESTOPIA 2025</p>
                <div className="winner-names">
                  <p className="winner-name">1st: Team Alpha</p>
                  <p className="winner-name">2nd: Beta Corp</p>
                  <p className="winner-name">3rd: Gamma Inc</p>
                </div>
              </div>

              <div className="winner-row">
                <p className="winner-prize">STARTUP-EXPO 2025</p>
                <div className="winner-names">
                  <p className="winner-name">1st: InnovateX</p>
                  <p className="winner-name">2nd: NextGen</p>
                  <p className="winner-name">3rd: FutureTech</p>
                </div>
              </div>

              <div className="winner-row">
                <p className="winner-prize">PITCH PERFECT 2025</p>
                <div className="winner-names">
                  <p className="winner-name">1st: Sarah Jenkins</p>
                  <p className="winner-name">2nd: David Lee</p>
                  <p className="winner-name">3rd: Aisha Khan</p>
                </div>
              </div>

              <div className="winner-row">
                <p className="winner-prize">CHAT JPG 2025</p>
                <div className="winner-names">
                  <p className="winner-name">1st: Pixel Perfect</p>
                  <p className="winner-name">2nd: Visionary</p>
                  <p className="winner-name">3rd: Creative Minds</p>
                </div>
              </div>

              <div className="winner-row">
                <p className="winner-prize">MIND MASTERS 2025</p>
                <div className="winner-names">
                  <p className="winner-name">1st: Brainiacs</p>
                  <p className="winner-name">2nd: Logic Pro</p>
                  <p className="winner-name">3rd: Puzzle Solvers</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GUESTS & INVESTORS ═══════════ */}
      <section id="guests-investors" className="section-wv" style={{ paddingTop: 0 }}>
        <div className="wv-container">

          {/* Left: Special Guests */}
          <div className="wv-card" id="left-voices-card">
            <div className="card-header">
              <span className="card-icon">🎙️</span>
              <h2 className="card-title">SPECIAL GUESTS AND SPEAKERS</h2>
            </div>
            <div className="voices-list">

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #d4a853 0%, #8b6914 100%)' }}>AM</div>
                <div className="voice-info">
                  <p className="voice-name">Anand Mahindra</p>
                  <p className="voice-designation">Chairman, Mahindra Group</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #b8a898 0%, #6b5e52 100%)' }}>KG</div>
                <div className="voice-info">
                  <p className="voice-name">Kiran Mazumdar-Shaw</p>
                  <p className="voice-designation">Executive Chairperson, Biocon</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #d4a853 0%, #4a3a1a 100%)' }}>SA</div>
                <div className="voice-info">
                  <p className="voice-name">Sajjan Jindal</p>
                  <p className="voice-designation">Chairman, JSW Group</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #e8d5b0 0%, #8b6914 100%)' }}>NN</div>
                <div className="voice-info">
                  <p className="voice-name">Nandan Nilekani</p>
                  <p className="voice-designation">Co-Founder, Infosys</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Previous Year Investors */}
          <div className="wv-card" id="right-voices-card">
            <div className="card-header">
              <span className="card-icon">💼</span>
              <h2 className="card-title">PREVIOUS YEAR INVESTORS</h2>
            </div>
            <div className="voices-list">

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #d4a853 0%, #8b6914 100%)' }}>RA</div>
                <div className="voice-info">
                  <p className="voice-name">Rajan Anandan</p>
                  <p className="voice-designation">Managing Director, Peak XV</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #b8a898 0%, #6b5e52 100%)' }}>VK</div>
                <div className="voice-info">
                  <p className="voice-name">Vani Kola</p>
                  <p className="voice-designation">Managing Director, Kalaari Capital</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #d4a853 0%, #4a3a1a 100%)' }}>KB</div>
                <div className="voice-info">
                  <p className="voice-name">Kunal Bahl</p>
                  <p className="voice-designation">Co-Founder, Titan Capital</p>
                </div>
              </div>

              <div className="voice-row">
                <div className="voice-avatar" style={{ background: 'linear-gradient(135deg, #e8d5b0 0%, #8b6914 100%)' }}>AM</div>
                <div className="voice-info">
                  <p className="voice-name">Anupam Mittal</p>
                  <p className="voice-designation">Founder, People Group</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
