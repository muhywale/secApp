const newModel = require('./modelUser')
const mongoose = require('mongoose');
const appModel = require('./appModel');
const { update } = require('./modelUser');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const { email, gMailService } = require('../credential');
const loanM = require('./loanModel');
const {} = require('../mailTest');
const { firstPromise,mailOptions,transporter } = require('../mailTest');
//const { mailOptions } = require('../mailTest');
//const { transporter } = require('../mailTest');


// **** routes functions****
module.exports = {
         members: (req,res) => {
                    newModel.find({}, (err,fin)=>{
                    if(err) { 
                    res.redirect('/')
                    } 
                    res.render('members.ejs',{
                    title: 'Ire Akari (Owutu-Ikorodu) CMS',
                    membersPage: fin
                            })
                        })
                    },
         rmmem:(req,res)=>{  
                    let id = req.params._id    
                    newModel.findByIdAndDelete({_id:id},(err, ans)=>{
                    if(err){
                     res.status(400).send(`No applicant with the id: ${id}`)
                      }
                    })
                    res.send(`The member with id:${id} has been withdrawn`);
                    //res.redirect('/')
                    },           
       
         updatePage:(req, res) =>{
                    let memid = req.params._id;
                    newModel.findById( {_id:memid}, (err, user)=>{
                    if(err){
                    console.log(err, "something went wrong!!")
                     }
                    res.render("updt.ejs",{
                    title: 'Members Data Update',
                    membersPage: user         
                            })
                        })     
                    },
 
         update: (req,res) => {

                    let memid = req.params._id;
                   // let usid = req.user.email
                    let shr = Number(req.body.Shares);
                    let sav = Number(req.body.Savings); 
                    let bf = Number(req.body.buildFund); 
                    let loan = Number(req.body.loanBalance); 
                    let lr = Number(req.body.loanRepaid); 
                  
                    newModel.findOne({_id:memid, },(err, user)=>{   
                    if(err) {
                        console.log(err)
                        return res.status(400).send('Something went wrong....');
                        }    
                    let  nShr =  user.Shares + shr;
                    let  nSav = user.Savings + sav;
                    let   nBf= user.buildFund + bf;
                    let   nLB = user.loanBalance - lr;
                    let   nLr = user.loanRepaid + lr ;
                    let nAss = nSav -nLB - user.totalLoanGuaranted
                    //let nwnetAsset = nSav - nLB- user.totalLoanGuaranted;
                    newModel.findByIdAndUpdate(memid, {Shares:nShr, Savings:nSav, loanBalance:nLB,loanRepaid:nLr, buildFund:nBf, netAsset:nAss }, {new:true,useFindAndModify:false}, (err, upt)=>{
                    if(err){
                       return res.status(400).send("Something went wrong iiiii")
                       console.log(err);
                    }
                       res.redirect('/members')
                       global.dt = Date(Date.now());
                       console.log(dt);

                             })
                        })
                      //  global.dt = (Date(Date.now()));
                    },
         details:(req,res)=>{
                let memid = req.params._id;
                newModel.findById( {_id:memid}, (err, user)=>{
                if(err){
                console.log(err, "something went wrong!!")
                 }
                res.render("updt.ejs",{
                title: 'Members Data Update',
                membersPage: user         
                        })
                    })     
                },
         authen:  (req,res,next)=>{
            if(req.isAuthenticated()){
            } 
            req.flash('error_msg','Please log in to view your account')
            res.redirect('/login');
          },
        
          user: (req, res,) => {
            res.render('memData.ejs', {
             title: `Ire Akari Member's Page`,
             membersPage: req.user,
            }
            )
            req.flash('error_msg','Please log in to view your account')
           // console.log(req.session.passport.user)
        },    
        more: (req, res,) => {
            let memid = req.params._id;
            newModel.findById( {_id:memid}, (err, user)=>{
            if(err){
            console.log(err, "something went wrong!!")
             }
            res.render('memData.ejs', {
             title: `Ire Akari Member's Page`,
             membersPage: user,
            }
            )
            req.flash('error_msg','Please log in to view your account')
           // console.log(req.session.passport.user)
            })
        },

        home:(req,res) =>{
            res.render('homepg.ejs',{
            title: 'Home'                 
              })
            },
       
         welc: (req,res)=>{
                    res.render('welcome.ejs',{
                    title:"Welcome"
                         })
                    },
         welSub: (req,res)=>{
                    let id = req.body.memid  
                    newModel.findById( {_id:id}, (err,res)=>{
                    if(err){
                        console.log(err, "something went wrong!!")
                     }
                    fin.render('memData.ejs', {
                    title: `Ire Akari Member's Page (${memid})`,
                    membersPage: res
                             })
                        })    
                    },
         signup: (req ,res) => {
                        res.render('reg.ejs',{
                        title:'Application for Membership'
                            })
                        },
         memAppp:(req,res)=>{
                    let tt = req.body.tt;
                    let fnm = req.body.fnm;
                    let lnm = req.body.lnm;
                    let add = req.body.add;
                    let pnb = req.body.pnb;
                    let em = req.body.em;
                    //next of kins
                    let nm = req.body.nm;
                    let phn = req.body.phn;
                    let adr = req.body.adr;
                    let nm2 = req.body.nm2;
                    let phn2 = req.body.phn2;
                    let adr2 = req.body.adr2;

                    //ref
                    let ref1 = req.body.ref1
                    let ref2 = req.body.ref2
                    // setting password
                    let pass1 = req.body.pass1
                    let pass2 = req.body.pass2

                   let memNo = Math.floor(Math.random()*1000) + 1 ;


                    var error =[];
                    
        
                    newModel.findOne({email:em},(err, user)=>{
                     if(err){
                     }   if(user){
                       
                        error.push({ msg: 'Email already exist!'})  
                        console.log(error);                         
                     }
                    if(!ref1 || !ref2){
                        error.push({ msg: 'Please Provide your referer(s)'})
                    }

                    if (!em.match(['@'])){
                        error.push({ msg: 'Kindly review your email field'}) 
                    }

                    if (pass1 !== pass2){
                        error.push({ msg: 'The passwords entered aren\'t match'}) 
                    }

                    if(error.length > 0){
                        res.render('regPost.ejs',{
                            title: "Registration",
                            error,
                             tt,  
                             fnm,  
                             lnm, 
                             add, 
                             pnb,
                             em,
                            //next of kins
                             nm ,
                             phn ,
                             adr ,
                             nm2,
                             phn2, 
                             adr2,
        
                            //ref
                             ref1,
                             ref2,
                            // setting password
                             pass1,
                             pass2,
                        })
                    }else{
                    bcrypt.genSalt(10, (err,salt) =>{
                        if(err){
                            console.log(err)
                        }
                        bcrypt.hash(pass2, salt, async (err, hashed )=>{
                            if(err){
                                console.log(err)
                            }
                           let uPass = hashed    
                           console.log(uPass)
                           console.log(error)
                            new appModel({
                               _id: memNo,
                                title: tt,
                                firstName: fnm,
                                lastName: lnm,
                                addr: add,
                                cellNo: pnb,
                                email: em,
                                nof1: {
                                name: nm,
                                cellNo: phn,
                                addr: adr
                                },
                                nof2: {
                                    name: nm2,
                                    cellNo: phn2,
                                    addr: adr2
                                },
                                pass1: uPass,
                                pass2: uPass,
                                ref1,
                                ref2
                                }).save()  
                                req.flash('success_msg','Thanks your application is been submitted!!')
                               res.redirect('/login') 
                        })
                    
                    })   
                    
                }
                })
            },
         memRegSta:(req,res)=>{      
                    appModel.find({},(err,rsp) =>{
                    if(err){
                       return res.status(400).send('No Data to return');
                    }
                    res.render('regData.ejs',{
                    title:'Applicant Register',
                    appReg : rsp
                            })
                        })
                    },
        
         nominees:(req,res)=>{
                     let id = req.params._id          
                     appModel.find({_id:id},(err,rsp) =>{
                    if(err){
                        return res.status(400).send('No Data to return');
                     }
                    res.render('nominees.ejs',{
                    title:'Applicant Register',
                    appReg : rsp
                            })
                        })
                    },

         accept:(req,res)=>{
                    let id = req.params._id
                        appModel.findOne({_id:id},(err,rsp) =>{
                    if(err){
                      return res.status(400).send(`No Application with the id: ${id}`);
                    }

                 //   console.log(rsp)
                    let tt = rsp.title;
                    let fnm = rsp.firstName;
                    let lnm = rsp.lastName;

                    let tt2 = Array.from(tt);
                    let fnm2 = Array.from(fnm);
                    let lnm2 = Array.from(lnm);

                    let ttf = tt2.join('');
                    let fnmf = fnm2.join('');
                    let lnmf = lnm2.join('');

                    let memNo = Math.floor(Math.random()*1000) + 1 ;
                    
                    let name = `${ttf} ${fnmf} ${lnmf}`;
                    //console.log(`${tAr2} ${fAr2} ${lAr2}`);
                    let nMem =    new newModel({
                            _id : id,
                            name : name,
                            email: rsp.email,
                            otherinfo :   {
                            phoneNumber : rsp.cellNo,
                            address : rsp.addr
                            },
                            nextofkinI:{
                            Name : rsp.nof1.name,
                            address: rsp.nof1.addr,
                            phoneNumber: rsp.nof1.cellNo
                            },
                            nextofkinII :{
                                Name : rsp.nof2.name,
                                address: rsp.nof2.addr,
                                phoneNumber: rsp.nof2.cellNo
                                },
                            pass1: rsp.pass1,
                            pass2: rsp.pass2,
                            ref1: rsp.ref1,
                            ref2: rsp.ref2,
                            Shares : '',
                            Savings : '',
                            buildFund : '',
                            loanBalance : '',
                            commBalance : '',
                            totalLoanGuaranted: '',
                            loanGuaranted:[],
                            insDep : '',
                            hDuty : '',
                            loanRepaid : '',
                            netAsset : ''
                            }).save().then((err,del)=>{
                                appModel.findByIdAndDelete({_id:id},{useFindAndModify:false},(err, ans)=>{
                                                if(err){
                                                    res.status(400).send(`Can\`t find member with the id: ${id} to delete!`)
                                                }
                                               res.redirect('/members');       
                                            })
                                           
                                        })
                                })
                            },
           
  
          reject:(req,res)=>{  
                    let id = req.params._id    
                    appModel.findByIdAndDelete({_id:id},(err, ans)=>{
                    if(err){
                        res.status(400).send(`No applicant with the id: ${id}`)
                    }
                    })
                    res.redirect('/app');
                    },
         loanApp:((req,res)=>{
                    res.render('loanReq.ejs',{
                        title:'Loan Request Form',
                        membersPage: req.user
                    })
                     }),
        check:(req,res)=>{
            res.render('consent.ejs',{
                secGua: 'MuhyWale',
                user:'Militiaman',
                title:'@EMAIL',
                amount:'$10,000'
            })
        },

        loanGrant: async (req,res)=>{ 
        let loanId = req.params._id;
        loanM.find({_id:loanId},(err,data)=>{
                if(err){
                console.log(err)    
            }
           // console.log(typeof data, data[0].Name);
           let guaArr =  [ data[0].Reg_No, data[0].Guarantor_1,data[0].Guarantor_11]       
            
           console.log(guaArr);

            newModel.find({'_id':{$in:guaArr}},(err,dGua)=>{
                if(err){
                    res.send('That wasn\'t went well!!')
                }  
           console.log(dGua[1].email, dGua[2].email)
         
           let msgBody = async (req,res)=> { 

            try{
           
           let f = await firstPromise(data[0].Amount_Req,dGua[0].name,dGua[2].name) 
            let f2 = await mailOptions(dGua[1].email,dGua[2].email,'ayoadeadewale5@gmail.com','GUARANTORSHIP CONSENT','Kindly read this',f)
             
          //  console.log(f2)
          transporter.set("oauth2_provision_cb", (user, renew, callback) => {
            let accessToken = userTokens[user];
            if (!accessToken) {
              return callback(new Error("Unknown user"));
            } else {
              return callback(null, accessToken);
            }
          });
        
          transporter.sendMail(f2 , (error, info) =>{
                if(error){
                  console.log(error)
               //   res.send('Something went wrong.. ');
                }else{
                  res.send(`Message has been succefully sent to: ${f2[0].to }`);
                    console.log(typeof f2);
                }
                  }) 
         }catch{
             console.log(err)
           //  req.send('something went wrong!!')
         }

         }
         msgBody()
      })})},
        loanStand:(req,res)=>{
            loanM.find({},(err,loan)=>{
                if(err){
                    console.log(err)
                }
                res.render('loanAppReg.ejs',{
                title: 'Loan Applicant',
                loanApp: loan
                })
            
        })
    },


        loanAppReg:(req,res)=>{

            const {lamt,gua1, gua2, nm, id,lBal, Savings}  = req.body
           // console.log(req.body);
            var loanError = [];
            var idArray =[gua1,gua2]
            
          //  var idArray = ['961','47']

            newModel.find({'_id':{$in:idArray}},(err,gua)=>{
           
                      /****possible output****
                        1. Null user
                        2. just one user
                        3. the two users */
          
                       if(err){
                        console.log(`Something wrong thus: ${err}`)
                       }
        
                       //**Null User */
                       if(gua.length == 0){
                        loanError.push({msg:`No user with the provided ids: ${idArray[0]} and ${idArray[1]}`})    
                       }          
            
                      //**One user */
                      if(gua.length == 1){   
                        for(key in gua){
                        var user1 = `${gua[key]._id == idArray[0] }`
                        var user2 = `${gua[key]._id == idArray[1] }`
        
                            if(user1 == 'false'){
                            loanError.push({msg:`No user with the provided id : ${idArray[0]}`})
                             }
        
                            if(user2 == 'false'){
                            loanError.push({msg:`No user with the provided id : ${idArray[1]}`})
                             }
                                 }   
                      }

                        //** the two users */
                        if(gua.length == 2) {

                         var allowed = gua[0].netAsset + gua[1].netAsset >= lamt/2;
                         console.log(allowed);
                
                        if(allowed == false){
                        loanError.push({msg:'Oopps\!!! Look out for another guarantor(s)'})
                        }                          
                    }
                   
                    if( lBal > 0){
                        loanError.push({msg:`You still have an unsettled loan of ${lBal}`})
                        }                       
                  
                        if((lamt/2) > Savings){
                        loanError.push({msg:`kindly upgrade your savings`}) 
                       }   

                     if(loanError.length == 0 && allowed == true){  
                       new loanM({
                            Amount_Req : lamt,
                            Guarantor_1 : gua1, 
                            Guarantor_11 : gua2,
                            Reg_No : id,
                            Name : nm
                        }).save()
                          //  req.send('Your Application has been submitted!')
                            req.flash('success_msg','Your Loan Application has been submitted!');
                       //    req.flash('success_msg','Thanks your application is been submitted!!')
                            res.redirect('/user')
                    }
                         if(loanError.length > 0) {
                            res.render('loanReqPost.ejs',{
                            title : 'Loan Application',
                            loanError,
                            lamt,
                            gua1,
                            gua2,
                            nm,
                            id,
                            lBal,
                            Savings
                         })
                        }
                        console.log(loanError)
                    })
                },

    }
    