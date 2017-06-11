const mongoose = require('mongoose');

const Program = mongoose.model('Program')

exports.isAuthor = async function(){}

exports.add = async function(req, res, next){
  const newProgram = new Program({
    author: req.user._id,
    name: req.body.name,
    description: req.body.description,
    color: req.body.color
  });
  try {
    const response = await newProgram.save();
    if(response) res.json({ok: true});
    else res.json({error: 'An error has occured while saving your program.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.update = async function(){}

exports.delete = async function(){}
