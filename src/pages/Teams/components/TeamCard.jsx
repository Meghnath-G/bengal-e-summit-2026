import React from 'react';

export default function TeamCard({ name, role, image }) {
  return (
    <div className="team-card">
      <img 
        src={image} 
        alt={name} 
        className="card-image" 
        loading="lazy" 
      />
      <div className="card-panel">
        <h3 className="card-name">{name}</h3>
        {role && <p className="card-role">{role}</p>}
      </div>
    </div>
  );
}
