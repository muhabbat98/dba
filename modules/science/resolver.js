const { scienceModel, createScienceModel, cover, file} = require("./model");

const {  verify } = require("../../jwt");

// Resolver map
const resolvers = {
	Query: {
		sciences:async(_,{degree}) => scienceModel(degree),
	},
	Cover:{
		coverId:global=>global.cover_id
	},
	File:{
		fileId:global=>global.file_id
	},
	Science: {
		id: (global) => global.science_literature_id,
		cover:(global)=>cover(global.cover_id),
		file: (global) => file(global.file_id),
		resourceType: (global) => global.resource_type
	},

	Mutation: {
		createScience: async ( _, { input: {fileId,coverId, name,  keywords,  resourceType,  language, date, author, degree, description } }, {token} ) => 
		{	
		
			const admin = await verify(token)
		
			try{
				if(admin.isAdmin){
					const row = await createScienceModel( fileId,coverId, name,  keywords,  resourceType,  language, date, author, degree, description );
					
					return {
						status:200,
						data:"successfull send "+ row.name
					}
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
