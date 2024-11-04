import mongoose from "mongoose";

const questionContSchema=new mongoose.Schema({
    artName:{type:String, required:true},
    Question:{type:String,required:true,unique:true},
    option1:{type:String,required:true},
    option2:{type:String,required:true},
    option3:{type:String,required:true},
    option4:{type:String,required:true},
});

const question=mongoose.model("Questions",questionContSchema);
export default question