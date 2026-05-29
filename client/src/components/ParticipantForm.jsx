import React, { useState } from 'react';
import { UserPlus, DollarSign } from 'lucide-react';

const ParticipantForm = ({ onAddParticipant }) => {
  const [name, setName] = useState('');
  const [hourlyCost, setHourlyCost] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Participant name is required');
      return;
    }
    
    const cost = parseFloat(hourlyCost);
    if (isNaN(cost) || cost <= 0) {
      setError('Hourly cost must be a positive number');
      return;
    }

    onAddParticipant({
      id: Date.now().toString(),
      name: name.trim(),
      hourlyCost: cost,
    });

    setName('');
    setHourlyCost('');
    setError('');
  };

  return (
    <div className="glass-panel animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <UserPlus size={20} className="title-glow" />
        Add Participant
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Participant Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Hourly Cost ($)</label>
          <div style={{ position: 'relative' }}>
            <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="number"
              className="input-field"
              placeholder="0.00"
              style={{ paddingLeft: '2.5rem' }}
              value={hourlyCost}
              onChange={(e) => setHourlyCost(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
        
        <button type="submit" className="btn btn-primary">
          Add to Meeting
        </button>
      </form>
    </div>
  );
};

export default ParticipantForm;
