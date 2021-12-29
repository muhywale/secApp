/* var dt = 65477457547
const re = new RegExp (/[0-9][r-z]/)
var  match = dt.match(re);

console.log(match); */

//const { firstPromise, mailOptions } = require('./mail');
const {mailOptions } = require('./mailTest');
const {} = require('./mailTest')

let allPromise = async () =>{

  try{ 

  //let x = await firstPromise('90,000','Lilmuhy');
  let x2 = await mailOptions('mhadewhalay@yhaoo.com','lilmuhy007@gmail.com', 'ayoadeadewale@gmail.com','MAILSUB','We are here!!','<p>Hello!! Dear</p>') 
    console.log(x2)

} catch(err){
  console.log(err)
 }
}
  allPromise()



