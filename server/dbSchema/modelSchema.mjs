import mongoose from "mongoose";

const modelSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String},
    fileData:{type:Buffer,required:true},
    fileType:{type:String,default:"model/gltf-binary"},
});

const model=mongoose.model("model",modelSchema);
export default model