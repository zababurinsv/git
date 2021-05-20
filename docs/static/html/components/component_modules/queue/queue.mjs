import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import description from '/static/html/components/component_modules/description/description.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'

let object = {}
object.staticProperty = []
let output = {}
object.setEventsAction = async (views, property, color, substrate, relation) => {
    return new Promise(async function (resolve, reject) {
        switch (relation) {
            case 'button':
                resolve(await actions(views,property,color,substrate,relation))
                break
            case 'player':
                resolve(await actions(views,property,color,substrate,relation))
                break
            case 'authtorization':
                resolve(await postoffice(views,property,color,substrate,relation))
                break
            case 'bank':
                resolve(await waves(views,property,color,substrate,relation))
                break
            case 'wallet':
                resolve(await waves(views,property,color,substrate,relation))
                break
            case 'transfer':
                resolve(await waves(views,property,color,substrate,relation))
                break
            case 'faucet-wallet':
                resolve(await faucet(views,property,color,substrate,relation))
                break
            case 'create-nft':
                resolve(await wavesGame(views,property,color,substrate,relation))
                break
            default:
                console.warn(`${emoji('kissing_heart')} queue.mjs ---> нет акшена на это отношение ---> ${relation}`)
                resolve(true)
                break
        }
    })
}
let handler = {
    get: (obj, prop) => {
        return obj[prop];
    },
    set: (obj, prop, value) => {
        obj[prop] = value;
        switch (prop) {
            case 'length':
                if(obj.length === 1){
                    let timerId = setTimeout(async function tick() {
                        if(obj.length === 0){
                            console.log('~~~~~~~~~~~ End ~~~~~~~~~~~')
                            clearTimeout(timerId);
                        }else{
                            if(obj[0].end){
                                await object.setEventsAction(obj[0].console,{end:true, property:obj[0].property},obj[0].color, obj[0].substrate, obj[0].relation )
                                colorlog(obj[0].console,{ end:true, property:obj[0].property, },obj[0].color, obj[0].substrate, obj[0].relation )
                                delete obj[0].substrate.queue
                                document.dispatchEvent( new CustomEvent('typeScript-end', {
                                    detail: {
                                        _:obj[0].substrate._,
                                        console:obj[0].console,
                                        property:obj[0].property,
                                        color: obj[0].color,
                                        substrate: obj[0].substrate,
                                        relation:obj[0].relation,
                                    }
                                }))
                            }else{
                                // console.assert(false)
                                await object.setEventsAction(obj[0].console,obj[0].property,obj[0].color, obj[0].substrate, obj[0].relation)
                                colorlog(obj[0].console,obj[0].property,obj[0].color, obj[0].substrate, obj[0].relation )

                            }

                            obj.shift()
                            timerId = setTimeout(tick, 10);
                        }
                    }, 0);
                }
                break
            default:
                break
        }
        return true
    }
}
export default (show, message='default', color ='default', ...args) =>{
    return  new Promise(async (resolve, reject) => {
        function out(obj) {
            resolve(obj)
        }
        function err(obj) {
            reject(obj)
        }
        try {
            if(typeof args[args.length-1] === 'string'){
                if(message === '~end'){
                   delete object.staticProperty[`${args[args.length-1]}`]
                    output = {
                       _:`${args[args.length-1]}`,
                       destruct:true,
                       queue: object.staticProperty
                    }
                }else{
                    if(isEmpty(object.staticProperty[`${args[args.length-1]}`])){
                        object.staticProperty[`${args[args.length-1]}`] = []
                        object.staticProperty[`${args[args.length-1]}`]['task'] = []
                        object.staticProperty[`${args[args.length-1]}`]['task'] = new Proxy(object.staticProperty[`${args[args.length-1]}`]['task'], handler)
                    }
                    args.unshift(object.staticProperty[`${args[args.length-1]}`])
                    output = description(show, '%c%O' + args[args.length-1],'color:' + color,'[(', args.slice(0, args.length-1),'*)',message,']')
                }
            }else{
                console.assert(false, 'не выбранно отношение')
            }
            out(output)
        }catch (e) {
            err({
                _:'object',
                error: e
            })
        }

    })
}