const canvasScreen=document.getElementById("model-3d");
const renderEngine=new BABYLON.Engine(canvasScreen,true);

async function getModelfromDB(name){
    try{
        const response=await fetch(`https://kalavriddhi-backend-1umy.onrender.com/addModel/models?name=${name}`);
        if(!response.ok){
            throw new Error("Unable to retrieve model data");
        }
        const model=await response.json();
        return model.length>0?model[0]:null;
    }catch(error){
        console.error("Error in obtaining models:",error);
    }
}
const modelScene=async function(){
    const newScene=new BABYLON.Scene(renderEngine);
    const camera=new BABYLON.ArcRotateCamera("Camera",Math.PI/2,Math.PI/4,35,BABYLON.Vector3.Zero(),newScene);
    camera.attachControl(canvasScreen,true);
    const light=new BABYLON.HemisphericLight("light",new BABYLON.Vector3(1,1,0),newScene);
    const modelName="Ardhachandra";
    const modelDataObtained=await getModelfromDB(modelName);
    if(modelDataObtained && modelDataObtained.fileData && modelDataObtained.fileType){
        const blob=new Blob([new Uint8Array(modelDataObtained.fileData.data)],{type:modelDataObtained.fileType});
        const url=URL.createObjectURL(blob);

        BABYLON.SceneLoader.Append(url,"",newScene,(newMeshes)=>{
            console.log("Model loaded:",newMeshes);
        },null,(scene,message,exception)=>{
            console.error("Failed to get the model:",message,exception);
        },".glb");
    }else{
        console.error("Model data is missing");
    }
    return newScene;
}
async function openScene(){
    const newScreen=await modelScene();
    renderEngine.runRenderLoop(()=>{
        newScreen.render();
    });
}
openScene();
window.addEventListener("resize", function(){
    renderEngine.resize();
});

let done=document.querySelector(".done-button");
done.addEventListener("click",()=>{
    const Id="ardhachandra";
    localStorage.setItem(Id,"done");
    alert(`${Id} is marked as done`);
});
