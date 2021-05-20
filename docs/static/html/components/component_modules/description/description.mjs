import colors from '/static/html/components/component_modules/colors/colors.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
export default (...args)=>{
    return  new Promise(async (resolve, reject) => {
        let object = {}
        object.pointers = [ ]
        object.pointers.push('%s')
        object.pointers.push('%d')
        object.pointers.push('%i')
        object.pointers.push('%f')
        object.pointers.push('%o')
        object.pointers.push('%O')
        object.pointers.push('%c')
        object.action = {}
        object.description = {}
        object.description.property = {}
        object.description.relation = {}
        object.description.substrate = {}
        object.description.color = 'black'
        function out(obj) {
            resolve(obj)
        }
        function err(obj) {
            reject(obj)
        }
        function isNotEmptyActions(actions, object) {
                let out = false
                if(isEmpty(actions)){
                    colorlog(object.description.console, 'для этого отношения нет никаких действий' ,object.description.color,object.description.substrate, `${object.description.relation}`)
                    object.description.property = {
                        end: true,
                        property:object.description.property,
                    }
                }else{ out = true }
                return out
        }
        function sendToQueue(actions) {
            return new Promise(async (resolve, reject) => {
                for(let i=0; i< actions.length;i++){
                    object.description.substrate.queue.push({
                        _:object.description.substrate._,
                        end: (i === actions.length -1),
                        console:object.description.console,
                        property:object.description.property,
                        color: object.description.color,
                        substrate:{
                            [object.description.relation]:actions[i]
                        },
                        relation:object.description.relation,
                    })
                }
                resolve({send:'sendToQueue true'})
            })
        }
        function addEventsQueue(object) {
            return new Promise(async (resolve, reject) => {
                switch (object.description.relation.toLowerCase()) {
                    case 'button':
                        console.assert(false)
                        if(isNotEmptyActions(action.button, object)){
                            for(let i=0; i< action.button.length;i++){
                                object.description.substrate.queue.push({
                                    _:object.description.substrate._,
                                    end: (i === action.button.length -1),
                                    console:object.description.console,
                                    property:action.button[i].property,
                                    color: object.description.color,
                                    substrate: action.button[i].substrate,
                                    relation:object.description.relation,
                                })
                            }
                        }
                        break
                    case 'player':
                        if(isNotEmptyActions(action.player, object)){
                            for(let i=0; i< action.player.length;i++){
                                object.description.substrate.queue.push({
                                    _:object.description.substrate._,
                                    end: (i === action.player.length -1),
                                    console:object.description.console,
                                    property:action.player[i].property,
                                    color: object.description.color,
                                    substrate: action.player[i].substrate,
                                    relation:object.description.relation,
                                })
                            }
                        }
                        break
                    case 'authtorization':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    case 'transfer':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    case 'bank':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    case 'wallet':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    case 'faucet-wallet':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    case 'create-nft':
                        if(isNotEmptyActions(object['action'][`${object.description.relation}`], object)){


                            sendToQueue(object['action'][`${object['description']['relation']}`])

                        }else{
                            object.description.substrate.queue.push({
                                _:object.description.substrate._,
                                end: true,
                                console:object.description.console,
                                property:object.description.property,
                                color: object.description.color,
                                substrate: object.description.substrate,
                                relation:object.description.relation,
                            })
                        }
                        break
                    default:
                        console.warn(`${emoji('bank')} description.mjs не обрабатывается добавление в очередь --->`,object.description.relation.toLowerCase(),'--->', object )
                        break

                }
                resolve({queue:true})
            })
        }
        try {
            for(let i = 0; i < args.length;i++){
                if(typeof args[0] === 'boolean'){
                    object.description.console = args[0]
                }else{
                    console.assert(false, 'параметр для отображения в консоли должен иметь тип boolean')
                }

                if(args[i+1] === ']'){

                    object.description.property = args[i]
                }

                if(args[i+2] === '[('){
                    object.description.relation = args[i]
                    object.description.relation = object.description.relation.replace('%c%O','')
                }

                if(args[i+1] === '*)'){
                    object.action[`${object.description.relation}`] = undefined
                    for(let j =0; j < args[i].length;j++ ){
                        if(args[i][j].hasOwnProperty('_')){
                            object.description.substrate._ = args[i][j]._
                        }
                        if(args[i][j].hasOwnProperty('task')){
                           object.description.substrate.queue = args[i][j].task
                        }else{

                            if(args[i][j].hasOwnProperty(`${object.description.relation}`)){
                                object.action[`${object.description.relation}`] = args[i][j][`${object.description.relation}`]
                            }
                        }
                    }
                }

                switch (typeof args[i]) {
                    case "string":
                        let temp = args[i].split(':')
                        if(temp.length > 1){
                            if(temp[0] === 'color'){
                                object.description.color = await colors(temp[1])
                            }
                        }
                        break
                    default:
                        // console.warn('тип не отслеживается', typeof args[i], args[i])
                        break
                }
            }
            addEventsQueue(object)
            let description = object.description.substrate
            delete description.queue
            colorlog(object.description.console, object.description.property ,object.description.color,object.description.substrate, `${object.description.relation}`)
            out(object)
        }catch (e) {
            err({
                _:'decription',
                error: e
            })
        }
    })
}