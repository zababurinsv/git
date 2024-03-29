import path from "path";
let __dirname = path.dirname(process.argv[1]);
import mongo from "./docs/static/html/components/component_modules/mongo/mongoose.js"
import whitelist from './docs/static/html/components/component_modules/whitelist/whitelist.js'
import { createAppAuth, createOAuthAppAuth, createTokenAuth, } from '@octokit/auth'
import config from './config.mjs'
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import dotenv from "dotenv"
import compression from "compression";
import routes from './Routes/index.js'
dotenv.config()
let app = express();
app.use(express.json())


const queue = new Enqueue({
  concurrentWorkers: 4,
  maxSize: 200,
  timeout: 30000
});

app.use(cors({ credentials: true }));
app.use(queue.getMiddleware());
let corsOptions = {
  origin: function (origin, callback) {
    console.log('origin', origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/', async (req, res) => {
  try {
    const { query } = req
    console.log('sssssss', query)
    const { code, env, scopes } = query
    const { clientIds } = config.github
    const clientId = clientIds[env]
    console.log('sssssssssss', code, env, scopes)
    const clientSecret = process.env[`${env.toUpperCase()}_GITHUB_CLIENT_SECRET`]

    const auth = createOAuthAppAuth({
      clientId,
      clientSecret,
      code,
      scopes,
    })

    const tokenAuthentication = await auth({ type: "token" })
      .catch(c => null)

    res.send(tokenAuthentication || '')
  }
  catch (c) {
    console.error(c)
    res.send('')
  }
})
// app.use(compression())
/*
app.use( express.static('docs'));

var githubOAuth = github({
    githubClient: config.GITHUB_KEY,
    githubSecret: config.GITHUB_SECRET,
    baseURL: 'https://tunnel-reverse.herokuapp.com',
    loginURI: '/git/api/auth',
    callbackURI: '/git/api/auth/callback'
})

app.get("/git/api/auth", function(req, res){
    console.log("started oauth");
    return githubOAuth.login(req, res);
});

app.get("/git/api/auth/callback", function(req, res){
    console.log("received callback");
    return githubOAuth.callback(req, res);
});

githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, res) {
    console.log('~~~~~~token~~~~~~~~~~~', token)
    res.status(200).json(token)
})

app.options('/git/api/storage/set/item', cors(corsOptions))
app.post('/git/api/storage/set/item', cors(corsOptions),async (req, res) => {
    let out = await mongo(false,'a','5',  req.body, '/storage/set/item')
    res.json(out)
})

app.options('/git/api/storage/delete/all', cors(corsOptions))
app.post('/git/api/storage/delete/all', cors(corsOptions),async (req, res) => {
    let out = await mongo(false,'dex','5',  req.body, '/storage/delete/all')
    res.json(out)
})

app.use("/git/api/v1", routes);

app.options('/import', cors(corsOptions))
app.get('/import', async (req, res) => {
    res.sendFile('/docs/import.html', { root: __dirname });
})

app.get('/*', async (req, res) => {
    res.sendFile('/docs/index.html', { root: __dirname });
})
*/
app.use(queue.getErrorMiddleware())
export default app
