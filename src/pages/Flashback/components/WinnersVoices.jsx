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


      {/* ═══════════ GUESTS & INVESTORS ═══════════ */}
      <section id="guests-investors" className="section-wv" style={{ paddingTop: 0 }}>
        <div className="wv-container">

          {/* Left: Special Guests */}
          <div className="wv-card" id="left-voices-card">
            <div className="card-header">
              <h2 className="card-title">SPECIAL GUESTS AND SPEAKERS</h2>
            </div>
            <div className="voices-list">

              <div className="voice-row">

                <div className="voice-info">
                  <p className="voice-name">Dr. Bandanna Sen</p>
                  <p className="voice-designation">Director General at DGCIS</p>
                </div>
              </div>

              <div className="voice-row">

                <div className="voice-info">
                  <p className="voice-name">Dr. Subhalakshmi Ghosh</p>
                  <p className="voice-designation">Founder of Subhami Biopharma (OPC) Pvt. Ltd. And co-founder of Alona Life Sciences</p>
                </div>
              </div>

              <div className="voice-row">

                <div className="voice-info">
                  <p className="voice-name">Mr. Madan Mohan Chakraborty</p>
                  <p className="voice-designation">CEO and Managing Director of Iskraemeco India</p>
                </div>
              </div>

              <div className="voice-row">

                <div className="voice-info">
                  <p className="voice-name"> Mr. Nilanjan Ray</p>
                  <p className="voice-designation">Director of METCO (Metal Engineering and Treatment Company)</p>
                </div>
              </div>

              <div className="voice-row">

                <div className="voice-info">
                  <p className="voice-name">Mr. Anup Das</p>
                  <p className="voice-designation">Chief Strategy Officer and Head of India Operations at Exavalu</p>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>
    </>
  );
}
