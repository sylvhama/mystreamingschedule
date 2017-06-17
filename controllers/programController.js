const mongoose = require('mongoose'),
      helpers  = require('../handlers/helpers');

const Program = mongoose.model('Program');

exports.get = async function(req, res, next){
  try {
    const programs = await Program.find({
      author: req.user._id
    });
    res.json(programs);
  }catch(err) {
    return next(err);
  }
}

exports.add = async function(req, res, next){
  const newProgram = new Program({
    author: req.user._id,
    name: helpers.escapeHtml(req.body.name).substring(0, 50),
    description: helpers.escapeHtml(req.body.description).substring(0, 50),
    color: req.body.color
  });
  try {
    const program = await newProgram.save();
    if(program) res.json({program});
    else res.json({error: 'An error has occured while saving your program.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.update = async function(req, res, next){
  try {
    const program = {
      _id: req.body._id,
      name: helpers.escapeHtml(req.body.name).substring(0, 50),
      description: helpers.escapeHtml(req.body.description).substring(0, 50),
      color: req.body.color
    }
    const response = await Program.update(
      { 
        _id: program._id,
        author: req.user._id 
      },
      {
        name: program.name,
        description: program.description,
        color: program.color
      }
    );
    if(response.n>0) res.json(program);
    else res.json({error: 'An error has occured while updating your program.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.remove = async function(req, res, next){
  try {
    const response = await Program.remove(
      { 
        _id: req.params.program_id,
        author: req.user._id 
      }
    );
    if(response.result.n>0 && response.result.ok>0) res.json({ok: true});
    else res.json({error: 'An error has occured while removing your program.'}); 
  }catch(err) {
    return next(err);
  }
}
