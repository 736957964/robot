
const serve = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')
const Insert = require('../index')

const data = [
  // type 类型number, 1 原基础上赋值（如 a = a + 5） 2 特殊的sql语句 如 ' aa + 1 + bb' aa和bb字段再加1 就是值 其他则直接赋值
  // 修改 table 表数据  {tableName:'需要修改的表名称',reviseArr:[{name:'修改的字段1'value:'赋值',type:1}]},conditionArr:[{name:'满足的条件1',value:'字段值1',formula:'',sqlValue:'写sql语句 不需要value和formula了'}]}
  {  name: 'dataDictionaryGet',url: '/api/system/dataDictionary/get', method: 'get',
    sql: (req,res)=> {
      const {dictKey} = req.query
      return `select * from dictionarydata where dictKey = '${dictKey}'`
    },
    sqlValue:(res,result)=>{ // result 数据库返回后的数据 res返回前端的数据
      let data = result
      if(result && result[0] && result[0].dictJson) {data = JSON.parse(result[0].dictJson)}
      return res.json(data.length?{mes:'查询成功',code:1,data}:{mes:'无字典或无字典配置',code:0,data})
    }
  }
]
const fn = {}
data && data.forEach((res) => {
  // fn[res.name] 为前端发起请求和自己快速调用函数
  res.method === 'get' ?
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, params: data}) } :
    fn[res.name] = (data)=> {return request({url: res.url, method: res.method, data}) }
    serve.setUrl2(res)
})
module.exports = fn