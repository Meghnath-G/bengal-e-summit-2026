import React from 'react';
import { eventsData } from '../data/events';
import EventCard from './EventCard';
import './EventsTimeline.css';

export default function EventsTimeline() {
  return (
    <section className="timeline-section" id="events">
      <div className="timeline-line"></div>
      
      {eventsData.map((event, index) => {
        const isLast = index === eventsData.length - 1;
        return (
          <div className={`timeline-row ${isLast ? 'last' : ''}`} key={event.id}>
            {event.side === 'left' ? (
              <>
                <EventCard event={event} />
                <div className="timeline-node-wrapper center">
                  <div className="timeline-node"></div>
                  <div className="connector left-connector"></div>
                </div>
                <div className="event-placeholder right"></div>
              </>
            ) : (
              <>
                <div className="event-placeholder left"></div>
                <div className="timeline-node-wrapper center">
                  <div className="timeline-node"></div>
                  <div className="connector right-connector"></div>
                </div>
                <EventCard event={event} />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
