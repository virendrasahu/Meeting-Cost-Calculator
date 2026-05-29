const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  participants: [
    {
      name: { type: String, required: true },
      hourlyCost: { type: Number, required: true }
    }
  ],
  duration: { type: Number, required: true },
  agenda: { type: String, required: true },
  totalCost: { type: Number, required: true },
  recommendation: { type: String },
  costCategory: { type: String },
  efficiencyScore: { type: String },
  participantCount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
