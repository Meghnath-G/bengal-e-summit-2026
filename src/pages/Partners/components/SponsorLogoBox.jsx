import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function SponsorLogoBox({ name, logoUrl, isPlaceholder = false }) {
  return (
    <ScrollReveal className="logo-box">
      {isPlaceholder ? (
        name
      ) : (
        <img 
          src={logoUrl} 
          alt={name} 
          className="sponsor-logo-img" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
        />
      )}
    </ScrollReveal>
  );
}
