//require('dotenv').config({path: './.env'});
const bodyParser = require("body-parser");
const express = require("express");
require('dotenv').config();

const app = express();

//Bodyparse
app.use(bodyParser.urlencoded({extended:false}));

//parser application/json
app.use(bodyParser.json());

//initial mongoose
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;
const _user ="antonio"
const _pwd = "mVE8G72XLljdXTaT"

// const _user = process.env.USER;
// const _pwd = process.env.PWD; 
const _cluster = process.env.CLUSTER;
const _database = process.env.DATABASE; 


const _uri = `mongodb+srv://${_user}:${_pwd}@${_cluster}/${_database}?retryWrites=true&w=majority`;
 
mongoose.connect(_uri,
    {useNewUrlParser:true, useUnifiedTopology:true}
)
    .then(() => console.log("Database is conected"))
    .catch(e => console.log(e)) 

/*
* Verwendung von EJS
* Einrichtung der Routen für basis Seiten
*/
//set the view engine to ejs
app.set("view engine", "ejs");

app.set("views", __dirname + "/views");


// router use(Mittelware)- Index page
app.use(express.static(__dirname + "/public"));

// Router RouterApp
app.use("/", require("./router/RouterApp"));

//pads
app.use("/pets", require("./router/Pets"))


//router(mittelware)
app.use((req,res, next) =>{
    res.status(404).render("404",
    {title404: " page 404"}
    );
})

//port
app.listen(port, ()=> console.log("port 3000"));
