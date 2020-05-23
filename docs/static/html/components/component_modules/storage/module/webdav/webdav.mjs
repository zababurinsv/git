import conf from '/static/html/components/component_modules/storage/module/config/config.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import Axios from '/static/html/components/component_modules/axios/axios.mjs'
let axios = Axios['default']
let configarchive = conf['archive']
let configWebdav = conf['webdav']

function request(view, property, color, substrate, relation) {
    return new Promise(async (resolve, reject) => {
        switch (relation) {
            case 'GET':
                console.log(`--GET-${emoji('a')}-GET--`,`${configWebdav}${property}`)
                let response = await fetch(`${configWebdav}${property}`, { method: relation })
                if (!response.ok) {
                    resolve({_:'error', error:response.status})
                } else {
                    let json = await response.json()
                    resolve(json)
                }
                break
            case 'POST':
                console.log(`------------POST-${emoji('a')}-POST------------`,`${configWebdav}${property}`)
                axios.post(`${configWebdav}${property}`, substrate)
                    .then(function (response) {
                        resolve(response.data)
                    }).catch(function (error) {
                    resolve(error)
                });
                break
            case 'POST-archive':
                console.log(`------------POST-${emoji('a')}-POST------------`,`${configWebdav}${property}`)
                axios.post(`${configarchive}${property}`, substrate)
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

let delFiles = (view, property, color, substrate, relation) =>{
    return new Promise(async (resolve, reject) => {
        switch (relation) {
            case 't':
                resolve(await request(view, property, color, substrate, 'POST'))
                break
            case 'archive':
                resolve(await request(view, property, color, substrate, 'POST-archive'))
                break
            default:
                console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
                break
        }
    })
}

let setFiles = (view, property, color, substrate, relation) =>{
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

let getAll = (view, property, color, substrate, relation) =>{
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

export default (view, property, color, substrate, relation)=>{
    switch (relation) {
        case '/storage/delete/all':
            return  delFiles(view, relation, color, substrate, property)
        case '/storage/delete/all/items':
            return  delFiles(view, relation, color, substrate, 'archive')
        case '/storage/set/item':
            return  setFiles(view, relation, color, substrate, property)
        case '/storage/get/all':
            return  getAll(view, relation , color, substrate,property)
        default:
            console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
            return false
    }
}