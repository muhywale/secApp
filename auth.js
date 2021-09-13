//const user = require('./usermodel');
//var passport = require('passport');
var passportmongo = require('passport-local-mongoose');
//const { use } = require('passport');
const newModel = require('./routes/modelUser');
var fbS = require('passport-facebook').Strategy;
const { email } = require('./credential');
const flash = require('connect-flash');
const localStrategy = require('passport-local').Strategy;  
const bcrypt = require('bcryptjs');
          /*
                                                              Strategy
                                                              Middleware
                                                              session
                                                                */

 

//setting up passport
module.exports = function(passport){
    
  // if success and failure redirects aren't specified,
  
  // set some reasonable defaults
 /*
  if(!options.successRedirect)
  options.successRedirect = '/members/';
  if(!options.failureRedirect)
  options.failureRedirect = '/app';
  */

  
    
    //  var config = options.providers;
  // configure Facebook strategy
  /*passport.use(new fbS({
    clientID: config.facebook[env].appId,
    clientSecret: config.facebook[env].appSecret,
    callbackURL: '/auth/facebook/callback',
  }, function(accessToken, refreshToken, profile, done){
  
  var authId = 'facebook:' + profile.id;
  newModel.findOne({ authId: authId }, function(err, user){
  if(err) return done(err, null);
   if(user) return done(null, user);
     user = new newModel({
      authId: authId,
      name: profile.displayName,
      email: email[0].value,
      created: Date.now(),
      role: 'customer',

      user.save(function(err){
  if(err) return done(err, null);
  done(null, user);
        });
  });
  */
 
  
  //local Strategy
  passport.use(new localStrategy({usernameField:'email',passwordField:'upass'},(email,password,done)=>{
     
    
     newModel.findOne({email:email}).then(user =>{ 

      if(!user){
        return done(null, false, {message:"user not found!"})
      }
      
      bcrypt.compare(password,user.pass1,(err,isMatch)=>{
        if(err) throw err

       if(isMatch){
         console.log(user.role)
         return done(null, user)
       } else{
        return done(null, false, {message: "Wrong Password!"})
      }
    })
  }).catch(err => console.log(err))
    })
    )

    passport.serializeUser( (user, done)=>{ 
      done(null, user.id)
    })
    
    passport.deserializeUser((id, done )=>{
      newModel.findById(id, (err,user) => {
       return done(err,user) 
        }) 
    })
  }
  

 
 //****LOCAL ROUTE/   
 

   
  
  
  
       // successRedirect: options.successRedirect
   //****LOCAL STRTG****/
  
  
  /* // register Facebook routes   
   secApp.get('/auth/facebook', function(req, res, next){
   passport.authenticate('facebook', {
   callbackURL: '/auth/facebook/callback'//?redirect='+encodeURIComponent(req.query.redirect),
              })(req, res, next);
          });
  secApp.get('/auth/facebook/callback', passport.authenticate('facebook',{ failureRedirect: options.failureRedirect}),
  
   // successRedirect: options.successRedirect
  function(req, res){
      // we only get here on successful authentication  
     res.redirect(req.query.redirect || options.successRedirect);
                }
             ) */
      