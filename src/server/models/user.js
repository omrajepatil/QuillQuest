const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({
    title:String,
    type:String,
    Posted_by:String,
    Content:String,
    date:Date,
    imageUrl: String,
    comment:String
});

const User=mongoose.model("User",userSchema);

module.exports  = User;