const{ countOfResources}  = require('./model')
const {sign, verify} = require('../../jwt')
  
  const resolvers = {
	Query:{
		countResources:async()=> countOfResources()
	},
	
  };
  module.exports = {
      resolvers
  }