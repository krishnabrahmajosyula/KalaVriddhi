document.addEventListener("DOMContentLoaded",function (){
    document.getElementById("uploadForm").addEventListener("submit",async function (event){
        console.log("Form submitted");
        event.preventDefault();
        const modelName=document.getElementById("modelName").value;
        const modelDescription=document.getElementById("description").value;
        const modelFile=document.getElementById("modelFile").files[0];
    
        if(!modelFile){
            alert("Select a file for uploading.");
            return;
        }
        const formData=new FormData();
        formData.append("name",modelName);
        formData.append("description",modelDescription);
        formData.append("modelfile",modelFile);
    
        try{
            const res=await fetch("http://localhost:3000/addModel/uploadmodel",{
                method:"POST",
                body:formData,
            });
            if(!res.ok){
                alert("Unable to upload model");
                throw new Error("Unable to upload model.");
            }
            const result=await res.json();
            console.log(result);
            alert(result.message);
        }catch(err){
            console.error("Error in uploading model:",err);
            alert("Error uploading model.");
        }
    });
});

const canvas=document.getElementById("modelPreview");
const engine=new BABYLON.Engine(canvas,true);

const runScene=function(){
    const scene=new BABYLON.Scene(engine);

    const camera=new BABYLON.ArcRotateCamera("Camera",Math.PI/2,Math.PI/4,35,BABYLON.Vector3.Zero(),scene);
    camera.attachControl(canvas,true);
    const light=new BABYLON.HemisphericLight("Light",new BABYLON.Vector3(1,1,0),scene);
    return scene;
};

// const modelScreen=runScene();
// engine.runRenderLoop(()=>{
//     modelScreen.render();
// });

// window.addEventListener("resize",function(){
//     engine.resize();
// });

// const fileIp=document.getElementById("modelFile");
// fileIp.addEventListener("change",function(event){
//     const file=event.target.files[0];
//     if(file){
//         const file_url=URL.createObjectURL(file);
//         modelScreen.meshes.forEach(mesh=>{
//             if (mesh.name!=="ground" && mesh.name!=="Camera" && mesh.name!=="Light") {
//                 mesh.dispose();
//             }
//         });
//         BABYLON.SceneLoader.Append("",file_url,modelScreen,function () {
//             console.log("Model loaded successfully");
//         }, function(scene, message){
//             console.error("Error loading model:",message);
//         });
//     }
// });
