import React, { useState, useEffect } from 'react';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';
import MeetingSummary from './components/MeetingSummary';
import RecommendationBox from './components/RecommendationBox';
import SaveMeetingButton from './components/SaveMeetingButton';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MeetingHistory from './components/MeetingHistory';
import { DollarSign } from 'lucide-react';
import * as api from './services/api';
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

  // Backend state for saved meetings
  const [savedMeetings, setSavedMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('meeting_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('meeting_duration', JSON.stringify(duration));
  }, [duration]);

  useEffect(() => {
    localStorage.setItem('meeting_agenda', JSON.stringify(agenda));
  }, [agenda]);

  // Fetch meetings on load
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setIsLoading(true);
      const data = await api.getMeetings();
      setSavedMeetings(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch meeting history from server. Ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSaveMeeting = async (meeting) => {
    try {
      setSaveLoading(true);
      await api.createMeeting(meeting);
      await fetchMeetings(); // Refresh list
      
      // Clear current session
      setParticipants([]);
      setDuration('60');
      setAgenda('');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Failed to save meeting to server. Ensure backend is running.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      await api.deleteMeeting(id);
      setSavedMeetings(savedMeetings.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete meeting.');
    }
  };

  const handleClearAllMeetings = async () => {
    if (window.confirm('Are you sure you want to clear all meeting history from the database?')) {
      try {
        for (const m of savedMeetings) {
          await api.deleteMeeting(m._id);
        }
        setSavedMeetings([]);
      } catch (err) {
        console.error(err);
        alert('Failed to clear all meetings.');
      }
    }
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
          {saveLoading ? (
             <div className="glass-panel" style={{ textAlign: 'center', marginTop: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', color: 'var(--success)' }}>
               Saving to Database...
             </div>
          ) : (
            <SaveMeetingButton 
              participants={participants}
              duration={duration}
              agenda={agenda}
              totalCost={totalCost}
              onSave={handleSaveMeeting}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
        {error && (
          <div className="glass-panel" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', marginBottom: '2rem' }}>
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="empty-state glass-panel">Loading meeting history from server...</div>
        ) : (
          <>
            <AnalyticsDashboard meetings={savedMeetings} />
            <MeetingHistory 
              meetings={savedMeetings} 
              onDeleteMeeting={handleDeleteMeeting}
              onClearAll={handleClearAllMeetings}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
