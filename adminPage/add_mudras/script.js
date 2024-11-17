

document.addEventListener("DOMContentLoaded",function (){
    document.getElementById("uploadForm").addEventListener("submit",async function (event){
        console.log("Form submitted");
        event.preventDefault();
        const modelName=document.getElementById("modelName").value;
        const modelDescription=document.getElementById("description").value;
        const modelFile=document.getElementById("modelFile").files[0];
        const category=document.getElementById("select-cat").value;
    
        if(!modelFile){
            alert("Select a file for uploading.");
            return;
        }
        const formData=new FormData();
        formData.append("name",modelName);
        formData.append("description",modelDescription);
        formData.append("modelfile",modelFile);
        formData.append("category",category);
    
        try{
            const res=await fetch("https://kalavriddhi-backend-1umy.onrender.com/addModel/uploadmodel",{
                method:"POST",
                body:formData,
            });
            if(!res.ok){
                alert("Unable to upload model. A similar model exists with this name.");
                document.getElementById("uploadForm").reset();
                throw new Error("Unable to upload model.");
            }
            const result=await res.json();
            console.log(result);
            alert(result.message);
            document.getElementById("uploadForm").reset();
        }catch(err){
            console.error("Error in uploading model:",err);
            // alert("Error uploading model.");
        }
    });
});

// const canvas=document.getElementById("modelPreview");
// const engine=new BABYLON.Engine(canvas,true);

// const runScene=function(){
//     const scene=new BABYLON.Scene(engine);

//     const camera=new BABYLON.ArcRotateCamera("Camera",Math.PI/2,Math.PI/4,35,BABYLON.Vector3.Zero(),scene);
//     camera.attachControl(canvas,true);
//     const light=new BABYLON.HemisphericLight("Light",new BABYLON.Vector3(1,1,0),scene);
//     return scene;
// };

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


const getModelAPI="https://kalavriddhi-backend-1umy.onrender.com/getmudras/getmudra";
let curr_page=1;
let maxPage_size=12;

async function retreiveMudras() {
    const loader=document.getElementById("loader");
    const cont=document.getElementById("listofModels");
    loader.style.display="block";
    cont.innerHTML="";
    try{
        console.time("API Call");
        const response=await fetch(getModelAPI,{method:"GET",headers:{'Content-Type': 'application/json'},mode:"cors"});
        console.time("API Call");
        const listOfMudras=await response.json();

        if(Array.isArray(listOfMudras) && listOfMudras.length>0){
            renderListOfMudras(listOfMudras);
        }else{
            document.getElementById("listofModels").innerHTML="<p>No Mudras are available</p>";

        }
    }catch(error){
        console.error("Error in fetching Mudras:",error);
        document.getElementById("listofModels").innerHTML="<p>Unable to load Mudras from DataBase</p>";
    }finally{
        loader.style.display="none";
    }
}

function renderListOfMudras(mudras){
    const cont=document.getElementById("listofModels");
    cont.innerHTML="";
    const fragment=document.createDocumentFragment();
    mudras.forEach(mudra => {
        const mudraCard=document.createElement("div");
        mudraCard.classList.add("mudra-element");
        mudraCard.innerHTML=`<h3>${mudra.name}
                            <button class="delete-btn" onclick="deleteMudra('${mudra._id}')">Delete</button>`;

        fragment.appendChild(mudraCard);
    });
    cont.appendChild(fragment);
}

async function deleteMudra(id){
    try{
        const response=await fetch(`https://kalavriddhi-backend-1umy.onrender.com/getmudras/deletemudra/${id}`,{
            method: "DELETE",
        });
        if(response.ok){
            alert("Mudra deleted successfully");
            retreiveMudras();
        }else{
            const errorData=await response.json();
            alert(`Error in deleting mudra:${errorData.message}`);
        }
    }catch(err){
        console.error("Error in deleting mudras:",err);
        alert("Failed to delete model.");
    }
}


const getDanceModelsAPI="https://kalavriddhi-backend-1umy.onrender.com/getdancemodels/showdancemodels";

async function retreiveDanceModels(){
    const loader=document.getElementById("loader");
    const container=document.getElementById("listofModels");
    loader.style.display="block";
    container.innerHTML="";

    try{
        console.time("dance models API called.");
        const response=await fetch(getDanceModelsAPI);
        console.timeEnd("dance models API call");
        const danceModelsList=await response.json();
        if(Array.isArray(danceModelsList) && danceModelsList.length>0){
            renderDanceModels(danceModelsList);
        }else{
            container.innerHTML="<p>No dance models available.</p>";
        }
    }catch(err){
        console.error("Error in fetchin dance models:",err);
        container.innerHTML="<p>Unable to load dance models from the database.</p>";
    }finally{
        loader.style.display="none";
    }

    function renderDanceModels(models){
        const container=document.getElementById("listofModels");
        container.innerHTML="";
        const fragment=document.createDocumentFragment();

        models.forEach(model=>{
            const modelCard=document.createElement("div");
            modelCard.classList.add("mudra-element");
            modelCard.innerHTML=`<h3>${model.name}
                            <button class="delete-btn" onclick="deleteMudra('${model._id}')">Delete</button>`;
                            fragment.appendChild(modelCard);
        });
        container.appendChild(fragment);
    }
}
window.onload=function(){
    retreiveMudras();
    // retreiveDanceModels();
}
window.deleteMudra=deleteMudra;
