"use strict";
const nodemailer = require('nodemailer');
const cre = require('./credential')
const exp = require('express')
const fs = require('fs')
const ejs = require('ejs')
//const routes = require('./routes');
//const { resolve } = require('path');
//const { reject } = require('./routes/Routes');

const mailExp = exp();

/*READ TEMPLATE 
let tempPath = 'C:/Users/DELL/Documents/VS17/myapp/secApp/views/consent.html'
let prt = fs.readFileSync(tempPath,'utf-8');
console.log(prt);


let htmlFile = htmlToText(prt); */

/**let exist = fs.existsSync(tempPath);git git
console.log(exist);

let prt = fs.readFileSync(tempPath,'utf-8');
console.log(prt);

ejs.render(tempPath); */


let msgBody = (req,res) =>{

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
    tls: {
      rejectUnauthorized: false
    }
  }); 

  //  var receivers = ['muhy', 'bro']
 // var html =  
   transporter.verify();
 
    ejs.renderFile( __dirname + "/views/consent.ejs",{
        title: 'EMAIL NOTIFICATION',
        amount: 80000,
        user: 'Lil Muhy'
       },
      
       (err,fin)=>{
         if(err){
           console.log(`SOMETHING WENT WRONG:${err}`)
         }else{
           console.log(fin)
         }
  
  let mailOptions = {
            from: '"Lil Muhy" <ayoadeadewale5@gmail.com>', // sender address
            to: ' "Whalay" <mhadewhalay@yahoo.com>', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello, How are you doing bro??", // plain text body
            html: fin // html body
           
           }
      
          transporter.sendMail (mailOptions ,(error, info) =>{
            if(error){
              console.log(err)
            res.send('Something went wrong.. '+ error +'');
            }else{
           res.send(`Message has been succefully sent to: ${mailOptions.to}`);
              }
              })

            })
      }
      
         
        // send mail with defined transport object
     
       mailExp.get('/send', msgBody)
      //  console.log(typeof  msgBody)

      mailExp.listen('3008', ()=>{
        console.log('Listening on port 3008....')
      }) 
    
    