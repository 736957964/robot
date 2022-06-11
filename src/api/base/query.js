// const request = require('../api/index')
const setUrl = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')
const data = [
   // 查询 table 表数据  {tableName:'表名称',setFieldArr:[{'查询的字段名称1':'字段值1'},{'查询的字段名称2':'字段值2'}]}
   {  name: 'getTable',url: '/api/getTable', method: 'post',
      sql: (req,res)=>{
        const {tableName,setFieldArr} = req.body
        console.log(req.body,'body')
        let postData = ''
        req.on('data', function(postDataChunk) {
          postData += postDataChunk;
        })
        req.on('end', function() {
          console.log(postData,'postData')
          // let params = JSON.parse(postData);
          // console.log(params,'params')
        })
        const selectTable = `select * from ${tableName}` // select * from user
        let whereField = ` where `
        setFieldArr && setFieldArr.forEach((res,index) => { // select * from user where act_index=2 and `password` = 'XXX'
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? whereField = `${whereField}${res.name} = ${value}` : whereField = `${whereField} and ${res.name} = ${value}`
        })
        if(setFieldArr) { return selectTable +  whereField }
        if(tableName) { return  selectTable}
      }
   }
]
const fn = {}
data && data.forEach((res) => {
  res.method === 'get' ?
  fn[res.name] = (data)=> {return request({url: res.url, method: res.method, params: data}) } :
  fn[res.name] = (data)=> {return request({url: res.url, method: res.method, data}) }
  setUrl(res)
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