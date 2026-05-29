import React from 'react';
import { Calendar, Users, Clock, Trash2, FileText, DollarSign } from 'lucide-react';

const MeetingCard = ({ meeting, onDelete }) => {
  const formattedDate = new Date(meeting.createdAt || meeting.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1rem', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            <Calendar size={14} />
            {formattedDate}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <span className={`badge badge-${meeting.costCategory.toLowerCase()}`}>
              {meeting.costCategory}
            </span>
            <span className={`badge badge-${meeting.efficiencyScore.toLowerCase()}`}>
              {meeting.efficiencyScore}
            </span>
          </div>
        </div>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this saved meeting?')) {
              onDelete(meeting._id || meeting.id);
            }
          }}
          className="btn-icon"
          style={{ color: 'var(--danger)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          title="Delete Meeting"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div style={{ marginBottom: '1rem', flexGrow: 1 }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          <FileText size={16} className="title-glow" /> Agenda
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px' }}>
          {meeting.agenda}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--card-border)', paddingTop: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Users size={14} /> {meeting.participantCount} 
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> {meeting.duration}m
          </div>
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
          <DollarSign size={18} style={{ color: 'var(--success)' }} />
          {meeting.totalCost.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
