const fs = require('fs');
let data_user = 'json/elona/data/user.json'
// 开始游戏
enterTheWorld = (val)=>{
  return `
文案：小晓辰
程序：玄能救非氪能改命
版本：测试版本 v0.0.0.01
￣￣￣￣￣＼进入世界(初)／￣￣￣￣￣
经过海难的你沉沉醒来，
发现自己躺在一个阴暗的洞窟里，
虽然很疑惑为什么自己会完好无损的躺在这，
但此刻你的大脑不允许你想太多
￣￣￣￣￣＼附加说明／￣￣￣￣￣
> 创建种族(未创建) 【创建种族 名称】【查种族职业】
> 创建职业(未创建) 【创建职业 名称】【查种族职业】
> 查询种族特性 请输入 【查种族 名称】(未实装)
> 查询职业特性 请输入 【查职业 名称】(未实装)
`
}
// 查种族职业
getRaceVocation =(msg) => {
  let gamesData_race_vocation = 'json/elona/gamesData/race_vocation.json'
  fs.readFile(gamesData_race_vocation, (err, json)=>{
    if(!err) {
      msg(JSON.parse(json.toString()))
    }else {
      console.log(err)
    }
  })
}
// 查人员数据
getUserData =(msg)=>{
  fs.readFile(data_user, (err, json)=>{
    if(!err) {
      msg(JSON.parse(json.toString()))
    }else {
      console.log(err)
    }
  })
}
// 写人员数据
setUserData =(user)=>{
  let str = JSON.stringify(user)  // 把json对象转换为字符串
  fs.writeFile(data_user, str,  (err) =>{ })
}
const playJSON = {
  enterTheWorld,
  getRaceVocation,
  getUserData,
  setUserData
}
module.exports = playJSON