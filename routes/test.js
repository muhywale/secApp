
        tt= 'MR'
        fnm= 'ADEWALE'
        lnm = 'AYO'

        let tAr = Array.from(tt);
        let fAr = Array.from(fnm);
        let lAr = Array.from(lnm);

        let tAr2 = tAr.join('');
        let fAr2 = fAr.join('');
        let lAr2 = lAr.join('');

    //    let fj = `${tAr2} ${fAr2} ${lAr2}`
       
     //   console.log(fj);

       
    
    
     /// ****LOAN ARRAY****
        let L1 = 200000;

        let newLoan = (amt,g,sav) =>{
                L1 += amt
                console.log(L1);
                
        }

      let nL =  newLoan(800000);

      

      
        //**GUARANTORS */

        const Gu1 = (sav,loan) =>{
               let netAsset = sav-loan-`${nL}`/2
                
               console.log(netAsset)

                
        }

        Gu1(515000,250000);



        


        

