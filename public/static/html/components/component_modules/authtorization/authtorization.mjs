import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import pid from '/static/html/components/component_modules/pid/pid.mjs'
import Interface from '/static/html/components/component_modules/interface/interface.mjs'
let object = {}
object['staticProperty'] = []
object['staticProperty']['NETWORK_URL'] = undefined
object['staticProperty']['NODE_URL'] = undefined
object['staticProperty']['queue'] = {}
object['staticProperty']['node'] = {}
object['staticProperty']['queue']['class'] = {}
object['interface'] = () => { return Interface }
object['_'] = undefined
object['class'] = {}
object['verify'] = {};
object['add'] = {};
object['add']['queue'] = {};
object['init'] = false
object['verify']['verify'] = true
object['verify']['process'] = true
object['add']['queue']['class'] = (obj, pid)=>{
    if(isEmpty(object['staticProperty']['node'])){
        isEmpty(object['staticProperty']['queue']['class'][`${obj.constructor.name}`])?(
            object['staticProperty']['queue']['class'][`${obj.constructor.name}`] = {},
                object['staticProperty']['queue']['class'][`${obj.constructor.name}`][`${pid}`] = obj
        ):  object['staticProperty']['queue']['class'][`${obj.constructor.name}`][`${pid}`] = obj
    }else{
    document.dispatchEvent( new CustomEvent('add', {
        detail: {
            obj: obj,
            pid: pid
        }}))
    }

    return obj
}
object['add']['node'] = (obj, pid)=>{
    isEmpty(object['staticProperty']['node'])?(
            object['staticProperty']['node'] = {},
            object['staticProperty']['node'] = obj
    ):  object['staticProperty']['node'] = obj
    return obj
}
export default (init = { _:'Authtorization', NETWORK_URL:'http://localhost:4334/authorization',NODE_URL: 'https://pool.testnet.wavesnodes.com' }) => {
    return new Promise((resolve, reject) => {
            if(isEmpty(init['_'])){ init['_'] = 'Authtorization' }
            if(isEmpty(init['NETWORK_URL'])){ init['_'] = 'http://localhost:4334/authorization' }
            if(isEmpty(init['NODE_URL'])){ init['_'] = 'https://pool.testnet.wavesnodes.com' }
            Object.keys(init).forEach(function (key) {
                switch (key) {
                    case '_':
                        if(init[key] !== undefined ){
                            object['_'] =init[key]
                            object['init'] = true
                        }
                        break
                    case 'NETWORK_URL':
                        object['staticProperty']['NETWORK_URL'] = init['NETWORK_URL']
                        break
                    case 'NODE_URL':
                        object['staticProperty']['NODE_URL'] = init['NODE_URL']
                        break
                    default:
                        console.warn('неизвестное свойство',key, '---->', init[key],  )
                        break
                }
            })
            object['class']['interface'] = class Interface {
                #self = object
                #pid = undefined
                #j = object.interface()
                #store = {}
                #mutation = ()=>{

                }
                constructor(args = {_:undefined,pid:undefined}) {
                    this.#pid = isEmpty(args.pid) ? pid(): args.pid
                    this.action = this.action.bind(this)
                    this.getters = this.getters.bind(this)
                    if(isEmpty(object['staticProperty']['node'])){ object.class.namespace(args) }

                    // console.assert(false, this)


                    // this.#j.message({_:'Hello World'})
                }
                action(){

                    // this.#j.message({_:'Never Let Go'})
                }
                getters(){


                }
                get pid(){ return this.#pid }
            }

            object['class']['namespace'] =  (args = {_:undefined,pid:undefined})=>{
                class Namespace{
                    #class = {}
                    #self = object
                    #pid = undefined
                    #store = {}
                    #j = object.interface()
                    #mutation = ()=>{

                    }
                    #move = (nameObject = 'class', self, item) =>{
                        Object.keys(object['staticProperty']['queue']['class'][`${item}`]).forEach(function callback(classObject, index, array) {
                            if(object['staticProperty']['queue']['class'][`${item}`][`${classObject}`]){
                                if(object['staticProperty']['queue']['class'][`${item}`][`${classObject}`].constructor){
                                    let nameItem = object['staticProperty']['queue']['class'][`${item}`][`${classObject}`].constructor.name
                                    let pid = object['staticProperty']['queue']['class'][`${item}`][`${classObject}`].pid
                                    if(isEmpty(self.#class[`${nameItem}`])){ self.#class[`${nameItem}`] = {} }
                                    if(isEmpty(self.#class[`${nameItem}`][`${pid}`])){
                                        self.#class[`${nameItem}`][`${pid}`] = {}
                                    }else{
                                        console.assert(false, 'pid уже почему то существует')
                                    }
                                    self.#class[`${nameItem}`][`${pid}`] = {
                                        _: nameObject,
                                        class: object['staticProperty']['queue']['class'][`${item}`][`${classObject}`]
                                    }
                                    delete object['staticProperty']['queue']['class'][`${item}`][`${classObject}`]
                                }
                            }
                        })
                    }
                    #add = document.addEventListener('add', (event)=>{
                        let name = event['detail']['obj']['constructor']['name']
                        isEmpty(this.#class[`${name}`])?(
                            this.#class[`${name}`] = {},
                            this.#class[`${name}`][`${event['detail']['pid']}`] = {
                            _: this.#pid,
                            class: event['detail']['obj']
                            }
                        ):  this.#class[`${name}`][`${event['detail']['pid']}`] = {
                            _: this.#pid,
                            class: event['detail']['obj']
                        }
                    })
                    constructor(args = {_:undefined,pid:undefined}) {
                        this.#pid = args['pid'] === undefined ? pid(): args['pid']
                        this.action = this.action.bind(this)
                        this.getters = this.getters.bind(this)
                        let self = this
                        Object.keys(object['staticProperty']['queue']['class']).forEach(function callback(item, index, array) {
                            switch (item) {
                                case 'Network':
                                    self.#move(self.#pid, self, item)
                                    break
                                case 'Local':
                                    self.#move(self.#pid, self, item)
                                    break
                                default:
                                    console.warn(`необрабатываемое событие ----->`, item, '---->',object['staticProperty']['queue']['class'][`${item}`] )
                                    break
                            }
                        })
                        object.add.node(this,this.#pid)
                    }
                    action(){


                    }
                    getters(){


                    }
                    get pid(){ return this.#pid }
                    get class(){ return this.#class }
                }
                if(isEmpty(object['staticProperty']['node'])){ new Namespace(args);  }
                return object['staticProperty']['node']
            }
            object['class']['local'] = class Local {
                #pid = undefined
                #self = object
                #response ={}
                #j = object.interface()
                #store = {}
                #mutation = ()=>{


                }
                #terminate = (obj = {_:undefined}) =>{

                    console.log('~~~~~~~~terminate~~~~~~~~', obj)
                }
                #verify = (obj = {_:undefined})=>{
                    Object.keys(obj).forEach(function (key) {
                        switch (key) {
                            case '_':
                                if(obj[key] === undefined){
                                    console.warn('неопределён тип запроса', '---->', obj[key],  )
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'query':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'hello':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'director':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'movie':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            default:
                                console.warn('неизвестное свойство',`[${key}]`, '---->', obj[key],  )
                                break
                        }
                    })
                    if(object['verify']['verify'] === false){
                        object['verify']['verify'] = {
                            verify:false,
                            _:obj['_'],
                            url: object['staticProperty']['url']
                        }
                    }
                    return object['verify']['verify']
                }
                #master = (obj = {_:undefined}) =>{
                    Object.keys(obj).forEach(async (key) => {
                        switch (key) {
                            case '_':
                                break
                            case 'movie':
                                obj = {query:`{
                                        movie(id: ${obj['movie']['id']}) {
                                            ${obj['movie']['fields']}
                                        }
                                    }
                                `}
                                break
                            case 'director':
                                obj = {query:`{
                              director(id: ${obj['director']['id']}) {
                                     ${obj['director']['fields']}
                              }
                            }`}
                                break
                            case 'hello':
                                obj = {query: `{hello}`}
                                break
                            default:
                                console.warn('запрос на сервер',key, '---->', obj[key],  )
                                break
                        }
                    })
                    return  obj
                }
                constructor(args = {_:undefined,pid:undefined}) {
                    if(isEmpty(args['_'])){ args['_'] = 'network' }
                    this.process = this.process.bind(this)
                    this.action = this.action.bind(this)
                    this.getters = this.getters.bind(this)
                    this.#pid = isEmpty(args['pid']) ? pid(): args['pid']
                    object.add.queue.class(this,this.#pid)
                }
                get pid(){
                    return this.#pid
                }
                async process(obj = {_:undefined}){
                    (this.#verify(obj) === true) ?(
                        this.#response[`${obj['_']}`] = await this.#master(obj),
                        this.#terminate(obj)
                    )  : object['verify']['process'] = false

                    return object
                }
                action(){


                }
                getters(){


                }
            }
            object['class']['network'] = class Network {
                #pid = undefined
                #self = object
                #response ={}
                #j = object.interface()
                #store = {}
                #mutation = this.#j.auth.mutation((obj)=>{


                })
                // #mutation = this.#j.listener((obj)=>{

                    // console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!', obj, this.#pid)

                // })
                #fetch = (obj = {_:undefined}) =>{
                    return new Promise(async function (resolve, reject) {
                        try{
                            let response =  await fetch(object['staticProperty']['url'], {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body:JSON.stringify(obj)

                            })
                            if (response.ok) {
                                response = await response.json()
                            }
                            resolve(response)
                        }catch (e) {
                            object['verify']['fetch'] = false
                            resolve(e)
                        }
                    })
                }
                #terminate = (obj = {_:undefined}) =>{
                    object['verify']['verify'] = true
                    object['verify']['process'] = true
                }
                #verify = (obj = {_:undefined})=>{
                    Object.keys(obj).forEach(function (key) {
                        switch (key) {
                            case '_':
                                if(obj[key] === undefined){
                                    console.warn('неопределён тип запроса', '---->', obj[key],  )
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'query':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'hello':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'director':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            case 'movie':
                                if(object['staticProperty']['url'] === undefined && obj['_'] === undefined){
                                    object['verify']['verify'] = false
                                }
                                break
                            default:
                                console.warn('неизвестное свойство',`[${key}]`, '---->', obj[key],  )
                                break
                        }
                    })
                    if(object['verify']['verify'] === false){
                        object['verify']['verify'] = {
                            verify:false,
                            _:obj['_'],
                            url: object['staticProperty']['url']
                        }
                    }
                    return object['verify']['verify']
                }
                #master = (obj = {_:undefined}) =>{
                    Object.keys(obj).forEach(async (key) => {
                        switch (key) {
                            case '_':
                                break
                            case 'movie':
                                obj = {query:`{
                                        movie(id: ${obj['movie']['id']}) {
                                            ${obj['movie']['fields']}
                                        }
                                    }
                                `}
                                break
                            case 'director':
                                obj = {query:`{
                              director(id: ${obj['director']['id']}) {
                                     ${obj['director']['fields']}
                              }
                            }`}
                                break
                            case 'hello':
                                obj = {query: `{hello}`}
                                break
                            default:
                                console.warn('запрос на сервер',key, '---->', obj[key],  )
                                break
                        }
                    })
                    return  this.#fetch(obj)
                }
                constructor(args = {_:undefined,pid:undefined}) {
                    if(isEmpty(args['_'])){ args['_'] = 'network' }
                    this.process = this.process.bind(this)
                    this.action = this.action.bind(this)
                    this.getters = this.getters.bind(this)
                    this.#pid = isEmpty(args['pid']) ? pid(): args['pid']
                    object.add.queue.class(this,this.#pid)
                }
                get pid(){
                    return this.#pid
                }
                async process(obj = {_:undefined}){
                    (this.#verify(obj) === true) ?(
                        this.#response[`${obj['_']}`] = await this.#master(obj),
                            this.#terminate(obj)
                    )  : object['verify']['process'] = false

                    return object
                }
                action(){


                }
                getters(){


                }
            }
            resolve(object)
    })
}