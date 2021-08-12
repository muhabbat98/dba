const {coverUpload} = require('./queries.js')

module.exports=  async function (req, res){
    const file = req.file
   
    if(file){            
        const row = await coverUpload(file.filename, file.mimetype, file.size)           
        if(row){
            res.send(row)           
        }
    } 

}