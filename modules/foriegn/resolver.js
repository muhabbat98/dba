const { foriegnBooksModel, createForiegnModel} = require("./model");
const { cover, file } = require('../science/model')
const {  verify } = require("../../jwt");

const resolvers = {
  Query: {
    foriegnBooks:async() => foriegnBooksModel(),
  },
  
  ForiegnBook: {
    id: (global) => global.journals_literature_id,
    cover:(global)=>cover(global.cover_id),
    file: (global) => file(global.file_id),
    resourceType: (global) => global.resource_type,
    resourseHolder:(global)=>global.right_holder
  },


  Mutation: {
    createForiegnBook: async ( _, { input: { fileId,coverId, name,  keywords,  resourceType,  language,  date, author, description, resourseHolder } }, {token} ) => 
    {	
     
      const admin = await verify(token)
      
      try{
        if(admin.isAdmin){

          const row = await createForiegnModel( fileId,coverId, name,  keywords,  resourceType,  language,  date, author, description, resourseHolder );
          
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
