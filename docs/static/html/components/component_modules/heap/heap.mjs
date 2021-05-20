import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import colorLog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
let source = {}
let target = {}
source.staticProperty = {}
target.staticProperty = {}
source.staticProperty = new Proxy({}, {
    get: (obj, prop) => {
        return obj[prop];
    },
    set: (obj, prop, value) => {
        if(isEmpty(obj[prop])){
            obj[prop] = []
        }
        obj[prop].push(value);
        return true
    }
});

export default (view,property,color,substrate,relation,callback,origin) =>{
    return  new Promise(async (resolve, reject) => {
        function out(obj) {
            resolve(obj)
        }
        function err(obj) {
            reject(obj)
        }
        try {
            if(property === 'await'){
                // console.assert(false, property, substrate)
                if(!isEmpty(target.staticProperty[`${relation}`])){
                   console.assert(false, 'должен быть один таргет объект в heap')
                }else{
                    if(isEmpty(source.staticProperty[`${relation}`])){
                        // console.log(`${emoji('waxing_crescent_moon')}`, {
                        //     relation: relation,
                        // })
                        // console.assert(false, source.staticProperty, target.staticProperty, '2')
                        target.staticProperty[`${relation}`]= {
                            callback: callback
                        }
                        out(true)
                    }else{
                        // console.assert(false, source.staticProperty, target.staticProperty, '2')
                        console.log(`${emoji('last_quarter_moon')}`, {
                            relation:source.staticProperty[`${relation}`][0]['relation']
                        })

                        while(!isEmpty(source.staticProperty[`${relation}`][0])){
                           await callback({
                                view:source.staticProperty[`${relation}`][0]['view'],
                                property:source.staticProperty[`${relation}`][0]['property'],
                                color: source.staticProperty[`${relation}`][0]['color'],
                                substrate:source.staticProperty[`${relation}`][0]['substrate'],
                                relation: source.staticProperty[`${relation}`][0]['relation'],
                                callback: source.staticProperty[`${relation}`][0]['callback']
                            })
                             source.staticProperty[`${relation}`].shift()
                        }
                        out(true)
                    }
                }
            }else{


                if(isEmpty(target.staticProperty[`${relation}`])){
                    // console.assert(false, target.staticProperty[`${relation}`],'----->')
                    console.log(`${emoji('first_quarter_moon')}`, {
                        property:property,
                        substrate:substrate,
                        relation:relation,
                    })

                    // console.assert(false, target.staticProperty[`${relation}`],'----->')
                    source.staticProperty[`${relation}`] = {
                        view:view,
                        property:property,
                        color:color,
                        substrate:substrate,
                        relation:relation,
                        callback: callback
                    }
                    out(true)
                }else{
                    console.log(`${emoji('waning_crescent_moon')}`, {
                        property:property,
                        substrate:substrate,
                        relation:relation,
                    })

                    source.staticProperty[`${relation}`] = {
                        view:view,
                        property:property,
                        color:color,
                        substrate:substrate,
                        relation:relation,
                        callback: callback
                    }
                    while(!isEmpty(source.staticProperty[`${relation}`][0])){
                       target.staticProperty[`${relation}`].callback({
                            view:source.staticProperty[`${relation}`][0]['view'],
                            property:source.staticProperty[`${relation}`][0]['property'],
                            color: source.staticProperty[`${relation}`][0]['color'],
                            substrate:source.staticProperty[`${relation}`][0]['substrate'],
                            relation: source.staticProperty[`${relation}`][0]['relation'],
                            callback: source.staticProperty[`${relation}`][0]['callback']
                        })
                         source.staticProperty[`${relation}`].shift()
                    }
                    out(true)
                }

            }
        }catch (e) {
            err({
                _:'object',
                error: e
            })
        }
        
    })
}