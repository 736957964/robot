// eval('if(true){console.log("我是傻逼")}')
// 加载连接数据库的⼯具
const connection =require('../../../plugin/base/mysql')
const playGames = async (client,data,commandData)=>{
  let {content,channel_id } = data.msg;//content内容,channel_id 频道id
  const user_id = data.msg.author.id
  let reg = /<@![0-9]+>/g
  content = content.replace(reg,'')
  for(let i=0;i<commandData.length;i++) {
      const commands = commandData[i]
      const { mode,command,imageUrl,selectFunction,QUERY_TABLE,successTextDescription,errTextDescription,jsEval} = commands
      let condition = content.split(' ').filter((res) => { return res !==''})
      if (condition[0] === command){
        let msg = null
        let returns = null //用来判定用成功的msg还是失败的msg
        let data = [] // 存放数据库用的
        switch (mode){ // 1为普通模式 2为特殊模式 3为高级模式
          case '1':
            msg = successTextDescription;
            const msgData = { content: `<@${user_id}> ${msg}`,...(imageUrl && {image:imageUrl}) }
            client.messageApi.postMessage(channel_id, msgData)
            break
          case '2':
            let QUERY_TABLE_ARR = QUERY_TABLE.split(',')
            new Promise((resolve,reject) =>{
              for(let i=0;i<QUERY_TABLE_ARR.length;i++){
                const res = QUERY_TABLE_ARR[i]
                connection.query(`select * from ${res} ${['user'].includes(res)? `where user_id=${user_id}`:''}`, (err, result)=>{
                  data[res] = JSON.parse(JSON.stringify(result))[0]
                  if(i === QUERY_TABLE_ARR.length-1 ){ resolve(data)  }
                  if(err){reject(err)}
                })
              }
            }).then((res)=>{
              eval(jsEval)
              new Promise((resolve,reject) =>{
                for(let i=0;i<QUERY_TABLE_ARR.length;i++){
                  const res = QUERY_TABLE_ARR[i]
                  if(res ==='user'){ // 暂时只能修改user表
                    let sql = `UPDATE ${res} SET`
                    const keys = Object.keys(data[res]).filter((file)=>{return !data[res].unalterable.split(',').includes(file)})
                    keys.forEach((val,index)=>{
                      sql = `${sql} ${val}=${data[res][val]}`
                      if(keys.length -1 !== index){ sql = sql + ',' }else {sql = `${sql} WHERE user_id=${user_id}` }
                    })
                    connection.query(sql, (err, result)=>{
                      if(err){ reject(err)}else { resolve(result)  } // 这里只有user所以直接resolve了
                    })
                  }
                }
              }).then((res)=>{
                returns ? msg = successTextDescription : msg = errTextDescription
                const msgData = { content: `<@${user_id}> ${msg}`,...(imageUrl && {image:imageUrl}) }
                client.messageApi.postMessage(channel_id, msgData)
              }).catch((e)=>{
                msg = '数据库更改的时候发生了未知的错误'+ JSON.stringify(e)
                const msgData = { content: `<@${user_id}> ${msg}`,...(imageUrl && {image:imageUrl}) }
                client.messageApi.postMessage(channel_id, msgData)
              })
            }).catch((e)=>{
              msg = '未知的错误'+ JSON.stringify(e)
              const msgData = { content: `<@${user_id}> ${msg}`,...(imageUrl && {image:imageUrl}) }
              client.messageApi.postMessage(channel_id, msgData)
            })
            break
          case '3':
            break
          default: msg = '错误的type'
        }
        return
      }
    }
}

module.exports = playGames