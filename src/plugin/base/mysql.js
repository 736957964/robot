//引入mysql模块
const mysql=require('mysql');
//创建连接池对象
const pool = mysql.createPool({
  host:'rm-bp1gw1o4od8u312z3qo.mysql.rds.aliyuncs.com',
  port:'3306',
  user:'elona_admin',
  password:'aBC0123456',
  database:'elona',
  connectionLimit:'20'
});
pool.getConnection((err) => {
  if (err) {console.log('数据库连接失败1') } else { console.log('数据库连接成功1') }
})
//导出连接池对象
module.exports=pool