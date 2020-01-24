let object = {}
class Auth {
    constructor() {
        this.listener = this.listener.bind(this)
        this.message = this.message.bind(this)
    }
    listener(callback){ document.addEventListener('listener', (event)=>{
        callback(event.detail)
        })
    }
    message(obj){
        document.dispatchEvent( new CustomEvent('listener', {
            detail: {
                obj: obj
            }
        }))
    }
    action(callback){ document.addEventListener('action', (event)=>{


        document.dispatchEvent( new CustomEvent('mutation', {
            detail: {
                obj: obj
            }
        }))

      })
    }
    mutation(callback){ document.addEventListener('mutation', (event)=>{



        document.dispatchEvent( new CustomEvent('state', {
            detail: {
                obj: event.detail
            }
        }))
        callback(event.detail)
    })
    }
    state(callback){ document.addEventListener('state', (event)=>{





        callback(event.detail)
    })
    }
    store(callback){ document.addEventListener('store', (event)=>{


        callback(event.detail)
    })
    }
}
let auth = new Auth()

export default {
    auth
}