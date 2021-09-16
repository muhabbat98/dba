const { modelSingle, modelAll} = require('../../connection/pool')



const COUNT_OF_RESOURCE = `SELECT count(file_id), 'foriegn' as name FROM foriegn_literature UNION SELECT count(file_id), 'journal' as name FROM journals_literature UNION SELECT count(file_id), 'science' as name FROM science_literature;`



const countOfResources =  ()                                      =>       modelAll(COUNT_OF_RESOURCE)


  module.exports = {
    countOfResources
  }