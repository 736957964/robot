// console.log('启用所有的api')
const Query = require('./base/query') // 查询数据库的 api
const Revise = require('./base/revise') // 修改数据库的数据
const Delete = require('./base/delete') // 删除数据库的数据
const Insert = require('./base/insert') // 插入数据库的数据
const sqlValue = require('./base/sqlValue')
const System = require('./special/system') // 特殊数据
// aa.getTable({tableName:'user'})
// console.log()

const api = {
  Query,Revise,Delete,Insert,System,sqlValue
}

module.exports = api