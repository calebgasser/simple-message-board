const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const settings = require('./settings');
const app = express();

const connection = mysql.createConnection({
  host: settings.mysql.host,
  port: settings.mysql.port,
  user: settings.mysql.user,
  password: settings.mysql.password,
  database: settings.mysql.database
});
connection.connect(err => {
  if(err) throw err;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res)=>{
  res.sendFile('index.html');
})

app.get('/board', (req,res)=>{
  connection.query("SELECT * FROM messages", (err,data)=>{
    res.json(cleanData(data));
  })
});

app.post('/message', (req,res)=>{
  connection.query("INSERT INTO messages(name,message) VALUES(?,?)",[req.body.name, req.body.message],(err,data)=>{

  });
  console.log(req.body);
})

app.listen(settings.port, ()=>{
  console.log(`Listening on port ${settings.port}`);
});

function cleanData(input){
  let board = {messages: []};
  for(item in input){
    board.messages.push({name: input[item].name, message: input[item].message});
  }
  return board;
}
