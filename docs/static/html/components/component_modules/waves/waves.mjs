import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import Class from '/static/html/components/component_modules/waves/module/class.mjs'
export default (obj = {_:'type'})=>{
    return new Promise( async (resolve, reject) =>{
        let object = {}
        object.staticProperty = {}
        object.staticProperty.class = undefined
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try {
            object['class'] = ()=>{
                if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
                return object.staticProperty.class
            }
            if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
            out(object.staticProperty.class)
        }catch (e) {
            err({
                _:'type',
                error:e
            })
        }

    })
}
