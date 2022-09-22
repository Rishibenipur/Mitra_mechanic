const express= require('express');
const port=8080;
const path=require('path');
const hbs=require('hbs');
const app=express();
require("./db/conn");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const Register=require("./models/records");
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render('index');
});

app.get("/login",(req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
    try{
    const useremail=await Register.findOne({email:req.body.email});
    if(useremail.password===req.body.password){
        res.status(201).render("index");
    }
    else{
        res.send("Invalid login");
    }
} catch(e) {
    res.status(400).send("Invalid email");
}
})


app.get("/register",(req,res)=>{
    res.render('register');
});

//create a new user
app.post('/register',async(req,res)=>{
    try{
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;

        if(password===confirmpassword){
          const registerCustomer=new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone:req.body.phone,
            email:req.body.email,
            password:password,
            confirmpassword:confirmpassword,
          });
          const registered= await registerCustomer.save();
          res.status(201).render('index');
        }
        else{
            res.send("password not matching");
        }
    }
    catch(err){
           res.status(400).send(err);
    }
})


app.get("/about",(req,res)=>{
    res.render('about');
});






app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})