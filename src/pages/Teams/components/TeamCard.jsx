import React from 'react';

export default function TeamCard({ name, role, image, phone1, phone2 }) {
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
        {phone1 && (
          <p className="card-phone">
            {phone1}
          </p>
        )}
        {phone2 && (
          <p className="card-phone">
            {phone2}
          </p>
        )}
      </div>
    </div>
  );
}
