"use strict";
const nodemailer = require('nodemailer');
const cre = require('./credential')
const exp = require('express')
const fs = require('fs')
const ejs = require('ejs')
const routes = require('./routes');
const { resolve } = require('path');
const { reject } = require('./routes/Routes');

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



  
module.exports.transporter = nodemailer.createTransport({
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
 //  transporter.verify();
 
 module.exports.firstPromise = new Promise((resolve,reject) => {
     
  setTimeout((amount,user)=>{
      ejs.renderFile( __dirname + "/views/consent.ejs",{
        title: 'EMAIL NOTIFICATION',
        amount: `${amount}`,
        user: `${user}`
       },
       
        (err,fin)=>{
         if(err){
           reject(`SOMETHING WENT WRONG:${err}`)
         }else{
           return resolve(fin)
         }
  },5000)
      })
    })
  
  module.exports.mailOptions = new Promise ((resolve,reject) =>{
     setTimeout((rec1, rec2, sender,sub,t, ht) => {
      let option = {
        from:`<${sender}> `,
        to: `${rec1}, ${rec2}`,
        subject: sub,
        text:t,
        html: ht
        }
        resolve(option)
    },3000)
           /* 
            from: '"Lil Muhy" <ayoadeadewale5@gmail.com>', // sender address
            to: ' "Whalay" <mhadewhalay@yahoo.com>', // list of receivers
            to: `${ receivers[0],receivers[1]}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello, How are you doing bro??", // plain text body
            html: fin // html body
           */

        

         // console.log(mailOptions.html);

          transporter.sendMail (load /*mailOptions */, (error, info) =>{
            if(error){
              console.log(err)
              //res.send('Something went wrong.. '+ error +'');
            }else{
              res.send(`Message has been succefully sent to: ${load.t /*mailOptions.to*/}`);
              }
              })
     
      
      
        // send mail with defined transport object
     
    /**   mailExp.get('/send', msgBody)
    
      mailExp.listen('3008', ()=>{
        console.log('Listening on port 3008....')
      }) */
    
    