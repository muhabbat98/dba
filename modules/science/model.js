const { modelAll, modelSingle } = require("../../connection/pool");


// SELECT 
const SCIENCES = ` SELECT * FROM science_literature l LEFT JOIN covers c ON c.cover_id= l.cover_id LEFT JOIN files f ON f.file_id=l.file_id ;`;

const FILE     = `SELECT * FROM files WHERE file_id=$1`
const COVER     = `SELECT * FROM covers WHERE cover_id=$1`

// INSERT 
const ADD_SCIENCE = `INSERT INTO  science_literature(
					file_id,
					cover_id,
					name,
					keywords,
					resource_type,
					language,
					date,
					author,
					degree,
					description
				) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) 
				RETURNING name`;


// INSERT FUNC 
const createScienceModel = (  fileId,coverId, name,  keywords,  resourceType,  language, date, author, degree, description) 		=>  		modelSingle( ADD_SCIENCE, fileId,coverId, name,  keywords, resourceType,  language,date, author, degree, description );


// SELECT FUNC 

const scienceModel =    	() 																										=>        	modelAll(SCIENCES)
const file     =			(fileId)                                                                                                =>          modelSingle(FILE, fileId)
const cover     =			(fileId)                                                                                                =>          modelSingle(COVER, fileId)


module.exports = {
  scienceModel,
  createScienceModel,
  cover, file
};

   
   