import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import colorLog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
export default (view = true,property='',color = 'black', substrate={},relation=''  )=>{
    return new Promise(function (resolve, reject) {
        document.addEventListener(`${relation}-end`, async (event)=>{

            resolve(event.detail)
        })
        //colorLog(view, property, color, substrate, relation)
        console.log(`${emoji('waxing_gibbous_moon')}`, substrate)
        document.dispatchEvent( new CustomEvent(`${relation}`, {
            detail: {
                '/':relation,
                view: view,
                property:property,
                color:color,
                substrate:substrate,
                relation:relation,
                callback: (obj) =>{
                    console.log(`${emoji('waning_gibbous_moon')}`, obj)
                    document.dispatchEvent( new CustomEvent(`${relation}-end`,{
                        detail:obj
                    }))
                }
            }
        }))
    })
}