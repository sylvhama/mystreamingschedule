const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedule'),
      Program = mongoose.model('Program');

exports.get = async function(req, res, next){
  try {
    const schedules = await Schedule.find({
      author: req.user._id
    })
    .populate('program');
    res.json(schedules);
  }catch(err) {
    return next(err);
  }
}

exports.add = async function(req, res, next){
  const newSchedule = new Schedule({
    author: req.user._id,
    program: req.body.program_id,
    startHour: req.body.startHour,
    startMin: req.body.startMin,
    endHour: req.body.endHour,
    endMin: req.body.endMin,
    days: req.body.days
  });
  try {
    let schedule = await newSchedule.save();
    schedule = await Schedule.populate(schedule, 'program');
    if(schedule) res.json({schedule});
    else res.json({error: 'An error has occured while saving your schedule.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.remove = async function(req, res, next){
  try {
    const response = await Schedule.remove(
      { 
        _id: req.params.schedule_id,
        author: req.user._id 
      }
    );
    if(response.result.n>0 && response.result.ok>0) res.json({ok: true});
    else res.json({error: 'An error has occured while removing your schedule.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.removeByProgram = async function(req, res, next){
  try {
    const response = await Schedule.remove(
      { 
        program: req.params.program_id,
        author: req.user._id
      }
    );
    next();
  }catch(err) {
    return next(err);
  }
}
