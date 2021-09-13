const mImp = requires('mongoimport')

mImp(config)

var config = {
    fields: [ 'C://Users//DELL//Desktop//ireAkari.csv'],// {array} data to import
    db: 'obasMem',                     // {string} name of db
    collection: 'obasData'        // {string|function} name of collection, or use a function to
}  


