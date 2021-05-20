export default (view = true,property='',color = 'black', substrate={},relation=''  )=>{
    return new Promise(function (resolve, reject) {
        document.addEventListener(`${relation}-end`, async (event)=>{

            resolve(event.detail)
        })
    })
}