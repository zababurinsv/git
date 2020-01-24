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
app.use( express.static('public'));
app.use( express.static('static'));
app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
})
app.use(queue.getErrorMiddleware())
export default app

