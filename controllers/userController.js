const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.findOrSave = async function(profile, done) {
  const user = {
    twitch_id: profile._id,
    email: profile.email,
    name: profile.display_name,
    logo: profile.logo
  };
  if(user.logo === null) delete user.logo;
  userModel = new User(user);
  try {
    const found = await User.findOne(user);
    if(!found) await userModel.save();
    done(null, user);
  }catch(err) {
    done(err, user);
  }
};
