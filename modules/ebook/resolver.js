const { journalsModel, createDepartmentModel, createJournalType, departmentModel, eBookModel, createEbookModel} = require("./model");
const { cover, file } = require('../science/model')
const {  verify} = require("../../jwt");

// Resolver map
const resolvers = {
	Query: {
		departments:() => departmentModel(),
		eBooks:async(_, {id})=>{
			const row  = await eBookModel(id)
			console.log(row)
			return row
		}
	},
	Ebook:{
		id:global=>{
			console.log(global)
			return global.e_book_id
		},
		department:async(global)=>{
			console.log("department")
			const row  = await eBookModel(global.department_id)
			console.log(row)
			return row.department_name
		}
	},
	Department: {
		id: (global) =>  global.department_id,
		name:global=>global.department_name
	},


  Mutation: {
	createDepartment: async ( _, {  name }, {token} ) => 
	{	
	
		const admin = await verify(token)
		try{
			if(admin.isAdmin){
				const row = await  createDepartmentModel(name);			
				return row
			}
			else{
				throw new Error("you don't have a privlige to create book")
			}
			
		}
		catch(err){
			return {	status:404,	error:err.message	}
		}
			
	},
    createEbook: async ( _, { fileId, coverId, departmentId, name, author } , {token} ) => 
		{	
		
			const admin = await verify(token)
			try{
				if(admin.isAdmin){
					const row = await createEbookModel(fileId, coverId, departmentId, name, author );			
						
					return row
				}
				else{
					throw new Error("you don't have a privlige to create book")
				}
				
			}
			catch(err){
				return {	status:404,	error:err.message	}
			}
				
		},
  },
};

module.exports = {
  resolvers,
};
