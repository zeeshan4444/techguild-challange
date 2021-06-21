const _pg = require("pg");
import { photoData } from './data';

const rootPgPool = new _pg.Pool({
        connectionString: 'postgres://user:ajkndash@tech-db:5432/tech'
    });

let InitializeDB = async ( ) => {
    try {
        console.log('Create Schema');
        await rootPgPool.query(`
            create table if not exists profile  (
                id serial primary key,
                name text,
                description text,
                image_url text
            );
        `);
    } catch (err ) {
        console.log(err);
     }
    
}; 

let populateData = async ( ) => {
    
    try {

        let { rows: data } = await rootPgPool.query(`
         select * from profile;
        `);
        if ( data.length == 0 ) {
          for ( let elem of photoData ) {
              await rootPgPool.query(`
              insert into profile (
                name,
                image_url
              ) values (
                $1,
                $2
              )
              `,
              [
                elem.title,
                elem.img
              ]);
          }
        }

    } catch ( err ) {
        console.log(err);
    }
};

export {
    rootPgPool,
    InitializeDB,
    populateData
}
