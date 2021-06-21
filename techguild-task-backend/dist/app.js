"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(express_1.default.json());
let cors = require('cors');
app.use(cors());
const pgClient_1 = require("./pgClient");
pgClient_1.InitializeDB();
pgClient_1.populateData();
let rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf;
    }
};
app.use(body_parser_1.default.json({ verify: rawBodySaver }));
app.use(body_parser_1.default.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(body_parser_1.default.raw({ verify: rawBodySaver, type: '*/*' }));
app.use(cookie_parser_1.default());
/** **************************************** Check Health ********************************** **/
app.get('/health-check', (req, res, next) => {
    console.log('Here Comes Endpoint!');
    res.send('REST API APP HEALTH OK!');
});
/** *************************************** Get All Profile Detail ********************************* **/
app.get('/profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req', req.headers.token);
        let token = "kgjhadjkljklasdjkljkladsjkldasjkjkadskjbads";
        if (!req.hasOwnProperty('token') && req.headers.token != token) {
            console.log('here');
            res.send({
                success: 0,
                message: 'provide correct token',
                data: []
            });
        }
        let { rows: allData } = yield pgClient_1.rootPgPool.query(`select id,name, image_url from profile`);
        res.send({
            success: 1,
            message: 'Successfully fetched Data',
            data: allData
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}));
app.listen(`4000`, () => {
    console.log(`REST app listening at port:4000`);
});
//# sourceMappingURL=app.js.map