"use strict";
const nodemailer = require('nodemailer');
const cre = require('./credential')
const exp = require('express')
const fs = require('fs')
const ejs = require('ejs')

const mailExp = exp();

/*READ TEMPLATE
let tempPath = 'C:/Users/DELL/Documents/VS17/myapp/secApp/views/consent.html'
let prt = fs.readFileSync(tempPath,'utf-8');
console.log(prt);


let htmlFile = htmlToText(prt); */

/**let exist = fs.existsSync(tempPath);
console.log(exist);

let prt = fs.readFileSync(tempPath,'utf-8');
console.log(prt);

ejs.render(tempPath); */



  
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

  //  var receivers = ['muhy', 'bro']



 // var html =  


    transporter.verify();

    let  msgBody = (req,res)=>{
     
   ejs.renderFile( __dirname + "/views/consent.ejs",{
       title: 'NOTIFICATION',
       amount: '800,000.00',
       user: 'MILI'},
       
       (err,fin)=>{
        if(err){
          console.log(err)
        }else{

          console.log(fin)
          //ALL REST>>>>>>>>>>>>>
          let mailOptions = {
            from: '"Lil Muhy" <ayoadeadewale5@gmail.com>', // sender address
            to: ' "Whalay" <mhadewhalay@yahoo.com>', // list of receivers
           // to: `${ receivers[0],receivers[1]}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello, How are you doing bro??", // plain text body
            html: fin // html body
          }
        
          console.log(mailOptions.html);

          transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
              console.log(err)
              //res.send('Something went wrong.. '+ error +'');
            }else{
              res.send(`Message has been succefully sent to: ${mailOptions.to}`);
            }
          })
            }
        }
     )}

      // send mail with defined transport object
     
      mailExp.get('/send', msgBody)
    
      mailExp.listen('3008', ()=>{
        console.log('Listening on port 3008....')
      })
    



  
  






// async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
 
  // create reusable transporter object using the default SMTP transport
  

 // console.log(msgBody.mailOptions.to);

