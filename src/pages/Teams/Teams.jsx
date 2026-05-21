import React, { useEffect } from 'react';
import CinematicTransition from '../../components/common/CinematicTransition/CinematicTransition';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import { teamData } from './data/teamData';
import './Teams.css';

export default function Teams() {
  // Scroll Reveal Observer - activated immediately on mount
  useEffect(() => {
    // Force the page to always start at the very top on reload/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Add staggered delay if it's a card in a grid
          let delay = 0;
          if (target.classList.contains('team-card')) {
            const grid = target.closest('.card-grid');
            if (grid) {
              const cards = Array.from(grid.querySelectorAll('.team-card'));
              const index = cards.indexOf(target);
              if (index > -1) {
                delay = index * 80;
              }
            }
          }

          // Using Web Animations API for scroll reveal (matches original CSS/JS rule)
          target.animate([
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 600,
            easing: 'ease-out',
            fill: 'forwards',
            delay: delay
          });

          // Apply final state statically after animation finishes
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }, delay + 600);

          // Unobserve after revealing
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll(
      '.teams-page-container .section-title, .teams-page-container .glowing-divider, .teams-page-container .team-card, .teams-page-container .coming-soon-container'
    );

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <CinematicTransition>
      <div className="teams-page-container">
        {/* Official Global Navbar */}
        <Navbar />

        <main style={{ flex: '1 0 auto' }}>
          <Hero />

          {/* Advisor Section */}
          <TeamSection
            title="ADVISOR"
            gridClass="single-card"
            members={teamData.advisors}
          />

          {/* Faculty Executive Team Section */}
          <TeamSection
            title="FACULTY EXECUTIVE TEAM"
            gridClass="three-col"
            members={teamData.facultyExecutives}
          />

          {/* Student Team Section */}
          <TeamSection
            title="STUDENT TEAM"
            isComingSoon={true}
          />
        </main>

        {/* Official Global Footer */}
        <Footer />
      </div>
    </CinematicTransition>
  );
}
