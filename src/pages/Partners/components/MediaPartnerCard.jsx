import React from 'react';
import ScrollReveal from './ScrollReveal';
import defaultLogo from '../../../assets/partners/Media Partner.jpg';

export default function MediaPartnerCard({ 
  name = "91.9 Friends FM", 
  role = "OFFICIAL MEDIA PARTNER", 
  logo = defaultLogo
}) {
  return (
    <div className="partner-tier">
      <ScrollReveal baseClass="section-heading-reveal">
        <div className="tier-label">{role}</div>
      </ScrollReveal>
      
      <ScrollReveal className="media-partner-container">
        <div className="media-partner-card">
          <div className="card-inner">
            <img 
              src={logo} 
              alt={`${role} - ${name}`} 
              className="partner-logo" 
            />
            <div className="shine-sweep"></div>
          </div>
        </div>
        <div className="media-partner-name">{name}</div>
      </ScrollReveal>
    </div>
  );
}
