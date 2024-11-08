import mongoose from "mongoose"; 
import model from "../dbSchema/modelSchema.mjs";
import multer from "multer";

const memStorage=multer.memoryStorage();
const uploading=multer({storage:memStorage});
export const uploadSingleModel=uploading.single("modelfile");

export const uploadModel=async (req,res)=>{
    const {name,description}=req.body;
    const file=req.file;
    if(!file){
        return res.status(400).json({message:"No file Uploaded."});
    }
    try{
        const mimType=(file.mimetype=="application/octet-stream")
        ?(file.originalname.endsWith(".glb")?"model/gltf-binary":"model/gltf+json")
        :file.mimetype;
        const newModel=new model({name,description,fileData:file.buffer,fileType:mimType});
        await newModel.save();
        res.status(201).json({message:"Model uploaded successfully."});

    }catch(error){
        console.error("Unable t0 upload model:",error);
        res.status(500).json({message:"Failed to upload models:",error});
    }
};

export const getModel=async (req,res)=>{
    const modelName=req.query.name;
    try{
        const query=modelName?{name:modelName}:{};
        const models=await model.find(query);
        res.status(200).json(models);
    }catch(error){
        res.status(500).json({message:"Error in retrieving models",error:error.message});
    }
};
