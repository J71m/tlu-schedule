const express = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.get('/tlu/schedule/test', scheduleController.getTestSchedule);

router.get('/tlu/schedule/:group', scheduleController.getSchedule)

module.exports = router;
