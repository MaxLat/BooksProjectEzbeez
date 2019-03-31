const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const morgan = require('morgan');
const router = require('./route');
const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb://Maxime:Spiderman456@ds127736.mlab.com:27736/books',  { useNewUrlParser: true });
mongoose.connection
.once('open', () => console.log("Connection good "))
.on('error' , (error) => console.log("Erreur de connexion à Mlab :" , error));


const expressServer = express();



expressServer.use(morgan('combined'));
expressServer.use(bodyParser.urlencoded({extended : false}));
expressServer.use(express.static(path.join(__dirname , '../public')));
expressServer.use(bodyParser.json({type : '*/*'}));
router(expressServer);
const port = 3000;
const server = http.createServer(expressServer);
server.listen(port);
console.log("le serveur ecoute");

