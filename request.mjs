import fs from "fs-extra";

async function removeFolder(folder) {
    try {
        await fs.remove(folder)
        //готово
    } catch (err) {
        console.error(err)
    }
}

export default async (telegram, id)=>{

    telegram.wsList[id].onclose = async function(event) {
        let storage = {}
        let downloads = {}
        if (event.wasClean) {
            console.log('ws cоединение закрыто чисто')

        } else {
            console.log('ws Обрыв соединения')
        }
        // console.log( '~~~~~~~~~~~~', telegram.tlList[ws.id].destroy())
        // storage = path.resolve(__dirname, `./storage/${id}`)
        // downloads =path.resolve(__dirname, `./downloads/${id}`)
        // await removeFolder(storage)
        // await removeFolder(downloads)
        // telegram.tlRemove(id)
        telegram.wsRemove(id)
        telegram.sigRemove(id)
        console.log('Код: ' + event.code )
        console.log('~~~~~~~~~~~~~~ws close~~~~~~~~~~~~~~')
    };
    telegram.wsList[id].onerror = async function(error) {
        // let logOut = await client.invoke({_: 'logOut'})
        console.log("Ошибка " + error.message)
    };
    telegram.wsList[id].on('message', async function(message) {
        let object = JSON.parse(message)
        let uid = object['uid']

        console.log('~~~~~~~~~~~~~~~~request', object)
        switch (object['type']) {
            case 'getFile':
                try {
                    let getFile = await telegram.tlList[uid].invoke({
                        _: 'getFile',
                        file_id: 'AQADAgADqacxG5d2bT0ACPrztw8ABAIAA5d2bT0ABIhP449R7qZtHJIGAAEWBA'
                    })
                    console.log('~~~~~~~~getFile~~~~~~~',getFile)
                    // ws.send(JSON.stringify(getFile))
                }catch (e) {
                    console.log('~~~~error~~~~~~', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getUserProfilePhotos':
                try {
                    let getUserProfilePhotos = await telegram.tlList[uid].invoke({
                        _: 'getUserProfilePhotos',
                        user_id: object['user_id'],
                        offset: 0,
                        limit: 100
                    })
                    // ws.send(JSON.stringify(getUserProfilePhotos))
                }catch (e) {
                    console.log('~~~~error~~~~~~', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getRemoteFile':
                try {
                    let getRemoteFile = await telegram.tlList[uid].invoke({
                        _: 'getRemoteFile',
                        remote_file_id: object['remote_file_id'],
                        file_type:''
                    })
                    // ws.send(JSON.stringify(getRemoteFile))
                }catch (e) {
                    console.log('~~~~error~~~~~~', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'deleteAccount':
                try {
                    if(isEmpty(object['reason'])){object['reason'] = ''}
                    await telegram.tlList[uid].invoke({
                        _: 'deleteAccount',
                        reason: object['reason']
                    })
                    let getAuthorizationState = await telegram.tlList[uid].invoke({
                        _: 'getAuthorizationState',
                    })
                    // ws.send(JSON.stringify(getAuthorizationState))
                }catch (e) {
                    console.log('~~~~error~~~~~~', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'countryCode':
                try {
                    const getCountryCode = await telegram.tlList[uid].invoke({
                        _: 'getCountryCode'
                    })
                    // ws.send(JSON.stringify(getCountryCode))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'code':
                try {
                    await telegram.tlList[uid].invoke({
                        _: 'checkAuthenticationCode',
                        code: object['code']
                    })
                    await telegram.tlList[uid].invoke({
                        _: 'getAuthorizationState',
                    })
                    // ws.send(JSON.stringify(getAuthorizationState))
                }catch (e) {
                console.log('~~~~~~~~~~~~error request', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'bio':
                try {
                    await telegram.tlList[uid].invoke({
                        _: 'registerUser',
                        first_name: object['first_name'],
                        last_name:object['last_name']
                    })
                    let bio = {}
                    bio['_'] = 'setProfile'
                    bio['setName'] = ''
                    bio['setProfilePhoto'] = ''
                    const setName = await telegram.tlList[uid].invoke({
                        _: 'setName',
                        first_name: object['first_name'],
                        last_name: object['last_name']
                    })
                    bio['setName'] = setName
                    const setProfilePhoto = await telegram.tlList[uid].invoke({
                        _: 'setProfilePhoto',
                        photo: object['photo']
                    })
                    // console.log('~~~~~~~~~~~~3~~~~~~~~~~~')
                    bio['setProfilePhoto'] = setProfilePhoto
                    // let getAuthorizationState = await telegram.tlList[uid].invoke({
                    //     _: 'getAuthorizationState',
                    // })
                    // ws.send(JSON.stringify(getAuthorizationState))
                }catch (e) {
                    console.log('~~~~error~~~~~~', e)
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'password':
                try {
                    let getAuthorizationState = await telegram.tlList[uid].invoke({
                        _: 'getAuthorizationState',
                    })
                    switch(getAuthorizationState['_']){
                        case "authorizationStateWaitPassword":
                            let checkAuthenticationPassword = await telegram.tlList[uid].invoke({
                                _: 'checkAuthenticationPassword',
                                password: object['password']
                            })
                            break
                        case "authorizationStateReady":
                            let setPassword  = await telegram.tlList[uid].invoke({
                                _: 'setPassword',
                                old_password: '',
                                new_password:object['new_password'],
                                new_hint: '',
                                set_recovery_email_address: false,
                                new_recovery_email_address: ''
                            })
                            console.log('authorizationStateReady',setPassword)
                            break
                        default:
                            console.log('необрабатываемое событие', getAuthorizationState['_'])
                            break
                    }
                    //возможно не надо убирать
                    // getAuthorizationState = await telegram.tlList[uid].invoke({
                    //     _: 'getAuthorizationState',
                    // })
                    // ws.send(JSON.stringify(getAuthorizationState))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getSupportUser':
                try{
                    let getSupportUser = await telegram.tlList[uid].invoke({
                        _: 'getSupportUser'
                    })
                    // ws.send(JSON.stringify(getSupportUser))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getMe':
                try{
                    const getMe = await telegram.tlList[uid].invoke({
                        _: 'getMe'
                    })
                    // ws.send(JSON.stringify(getMe))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'sendMessage':
                try{
                    let sendMessage = await telegram.tlList[uid].invoke({
                        _: 'sendMessage',
                        chat_id: object['chat_id'],
                        input_message_content: {
                            _: 'inputMessageText',
                            text: {
                                _: 'formattedText',
                                text: object['text']
                            }
                        }
                    })
                    // ws.send(JSON.stringify(sendMessage))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'logOut':
                try{
                    let logOut = await telegram.tlList[uid].invoke({_: 'logOut'})
                    // ws.send(JSON.stringify(logOut))
                }catch (e) {
                    ws.send(JSON.stringify(e))
                }
                break
            case 'getChat':
                try{
                    let getChat = await telegram.tlList[uid].invoke({
                        _: 'getChat',
                        chat_id: object['chat_id']
                    })
                    // ws.send(JSON.stringify(getChat))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getChats':
                try {
                    const getChats = await telegram.tlList[uid].invoke({
                        _: 'getChats',
                        offset_order: '9223372036854775807',
                        offset_chat_id: 0,
                        limit: 10
                    })
                    // ws.send(JSON.stringify(getChats))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getChatAdministrators':
                try {
                    const getChatAdministrators  = await telegram.tlList[uid].invoke({
                        _: 'getChatAdministrators',
                        chat_id:'-1001160603435'

                    })
                    // ws.send(JSON.stringify(getChatAdministrators))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'resendPhoneNumberConfirmationCode':
                try {
                    let resendPhoneNumberConfirmationCode =  await telegram.tlList[uid].invoke({
                        _: 'resendPhoneNumberConfirmationCode'
                    })
                    // ws.send(JSON.stringify(resendPhoneNumberConfirmationCode))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'getChatMember':
                try {
                    const getChatMember  = await telegram.tlList[uid].invoke({
                        _: 'getChatMember',
                        chat_id:'-1001160603435',
                        user_id:'296690249'

                    })
                    // ws.send(JSON.stringify(getChatMember))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            case 'createPrivateChat':
                try {
                    let chat = {}
                    chat['_'] = 'PrivateChat'
                    chat['PrivateChat'] ={}
                    chat['PrivateChat']['RightPanel'] = {}
                    chat['PrivateChat']['RightPanel']['_'] = 'RightPanel'
                    await telegram.tlList[uid].invoke({
                        _: 'createPrivateChat',
                        user_id:object['user_id'],
                        force:false
                    })
                    // console.log('@#@@@@@@@@@@@@@@@@@@', createPrivateChat)
                    // chat['PrivateChat']['RightPanel']['getUserFullInfo'] = await request(object['user_id'],'getUserFullInfo',telegram.tlList[uid])
                    // chat['PrivateChat']['RightPanel']['getUser'] = await request(object['user_id'],'getUser',telegram.tlList[uid])
                    // chat['PrivateChat']['RightPanel']['getUserProfilePhotos'] = await request(object['user_id'],'getUserProfilePhotos',telegram.tlList[uid])
                    // chat['PrivateChat']['chat'] = createPrivateChat
                    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',chat)
                    // ws.send(JSON.stringify(chat))
                }catch (e) {
                    // ws.send(JSON.stringify(e))
                }
                break
            default:
                console.log('необрабатываемые запросы')
                break
        }
    });
    return true
}