import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());
let cors = require('cors');
app.use(cors());

import { rootPgPool, InitializeDB, populateData  } from './pgClient';
InitializeDB();
populateData();

let rawBodySaver = function (req: any, res: any, buf: any, encoding: any) {
    if (buf && buf.length) {
      req.rawBody = buf;
   }
 }
 app.use(bodyParser.json({ verify: rawBodySaver }));
 app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
 app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

app.use(cookieParser());

/** **************************************** Check Health ********************************** **/

app.get('/health-check', (req, res, next ) => {
  console.log('Here Comes Endpoint!');
  res.send('REST API APP HEALTH OK!');
});


/** *************************************** Get All Profile Detail ********************************* **/

app.get('/profile', async ( req, res, next) => {

  try {
    console.log('req',req.headers.token);
    let token = "kgjhadjkljklasdjkljkladsjkldasjkjkadskjbads";
    if ( !req.hasOwnProperty('token') && req.headers.token != token ){ 
      console.log('here');
      res.send({ 
        success: 0,
        message: 'provide correct token',
        data: []
      });
    } 
    let { rows: allData } = await rootPgPool.query(`select id,name, image_url from profile`);
    res.send({
      success:1,
      message: 'Successfully fetched Data',
      data: allData
    });
  } catch ( err ) {
    console.log(err);
    return err;
  }
});

app.listen(`4000`, () => {
  console.log(`REST app listening at port:4000`)
});