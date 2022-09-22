const mongoose=require("mongoose");


const customerSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true
    },
    lastname:{
        type:String,
        required:true,
        
    },
    
    phone:{
        type:Number,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
      
    },
    confirmpassword:{
        type:String,
        required:true,
      
    },


});

const Customer=new mongoose.model('Customer',customerSchema);

module.exports=Customer;