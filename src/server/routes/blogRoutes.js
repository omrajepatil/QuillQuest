const express = require("express")
const router = express.Router();
const User =  require('../models/user')

router.get("/", (req, res)=>{
    res.render("index.ejs")
})

router.get("/blog/tech" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '1' });
    res.render("blogs.ejs", {content:"Technical Blogs",posts:posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get("/blog/chronicles" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '2' });
    res.render("blogs.ejs", {content:"History Blogs",posts:posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
})
router.get("/blog/entertain" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '3' });
    res.render("blogs.ejs", {content:"Entertainment Blogs",posts:posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})
router.get("/blog/headlines" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '4' });
    res.render("blogs.ejs", {content:"Current Affair Blogs",posts:posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
})
router.get("/blog/single" , async(req, res)=>{
    res.render("single.ejs", {content:"Current Affair Blogs"})
})

router.get("/blog/add_blog",async(req,res)=>{
    res.render("blog_form.ejs");
});

router.get("/blog/logout",async(req,res)=>{
    res.redirect("/");
});

router.get("/signin",(req,res)=>{
    res.redirect("login.ejs");
});

router.post("/submit",async(req,res)=>{
    try{
    const data=new User(req.body)
    const saved=await data.save();
    // console.log(saved);
}
catch(error){
    console.log(error);
}
})





module.exports = router;