const serve = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')

const data = [
  {  name: 'getTableData',url: '/api/getTableData', method: 'get', // get 请求拿 req.query
    sql: (req,res)=>{
      const {tableName,sqlValue} = req.query
      // console.log(JSON.stringify(req.body))
      let selectTable = `select * from ${tableName}` // select * from user
      if(sqlValue) { // 有sql直接sql 后面在处理分页
        selectTable =  selectTable + sqlValue
      }
      return selectTable
    }
  },
  // 查询 table 表数据  {tableName:'表名称',setFieldArr:[{name:'查询的字段名称1',value:'字段值1'},{name:'查询的字段名称2',value:'字段值2'}],sqlValue:'写sql语句 不需要setFieldArr了'}}
  {  name: 'getTableData',url: '/api/getTableData', method: 'post', // get 请求拿 req.query
    sql: (req,res)=>{
      const {tableName,setFieldArr,current,size,sqlValue} = req.body
      // console.log(JSON.stringify(req.body))
      let selectTable = `select * from ${tableName}` // select * from user
      let whereField = ` where `
      if(sqlValue) { // 有sql直接sql 后面在处理分页
        selectTable =  selectTable + sqlValue
      } else {
        setFieldArr && setFieldArr.forEach((res,index) => { // select * from user where act_index=2 and `password` = 'XXX'
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? whereField = `${whereField}${res.name} = ${value}` : whereField = `${whereField} and ${res.name} = ${value}`
        })
        if(setFieldArr) { selectTable = selectTable +  whereField} // 有额外的筛选条件
      }
      if(current && size) { selectTable =  `${selectTable} limit ${(current-1)*size},${current*size}`} // 分页的情况查询
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

// // 查看数据的接⼝
// app.get('/api/student',(req, res)=>{
//   const sql =`select * from user`
//   connection.query(sql,(err, result)=>{
//     if(err){
//       res.json({mes:'查询失败',code:0})
//     }else{
//       res.json({mes:'查询成功',code:1,'查询结果':req.query})
//     }
//   })
// })