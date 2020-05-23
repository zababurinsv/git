let config = {}

config['now'] = {}
config['local'] = {}
config['local']['1.0'] = 'http://localhost:3002'
config['now']['0.6'] = 'https://soundlane-b2b652bpi.now.sh'

config['mongo'] = {}
// config['mongo']['local'] = 'http://localhost:3003'
config['mongo']['web'] = 'https://mongo.now.sh'
// config['mongo']['web'] = 'http://localhost:3003'
// config['mongo']['web'] = 'http://localhost:3003'

config['waves'] = {}
// config['waves']['local'] = 'http://localhost:3005'
config['waves']['web'] = 'https://waves.zababurinsv.now.sh'
// config['waves']['web'] = 'http://localhost:3000'


config['store'] = {}
config['store']['local'] = 'http://localhost:4000'
config['store']['localNow'] = 'http://localhost:3000'
config['store']['web'] = 'https://webdav2.zababurinsv.now.sh'

config['email'] = {}
config['email']['local'] = 'http://localhost:3007'
config['email']['localNow'] = 'http://localhost:3000'
config['email']['web'] = 'https://email.zababurinsv.now.sh'


config['account'] = {}
config['account']['local'] = 'http://localhost:3009'
config['account']['web'] = 'https://account-git-master.szababurinv.now.sh'
// config['account']['web'] = 'http://localhost:3009'

config['account']['dappaddress'] = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
config['account']['this'] = `${config['account']['dappaddress']}?matches=`
config['account']['testnodes'] = 'https://pool.testnet.wavesnodes.com'
// config['account']['sse'] = 'http://localhost:3009/stream'
config['account']['sse'] = 'https://account.zababurinsv.now.sh/stream'


// config['dex'] = 'http://localhost:3003'
// config['webdav'] = 'http://localhost:4051/api'
// config['archive'] = 'http://localhost:4222/api'
config['archive'] = 'https://server-demon.herokuapp.com/api'


// config['dex'] = 'http://localhost:3000/api'
config['dex'] = 'https://mongo.zababurinsv.now.sh/api'
config['webdav'] = 'https://webdav.zababurinsv.now.sh/api'
// config['webdav'] = 'http://localhost:3000'
export default{
  local: config['local'],
  now: config['now'],
  feed: config['school'],
  feedWebSchool: config['feedWebSchool'],
  store: config['store'],
  waves:config['waves'],
  email:config['email'],
  mongo:config['mongo'],
  account:config['account'],
  dex:config['dex'],
  webdav:config['webdav'],
  archive:config['archive']
}
/*
let config = {}

config['now'] = 'http://localhost:3000'

config['mongo'] = {}
config['mongo']['web'] = 'https://mongo.now.sh/'
config['mongo']['local'] = 'http://localhost:3003'
config['mongo']['cell'] = 'https://mongo.now.sh/'

config['waves'] = {}
config['waves']['web'] = 'https://waves.zababurinsv.now.sh'
config['waves']['local'] = 'http://localhost:3005'
config['waves']['cell'] = 'https://waves.zababurinsv.now.sh'

config['rington'] = {}
config['rington']['local'] = 'http://localhost:5007'
config['rington']['web'] = 'https://rington-messenger.herokuapp.com'
config['rington']['now'] = 'http://localhost:3000'
config['rington']['ws'] = 'ws://localhost:7000'

config['vk'] = {}
config['vk']['web'] = 'https://vk.szababurinv.now.sh/'
config['vk']['local'] = 'http://localhost:4554/'
config['vk']['cell'] = 'https://vk.szababurinv.now.sh/'

config['facebook'] = {}
config['facebook']['web'] = 'https://authorization-facebook.now.sh/'
config['facebook']['local'] = 'http://localhost:5009/'
config['facebook']['dev'] = 'http://localhost:3000/'

config['twitter'] = {}
config['twitter']['web'] =    'https://rington-radio.herokuapp.com'
config['twitter']['local'] =  'http://localhost:4731'
config['twitter']['dev'] =    'http://localhost:3000'

config['store'] = {}
config['store']['web'] = 'https://webdav2.zababurinsv.now.sh'
config['store']['local'] = 'http://localhost:4000'

config['email'] = {}
config['email']['web'] = 'https://email.zababurinsv.now.sh'
config['email']['local'] = 'http://localhost:3007'
config['waves']['cell'] = 'https://email.zababurinsv.now.sh'

config['telegram'] = {}
config['telegram']['local'] = 'ws://localhost:7000'
config['telegram']['web'] = 'ws://localhost:7000'
config['telegram']['ws'] = 'ws://localhost:7000'

config['ton'] = {}
config['ton']['local'] = 'ws://localhost:7777'
config['ton']['web'] = 'ws://localhost:7777'
config['ton']['ws'] = 'ws://localhost:7777'

config['authorization'] = {}
config['authorization']['local'] = 'ws://localhost:7007'
config['authorization']['web'] = 'ws://localhost:7007'
config['authorization']['ws'] = 'ws://localhost:7007'


config['template'] = {}
config['template']['web'] = 'http://localhost:9999'
config['template']['local'] = 'http://localhost:9999'
config['template']['cell'] = 'http://localhost:9999'



config['account'] = {}
config['account']['local'] = 'http://localhost:3009'
config['account']['web'] = 'https://account.zababurinsv.now.sh'
config['account']['cell'] = 'https://account.zababurinsv.now.sh'
config['account']['dapp'] = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
config['account']['this'] = `${config['account']['dappaddress']}?matches=`
config['account']['testnodes'] = 'https://pool.testnet.wavesnodes.com'
config['account']['sse'] = 'https://account.zababurinsv.now.sh/stream'


export default async (account = 'template',type='cell')=>{
  return config[`${account}`][`${type}`]
}



 */