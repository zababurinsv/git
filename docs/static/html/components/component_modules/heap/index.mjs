import heap from '/static/html/components/component_modules/heap/heap.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
export default {
    set:(view,property,color,substrate,relation)=>{
        return new Promise(function (resolve, reject) {
            console.log(`  ${emoji('new_moon')}`, substrate)
            heap(view, property,color,substrate ,relation, (event)=>{
                console.log(`   ${emoji('full_moon')}`, event)
                resolve(event)
            })
        })
    },
    get:(view,property,color,substrate,relation, callback)=>{
        console.log(`  ${emoji('sunny')}`, relation)
        heap(view, 'await',color,{property, substrate} ,relation, callback)
    }
}