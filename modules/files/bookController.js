const {fileUpload} = require('./queries')

module.exports= async function (req, res){
    const file = req.file
    
    if(file){
        const row = await fileUpload(file.filename, file.mimetype, file.size)
        if(row){
            res.send(row)     
        }    
    }

   
}