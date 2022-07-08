
const serve = require('../../plugin/base/serve')
const request = require('../../plugin/base/axios')

const data = [
  // type 类型number, 1 原基础上赋值（如 a = a + 5） 2 特殊的sql语句 如 ' aa + 1 + bb' aa和bb字段再加1 就是值 其他则直接赋值
  // 修改 table 表数据  {tableName:'需要修改的表名称',reviseSqlValue:'抛弃reviseArr和conditionArr 直接写',reviseArr:[{name:'修改的字段1'value:'赋值',type:1}]},conditionArr:[{name:'满足的条件1',value:'字段值1',formula:'',sqlValue:'写sql语句 不需要value和formula了'}]}
  {  name: 'reviseTableData',url: '/api/reviseTableData', method: 'post', // get 请求拿 req.query
    sql: (req,res)=>{
      const {tableName,reviseArr,conditionArr,reviseSqlValue} = req.body
      // console.log(JSON.stringify(req.body))
      let selectTable = `UPDATE ${tableName} SET ` // UPDATE user SET exp=exp*2,ll=ll*2;
      if(reviseSqlValue) { return selectTable + reviseSqlValue}
      reviseArr && reviseArr.forEach((res,index) => { // UPDATE user SET exp=exp*2,ll=10;
        if(res.type === 2){
          index === 0 ? selectTable = `${selectTable}${res.name} = ${res.value}` : selectTable = `${selectTable},${res.name} = ${res.value}`
        }else if(res.type === 1){
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? selectTable = `${selectTable}${res.name} =${res.name}+${value}` : selectTable = `${selectTable},${res.name} = ${res.name}+${value}`
        }else {
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? selectTable = `${selectTable}${res.name} = ${value}` : selectTable = `${selectTable},${res.name} = ${value}`
        }
      })
      conditionArr && conditionArr.forEach((res,index) =>{ // selectTable = selectTable + ' WHERE exp>=50 and ll>50 and gz>=5'
        if(res.sqlValue){ // 有 sqlValue 那么 直接写sql语句  exp>=50 and ll>50 and gz>=5'
          index === 0 ? selectTable = `${selectTable} where ${res.sqlValue}` : selectTable = `${selectTable} and ${res.sqlValue}`
        }else {
          const value = typeof(res.value) === 'string' ? JSON.stringify(res.value):res.value
          index === 0 ? selectTable = `${selectTable} where ${res.name}${res.formula}${value}` : selectTable = `${selectTable} and ${res.name}${res.formula}${value}`
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


// {
//   "tableName":"user","reviseArr":[{"name":"exp","value":"500007","type":0},{"name":"ml","value":15}],"conditionArr":[ {"name":"exp","value":500,"formula":">="}]
// }