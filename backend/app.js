const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const {Users}= require('./db/index')
const jwtPass = "secret-key"


app.use(bodyParser.json()); 
app.use(cors());

/*
expecting {username : 'user', password : 'password'} for login
          {username : 'user', email:"email", password : 'password'} for signup
*/ 

async function middleware(req,res,next){
  const token = req.header('Authorization').split(' ')[1];
  if(!token){
    res.status(404).json({message: "user not found"});
  }
  jwt.verify(token, jwtPass, (err,decoded)=>{
    if (err){
      res.json({message: "not authorized"})
    }
    else req.user=decoded; //user found so add a new field to `req`
    next();
  })
}

app.post("/signup", async function(req, res){
   const user = await Users.create({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password
  });
  console.log(user);
  if (user){
    const token = jwt.sign({username : req.body.username, email :req.body.email} , jwtPass);
    res.json({token });
  }
  else{
    res.json({message : "server error"})
  }
})

app.post("/signin", async function(req,res){
  const user= await Users.findOne({
    username: req.body.username,
    password: req.body.password
  });
  if (user){
    const token = jwt.sign({username : user.username, email :user.email} , jwtPass);
    res.json({token });
  }
  else{
    res.status(401).json({message : "wrong credentials"})
  }
})

app.get("/users",middleware, async (req, res) => {
  const users = await Users.find({username : {$ne : req.user.username}});
  res.json(users);
})

app.get("/about", middleware, async (req, res) => {
  res.json(req.user); //{username, email}
})



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
 