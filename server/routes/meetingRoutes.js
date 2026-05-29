const express = require('express');
const router = express.Router();
const { getMeetings, createMeeting, deleteMeeting } = require('../controllers/meetingController');

router.route('/').get(getMeetings).post(createMeeting);
router.route('/:id').delete(deleteMeeting);

module.exports = router;
