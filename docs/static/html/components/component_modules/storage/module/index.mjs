import IndexedDB from "/static/html/components/component_modules/storage/module/IndexedDB/IndexedDB.mjs";
import localStorage from '/static/html/components/component_modules/storage/module/localStorage/localStorage.mjs'
import mongodb from '/static/html/components/component_modules/storage/module/mongoDb/mongodb.mjs'
import webdav from '/static/html/components/component_modules/storage/module/webdav/webdav.mjs'
export default {
    set:(view,property, color, substrate, relation)=>{
        return new Promise( async (resolve, reject) => {
            switch (property) {
                case '/storage/set/item':
                    let item = await IndexedDB(view, relation, color, substrate,property)
                    item = mongodb(view, relation, color, item,property)
                    item.then((item)=>{
                        IndexedDB(view, relation, color, item,'/storage/set/mongoIdToIndexeddb')
                        webdav(view, relation, color, item,property)
                    })
                    resolve(item)
                    break
                default:
                    break
            }
        })
    },
    get:(view,property, color, substrate, relation)=>{
        return new Promise( async (resolve, reject) => {
            let obj = {}
            switch (property) {
                case '/storage/get/item':
                    resolve(await IndexedDB(view, relation, color, substrate,property))
                    break
                case '/storage/get/all':
                    resolve(await IndexedDB(view,relation, color, substrate, property))
                    break
                default:
                    console.warn('не обрабатывается гет запрос', view,property, color, substrate, relation)
                    resolve(false)
                    break
            }
        })
    },
    update:(view,property, color, substrate, relation)=>{
        return new Promise( async (resolve, reject) => {
            switch (property) {
                case '/storage/get/item':
                    resolve(await IndexedDB(view,relation, color, substrate, property))
                    break
                default:
                    break
            }
            resolve(substrate)
        })
    },
    delete:(view,property, color, substrate, relation)=>{
        return new Promise( async (resolve, reject) => {
            switch (property) {
                case '/storage/delete/all':
                    await IndexedDB(view,relation, color, substrate, property)
                    mongodb(view,relation, color, substrate, property)
                    webdav(view,relation, color, substrate, property)
                        .then((list)=>{
                             let filename = list.map(function(name) {
                                return name.filename;
                            });
                            webdav(view,'archive', color, filename, '/storage/delete/all/items')

                    })
                    resolve(true)
                    break
                default:
                    console.warn('Не обрабатывается запрос ---',property )
                    break
            }
            resolve(substrate)

        })
    }
}

