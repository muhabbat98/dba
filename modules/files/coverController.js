const {coverUpload} = require('./queries.js')

module.exports= async function (req, res){
    const file = req.file
    if(file){
        try{           
            const row = await coverUpload(file.filename, file.mimetype, file.size)           
            if(row){
                return{
                    status:200,
                    message:"Successfully created",
                    data:row
                }
            }
            throw new Error("record is not created you didn't fill required fields")
        }
        catch(err){
            return{
                status:400,
                message:err.message,
                data:null
            }
        }

    }
}