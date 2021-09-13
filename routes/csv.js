const csv = require('fast-csv')

const fs = require('fs');
const { Mongoose } = require('mongoose');
const md = require('./modelUser')
const credentials = require('../credential');
const { find } = require('async');
const mongoose = require('mongoose');
const userModel = require('./usermodel');
const exp = require('express');
const newModel = require('./modelUser');
const port = 27017



//connection

const uri = 'mongodb://localhost:27017/obasMem?readPreference=primary&ssl=false'

mongoose.connect(credentials.mongo.development.connectionString, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('connected to the target database!')
}).catch((err=>{
    console.log('Connection error!!! \n',err)
}))


 
/*  const sTrm = fs.createReadStream('./ireAk.csv');

let csvStrm = csv.parse().on('data', (data)=>{  
    data['_id'] = new mongoose.Types.ObjectId();

    const fin = new newModel({
        name : data[0],
        Shares : data[1],
        Savings : data[2],
        buildFund : data[3],
        loanBalance : data[4],
        commBalance : data[5],
        insDep : data[6],
        hDuty : data[7],
        loanRepaid : data[8],
    }).save((err,fin) =>{
        console.log(fin)
        if(err){
            console.log(err)
        }
    })
})   
    .on('end', (err, res)=>{
            if(err) {
                console.log(err)
            }
           console.log('All datas were imported succesfully!!')
        })
        
        sTrm.pipe(csvStrm);  
       
*/
        
 /* userModel.findOne( { _id: "5fd26b887685810b0439ae"} ).then((result) => {
    console.log(result)
    
}).catch((err) => {
   console.log('disheartening!! \n',err)
});    */
 

  //find1!!!!!
 /*newModel.find({}, (err,fin)=>{
    if(err) { 
        console.log(err)
    }else{ 
        console.log(fin)
    }
    }) */  


    //create
   /*    new userModel({
      firstName: 'Hadey',
      secName: 57676,
      savings: 8449494
  }).save((res, err)=>{
      if(err){
     console.log(err)
      } else{
    return res
      }
  }) */

    



