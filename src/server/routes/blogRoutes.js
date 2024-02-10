const express = require("express")
const router = express.Router();
const User =  require('../models/user')

router.get("/", (req, res)=>{
    res.render("index.ejs")
})

router.get("/blog/tech" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '1' }).maxTimeMS(30000);;
    res.render("blogs.ejs", {content:"Technical Blogs",posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get("/blog/chronicles" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '2' }).maxTimeMS(30000);;
    res.render("blogs.ejs", {content:"History Blogs",posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
})
router.get("/blog/entertain" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '3' }).maxTimeMS(30000);;
    res.render("blogs.ejs", {content:"Entertainment Blogs",posts})
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})
router.get("/blog/headlines" , async(req, res)=>{
    try{
        const posts = await User.find({ type: '4' }).maxTimeMS(30000);;
    res.render("blogs.ejs", {content:"Current Affair Blogs",posts})
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
    res.redirect("/");
}
catch(error){
    console.log(error);
}
})


//   delete route

router.delete('/blog/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        const deletedPost = await User.findByIdAndDelete(_id);
        res.redirect('/');
        if (!deletedPost) {
            return res.status(404).send('Blog post not found');
        }
       
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



//  edit route

router.get('/blog/edit/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).send('Invalid post ID');
        }
        const post = await User.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('blog_form.ejs', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/blog/edit/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedContent = req.body.content;
        const updatedPost = await User.findByIdAndUpdate(postId, { content: updatedContent }, { new: true });
        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }
        res.redirect(`/blog/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;