const express = require("express")
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("index.ejs")
})

router.get("/blog/tech" , async(req, res)=>{
    res.render("blogs1.ejs", {content:"Technical Blogs"})
})
router.get("/blog/chronicles" , async(req, res)=>{
    res.render("blogs1.ejs", {content:"History Blogs"})
})
router.get("/blog/entertain" , async(req, res)=>{
    res.render("blogs1.ejs", {content:"Entertainment Blogs"})
})
router.get("/blog/headlines" , async(req, res)=>{
    res.render("blogs1.ejs", {content:"Current Affair Blogs"})
})
router.get("/blog/single" , async(req, res)=>{
    res.render("single.ejs", {content:"Current Affair Blogs"})
})





module.exports = router;