const sequelado=require('sequelize')

const connection= new sequelado('todo_projectBD','root','',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=connection;