console.log('启用所有的api')
const aa = require('./base/query') // 查询数据库的 api


setTimeout(() =>{
  aa.getTable({tableName:'user',setFieldArr:[{name:'password',value:'密码1'}]}).then((res) => {
    console.log('sucess成功')
  })
}, 1500);

