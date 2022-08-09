const serve = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')

const data = [
  {  name: 'sqlValue',url: '/api/sqlValue', method: 'get', // get 请求拿 req.query
    sql: (req,res)=>{
      const {sqlValue} = req.query
      console.log(sqlValue,'sqlValue')
      return sqlValue
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