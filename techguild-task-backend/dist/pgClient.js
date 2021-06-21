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
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateData = exports.InitializeDB = exports.rootPgPool = void 0;
const _pg = require("pg");
const data_1 = require("./data");
const rootPgPool = new _pg.Pool({
    connectionString: 'postgres://user:ajkndash@tech-db:5432/tech'
});
exports.rootPgPool = rootPgPool;
let InitializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Create Schema');
        yield rootPgPool.query(`
            create table if not exists profile  (
                id serial primary key,
                name text,
                description text,
                image_url text
            );
        `);
    }
    catch (err) {
        console.log(err);
    }
});
exports.InitializeDB = InitializeDB;
let populateData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { rows: data } = yield rootPgPool.query(`
         select * from profile;
        `);
        if (data.length == 0) {
            for (let elem of data_1.photoData) {
                yield rootPgPool.query(`
              insert into profile (
                name,
                image_url
              ) values (
                $1,
                $2
              )
              `, [
                    elem.title,
                    elem.img
                ]);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.populateData = populateData;
//# sourceMappingURL=pgClient.js.map