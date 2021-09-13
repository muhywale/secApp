
//const cP = require('')
const credentials = require('./credential');
var passport = require('passport');
const { find } = require('async');
const mongoose = require('mongoose');
const exp = require('express');

//const userModel = require('./routes/usermodel');
const {editMemPg, update , updatePage, members, home, signup, welc, memAppp, memRegSta, nominees,reject, accept,loanApp,rmmem, user, authen, details, loanAppReg, loanStand} = require('./routes/Routes');
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



//secApp.use(require('cookie-parser')(credentials.cookieSecret)); 

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

  secApp.get("/user/:_id",user);
  secApp.get("/members",admin, members);
   secApp.get("/remove/:_id",admin, rmmem);
   
   //secApp.get('/details',editMemPg); 
  secApp.get('/update/:_id',admin, updatePage);
   secApp.post('/update/:_id', admin,update);  
   secApp.get('/app', memRegSta);
   secApp.get('/app/view/:_id', admin,nominees);
   secApp.get('/member/:_id',user);
  
   //membership status
   secApp.get('/app/accept/:_id',admin, accept);
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
 

// ADMIN ROUTES

//ROLE!!!!
/*var em = "asa@gmail.com"
newModel.findOneAndUpdate({email:em},{role:'admin'}, {new:true},(err,user)=>{
  if(err) throw err
  console.log(user.role)
}) */

/*newModel.findOne({email:em},(err,res)=>{
  if(err) throw err
  console.log(res)
}); */

secApp.get('/err',(req,res)=>{
  res.render('err.ejs',{
    title:"Error Page!!"
  })
})

 
 







   

/*let granted = () => { 
  secApp.post('/', (req,res)=>{
  
  global.idi= req.body.memid

      
  newModel.findById( {_id:idi}, (err,fin)=>{
      if(err){
     //res.redirect('/err'); 
     res.redirect('/err')
  }else{
      res.redirect('/auth/facebook')
   } 
  })
 })
}
 
  granted();
 let sec = () => {
    if(granted)
  secApp.get('/details/', (req,res)=>{
    if(!req.user){
      return res.redirect(303, '/');
    }
    let memid = idi
  
    newModel.findOne( {_id:memid}, (err,fin)=>{
     if(err){
         console.log(err, "something went wrong!!")
     }
     console.log(req.user.email);
    res.render('memData.ejs', {
    title: `Ire Akari Member's Page (${memid})`,
     membersPage: fin
    })
  })
 })
}

 sec();
 */


 // new members


  //dest

/*var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({ url:
credentials.mongo.development.connectionString }); */


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
