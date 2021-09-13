const mon = require('mongoose');
const { model } = require('./modelUser');

const loanModel = mon.Schema({
    id: Number,
    Reg_No: Number,
    Name : String,
    Amount_Req: Number,
    Amount_Granted: Number,
    Guarantor_1: Number,
    Guarantor_11: Number
})

const loanM = mon.model('loan', loanModel);

module.exports = loanM;

