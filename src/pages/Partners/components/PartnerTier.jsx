import React from 'react';
import ScrollReveal from './ScrollReveal';
import SponsorLogoBox from './SponsorLogoBox';

export default function PartnerTier({ label, className = '', sponsors = [], children }) {
  return (
    <div className="partner-tier">
      <ScrollReveal baseClass="section-heading-reveal">
        <div className="tier-label">{label}</div>
      </ScrollReveal>
      
      <div className={`tier-row ${className}`}>
        {children ? children : sponsors.map(sp => (
          <SponsorLogoBox 
            key={sp.id} 
            name={sp.name} 
            logoUrl={sp.logoUrl} 
            isPlaceholder={sp.isPlaceholder} 
          />
        ))}
      </div>
    </div>
  );
}
