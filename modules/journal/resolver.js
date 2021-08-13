const { journalsModel, createJournalModel, createJournalType, generalJournalModel} = require("./model");
const { cover, file } = require('../science/model')
const {  verify} = require("../../jwt");

// Resolver map
const resolvers = {
	Query: {
		journals:() => generalJournalModel(),
		exactJournals:(_, {id})=>journalsModel(id)
	},
	GeneralJournal:{
		id:global=>global.general_id,
		cover:(global)=>cover(global.cover_id),
		resourceType: (global) => global.resource_type
	},
	Journal: {
		id: (global) => global.journal_literature_id,
		file: (global) => file(global.file_id),		
		serialNumber:(global)=>global.serial_number
	},


  Mutation: {
	createJournalType: async ( _, { input: { coverId, name,  keywords,  resourceType,  language } }, {token} ) => 
	{	
	
		const admin = await verify(token)
		try{
			if(admin.isAdmin){
				const row = await createJournalType(coverId, name,  keywords, resourceType, language );			
				return {
					status:200,
					message:"successfully created "+ row.name,
					data:row.general_id
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
    createJournal: async ( _, { input: { fileId, serialNumber, year, date, generalId } }, {token} ) => 
		{	
		
			const admin = await verify(token)
			try{
				if(admin.isAdmin){
					const row = await createJournalModel(fileId, serialNumber, year, date, generalId );					
					return {
						status:200,
						message:"successfully created "+ row.journal_literature_id
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
