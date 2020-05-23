import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
let mark = { }
mark.staticProperty = []
mark.set = (obj={mark: 'performance',end:false, message:''})=>{
    let time = {}
    let Mark = {}
    performance.mark(obj.mark)
    let performanceEntries =  performance.getEntriesByName(obj.mark)
    if(performanceEntries.length === 1){
        mark.staticProperty[`${obj.mark}`] = []
        mark.staticProperty[`${obj.mark}`]['start'] = `${performanceEntries[0].startTime}:0`
        mark.staticProperty[`${obj.mark}`]['end'] = {}
        mark.staticProperty[`${obj.mark}`]['timestamp'] = Date.now()
        mark.staticProperty[`${obj.mark}`]['all'] = 0
        mark.staticProperty[`${obj.mark}`]['sample'] = []
        mark.staticProperty[`${obj.mark}`]['message'] = []
        mark.staticProperty[`${obj.mark}`]['message'].push(obj.message)
        mark.staticProperty[`${obj.mark}`]['sample'].push(0)
        Mark = mark.staticProperty[`${obj.mark}`]
        document.dispatchEvent( new CustomEvent('performance-run', {
            detail: {
                _:obj.mark,
                data: {
                    time:mark.staticProperty[`${obj.mark}`],
                    mark:performanceEntries
                }
            }
        }))
    }else{
        if(mark.staticProperty[`${obj.mark}`] === undefined){
            performance.clearMarks(obj.mark);
            mark.set(obj)
        }else{
            time = performanceEntries[performanceEntries.length - 1].startTime - performanceEntries[performanceEntries.length - 2].startTime
            mark.staticProperty[`${obj.mark}`]['sample'].push(time)
            mark.staticProperty[`${obj.mark}`]['message'].push(obj.message)
            mark.staticProperty[`${obj.mark}`]['all'] = mark.staticProperty[`${obj.mark}`]['all'] + time
            Mark = mark.staticProperty[`${obj.mark}`]
            if(obj.end){
                // console.assert(false, obj.mark)
                mark.staticProperty[`${obj.mark}`]['end'] = `${performanceEntries[performanceEntries.length - 1].startTime}:${0 + time}`
                document.dispatchEvent( new CustomEvent('performance-end', {
                    detail: {
                        _:obj.mark,
                        data: {
                            time:mark.staticProperty[`${obj.mark}`],
                            mark:performanceEntries
                        }
                    }
                }))
                Mark = mark.staticProperty[`${obj.mark}`]
                performanceEntries = {}
                delete mark.staticProperty[`${obj.mark}`]
                performance.clearMarks(obj.mark);
            }
        }
    }
    return Mark
}

mark.relations = (obj={mark: 'performance'})=>{
    const allEntries = performance.getEntriesByType("mark");

    return allEntries
}
export default mark