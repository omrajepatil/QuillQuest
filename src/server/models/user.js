const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({
    Title:String,
    type:String,
    Posted_by:String,
    Content:String,
    date:Date
});

const User=mongoose.model("User",userSchema);

module.exports  = User;