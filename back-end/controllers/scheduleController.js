const Schedule = require('../models/schedulemodel')
const test_schedule = require('../models/test-schedule')

exports.getTestSchedule = (req, res, next) => {
  res.json(test_schedule.oneWeekData)
}

exports.getSchedule = (req, res, next) => {
  const group = req.params.group;
  res.status(404).send("use instead\n/tlu/schedule/test");
}
