const { model, modelSingle } = require("../../connection/pool");


// SELECT 
const JOURNALS = ` SELECT * FROM journals_literature l LEFT JOIN covers c ON c.cover_id= l.cover_id LEFT JOIN files f ON f.file_id=l.file_id DESC;`;




// INSERT 
const ADD_JOURNAL = `INSERT INTO  journals_literature(
					file_id,
					cover_id,
					name,
					keywords,
					resource_type,
					language,
					serial_number,
					year,
					date
				) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
				RETURNING *`;


// INSERT FUNC 
const createJournalModel = (  fileId,coverId, name,  keywords,  resourceType,  language, serialNumber, year, date) =>  model(    ADD_JOURNAL,    fileId,coverId, name,  keywords,  resourceType,  language, serialNumber, year, date     );


// SELECT FUNC 

const journals =    () 			=>        	model(JOURNALS)


module.exports = {
  journals,
  createJournalModel
};
