const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Perguntas');

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErr)=>{
        console.log(msgErr);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw : true}).then(perguntas => { 
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvapergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //res.send("Formulário recebido: "+ titulo + " " + descricao);
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080, () => {console.log("App rodando!");});