const Schedule = require('../models/schedulemodel')
const test_schedule = require('../models/test-schedule')

exports.getTestSchedule = (req, res, next) => {
  res.json(test_schedule.oneWeekData)
}

exports.getSchedule = (req, res, next) => {
  const schedule = new Schedule()
  schedule.getSchedule().then(data => {
    res.send(data);
  })
}

exports.postScheduleSpecific = (req, res, next) => {
  const groupName = req.body.groupName
  if (groupName == undefined) {
    res.status(400).send("groupName missing")
  } else {
    let time = req.body.time
    if (time == undefined) {
      time = Math.floor(new Date() / 1000)
    }
    const schedule = new Schedule(groupName, time)
    schedule.getSchedule().then(data => {
      res.send(data);
  
    })

  }
}