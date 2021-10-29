"use strict";
const nodemailer = require('nodemailer');
const { gMailService } = require('./credential');
const cre = require('./credential')
const exp = require('express')






const mailExp = exp();




// async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: cre.gMailService.user,
      pass: cre.gMailService.pass,
      clientId: cre.gMailService.clientId ,
      clientSecret: cre.gMailService.clientSecret,
      refreshToken: cre.gMailService.refreshTokem,
    },
    
  }); 

  let msgBody = (req,res)=>{
  // send mail with defined transport object
 let mailOptions = {
    from: '"Lil Muhy" <ayoadeadewale5@gmail.com>', // sender address
    to: ' "Whalay" <mhadewhalay@yahoo.com>', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello, How are you doing bro??", // plain text body
    html: '<b>Hello Whalay!!</b>', // html body
  }


  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
      res.send('Something went wrong.. '+ error +'');
    }else{
      res.send(`Message has been succefully sent to: ${mailOptions.to}`);
    }
  })

 // console.log(mailOptions.transporter.sendMail.to);


}


  mailExp.get('/send', msgBody)

  mailExp.listen('3008', ()=>{
    console.log('Listening on port 3008....')
  })

 // console.log(msgBody.mailOptions.to);

