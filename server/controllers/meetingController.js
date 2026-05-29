const Meeting = require('../models/Meeting');

// @desc    Get all meetings
// @route   GET /api/meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching meetings', error: error.message });
  }
};

// @desc    Save a new meeting
// @route   POST /api/meetings
const createMeeting = async (req, res) => {
  try {
    const { 
      participants, duration, agenda, totalCost, 
      recommendation, costCategory, efficiencyScore, participantCount 
    } = req.body;

    if (!participants || participants.length === 0 || !duration || !agenda || !totalCost) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const meeting = new Meeting({
      participants,
      duration,
      agenda,
      totalCost,
      recommendation: recommendation || 'N/A',
      costCategory,
      efficiencyScore,
      participantCount
    });

    const savedMeeting = await meeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ message: 'Server Error saving meeting', error: error.message });
  }
};

// @desc    Delete a meeting
// @route   DELETE /api/meetings/:id
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await meeting.deleteOne();
    res.status(200).json({ message: 'Meeting removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting meeting', error: error.message });
  }
};

module.exports = {
  getMeetings,
  createMeeting,
  deleteMeeting
};
