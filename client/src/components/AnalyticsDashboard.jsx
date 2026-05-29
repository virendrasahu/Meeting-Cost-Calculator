import React from 'react';
import { BarChart2, DollarSign, Target, TrendingDown } from 'lucide-react';

const AnalyticsDashboard = ({ meetings }) => {
  const totalMeetings = meetings.length;
  const totalSpent = meetings.reduce((sum, m) => sum + m.totalCost, 0);
  const averageCost = totalMeetings > 0 ? totalSpent / totalMeetings : 0;
  const highestCost = meetings.length > 0 ? Math.max(...meetings.map(m => m.totalCost)) : 0;

  return (
    <div className="glass-panel animate-fade-in" style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart2 size={20} className="title-glow" />
        Analytics Dashboard
      </h2>
      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div className="stat-box" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div className="stat-value">{totalMeetings}</div>
          <div className="stat-label">Total Meetings</div>
        </div>
        <div className="stat-box" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div className="stat-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={20} />{totalSpent.toFixed(2)}
          </div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-box" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div className="stat-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={20} />{averageCost.toFixed(2)}
          </div>
          <div className="stat-label">Avg Meeting Cost</div>
        </div>
        <div className="stat-box" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="stat-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingDown size={20} />{highestCost.toFixed(2)}
          </div>
          <div className="stat-label">Highest Cost</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
