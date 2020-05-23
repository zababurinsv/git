import conf from '/static/html/components/component_modules/storage/module/config/config.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import Axios from '/static/html/components/component_modules/axios/axios.mjs'
let axios = Axios['default']
let mongo = conf['dex']

function blobToDataURL (blob, callback) {
  if (typeof (blob) === 'string') {
    callback(blob)
  } else {
    var a = new FileReader()
    a.onload = function (e) { callback(e.target.result) }
    a.readAsDataURL(blob)
  }
}

function request(view, property, color, substrate, relation) {
  return new Promise(async (resolve, reject) => {
    switch (relation) {
      case 'GET':
      console.log(`--GET-${emoji('a')}-GET--`,`${mongo}${property}`)
      let response = await fetch(`${mongo}${property}`, { method: relation })
        if (!response.ok) {
          resolve({_:'error', error:response.status})
        } else {
          let json = await response.json()
          resolve(json)
        }
        break
      case 'POST':
        console.log(`------------POST-${emoji('a')}-POST------------`,`${mongo}${property}`)
        axios.post(`${mongo}${property}`, substrate)
        .then(function (response) {
          resolve(response.data)
        }).catch(function (error) {
          resolve(error)
        });
        break
      default:
        console.warn(`необрабатываемый тип запроса`, view, property, color, substrate, relation)
        break
    }
  })
}


let setFiles = (view, property, color, substrate, relation) =>{
  return new Promise(async (resolve, reject) => {
    switch (relation) {
      case 't':
        try {
          let mongo = await request(view, property, color, substrate, 'POST')
          resolve(mongo)
        }catch (e) {
          resolve({_:'error', error:e})
        }
      break
      default:
        console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
      break
    }
  })
}

let delFiles = (view, property, color, substrate, relation) =>{
  return new Promise(async (resolve, reject) => {
    switch (relation) {
      case 't':
        resolve(await request(view, property, color, substrate, 'POST'))
        break
      default:
        console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
        break
    }
  })
}


export default async (view, property, color, substrate, relation)=>{
  switch (relation) {
    case '/storage/delete/all':
      return  delFiles(view, relation, color, substrate, property)
    case '/storage/set/item':
      return  setFiles(view, relation, color, substrate, property)
    case '/storage/get/all':
      return  getAll(view, property, color, substrate, relation)
    default:
      console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
      return false
  }
}