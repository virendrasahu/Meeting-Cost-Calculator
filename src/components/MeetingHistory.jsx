import React, { useState } from 'react';
import FilterBar from './FilterBar';
import MeetingCard from './MeetingCard';
import { Archive, Trash } from 'lucide-react';

const MeetingHistory = ({ meetings, onDeleteMeeting, onClearAll }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.agenda.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || m.costCategory === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Archive size={24} className="title-glow" />
          Past Meetings
        </h2>
        
        {meetings.length > 0 && (
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all meeting history?')) {
                onClearAll();
              }
            }}
            className="btn btn-danger"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            <Trash size={16} />
            Clear All
          </button>
        )}
      </div>

      {meetings.length > 0 ? (
        <>
          <FilterBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} onDelete={onDeleteMeeting} />
              ))
            ) : (
              <div className="empty-state glass-panel" style={{ gridColumn: '1 / -1' }}>
                No meetings match your filters.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="glass-panel empty-state">
          No past meetings saved yet. Save your first meeting to see it here!
        </div>
      )}
    </div>
  );
};

export default MeetingHistory;
