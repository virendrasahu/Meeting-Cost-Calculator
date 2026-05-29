export const getCostCategory = (cost) => {
  if (cost < 100) return 'Affordable';
  if (cost <= 500) return 'Moderate';
  return 'Expensive';
};

export const getEfficiencyScore = (cost, duration, participantsCount, agenda) => {
  const agendaLength = agenda.trim().length;
  
  if (agendaLength === 0) {
    return cost > 100 ? 'Inefficient' : 'Average';
  }
  
  if (agendaLength < 20) {
    return cost > 200 ? 'Inefficient' : 'Average';
  }

  if (cost > 500) return 'Expensive';
  return 'Efficient';
};
