import React from 'react';
import { Clock, FileText, TrendingUp } from 'lucide-react';

const MeetingSummary = ({ duration, setDuration, agenda, setAgenda, totalCost, costPerMinute }) => {
  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingUp size={20} className="title-glow" />
        Meeting Summary
      </h2>

      <div className="input-group">
        <label className="input-label">
          <Clock size={16} /> Duration (minutes)
        </label>
        <input
          type="number"
          className="input-field"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
          placeholder="e.g. 60"
        />
      </div>

      <div className="input-group">
        <label className="input-label">
          <FileText size={16} /> Meeting Agenda
        </label>
        <textarea
          className="input-field"
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          placeholder="What is the goal of this meeting?"
          rows="3"
          style={{ resize: 'vertical' }}
        ></textarea>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem 0', borderTop: '1px solid var(--card-border)' }}>
        <h3 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Meeting Cost
        </h3>
        <div className="total-cost-display">
          ${totalCost.toFixed(2)}
        </div>
        
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">${costPerMinute.toFixed(2)}</div>
            <div className="stat-label">Per Minute</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{duration || 0}</div>
            <div className="stat-label">Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
