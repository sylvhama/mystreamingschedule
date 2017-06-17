const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedule');

exports.get = async function(req, res, next){
}

exports.add = async function(req, res, next){
  const newSchedule = new Schedule({
    program: req.body.program_id,
    startHour: req.body.startHour,
    startMin: req.body.startMin,
    endHour: req.body.endHour,
    endMin: req.body.endMin,
    days: req.body.days
  });
  try {
    const schedule = await newSchedule.save();
    if(schedule) res.json({schedule});
    else res.json({error: 'An error has occured while saving your schedule.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.remove = async function(){}
