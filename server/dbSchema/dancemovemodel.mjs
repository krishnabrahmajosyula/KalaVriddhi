import mongoose from "mongoose";

const danceModelSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String},
    fileData:{type:Buffer,required:true},
    fileType:{type:String,default:"model/gltf-binary"},
});

const danceModel=mongoose.model("danceModel",danceModelSchema);
export default danceModel;