console.log('启用所有的api')
const aa = require('./base/query') // 查询数据库的 api
aa.getTable({tableName:'user'})
console.log()