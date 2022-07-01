
const axios = require('axios');
// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_API === 'development' ? '/api' : process.env.NODE_API,
  timeout: 30000, // 请求超时时间
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
module.exports = []