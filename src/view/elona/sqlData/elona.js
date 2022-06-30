console.log('这玩意被执行了')
const playGames = async (client,data)=>{
  let {content,channel_id } = data.msg;
  const user_id = data.msg.author.id
  let reg = /<@![0-9]+>/g
  content = content.replace(reg,'')
}

module.exports = playGames