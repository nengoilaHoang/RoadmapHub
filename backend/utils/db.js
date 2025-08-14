import knex from 'knex'
export default knex({
    client:'mysql2',
    connection:{
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'',
        database:'Login'


    },
    pool:{min:0,max:7}
})
