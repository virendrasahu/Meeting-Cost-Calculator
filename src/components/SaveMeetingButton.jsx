import React from 'react';
import { Save } from 'lucide-react';
import { getCostCategory, getEfficiencyScore } from '../utils';

const SaveMeetingButton = ({ 
  participants, duration, agenda, totalCost, 
  onSave 
}) => {
  const handleSave = () => {
    if (participants.length === 0) {
      alert("Cannot save a meeting without participants.");
      return;
    }

    const meeting = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      participants: [...participants],
      participantCount: participants.length,
      duration: parseFloat(duration) || 0,
      agenda: agenda.trim() || 'No Agenda Provided',
      totalCost,
      costCategory: getCostCategory(totalCost),
      efficiencyScore: getEfficiencyScore(totalCost, parseFloat(duration) || 0, participants.length, agenda)
    };

    onSave(meeting);
  };

  return (
    <button 
      onClick={handleSave} 
      className="btn btn-primary"
      style={{ width: '100%', marginTop: '1rem', background: '#10b981', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)' }}
    >
      <Save size={18} />
      Save Meeting
    </button>
  );
};

export default SaveMeetingButton;
