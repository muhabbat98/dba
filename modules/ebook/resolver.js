const {  createDepartmentModel,  departmentModel, eBookModel, createEbookModel, eBooksModel} = require("./model");
const { cover, file } = require('../science/model')
const {  verify} = require("../../jwt");

// Resolver map
const resolvers = {
	Query: {
		departments: ( ) => departmentModel( ),
		department:(_,{id}) => departmentModel(id),
		eBooks: async(_, { departmentId }) =>  eBooksModel(departmentId),
		eBook: (_, { id }) => eBookModel(id)
	},
	Ebook:{
		id:global=> global.e_book_id,
		department: (global) => departmentModel(global.department_id),
		file: global => file(global.file_id),
		cover:global=>cover(global.cover_id),
		
	},
	Department: {
		id: global =>  global.department_id,
		name: global => global.department_name,
		eBooks: global=> eBooksModel(global.department_id),
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
						console.log("create book ", row)
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
