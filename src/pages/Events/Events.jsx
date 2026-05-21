import React from 'react';
import CinematicTransition from '../../components/common/CinematicTransition/CinematicTransition';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import GrainOverlay from '../../components/common/GrainOverlay/GrainOverlay';
import Hero from './components/Hero';
import EventsTimeline from './components/EventsTimeline';
import eventsBg from './assets/events_bg.webp';
import './Events.css';

export default function Events() {
  return (
    <CinematicTransition>
      <div className="events-page-container" style={{ '--bg-image': `url(${eventsBg})` }}>
        {/* Scoped Background and Overlays */}
        <div className="events-bg" />
        <div className="events-overlay" />

        <Navbar />
        <GrainOverlay />
        <main>
          <Hero />
          <EventsTimeline />
        </main>
        <Footer />
      </div>
    </CinematicTransition>
  );
}
