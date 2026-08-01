import React, { useEffect } from 'react';
import CinematicTransition from '../../components/common/CinematicTransition/CinematicTransition';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import PageHero from './components/PageHero';
import GlassCard from './components/GlassCard';
import SectionDivider from './components/SectionDivider';
import MediaPartnerCard from './components/MediaPartnerCard';
import PartnerTier from './components/PartnerTier';
import { partnersData } from './data/partnersData';
import futuristicBg from '../../assets/partners/futuristicbg.webp';
import outreachImg from '../../assets/partners/outreach.webp';
import coinn from '../../assets/partners/coinn.webp';
import wls from '../../assets/partners/wls.webp';
import virtuinfo from '../../assets/partners/virtuinfo.webp';
import cibet from '../../assets/partners/cibet.webp';
import './Partners.css';

export default function Partners() {
  const { mediaPartner, tiers } = partnersData;

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <CinematicTransition>
      <div className="partners-page-container">
        {/* BACKGROUND IMAGE & OVERLAYS */}
        <img src={futuristicBg} className="fixed-bg" alt="Bengal E-Summit Background" />
        <div className="fixed-overlay"></div>
        <div className="fixed-vignette"></div>

        {/* OFFICIAL GLOBAL NAVBAR */}
        <Navbar />

        {/* MAIN LAYOUT WRAPPER */}
        <main className="main-content" style={{ flex: '1 0 auto', width: '100%' }}>
          {/* COMPACT HERO HEADING */}
          <PageHero />

          {/* SECTION 1: MEDIA PARTNER (GLASS CARD) */}
          <GlassCard title="IN ASSOCIATION WITH">
            <MediaPartnerCard
              name={mediaPartner.name}
              role={mediaPartner.role}
              logo={mediaPartner.logo}
            />
          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />

          {/* SECTION 2: PARTNERS LISTING (GLASS CARD) */}
          <GlassCard title="COMMUNITY AND OUTREACH PARTNER">
            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={outreachImg}
                    alt="LOGO"
                    className="partner-logo"
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                Youth4Nation
              </div>
            </div>
          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />

          {/* SECTION 3: PARTNERS LISTING (GLASS CARD) */}
          <GlassCard title="ASSOCIATE PARTNERS">
            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={coinn}
                    alt="LOGO"
                    className="partner-logo"
                    style={{
                      objectFit: "contain",
                      padding: "8px",
                      background: "#fff"
                    }}
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                COINNOVATE VENTURES
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={wls}
                    alt="LOGO"
                    className="partner-logo"
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                WORLD LEADER SUMMIT
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={virtuinfo}
                    alt="LOGO"
                    className="partner-logo"
                    style={{
                      objectFit: "contain",
                      padding: "8px",
                      background: "#fff"
                    }}
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                VIRTUAL INFOCOM
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={cibet}
                    alt="LOGO"
                    className="partner-logo"
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                CIBET COUNCIL
              </div>
            </div>
          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />


          {/* SECTION 4: PARTNERS LISTING (GLASS CARD) */}
          <GlassCard title="PARTNER">
            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src="/images/logos/iedc.webp"
                    alt="UPDATING SOON"
                    className="partner-logo"
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
                style={{
                  letterSpacing: '4px',
                  opacity: 1,
                  fontSize: '1.1rem',
                  color: '#d4a853',
                  textShadow: '0 0 10px rgba(212,168,83,0.35)',
                  marginTop: '32px',
                  whiteSpace: 'nowrap'
                }}
              >
                IEDC-ECE
              </div>
            </div>
          </GlassCard>
        </main>

        {/* OFFICIAL GLOBAL FOOTER */}
        <Footer />
      </div>
    </CinematicTransition>
  );
}
