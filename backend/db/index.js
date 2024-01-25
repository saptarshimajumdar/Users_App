const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://saptarshimajumder12345:chono54321@cluster0.6exvesw.mongodb.net/signup_app");
const userSchema = new mongoose.Schema({
    username : String,
    email: String,
    password : String
});
const Users = mongoose.model('Users',userSchema);
module.exports ={Users}

