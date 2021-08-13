const { modelAll, modelSingle } = require("../../connection/pool");


// SELECT 
const JOURNALS = `SELECT * FROM journals_literature WHERE general_id=$1`;

const GENERAL_JOURNAL = `select * from general_journals l left join covers c ON l.cover_id=c.cover_id`;


// INSERT 
const ADD_JOURNAL = `INSERT INTO  journals_literature(
					file_id,
					serial_number,
					year,
					date,
					general_id
				) VALUES($1, $2, $3, $4, $5) 
				RETURNING *`;

const ADD_JOURNAL_TYPE = `INSERT INTO  general_journals(
					cover_id,
					name,
					keywords,
					resource_type,
					language
				) VALUES($1, $2, $3, $4, $5) 
				RETURNING name, general_id`;
// INSERT FUNC 
const createJournalModel = (fileId, serialNumber, year, date, generalId) 						=> 			modelSingle( ADD_JOURNAL, fileId, serialNumber, year, date, generalId);

const createJournalType = (coverId, name, keywords, resourceType, language) 		=> 			modelSingle( ADD_JOURNAL_TYPE, coverId, name, keywords,  resourceType, language);

// SELECT FUNC 

const journalsModel =    		(id) 																				=>        	modelAll(JOURNALS, id)
const generalJournalModel=      ()																					=>			modelAll(GENERAL_JOURNAL)

module.exports = {
	journalsModel,
  	createJournalModel,
	generalJournalModel,
	createJournalType
};
