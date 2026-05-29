import axios from 'axios';

const API_URL = 'http://localhost:5000/api/meetings';

export const getMeetings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMeeting = async (meetingData) => {
  const response = await axios.post(API_URL, meetingData);
  return response.data;
};

export const deleteMeeting = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
