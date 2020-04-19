const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cricksta',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
	console.log("Connected to db ");
});

mongoose.connection.on('error',(err)=>{
	console.log("Error connecting to db"+err);
});

const app = express();

const players = require('./routes/players');
const teams = require('./routes/teams');

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/players',players);
app.use('/teams',teams);

app.get('/',(req,res)=>{
	res.send('Invalid Endpoint');
});

app.listen(port,()=>{
	console.log('Server started on port '+port);
});
	