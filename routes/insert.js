const { query } = require("express");
const { ConnectionError } = require("mssql");

module.exports = {
       
    update: (req, res) =>{

        let memid = req.params.id
       
        let reqid = "SELECT * FROM obasmem WHERE id = '"+memid+"'";
      //  let reqAll = "SELECT NAME FROM obasmem WHERE id = '"+memid+"'";


        db.query(reqid,(err, fin) =>    {
            if(err){
                res.status(400).send("No Member with this id: '"+memid+"'");
            }
            res.render('insert.ejs',{
                title:'Insert Data For Member',
                membersPage: fin[0]
            })
        })
           
    },
    
    syncData: (req, res) =>{

       let memid = req.params.id;
       let nam =  (req.body.name); 
       let shr = Number(req.body.SHARE); 
       let sav = Number(req.body.SAVINGS); 
       let bf = Number(req.body.buildFund); 
       let lr = Number(req.body.loanRep); 
       let nl = Number(req.body.newLoan); 


     
       let qtest = "SELECT columns FROM obasmem  WHERE id =1";

       let que = "SELECT * FROM obasmem  WHERE id ='"+memid+"'";

       db.query(que,(err, fin2) =>    {
        if(err){
            res.status(500).send("No Member with this id: '"+memid+"'");
        }

        console.log(fin2)

         let osav = fin2[0].SAVINGS; 
         let oshr = fin2[0].SHARES; 
         let obf = fin2[0].buildFund; 
         let olBal = fin2[0].loanBal; 
         let olRep = fin2[0].LoanRep; 
        // let sav = fin2[0].SAVINGS; 

      //  let nnam =+ nam;
        let nshr =  oshr += shr ;
        let nsav = osav += sav;
        let nbf =   obf += bf
        let nlBal = olBal -= lr
        let nlr = olRep += lr;
        let nloan = nlBal += nl;


   
        let upd = "UPDATE obasmem SET SAVINGS = '"+nsav+"', SHARES = '"+nshr+"', buildFund = '"+nbf+"' , loanBal = '"+nloan+"', LoanRep = '"+nlr+"'  WHERE id ='"+memid+"'";
     //  let reqAll = "SELECT NAME FROM obasmem WHERE id = '"+memid+"'";


        db.query(upd,(err, fin3) =>    {
            if(err){
               return res.status(500).send(err);
            }
        //    console.log(fin3)
            res.redirect('/hm')
            
        })

       })
       
}
}