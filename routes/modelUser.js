const { Schema, Mongoose } = require("mongoose");
const { mongo } = require("../credential");
const mg = require('mongoose')

  var  usSch = mg.Schema({
      _id: Number,
      name : String,
      Shares : Number,
      Savings : Number,
      buildFund : Number,
      loanBalance : Number,
      commBalance : Number,
      insDep : Number,
      hDuty : Number,
      loanRepaid : Number,
      totalLoanGuaranted:Number,
      LoanGuaranted: Array,
      netAsset :Number,
      otherinfo :   {
        phoneNumber : Number,
        address : String,
      },
        nextofkinI:{
        Name : String,
        address: String,
        phoneNumber: Number
        },
        nextofkinII :{
        Name : String,
        address: String,
        phoneNumber: Number
        },
      authId: String,
      nameId: String,
      email: {
        type: String,
        require: true
   },
      role:{ type: String,
        default: "customer"
      },
      ref1: {
        type: String,
        require: true
      },
      ref2: {
    type: String,
    require: true
    },
      joined: Date,
      pass1: {
        type : String,
        require: true
      }, 
      pass2:{
        type : String,
        require: true
      }
      
  })

  
    var newModel = mg.model('user', usSch)
    module.exports = newModel;

    