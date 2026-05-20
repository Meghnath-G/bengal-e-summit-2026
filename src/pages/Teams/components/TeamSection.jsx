import React from 'react';
import TeamCard from './TeamCard';

export default function TeamSection({ title, gridClass, members, isComingSoon }) {
  return (
    <section className="team-section">
      <h2 className="section-title">{title}</h2>
      <div className="glowing-divider"></div>
      
      {isComingSoon ? (
        <div className="coming-soon-container">
          <p className="coming-soon">COMING SOON</p>
          <div className="thin-line"></div>
        </div>
      ) : (
        <div className={`card-grid ${gridClass}`}>
          {members && members.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}
