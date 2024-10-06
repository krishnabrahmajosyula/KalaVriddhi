const canvasScreen=document.getElementById("model-3d");
const renderEngine=new BABYLON.Engine(canvasScreen,true);

const modelScene=function (){
    const scene=new BABYLON.Scene(renderEngine);

    const modelCamere=new BABYLON.ArcRotateCamera("Camera",Math.PI/2,Math.PI/4,35,BABYLON.Vector3.Zero(),scene);
    modelCamere.attachControl(canvasScreen,true);

    const light=new BABYLON.HemisphericLight("light",new BABYLON.Vector3(1,1,0),scene);
    BABYLON.SceneLoader.Append("./models/","simhamukha.obj",scene);
    return scene;
};

const screen=modelScene();

renderEngine.runRenderLoop(()=>{
    screen.render();
});

window.addEventListener("resize", function(){
    renderEngine.resize();
})
