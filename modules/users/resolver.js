const{ books}  = require('./model')
  // Resolver map
  const resolvers = {
    Query: {
      books() {
        return books;
      }
    },
  };
  module.exports = {
      resolvers
  }