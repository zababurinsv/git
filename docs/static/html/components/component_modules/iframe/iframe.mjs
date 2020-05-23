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
    postWindow:(name,data = {}, callback)=>{
            let scrollWidth = Math.max(
                document.body.scrollWidth, document.documentElement.scrollWidth,
                document.body.offsetWidth, document.documentElement.offsetWidth,
                document.body.clientWidth, document.documentElement.clientWidth
            );
            let path = name
            if(name.indexOf('/login') >= 0){
                name = name.replace('/login', '')
            }else{
                name = name.replace('/import', '')
            }
            let channel = {};
            let port1 = {}
            let port2 = {}
            if(iframe.staticProperty[`${name}`] === undefined){
                channel = new MessageChannel();
                port1 = channel.port1
                port2 = channel.port2
                iframe.staticProperty[`${name}`] = {}
                iframe.staticProperty[`${name}`]['open-window'] ={}
                iframe.staticProperty[`${name}`]['open-window']['port1'] = port1
                iframe.staticProperty[`${name}`]['open-window']['port1']['onmessage'] = callback
                window.addEventListener("message", async (event) => {
                    if(location.origin !== event.origin){
                        if(event.data === 'init'){
                            data.window = true
                            event.source.postMessage(data,event.origin,[port2])
                        }
                    }
                })
                iframe.staticProperty[`${name}`]['open-window']['window'] = window.open(`${path}`,'init',`height=${scrollWidth/3},width=${scrollWidth/1.5},scroll=no,titlebar=no,help=no;toolbar=no,menubar=no,status=no,resizable=no,scrollbars=no,location=no,top=${scrollWidth/2-((scrollWidth/1.5)/2)},left=${scrollWidth/2-((scrollWidth/1.8)/2)}`);
            }else{
                if(iframe.staticProperty[`${name}`]['open-window'] === undefined){
                    channel = new MessageChannel();
                    port1 = channel.port1
                    port2 = channel.port2
                    iframe.staticProperty[`${name}`]['open-window'] ={}
                    iframe.staticProperty[`${name}`]['open-window']['port1'] = port1
                    iframe.staticProperty[`${name}`]['open-window']['port1']['onmessage'] = callback
                    window.addEventListener("message", async (event) => {
                        if(location.origin !== event.origin){
                            if(event.data === 'init'){
                                data.window = true
                                event.source.postMessage(data,event.origin,[port2])
                            }
                        }
                    })
                    iframe.staticProperty[`${name}`]['open-window']['window'] = window.open(`${name}/import`,'init',`height=${scrollWidth/3},width=${scrollWidth/1.5},scrollbars=no,toolbar=no,menubar=no,status=no,resizable=no,menubar=no,scrollbars=no,location=no,top=${scrollWidth/2-((scrollWidth/1.5)/2)},left=${scrollWidth/2-((scrollWidth/1.8)/2)}`);
                }else{
                    data.property = location.origin
                    data.window = true
                    iframe.staticProperty[`${name}`]['open-window']['port1']['onmessage'] = callback
                    iframe.staticProperty[`${name}`]['open-window']['port1'].postMessage(data)
                }
                
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
    setPort2:(name, port, callback, window)=>{
        if(iframe.staticProperty[`${name}`] === undefined){
            iframe.staticProperty[`${name}`] = {}
        }
        if(window === true){
            if(iframe.staticProperty[`${name}`]['open-window'] === undefined){
                iframe.staticProperty[`${name}`]['open-window'] = {}
            }
            iframe.staticProperty[`${name}`]['open-window']['port2'] = port
            iframe.staticProperty[`${name}`]['open-window']['port2']['onmessage'] = callback
        }else{
            iframe.staticProperty[`${name}`]['port2'] = port
            iframe.staticProperty[`${name}`]['port2']['onmessage'] = callback
        }
        
    },
    getPort2:(name, window)=>{
        if(window === true){
            return iframe.staticProperty[`${name}`]['open-window']['port2']
        }else{
            return iframe.staticProperty[`${name}`]['port2']
        }
    },
    closeWindow:(name)=>{
        iframe.staticProperty[`${name}`]['open-window']['window'].close()
    }
}