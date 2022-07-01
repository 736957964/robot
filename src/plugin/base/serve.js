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

// app.get("/login",(req,resp)=>{
//   //这样就相当于接收到前面发送的一个get请求
//   resp.send("我是服务器返回get的信息")
// });
// 在postman中直接请求，req.body也是接受不到任何参数的。  只要在请求body里边勾选raw，格式设为JSON(application/json)。
// app.post('/api/login',async (req, res, next) => {
//   console.log(req.body,'body'); // {}
// })
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
