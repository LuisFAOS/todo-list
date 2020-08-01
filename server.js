const express = require('express');
const conn = require('./database/connection')
const bodyparser = require('body-parser')
const {QueryTypes} = require('sequelize')

conn
    .authenticate()
    .then(()=>{
        console.log("Conexão com BD feita com sucesso!!")
    })
    .catch(error=>{
        console.log(`Um erro foi detectado: ${error}`)
    })

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/list', (req, res) => {
    conn.query("SELECT * FROM `lists` ORDER BY `id_list` DESC")
      .then(results=>res.send(results[0]));  
});

app.get('/addList/:list', (req,res) => {

    const data=JSON.parse(req.params.list)
    data.date=data.date.replace("*","/").replace("*","/")
    const time=data.time.hour ? `${data.time.hour}:${data.time.mins}` : ""
    conn.query(
        'INSERT INTO `lists` (`name`,`date`,`time`,`description`) VALUES (?, ?, ?, ?)',
        {
            replacements: [data.name, data.date, time, data.description],
            type: QueryTypes.INSERT
        }
    ).then(res.send("List added")).catch(console.log())
})

app.get('/removeList/:id_list',(req,res)=>{
    conn.query(
        'DELETE FROM `lists` WHERE `id_list`= ?',{
            replacements:[req.params.id_list],
            type: QueryTypes.DELETE
        }
    ).then(res.send("List removed")).catch(console.log())
})

app.listen(port, () => console.log(`Listening on port ${port}`));