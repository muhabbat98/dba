const { modelAll, modelSingle } = require("../../connection/pool");


// SELECT 
const DEPARTMENTS = `SELECT * FROM departments ;`;

const EBOOK = `SELECT * FROM e_books e LEFT JOIN covers c ON e.cover_id=e.cover_id LEFT JOIN files f ON f.file_id=e.file_id LEFT JOIN departments d ON d.department_id=e.department_id WHERE e.e_book_id=$1 `;
const EBOOKS = `SELECT * FROM e_books e LEFT JOIN covers c ON e.cover_id=e.cover_id LEFT JOIN files f ON f.file_id=e.file_id LEFT JOIN departments d ON d.department_id=e.department_id WHERE 	d.department_id=$1`;

const DEPARTMENT = `SELECT * FROM departments WHERE department_id=$1 ;`
// INSERT 
const ADD_DEPARTMENT = 	`INSERT INTO  departments(
							department_name
						) VALUES($1) 
							RETURNING *`;

const ADD_EBOOK = 	`INSERT INTO  e_books(
						file_id,
						cover_id,
						department_id,
						name,
						author
					) VALUES($1, $2, $3, $4, $5) 
						RETURNING *`;
						// select * from e_books e Left join covers c on c.cover_id=e.cover_id  left join files f on f.file_id=e.file_id Left join departments d on d.department_id=e.department_id WHERE e.department_id=2;
// INSERT FUNC 
const createDepartmentModel = (name) 																				=> 			modelSingle( ADD_DEPARTMENT, name);

const createEbookModel = (fileId, coverId, departmentId, name, author) 												=> 			modelSingle( ADD_EBOOK, fileId, coverId, departmentId, name, author);

// SELECT FUNC 

const eBookModel = async(id) 																						=>			modelSingle(EBOOK, id)
const departmentModel = (id) 																						=>			id? modelSingle(DEPARTMENT,id) :modelAll(DEPARTMENTS)

const eBooksModel = (id) 																							=>			modelAll(EBOOKS,id)

module.exports = {
	departmentModel,
  	createDepartmentModel,
	// generalJournalModel,
	createEbookModel,
	eBookModel,
	eBooksModel
};
