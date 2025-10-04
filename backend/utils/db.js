import knex from 'knex'
import dotenv from "dotenv";
dotenv.config();

console.log('=== DEBUG ENV VARIABLES ===');
console.log('DB_CLIENT:', process.env.DB_CLIENT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('============================');

export default knex({
    client:process.env.DB_CLIENT,
    connection:{
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME
    },
    pool:{min:0,max:20}
})
