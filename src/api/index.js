console.log('启用所有的api')
const aa = require('./base/query') // 查询数据库的 api
const bb = require('./base/revise') // 修改数据库的数据
const cc = require('./base/delete') // 删除数据库的数据
const dd = require('./base/insert') // 插入数据库的数据
// aa.getTable({tableName:'user'})
// console.log()