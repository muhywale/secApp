const { Schema, Mongoose } = require("mongoose");
const { mongo } = require("../credential");
const mg = require('mongoose')

  var  user = mg.Schema({
      id : Number,
      firstName : String,
      secName : String,
      Shares : Number,
      Savings : Number,
      buildFund : Number,
      loanBalance : Number,
      loanRepaid : Number,
      otherinfo :   {
        phoneNumber : Number,
        address : String,
      },
        nextofkin :{
        id : Number,
        Name : String,
        address: String,
        phoneNumber: Number,
        id : Number,
        Name : String,
        address: String,
        phoneNumber: Number
        },
      facebookInfo :{
      authId: String,
      name: String,
      email: String,
      role: String,
      created: Date
  },
      netAsset : Number
  })

    var userModel = mg.model('userM', user)

    module.exports = userModel;

    