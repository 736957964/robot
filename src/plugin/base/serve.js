const express =require('express')
const app = express()
//处理普通键值对
// app.use(express.urlencoded())
const cors = require('cors'); // 引入cors插件
// app.use(cors()) // 通过中间件的方式使用cors插件 解决跨域问题 yarn add cors
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 监听服务器状态 设置端口
app.listen(3000,()=>{
  console.log('端口3000服务器启动成功')
})

// 加载连接数据库的⼯具
const connection =require('./mysql')

const setUrl = ({method,url,sql}) =>{
  app[method](url,(req, res)=>{
    connection.query(sql(req,res),(err, result)=>{
      // console.log('sql=',sql(req,res))
      console.log('拿到数据',JSON.stringify(result))
      if(err){
        res.json({mes:'查询失败',code:0,data:err})
      }else{
        res.json({mes:'查询成功',code:1,data:result})
      }
    })
  })
}

module.exports = setUrl
