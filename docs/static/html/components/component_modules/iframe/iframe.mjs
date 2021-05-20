import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
let iframe = {}
iframe.staticProperty = {}
iframe.staticProperty.count = -1
export default {
    set:(host='', object= {}, self,alias=undefined)=>{
        let channel = new MessageChannel();
        let name = {}
        if(alias === undefined){
            name = host
        }else{
            name = alias
        }
        iframe.staticProperty[`${name}`] = {}
        iframe.staticProperty[`${name}`]['window'] = object
        iframe.staticProperty[`${name}`]['port'] = channel
        iframe.staticProperty[`${name}`]['component'] = self
        iframe.staticProperty[`${name}`]['init'] = false
    },
    get:(name='')=>{
        return iframe.staticProperty[`${name}`]
    },
    getAll:()=>{
        return iframe.staticProperty
    },
    delete:(name='')=>{
        delete iframe.staticProperty[`${name}`]
    },
    post:(name,data = {}, callback)=>{
        if(iframe.staticProperty[`${name}`]['init']){
            data.property = location.origin
            iframe.staticProperty[`${name}`]['port'].port1.onmessage = callback
            iframe.staticProperty[`${name}`]['port'].port1.postMessage(data)
        }else{
            iframe.staticProperty[`${name}`]['port'].port1.onmessage = callback
            iframe.staticProperty[`${name}`]['init'] = true
            iframe.staticProperty[`${name}`]['window'].contentWindow.postMessage(data, iframe.staticProperty[`${name}`]['window'].src, [iframe.staticProperty[`${name}`]['port'].port2])
        }
    },
    count: ()=>{
        iframe.staticProperty.count ++
    },
    resetCount: ()=>{
        iframe.staticProperty.count = -1
    },
    getCount:()=>{
        return iframe.staticProperty.count
    },
    setPort2:(name, port, callback)=>{
        if(iframe.staticProperty[`${name}`] === undefined){
            iframe.staticProperty[`${name}`] = {}
        }
        iframe.staticProperty[`${name}`]['port2'] = port
        iframe.staticProperty[`${name}`]['port2']['onmessage'] = callback
    },
    getPort2:(name)=>{
        return iframe.staticProperty[`${name}`]['port2']
    },
    getAllPort2:()=>{
        return iframe.staticProperty
    }
}