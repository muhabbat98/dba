const{ isUser, addUser, allUsers}  = require('./model')
const {sign, verify} = require('../../jwt')
  
  const resolvers = {
	Query:{
		users:()=> allUsers()
	},
    Mutation :{
		addUser: async(_, {username, password, fullName, isAdmin})=>{
			try{
				const row = await addUser(username, password, fullName, isAdmin)
				console.log(row)
				const token = sign({userId:row.user_id, isAdmin:row.is_admin})
				return {
					status:200,
					message:"successfully created",
					token
				}
			}
			catch(err){
				return{
					status:400,
					message:err.message,
					token:null
				}
			}
		},
		isUser: async(_, {username, password, isAdmin})=>{
			
			try{
				const row = await isUser(username, password, isAdmin)
				const token = sign({userId:row.user_id, isAdmin:row.is_admin})
				return {
					status:200,
					message:"successfully created",
					token
				}
			}
			catch(err){
				return{
					status:400,
					message:err.message,
					token:null
				}
			}
		},
    }
  };
  module.exports = {
      resolvers
  }