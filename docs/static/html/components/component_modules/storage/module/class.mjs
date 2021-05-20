import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import queue from '/static/html/components/component_modules/queue/queue.mjs'
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import database from '/static/html/components/component_modules/storage/module/index.mjs'
// import json from '/static/html/components/component_modules/storage/module/config/config.json'


let Class = class Storage {
    constructor() {
        events.eventListener.get(true, 'await', '5', '','/storage/set/item',async (object)=>{
            await database.set(object.view, object.relation, object.color, object.substrate, object.property)
            return    object.callback(object)
        })

        events.eventListener.get(true, 'await', '5', '','/storage/get/all',async (object)=>{
            return object.callback(await database.get(object.view, object.relation, object.color, object.substrate, object.property))
        })

        events.eventListener.get(true, 'await', '5', '','/storage/get/item',async (object)=>{
               await database.get(object.view, object.relation, object.color, object.substrate, object.property)
               return  object.callback(object)
        })

        events.eventListener.get(true, 'await', '5', '','/storage/update/item', async (object)=>{
            await database.update(object.view, object.relation, object.color, object.substrate, object.property)
            return  object.callback(object)
        })

        events.eventListener.get(true, 'await', '5', '','/storage/delete/item', async (object)=>{
            await database.delete(object.view, object.relation, object.color, object.substrate, object.property)
            return   object.callback(object)
        })

        events.eventListener.get(true, 'await', '5', '','/storage/delete/all', async (object)=>{
            await database.delete(object.view, object.relation, object.color, object.substrate, object.property)
            return   object.callback(object)
        })
        events.eventListener.get(true, 'await', '5', '','/storage/delete/all/items', async (object)=>{
            await database.delete(object.view, object.relation, object.color, object.substrate, object.property)
            return   object.callback(object)
        })

    }

    get self() {
        return emoji
    }
}


export default Class