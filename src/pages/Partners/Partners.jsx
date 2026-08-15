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
import assocham from '../../assets/partners/assocham.webp';
import multiverpr from '../../assets/partners/multiverpr.jpg';
import glen from '../../assets/partners/glen.webp';
import balaji from '../../assets/partners/balaji.webp';
import ArrayVen from '../../assets/partners/ArrayVen.webp';
import codecraft from '../../assets/partners/codecraft.svg';
import kopai from '../../assets/partners/kopai.png';
import osen from '../../assets/partners/OSEN.webp';
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
            <MediaPartnerCard
              name={mediaPartner.name}
              role={mediaPartner.role}
              logo={mediaPartner.logo}
            />
          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />

          {/* SECTION 2: ASSOCIATE PARTNERS LISTING (GLASS CARD) */}
          <GlassCard title="ASSOCIATE PARTNER">
            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={assocham}
                    alt="LOGO"
                    className="partner-logo"
                  />
                  <div className="shine-sweep"></div>
                </div>
              </div>
              <div
                className="media-partner-name"
              >
                ASSOCHAM
              </div>
            </div>
          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />

          {/* SECTION 3: INVESTORS (GLASS CARD) */}
          <GlassCard title="INVESTORS">
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

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={multiverpr}
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
                MULTIVERSE PR COMMUNICATIONS
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={glen}
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
                GLEN INDUSTRIES LTD.
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={balaji}
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
                SREE BALAJI
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={ArrayVen}
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
                ARRAY VENTURES
              </div>
            </div>

          </GlassCard>

          {/* SECTION DIVIDER DIAMOND */}
          <SectionDivider />

          {/* SECTION 4: PARTNERS LISTING (GLASS CARD) */}
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


          {/* SECTION 5: EVENT PARTNER (GLASS CARD) */}
          <GlassCard title="EVENT PARTNERS">
            {/* Event name / subheading */}
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.50rem",
                fontWeight: 700,
                color: "rgba(212, 168, 83, 0.85)",
                letterSpacing: "3px",
                textAlign: "center",
                textTransform: "uppercase",
                marginTop: "10px",
                marginBottom: "20px"
              }}
            >
              THIS IS BIZNESS!
            </div>
            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={codecraft}
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
              <a
                href="https://codecrafters.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="media-partner-name"
                style={{
                  textDecoration: "none",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                CODECRAFTERS
              </a>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={kopai}
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
                KOPAI
              </div>
            </div>

            <div className="media-partner-container">
              <div className="media-partner-card">
                <div className="card-inner">
                  <img
                    src={osen}
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
                OSEN
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
