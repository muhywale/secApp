
module.exports = {
     mongo: {
        development: {
        connectionString: 'mongodb://localhost:27017/obasMem?readPreference=primary&ssl=false'
        },
        production: {
        connectionString: 'mongodb://mili:miliTiaman_1@cluster0-shard-00-00.7sxdf.mongodb.net:27017,cluster0-shard-00-01.7sxdf.mongodb.net:27017,cluster0-shard-00-02.7sxdf.mongodb.net:27017/newdb?authSource=admin&replicaSet=atlas-rrmpl4-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true'
            }
        },
    authProvider: {
          facebook: {
             development:{
                appId:'2548772145426337',     
                appSecret: 'b608eb283058e68d515e0f44e8e79df3'
            }
        } 
    },
    email:{   
            user:'',
            password: ''
          },
           
   cookie:{
          secretCookie:'myownsecretkeygoeshere' 
       }
}




