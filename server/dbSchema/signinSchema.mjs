//this modeule sets the definition for schema based on which the data is pushsed into MongoDB based in the various fields defined

import mongoose from "mongoose";

const userSignupSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    artForm:{type:String},
    isArtist:{type:Boolean},
    contribute:{type:Boolean},
});

const User=mongoose.model("signin",userSignupSchema);

export default User