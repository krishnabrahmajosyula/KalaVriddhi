//this module is used for writing the logic for particular features
//this module specifically deals with signin feature

import User from "../dbSchema/signinSchema.mjs";

async function userSignIn(req,res){
    const {name,email,username,password,artForm,isArtist,contribute}=req.body;
    try{
        const existingEmail=await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"User with this email already exists. PLease chose a different email"})
        }

        const existingUserName=await User.findOne({username});
        if(existingUserName){
            return res.status(400).json({message:"User already exists with this username. Try new one"});
        }
        const newUser=new User({name,email,username,password,artForm,isArtist,contribute});
        await newUser.save();
        res.status(201).json({message:"Registration Successfull"});
    }catch(error){
        console.error("Error in registration process",error);
        res.status(500).json({message:"Failed to register"});
    }
}
export default userSignIn