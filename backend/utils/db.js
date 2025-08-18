import knex from 'knex'
export default knex({
    client:'mysql2',
    connection:{
        host:'localhost',
        port:3306,
        user:'root',
        password:'',
        database:'roadmap'


    },
    pool:{min:0,max:7}
})
