import fs from "fs";
import path from "path";
let __dirname = path.dirname(process.argv[1]);
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import formidableMiddleware from "express-formidable";
import {promisify} from "util";
import dotenv from "dotenv"
dotenv.config()
const highWaterMark =  2;
import whitelist from './whitelist/whitelist.mjs'
import config from './config.mjs'
import github from "github-oauth";
let app = express();
app.use(compression())
app.use(cors({ credentials: true }));
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(formidableMiddleware());

var githubOAuth = github({
    githubClient: config.GITHUB_KEY,
    githubSecret: config.GITHUB_SECRET,
    baseURL: 'http://localhost:' + '5006',
    loginURI: '/auth/github',
    callbackURI: '/auth/github/callback'
})

app.get("/auth/github", function(req, res){
    console.log("started oauth");
    return githubOAuth.login(req, res);
});

app.get("/auth/github/callback", function(req, res){
    console.log("received callback");
    return githubOAuth.callback(req, res);
});
githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
    console.log('~~~~~~token~~~~~~~~~~~', token)
    serverResponse.end(JSON.stringify(token))
})

app.use( express.static('docs'));
app.use( express.static('static'));
app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
})
app.use(queue.getErrorMiddleware())
export default app

