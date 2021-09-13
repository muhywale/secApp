module.exports = {
    auth: (req ,res) => {
        res.render('auth.ejs',{
            title:'Login Page'
        })
    },

    login: (req, res) =>{
        nwem = req.body.em
        nwpass = req.body.pass

    }
}