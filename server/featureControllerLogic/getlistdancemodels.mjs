import danceModel from "../dbSchema/dancemovemodel.mjs";

export const showDanceModels=async (req,res)=>{
    try{
        const mudrasList=await danceModel.find();
        res.status(200).json(mudrasList);
    }catch(err){
        res.status(500).json({message:"Unable to get Modes",err});
    }
};

