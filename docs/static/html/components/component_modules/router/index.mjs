import orderbook from '/static/html/components/component_modules/router/orderbook/orderbook.mjs'

export default (view, property, color, substrate, relation)=>{
    return new Promise(function(resolve, reject) {
                switch (substrate.path[2]) {
                    case '"orderbook"':
                        console.log('---->', substrate.path.length)
                        orderbook(view, property, color, substrate, relation)
                        break
                    default:
                        break
                }


    })
}