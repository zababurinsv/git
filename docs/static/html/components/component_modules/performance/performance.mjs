import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import module from '/static/html/components/component_modules/performance/module-performance.mjs'
let object = {}
object.staticProperty = []
object.staticProperty.class = undefined
object.staticProperty.mark = []
export default (obj = {_:'performance'})=>{
    object['class'] = class Performance {
      constructor() {
        this.mark = this.mark.bind(this)
        this.measure = this.measure.bind(this)
        this.now = this.now.bind(this)
        this.start = this.run.bind(this)
        this.end = this.end.bind(this)
        document.addEventListener('performance-run', this.run)
        document.addEventListener('performance-end', this.end)
      }
      mark(obj ={_:'mark'}){
        return obj
      }
      measure(obj ={_:'measure'}){
        return obj
      }
      now(end = false,mark, message = ''){
        if(mark === undefined){
          console.assert(false,end , message)
        }
        return module.mark.set({mark:mark, end:end, message:message})
      }
      run(event){
        if(object.staticProperty.mark.hasOwnProperty(`${event['detail']['_']}`) === false){
          object.staticProperty.mark[`${event['detail']['_']}`] = []
        }
        object.staticProperty.mark[`${event['detail']['_']}`].push('in progress')
      }
      end(event){
        if(object.staticProperty.mark.hasOwnProperty(`${event['detail']['_']}`)){
          object.staticProperty.mark[`${event['detail']['_']}`] = []
        }
        let verify = true
        for(let i =0; i < object.staticProperty.mark[`${event['detail']['_']}`].length;i++){
          if(object.staticProperty.mark[`${event['detail']['_']}`][i] === 'in progress'){
            object.staticProperty.mark[`${event['detail']['_']}`][i] = event['detail']['data']
            verify = false
            break
          }
        }
        if(verify){
          object.staticProperty.mark[`${event['detail']['_']}`].push(event['detail']['data'])
        }
      }
      get self() {
        return object
      }
      get allMark(){
        return object.staticProperty.mark
      }
    }

    if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new object['class']()}

    return object.staticProperty.class

}
