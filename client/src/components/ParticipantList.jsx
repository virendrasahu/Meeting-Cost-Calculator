import React from 'react';
import { Trash2, Users } from 'lucide-react';

const ParticipantList = ({ participants, onRemoveParticipant }) => {
  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Users size={20} className="title-glow" />
        Participants ({participants.length})
      </h2>
      
      {participants.length === 0 ? (
        <div className="empty-state">
          No participants added yet. Add someone to get started!
        </div>
      ) : (
        <div className="participant-list" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {participants.map((p) => (
            <div key={p.id} className="participant-item">
              <div className="participant-info">
                <span className="participant-name">{p.name}</span>
                <span className="participant-cost">${p.hourlyCost.toFixed(2)} / hour</span>
              </div>
              <button 
                onClick={() => onRemoveParticipant(p.id)}
                className="btn-icon"
                style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                title="Remove Participant"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantList;
