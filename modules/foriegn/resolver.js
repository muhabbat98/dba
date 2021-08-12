const { journalsModel, createJournalModel} = require("./model");
// const { cover, file } = require('../foreign/model')
const {  verification, decode } = require("../../jwt");
const {verify} = require('jsonwebtoken')
// Resolver map
const resolvers = {
  Query: {
    journals:async() => journalsModel(),
  },
 
  Journal: {
    id: (global) => global.journals_literature_id,
    cover:(global)=>cover(global.cover_id),
    file: (global) => file(global.file_id),
    resourceType: (global) => global.resource_type,
    serialNumber:(global)=>global.serial_number
  },


  Mutation: {
    createJournal: async ( _, { input: { fileId,coverId, name,  keywords,  resourceType,  language, serialNumber, year, date } }, {token} ) => 
    {	
     
      const admin = await verification(token)
      
      try{
        if(admin.isAdmin){
          const [row] = await createJournalModel(   fileId,coverId, name,  keywords,  resourceType,  language, serialNumber, year, date );
          
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
