let now = { }

function tick (obj, type, count, end, preset) {
    return new Promise(function (resolve, reject) {
        if (type !== `style`) {
            if (count === 0 && end !== 0) {
                t0 = performance.now()
                t2 = performance.now()
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&& 0', type, 'count:', count, ':', t0, '= 0 :ms')
            } else if (count === 1) {
                t1 = performance.now()
                t1 = (t1 - t0)
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&& 1', type, 'count:', count, ':', t1, ':ms')
                console.assert(true, `
                
                
                время => ${t1} ${t2}
                
                
                
                `)
            } else if (count === 2) {
                t2 = performance.now()
                t2 = (t2 - t0 - t1)
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&& 2', type, count, t2, ':ms')
                console.assert(true, `
                
                
                время => ${t1} ${t2} ${t0}
                
                
                
                `)
            } else if (count === end) {
                if (!preset || preset === 'default') {
                    t4 = t3 + t1 + t2 + t0
                    t3 = performance.now()
                    if (end === 0) t0 = t3
                    let all = t3 + t1 + t2
                    t3 = t3 - t4
                    resolve(console.assert(false, 'count:', count, 'type:', type, 'time:', t3, ':ms', 'All Time', all, 'ms', `
              
                        ^{0}^|^{0}^
                        
                        
            `))
                } else {
                    t4 = t3 + t1 + t2 + t0
                    t3 = performance.now()
                    let all = t3 - t0
                    t3 = t3 - t4
                    obj['tick']['data'] = {}
                    obj['tick']['data'][type] = {}
                    obj['tick']['data'][type]['type'] = type
                    obj['tick']['data'][type]['count'] = count
                    obj['tick']['data'][type]['time'] = t3
                    obj['tick']['data'][type]['preset'] = preset
                    obj['tick']['data'][type]['all'] = all
                    console.log('', obj['tick']['data'])
                    resolve(obj)
                }
            } else {
                t4 = t3 + t1 + t2 + t0
                t3 = performance.now()
                t3 = t3 - t4
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&& ->', type, count, t3, ':ms')
            }
        } else {
            console.assert(false, 'tickPromise неизвестный тип', obj, type, end)
        }
    })
}
export default now
