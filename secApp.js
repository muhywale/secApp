
//const cP = require('')
const credentials = require('./credential');
var passport = require('passport');
const { find } = require('async');
const mongoose = require('mongoose');
const exp = require('express');
//const mail = require('./mail');

//const userModel = require('./routes/usermodel');
const {editMemPg, update , updatePage, members, home, signup, welc, memAppp, memRegSta, nominees,reject, accept,loanApp,rmmem, user, authen, details, loanAppReg, loanStand, more, consent, loanGrant} = require('./routes/Routes');
const newModel = require('./routes/modelUser');
const body = require('body-parser')
const fileup = require('express-fileupload');
const rt = require('./routes/Routes');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const session = require('express-session');
const { cookie } = require('./credential');
const { authenticate } = require('./routes/modelUser');
const loanM = require('./routes/loanModel');
//const {msgBody} = require('./mail')




//const { update } = require('./routes/modelUser');


const secApp = exp(); 

 require('./auth')(passport);

switch(secApp.get('env')){
  case 'development':
  mongoose.connect(credentials.mongo.development.connectionString, {useNewUrlParser:true, useUnifiedTopology:true});
  break;
  case 'production':
  mongoose.connect(credentials.mongo.production.connectionString, {useNewUrlParser:true, useUnifiedTopology:true});
  break;
  default:
   throw new Error('Unknown execution environment: ' + secApp.get('env'));
  }  
  //making connection
   console.log(secApp.get('env'));
  

const port = 3009
secApp.set('views',__dirname + '/views');
secApp.set('port', process.env.port || port);
secApp.set('views engine', 'ejs');
//secApp.use(body.urlencoded({extended:false})); 
//secApp.use(body.json());
secApp.use(fileup());
//session
var sessionStore = 'blablabla'
secApp.use(require('express-session')
({ secret: sessionStore, 
  resave:true, 
  saveUninitialized:true
 }));

 //initialize
 secApp.use(passport.initialize());
 secApp.use(passport.session());

 secApp.use(flash());

//Global variable
 secApp.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
 })

 secApp.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash:true
  })
  (req,res,next)
 })
   
secApp.get('/login', (req,res)=>{
  res.render('homepg.ejs',{
   title:"Welcome"
  })
})
 
 //***ADMIN ROUTES */  
 let admin = (req,res,next) =>{
    if(req.user.role === "admin" && req.session.passport.user ){
       return next()
    }
    res.send('you can\'t view the content')
  }

  secApp.get("/user", user);
  secApp.get('/notify/:_id',loanGrant)  ///***NEW*** */
  secApp.get("/members",admin, members); 
   secApp.get("/remove/:_id",admin, rmmem);
   
  secApp.get('/details/:_id',admin,more); 
  secApp.get('/update/:_id',admin, updatePage);
   secApp.post('/update/:_id', admin,update);  
   secApp.get('/app',admin, memRegSta); 
   secApp.get('/app/view/:_id', admin,nominees);
   //secApp.get('/consent',admin,consent)
   //secApp.get('/member/:_id',user);
  
   //membership status
   secApp.get('/app/accept/:_id', admin, accept);
   secApp.get('/app/reject/:_id', admin, reject);
   secApp.get('/loanApp',admin,loanStand);
   secApp.post('/loanReq',loanAppReg);
   secApp.get('/loanReq', loanApp);
   secApp.get('/signup',signup);
 
  secApp.post('/signup',memAppp);
  secApp.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg','You are now logged out');
  res.redirect('/login');
  });

 secApp.get('/signup',signup)
 secApp.post('/signup',memAppp)
 secApp.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg','You are now logged out')
  res.redirect('/login');
});
   
 //***CUSTOMER'S ROLE */

 let customer = (req,res,next) =>{
  if(req.user.role === "customer" && req.session.passport.user){
     return next()
  }
  res.send('you can\'t view the content')
}

secApp.get("/user",user);
secApp.get('/loanReq',customer,loanApp);
secApp.get('/signup',signup)
 
secApp.post('/signup',memAppp)
secApp.get('/logout', function(req, res){
 req.logout();
 req.flash('success_msg','You are now logged out')
 res.redirect('/login');
});

secApp.get('/err',(req,res)=>{
  res.render('err.ejs',{
    title:"Error Page!!"
  })
})

/*newModel.findOneAndUpdate({_id:478},{role:'admin'},(err,nw)=>{
  console.log(nw);
}) //
/*var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({ url:
credentials.mongo.development.connectionString }); */

/**newModel.updateOne({_id:904},{email:'mhadewhalay@yahoo.com'},(err,data)=>{
  if(err){
  console.log(err)
}   
console.log(data)
}) */


secApp.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

 
/**newModel.findOne({_id:211},(err,res)=>{
  if(err){
    console.log(err)
  }
  console.log(res)
}) */
//***HUGE ROUTES */
 //secApp.get("/",welc)
 
  /***** loanM.deleteMany((err,res)=>{
 })  ****/
 
 // console.log(req.body);
