import mongoose from "mongoose"
import connection from "./module/connection.js"
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('bufferCommands', false)
let conn = null;
export default (view, property, color, substrate, relation)=>{
    return new Promise( async (resolve, reject) => {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        switch (relation) {
            case '/storage/set/item':
                try {

                    let schema = new mongoose.Schema({
                        'view':Boolean,
                        'color':String,
                        'timestamp':Number,
                        'utc':String,
                        'iso':String,
                        'id': String ,
                        'object':  Object,
                    })

                    if (conn === null) {
                        conn = await connection('init')
                        conn['dex'].model('dex', schema, 'index');
                    }else{
                        try {
                            conn['dex'].model('dex', schema, 'index');
                        }catch (e) {
                
                        }
                    }
                    const store = conn['dex'].model('dex');
                    out(await store.create(substrate))
                } catch (e) { err(e) }
                break
            case'/storage/delete/all':
                try {
                    if (conn === null) {
                        conn = await connection('init')
                        out({_:'status', status:await conn['dex']['collection']('index').drop()})
                    }else{
                        out({_:'status', status:await conn['dex']['collection']('index').drop()})
                    }

                } catch (e) { err(e) }
                break
            default:
                break
        }
    })
}
