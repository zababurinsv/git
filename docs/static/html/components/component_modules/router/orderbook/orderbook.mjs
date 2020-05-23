import  second from '/static/html/components/component_modules/router/orderbook/orderbooksecond.mjs'

export default (view, property, color, substrate, relation)=>{
    return new Promise(function(resolve, reject) {
        switch (substrate.path[3]) {
            case "cancel":

                break
                case "market":

                break
            default:
                second(view, property, color, substrate, relation)
                break
        }
    })
}