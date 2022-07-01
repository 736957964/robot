const setUrl = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')
// INSERT INTO user (user_id,pass_word,exp)
// VALUES (555,66,77);
const data = [
  // type 类型number, 1 原基础上赋值（如 a = a + 5） 2 特殊的sql语句 如 ' aa + 1 + bb' aa和bb字段再加1 就是值 其他则直接赋值
  // 修改 table 表数据  {tableName:'需要修改的表名称',insertArr:[{name:'插入条件1',value:'插入值1'}],insertSql:"(user_id,pass_word) VALUES (77,88)"}
  {  name: 'getTable',url: '/api/insertTable', method: 'post', // get 请求拿 req.query
    sql: (req,res)=>{
      const {tableName,insertArr,insertSql} = req.body
      // console.log(JSON.stringify(req.body))
      let selectTable = `INSERT INTO ${tableName} ` // INSERT INTO user(user_id,pass_word,exp) VALUES (555,66,77);
      let figure = `VALUES `
      if(insertSql) { return selectTable + insertSql}
      insertArr && insertArr.forEach((res,index) =>{ //
        index === 0 ? selectTable = `${selectTable}(${res.name}` : selectTable = `${selectTable},${res.name}`
        index === 0 ? figure = `${figure}(${res.value}` : figure = `${figure},${res.value}`
        insertArr.length-1 === index ? selectTable = `${selectTable}) ` : ''
        insertArr.length-1 === index ? figure = `${figure}) `: ''
      })
      return selectTable + figure
    }
  }
]
const fn = {}
data && data.forEach((res) => {
  // fn[res.name] 为前端发起请求和自己快速调用函数
  res.method === 'get' ?
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, params: data}) } :
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, data}) }
  setUrl(res) // 这个是后台请求
})
module.exports = fn