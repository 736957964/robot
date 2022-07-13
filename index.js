// console.log('主程序启动')
const dotenv = require("dotenv")
dotenv.config() // 设置环境变量 process.env 访问

// const server = require('./src/plugin/base/serve') // 启动后台服务器 链接数据库
const apiIndex = require('./src/api/index')
// const axios = require('./src/plugin/base/axios')

const elona = require('./src/view/elona/index')