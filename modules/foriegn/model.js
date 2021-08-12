const { modelSingle, modelAll } = require("../../connection/pool");


// SELECT 
const FORIEGN_BOOKS = ` SELECT * FROM foriegn_literature l LEFT JOIN covers c ON c.cover_id= l.cover_id LEFT JOIN files f ON f.file_id=l.file_id;`;



// INSERT 
const ADD_FORIEGN_BOOK = `INSERT INTO  foriegn_literature(
					file_id,
					cover_id,
					name,
					keywords,
					resource_type,
					language,
					date,
					author, 
					description, 
					right_holders
				) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
				RETURNING name`;


// INSERT FUNC 
const createForiegnModel = (fileId,coverId, name,  keywords,  resourceType,  language,  date, author, description, resourseHolder) =>  modelSingle(ADD_FORIEGN_BOOK, fileId,coverId, name,  keywords,  resourceType,  language,  date, author, description, resourseHolder);


// SELECT FUNC 

const foriegnBooksModel =    () 			=>        	modelAll(FORIEGN_BOOKS)


module.exports = {
	foriegnBooksModel ,
  	createForiegnModel
};
