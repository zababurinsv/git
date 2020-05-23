import request from '/static/html/components/component_modules/request/request.mjs'
import action from '/static/html/components/component_modules/action/action.mjs'
import staticProperty from '/static/html/components/component_modules/staticProperty/staticProperty.mjs'

export default async (obj, func, ...args)=>{
    bundle['default'](obj,null, async function (error, config) {
        return new Promise(async function (resolve, reject) {
            let out = (obj) => {
                //console.log('~~~ out router ~~~')
                resolve(obj)
            }
            let err = (error) => {
                console.log('~~~ err router ~~~', error)
                reject(error)
            }
            switch (func) {
                case 'link':
                   async (async (obj, props, data) => {
                        try {
                            console.log(`${func}[(${obj['input']})${obj[props]}]`)
                            switch (obj[props]) {
                                case 'listener':
                                   async (async (obj, props,data) => {
                                        try {
                                            let href = obj['this'].shadowRoot.querySelectorAll('a')
                                            let history = config['history']['createBrowserHistory']()
                                            const location = history.location;

                                            for(let i = 0; i < href.length;i++){
                                                href[i].addEventListener("click", function(e) {
                                                    e.preventDefault()

                                                    let ref = e.currentTarget.href
                                                    ref =  ref.replace(window.location.origin,'')

                                                    // console.log('@@@@@@@@@@@',ref)
                                                    // if(e.target && e.target.nodeName == "A") {
                                                    history.push(ref, { some: 'state' });
                                                    // }
                                                });
                                            }
                                            const unlisten = history.listen(async (location, actionRouter) => {
                                                let store = await staticProperty({
                                                    input: 'router',
                                                    type: 'all'
                                                }, 'get', 'type')

                                                let manifest = await action({
                                                    input: 'router',
                                                    type: 'manifest'
                                                }, 'get', 'type')


                                                // console.log('--------------->',actionRouter, location.pathname, location.state)


                                                request({
                                                    input:'router',
                                                    pathname: location.pathname,
                                                    location: window.location.origin,
                                                    state: location.state,
                                                    type:'router',
                                                    manifest: manifest,
                                                    store: store,
                                                    description: 'change-manifest '
                                                }, 'change', 'type')

                                                out({request:'true'})
                                            })
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])
                                    break
                                case 'default':
                                    (async (obj, props,data) => {
                                        try {
                                            out(obj)
                                        } catch (e) { err(e) }
                                    })(obj, args[0], args[1], args[2], args[3])

                                    break
                                default:
                                    err(`новая функция ${func}`)
                                    break
                            }
                        } catch (e) { err(e) }
                    })(obj, args[0], args[1], args[2], args[3])
                    break
                default:
                    err(`новая функция ${func}`)
                    break
            }
        })
    })
}
