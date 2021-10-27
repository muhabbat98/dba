const { modelAll, modelSingle } = require("../../connection/pool");


// SELECT 
const DEPARTMENTS = `SELECT * FROM departments ;`;

const EBOOK = `SELECT * FROM e_books e NATURAL JOIN covers c NATURAL JOIN files f NATURAL JOIN departments d WHERE e.department_id=$1 `;


// INSERT 
const ADD_DEPARTMENT = `INSERT INTO  departments(
					department_name
				) VALUES($1) 
				RETURNING *`;

const ADD_EBOOK = `INSERT INTO  e_books(
					file_id,
					cover_id,
					department_id,
					name,
					author
				) VALUES($1, $2, $3, $4, $5) 
				RETURNING *`;
// INSERT FUNC 
const createDepartmentModel = (name) 																				=> 			modelSingle( ADD_DEPARTMENT, name);

const createEbookModel = (fileId, coverId, departmentId, name, author) 											=> 			modelSingle( ADD_EBOOK, fileId, coverId, departmentId, name, author);

// SELECT FUNC 

const eBookModel =    		(id) 																				=>        	modelSingle(EBOOK, id)
const generalJournalModel=      ()																					=>			modelAll(GENERAL_JOURNAL)

module.exports = {
	// departmentModel,
  	createDepartmentModel,
	generalJournalModel,
	createEbookModel,
	eBookModel
};
