const serve = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')

const data = [
  // type 类型number, 1 原基础上赋值（如 a = a + 5） 2 特殊的sql语句 如 ' aa + 1 + bb' aa和bb字段再加1 就是值 其他则直接赋值
  // 修改 table 表数据  {tableName:'需要修改的表名称',deleteSqlValue:'删除的sql语句',deleteArr:[{name:'满足删除的条件1',value:'字段值1',formula:'符号',sqlValue:'写sql语句 不需要value和formula了'}]}
  {  name: 'deleteTableData',url: '/api/deleteTableData', method: 'post', // get 请求拿 req.query
    sql: (req,res)=>{
      const {tableName,deleteArr,deleteSqlValue} = req.body
      // console.log(JSON.stringify(req.body))
      let selectTable = `DELETE FROM ${tableName} WHERE ` // DELETE FROM `user` WHERE
      if(deleteSqlValue) { return selectTable + deleteSqlValue}
      deleteArr && deleteArr.forEach((res,index) =>{ // DELETE FROM `user` WHERE exp=500007 and ll=200;
        if(res.sqlValue){ // 有sqlValue 那么 直接写sql语句  exp>=50 and ll>50 and gz>=5'
          index === 0 ? selectTable = `${selectTable}${res.sqlValue}` : selectTable = `${selectTable} and ${res.sqlValue}`
        }else {
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? selectTable = `${selectTable}${res.name}${res.formula}${value}` : selectTable = `${selectTable} and ${res.name}${res.formula}${value}`
        }
      })
      return selectTable
    }
  }
]
const fn = {}
data && data.forEach((res) => {
  // fn[res.name] 为前端发起请求和自己快速调用函数
  res.method === 'get' ?
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, params: data}) } :
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, data}) }
  serve.setUrl(res) // 这个是后台请求
})
module.exports = fn