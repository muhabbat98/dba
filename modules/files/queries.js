const {modelSingle} = require('../../connection/pool')

const COVER_UPLOAD = "INSERT INTO covers(filename, mimetype, size) VALUES( $1, $2, $3 )RETURNING cover_id, filename"
const FILE_UPLOAD = "INSERT INTO files(filename, mimetype, size) VALUES ($1, $2, $3) RETURNING file_id, filename"

const coverUpload =     (filename, mimetype, size)      =>      modelSingle(COVER_UPLOAD,filename, mimetype, size)
const fileUpload =      (filename, mimetype, size)      =>      modelSingle(FILE_UPLOAD,filename, mimetype, size)


module.exports = {
    coverUpload,
    fileUpload
}