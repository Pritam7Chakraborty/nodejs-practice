const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: [true,'First name is required']
  },
  lastName:{
    type: String,
    required: [true,'Last name is required']
  },
  email:{
    type: String,
    required: [true,'Email is required']
  },
  password:{
    type: String,
    required: [true,'Password is required']
  },
  userType:{
    type: String,
    enum: ['Guest','Host'],
    default: 'guest'
  },
  favourites:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home' 
  }]
});



module.exports = mongoose.model("User", userSchema);
