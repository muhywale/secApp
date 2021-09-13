const mg = require('mongoose');
const { email } = require('../credential');

var appReg = mg.Schema(
    {
    _id : Number,
    title: String,
    firstName: String,
    lastName: String,
    addr: String,
    cellNo: Number,
    email: String,
    nof1: {
     name: String,
     cellNo: Number,
     addr: String
    },
    nof2: {
        name: String,
        cellNo: Number,
        addr: String
       },

    pass1: String,
    pass2: String,
    ref1: {
     require: true,
     type: String

    },
    ref2: {
        require :true,
        type: String
    },
    Shares : '',
    Savings : '',
    buildFund : '',
    loanBalance : '',
    commBalance : '',
    insDep : '',
    hDuty : '',
    loanRepaid : '',
    netAsset : '',
    }
)

const appModel =  mg.model('appReg', appReg);
module.exports = appModel;

