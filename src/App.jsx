import React, { useState, useEffect } from 'react';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';
import MeetingSummary from './components/MeetingSummary';
import RecommendationBox from './components/RecommendationBox';
import SaveMeetingButton from './components/SaveMeetingButton';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MeetingHistory from './components/MeetingHistory';
import { DollarSign } from 'lucide-react';
import './App.css';

function App() {
  const [participants, setParticipants] = useState(() => {
    const saved = localStorage.getItem('meeting_participants');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [duration, setDuration] = useState(() => {
    const saved = localStorage.getItem('meeting_duration');
    return saved ? JSON.parse(saved) : '60';
  });

  const [agenda, setAgenda] = useState(() => {
    const saved = localStorage.getItem('meeting_agenda');
    return saved ? JSON.parse(saved) : '';
  });

  // New state for saved meetings
  const [savedMeetings, setSavedMeetings] = useState(() => {
    const saved = localStorage.getItem('saved_meetings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('meeting_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('meeting_duration', JSON.stringify(duration));
  }, [duration]);

  useEffect(() => {
    localStorage.setItem('meeting_agenda', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    localStorage.setItem('saved_meetings', JSON.stringify(savedMeetings));
  }, [savedMeetings]);

  const addParticipant = (p) => {
    setParticipants([...participants, p]);
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const totalHourlyRate = participants.reduce((sum, p) => sum + p.hourlyCost, 0);
  const durationNum = parseFloat(duration) || 0;
  const totalCost = totalHourlyRate * (durationNum / 60);
  const costPerMinute = totalHourlyRate / 60;

  const handleSaveMeeting = (meeting) => {
    setSavedMeetings([...savedMeetings, meeting]);
    // Clear current session
    setParticipants([]);
    setDuration('60');
    setAgenda('');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDeleteMeeting = (id) => {
    setSavedMeetings(savedMeetings.filter(m => m.id !== id));
  };

  const handleClearAllMeetings = () => {
    setSavedMeetings([]);
  };

  return (
    <>
      <div className="header animate-fade-in">
        <h1 className="title-glow main-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', textAlign: 'center' }}>
          <DollarSign size={36} />
          Meeting Cost Calculator
        </h1>
        <p>Calculate the true cost of your meetings and optimize your time.</p>
      </div>

      <div className="grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ParticipantForm onAddParticipant={addParticipant} />
          <ParticipantList participants={participants} onRemoveParticipant={removeParticipant} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MeetingSummary 
            duration={duration} 
            setDuration={setDuration}
            agenda={agenda}
            setAgenda={setAgenda}
            totalCost={totalCost}
            costPerMinute={costPerMinute}
          />
          <RecommendationBox 
            totalCost={totalCost}
            agenda={agenda}
            participantsCount={participants.length}
          />
          <SaveMeetingButton 
            participants={participants}
            duration={duration}
            agenda={agenda}
            totalCost={totalCost}
            onSave={handleSaveMeeting}
          />
        </div>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
        <AnalyticsDashboard meetings={savedMeetings} />
        <MeetingHistory 
          meetings={savedMeetings} 
          onDeleteMeeting={handleDeleteMeeting}
          onClearAll={handleClearAllMeetings}
        />
      </div>
    </>
  );
}

export default App;
