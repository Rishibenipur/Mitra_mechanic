const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/registrationData').then(()=>{
    console.log("connection successsful");
}).catch((err)=>{
    console.log(err);
})

