import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
function logerr (err) {
    console.log(err)
}
function connectDB (view, property, color, substrate, relation, callback) {
  return new Promise(function (resolve, reject) {
    let request = indexedDB.open('monopoly', 1)
        request.onerror = logerr
        request.onsuccess = function () {
            resolve(callback(view, property, color, substrate, relation, request.result))
        }
        request.onupgradeneeded = function (event) {
            let self = event.target.result
            if (!self.objectStoreNames.contains('monopoly')) {
                property = self.createObjectStore('monopoly', { keyPath: 'id', autoIncrement: true })
                property.createIndex('relation', 'relation', { unique: false })
                property.createIndex('substrate', 'substrate', { unique: false })
                property.createIndex('property', 'property', { unique: false })
            }
      connectDB(view, property, color, substrate, relation, callback)
    }
  })
}

function setFiles (view, property, color, substrate, relation) {
    return new Promise(async (resolve, reject) =>{
       await connectDB(view, property, color, substrate, relation, async (view, property, color, substrate, relation, db) => {
           let  tx = db.transaction('monopoly', 'readwrite')
           let  store = tx.objectStore('monopoly')
           try {
               let timestamp = Date.now()
               let utc = new Date(timestamp).toUTCString()
               let iso = new Date(timestamp).toString()
               let out= {
                   _id:undefined,
                   __v:undefined,
                   view:view,
                   color:color,
                   timestamp: timestamp,
                   utc:utc,
                   iso:iso,
                   id:substrate.id,
                   object:{
                       substrate:substrate,
                       relation:relation,
                       property:property,
                   },
               }
               let request = store.add(out)

               request.onsuccess = function (evt) {
                   resolve(out)
               }
               request.onerror = function () {
                   console.error('addPublication error', this.error)
                   resolve(this.error)
               }

           }catch (e) {
              console.warn({
                  _:'error',
                  error:e
              })
                throw e
           }
        })
    })
}

function delFiles (view, property, color, substrate, relation) {
    return new Promise(async (resolve, reject) => {
        await connectDB(view, property, color, substrate, relation, async (view, property, color, substrate, relation, db) => {
            try {
                let  request = {}
                let  tx = db.transaction('monopoly', 'readwrite')
                let  store = tx.objectStore('monopoly')
                store.clear()
                resolve(true)
            }catch (e) {
                console.warn({
                    _:'error',
                    error:e
                })
                resolve(this.error)
            }
        })
    })
}

function getAll (view, property, color, substrate, relation) {
    return new Promise(async (resolve, reject) => {
        await connectDB(view, property, color, substrate, relation, async (view, property, color, substrate, relation, db) => {
            let  tx = db.transaction('monopoly', 'readwrite')
            let  store = tx.objectStore('monopoly')
            let storage = []
            store.openCursor().onsuccess = (event) =>{
                let cursor = event.target.result
                if (cursor) {
                    storage.push(cursor['value'])
                    cursor.continue()
                } else {
                    resolve(storage)
                }
            }

        })
    })
}


function updateMongoId(view, property, color, substrate, relation) {
    return new Promise(async (resolve, reject) => {
        await connectDB(view, property, color, substrate, relation, async (view, property, color, substrate, relation, db) => {

            let tx = db.transaction('monopoly', 'readwrite')
            let store = tx.objectStore('monopoly')
            let storage = []


            let req = store.openCursor()
            req.onerror = function (event) {
                console.log('case if have an error')
            }
            req.onsuccess = function (event) {
                let cursor = event.target.result
                let verify = true
                if (cursor) {
                    if(cursor['value']['id'] === substrate['id']){
                        verify = false
                        let object = cursor['value']
                        object['_id'] = substrate['_id']
                        object['__v'] = substrate['__v']

                        let res = cursor.update(object)

                        res.onsuccess = function (e) {
                            resolve(object)
                        }
                        res.onerror = function (e) {
                            console.log('update failed!!')
                        }
                    }
                    cursor.continue()
                } else {
                    if(verify){
                        resolve(undefined)
                    }else{
                        console.log('проверка базы данных закончена')
                    }
                }
            }
        })
    })
}
            /*

             */


export default async (view, property, color, substrate, relation)=>{
    switch (relation) {
        case '/storage/delete/all':
            return  delFiles(view, property, color, substrate, relation)
        case '/storage/set/item':
            return  setFiles(view, property, color, substrate, relation)
        case '/storage/set/mongoIdToIndexeddb':
            return  updateMongoId(view, property, color, substrate, relation)
        case '/storage/get/all':
            return  getAll(view, property, color, substrate, relation)
        default:
            console.warn(`${emoji('sleeping')} не обрабатывается relation (`, relation,'[r<->p]',property,')','{',substrate,'}')
            return false
    }
}
