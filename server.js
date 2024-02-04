const express = require("express");
const path = require("path");
const blogRoutes = require("./src/server/routes/blogRoutes.js")

const app = express();

app.set("view engine" , "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));



app.use("/", blogRoutes)


app.listen(8080, ()=>{
    console.log('Server is running at http://localhost:8080');
})