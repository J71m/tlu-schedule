const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.get('/tlu/schedule/test', scheduleController.getTestSchedule);

router.get('/tlu/schedule/if', scheduleController.getSchedule)

router.get('/tlu/schedule/groups', scheduleController.getGroups)

router.post('/tlu/schedule', scheduleController.postScheduleSpecific)

module.exports = router;
