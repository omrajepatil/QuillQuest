const express = require("express");
const path = require("path");
const blogRoutes = require("./src/server/routes/blogRoutes.js")
const User = require("./src/server/models/user.js")
const mongoose = require("mongoose")
const moment = require('moment');


const app = express();

app.set("view engine" , "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, "/public")));



app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb+srv://patilomraje590:om123@cluster0.k9s6wpe.mongodb.net/?retryWrites=true&w=majority")
.then((e)=>console.log("mongodb connected")).catch((err)=> console.log(err));

//  mongoose.connect('mongodb://localhost:27017/blog_vi');

app.use("/", blogRoutes)





app.listen(8080, ()=>{
    console.log('Server is running at http://localhost:8080');
})