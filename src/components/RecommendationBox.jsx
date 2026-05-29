import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const RecommendationBox = ({ totalCost, agenda, participantsCount }) => {
  if (participantsCount === 0) return null;

  const agendaLength = agenda.trim().length;
  
  let recType = 'info';
  let title = 'Add an agenda';
  let message = 'To determine if this meeting is worth it, please provide an agenda.';
  let Icon = Info;

  if (agendaLength === 0) {
    if (totalCost > 100) {
      recType = 'danger';
      title = 'High Cost, No Agenda';
      message = 'This meeting is expensive and lacks a clear purpose. Consider canceling or adding a detailed agenda.';
      Icon = AlertCircle;
    } else {
      recType = 'warning';
      title = 'Missing Agenda';
      message = 'Meetings without an agenda often waste time. Consider adding one.';
      Icon = AlertCircle;
    }
  } else if (agendaLength < 20) {
    if (totalCost > 200) {
      recType = 'danger';
      title = 'Costly with Vague Agenda';
      message = 'For a meeting this expensive, the agenda is too brief. Ensure clear goals are set.';
      Icon = AlertCircle;
    } else {
      recType = 'warning';
      title = 'Expand Agenda';
      message = 'The agenda is quite short. A more detailed plan might make this meeting more productive.';
      Icon = Info;
    }
  } else {
    if (totalCost > 500) {
      recType = 'warning';
      title = 'High Cost Meeting';
      message = 'The agenda looks good, but this is a very expensive meeting. Ensure all participants are absolutely necessary.';
      Icon = AlertCircle;
    } else {
      recType = 'success';
      title = 'Looks Good!';
      message = 'You have a clear agenda and the cost is reasonable. Have a productive meeting!';
      Icon = CheckCircle;
    }
  }

  const baseClass = `recommendation-box rec-${recType} animate-fade-in`;

  return (
    <div className={baseClass} style={{ animationDelay: '0.3s' }}>
      <Icon size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h4>
        <p style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: 1.5 }}>{message}</p>
      </div>
    </div>
  );
};

export default RecommendationBox;
