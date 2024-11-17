import express from "express";
import mongoose from "mongoose";
const router = express.Router();
const featureRequestSchema=new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    rating: Number,
});
const FeatureRequest=mongoose.model("FeatureRequest",featureRequestSchema);
router.post("/",async(req, res)=>{
    const { title, description, category, rating }=req.body;
    if (!title || !description || !category || rating == null) {
        return res.status(400).send({message:"Invalid Input"});
    }
    try{
        const newFeatureRequest=new FeatureRequest({title,description,category,rating});
        await newFeatureRequest.save();
        res.status(200).send({message:"Feature Requested Successfully"});
    }catch(error){
        res.status(500).send({message:"Error saving feature request",error:error.message});
    }
});

export default router;
