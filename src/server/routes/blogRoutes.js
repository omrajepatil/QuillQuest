const express = require("express")
const router = express.Router();
const User =  require('../models/user')
const mongoose = require ( 'mongoose' ) ;
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/uploads/') // Uploads folder
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`); // Keep original filename
    },
  })
  
  const upload = multer({ storage });

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
router.get("/blog/:_id" , async(req, res)=>{
    const _id= req.params._id ;
    const post = await User.findById( _id ) 
    res.render("single.ejs", {post})
})

router.get("/user/add",(req,res)=>{
    try{
    res.render("blog_form.ejs");
    }
    catch(error){
        return res.status(500).send('Internal Server Error');
    }
});





router.get("/user/logout",async(req,res)=>{
    res.redirect("/");
});

router.get("/signin",(req,res)=>{
    res.redirect("login.ejs");
});

router.post("/comment",async(req,res)=>{
    try{
    const data=req.body;

    const saved=new User(data);
    const savedComment  = await saved.save();
    
    // res.redirect("/");
}
catch(error){
    console.log(error);
}
})

router.post('/submit', upload.single("image"), async (req, res) => {
    try {
       
        const { title, type, Posted_by, Content, date } = req.body;
       

        const newBlog = await User.create({
            title,
            type,
            Posted_by,
            Content,
            date,
            imageUrl : `/uploads/${req.file.filename}`
        });

        //  await newBlog.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

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

router.get("/edit/:id",async(req,res)=>{
    try{
    const postsId = req.params.id; 
    const post = await User.findById(postsId);
    res.render("edit_form.ejs",{postsId});
    }catch(error){
        // console.error(err);
        res.status(500).send('Internal Server Error');
    }
})



router.put('/blog/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const data  = req.body;

        // Assuming you have a BlogPost model with a findByIdAndUpdate method
        const updatedPost = await User.findByIdAndUpdate(postId, data , { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

         res.json(updatedPost);
        // res.status(200).json({
        //     data: {
        //       title: updatedPost
        //     }
        //   });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  






module.exports = router;