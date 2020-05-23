import mongo from "mongoose";
const dex ="mongodb+srv://Sergey:fds744502fds@xart-qd8fc.mongodb.net/dex?retryWrites=true&w=majority"
mongo.set('useUnifiedTopology', true)
mongo.set('useFindAndModify', false)
mongo.set('bufferCommands', false)
export default (obj)=>{
    return new Promise(async function (resolve, reject) {
        switch (obj) {
            case 'init':
                    let db = {}
                    db['dex'] =  await mongo.createConnection( dex, {
                        authSource: "admin",
                        useNewUrlParser: true,
                        poolSize: 4
                    });
                    resolve(db)
                break
            default:
                console.log('не определён')
                break

        }

    })
}
