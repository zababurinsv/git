export default (name = '', data = {})=>{
    return document.dispatchEvent( new CustomEvent(`${name}-end`, {
        detail: {
            '/':name,
            data:data,
            apiBase:{
                apiBase:'https://nodes-testnet.wavesnodes.com'
            }
        }
    }))
}