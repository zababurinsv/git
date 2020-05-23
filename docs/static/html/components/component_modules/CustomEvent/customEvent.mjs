export default (view = true,property='',color = 'black', substrate={},relation=''  )=>{
    return new Promise(function (resolve, reject) {
        document.addEventListener(`${relation}-end`, async (event)=>{

            resolve(event.detail)
        })
        document.dispatchEvent( new CustomEvent(`${relation}`, {
            detail: {
                '/':relation,
                view: view,
                property:property,
                color:color,
                substrate:substrate,
                relation:relation,
                callback: (obj) =>{
                    document.dispatchEvent( new CustomEvent(`${relation}-end`,{
                        detail:{ data: obj }
                    }))
                }
            }
        }))
    })
}