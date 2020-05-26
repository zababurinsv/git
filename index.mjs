import path from "path";
let __dirname = path.dirname(process.argv[1]);
import mongo from "./docs/static/html/components/component_modules/mongo/mongoose.js"
import whitelist from './docs/static/html/components/component_modules/whitelist/whitelist.js'
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import bodyParser from 'body-parser'
import routes from './Routes/index.js'
import config from './config.mjs'
import github from "github-oauth";

let app = express();
app.use(compression())
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(cors({ credentials: true }));
app.use(queue.getMiddleware());
app.use(bodyParser.json())
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
app.use( express.static('docs'));

var githubOAuth = github({
    githubClient: config.GITHUB_KEY,
    githubSecret: config.GITHUB_SECRET,
    baseURL: 'http://localhost:' + '5122',
    loginURI: '/api/auth/github',
    callbackURI: '/api/auth/github/callback'
})

app.get("/api/auth/github", function(req, res){
    console.log("started oauth");
    return githubOAuth.login(req, res);
});

app.get("/api/auth/github/callback", function(req, res){
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


app.options('/api/storage/set/item', cors(corsOptions))
app.post('/api/storage/set/item', cors(corsOptions),async (req, res) => {
    let out = await mongo(false,'a','5',  req.body, '/storage/set/item')
    res.json(out)
})
app.options('/api/storage/delete/all', cors(corsOptions))
app.post('/api/storage/delete/all', cors(corsOptions),async (req, res) => {
    let out = await mongo(false,'dex','5',  req.body, '/storage/delete/all')
    res.json(out)
})
app.use("/api/v1", routes);

app.options('/import', cors(corsOptions))
app.get('/import', async (req, res) => {
    res.sendFile('/docs/import.html', { root: __dirname });
})

app.get('/*', async (req, res) => {
    res.sendFile('/docs/index.html', { root: __dirname });
})
app.use(queue.getErrorMiddleware())
export default app
