const{ isUser, addUser, allUsers, deleteUser}  = require('./model')
const {sign, verify} = require('../../jwt')
  
  const resolvers = {
	Query:{
		users:()=> allUsers()
	},
	User:{
		userId:global=>global.user_id,
		fullName:global=>global.full_name,
		isAdmin:global=>global.is_admin
	},
    Mutation :{
		addUser: async(_, {useInfo:{username, password, fullName, isAdmin}})=>{
			try{
				const row = await addUser(username, password, fullName, isAdmin)				
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
					token:null,
					data:row
					
				}
			}
		},
		isUser: async(_, {useInfo:{username, password, isAdmin}})=>{
			
			try{
				const row = await isUser(username, password, isAdmin)
				if(row){
					const token = sign({userId:row.user_id, isAdmin:row.is_admin})
					return {
						status:200,
						message:`${row.username} is our user`,
						token,
						data:row
					}
				}
				else{
					throw new Error("sorry we don't have such user, Could you check you enter right username and password with right privlige")
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
		deleteUser: async(_, {userId})=>{
			try{
				const row = await deleteUser(userId)				
				return row.username
			}
			catch(err){
				return{
					status:400,
					message:err.message,
					token:null
				}
			}

		}
    }
  };
  module.exports = {
      resolvers
  }