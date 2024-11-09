import model from "../dbSchema/modelSchema.mjs";

export const showMudras=async (req,res)=>{
    try{
        const mudrasList=await model.find();
        res.status(200).json(mudrasList);
    }catch(err){
        res.status(500).json({message:"Unable to get Modes",err});
    }
};

export const deleteMudra=async (req,res)=>{
    try{
        const mudraId=req.params.id;
        const modelDeleted=await model.findByIdAndDelete(mudraId);
        if(!modelDeleted){
            return res.status(404).json({message:"Mudra not found to delete."});
        }
        res.status(200).json({message:"Deleted Mudra successfully"});
    }catch(err){
        console.error("Error in deleting mudra:", err);
        res.status(500).json({message:"Unable to delete mudra:",err});
    }
};