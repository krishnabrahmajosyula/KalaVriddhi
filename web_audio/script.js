// Reference to input element and file display
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const fileInput = document.getElementById('audioFile');
const startButton = document.getElementById('startButton');
const display = document.getElementById('fileNameDisplay');
const resetButton = document.getElementById('resetButton');
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
let waveSurfer;
let audioBuffer;
let sourceNode;
let frequencyInterval;
let dance_sequence = [];
let start_steps = ["s1.glb","s2.glb"];
let middle_steps = ["m1.glb","m2.glb","m3.glb","m6.glb","m7.glb","m8.glb","m9.glb","m10.glb","m11.glb","m12.glb"];
let middle_steps_mirrored = ["mm1.glb","mm2.glb","mm3.glb","mm6.glb","mm7.glb","mm8.glb","mm9.glb","mm10.glb","mm11.glb","mm12.glb"];
let end_steps = ["e1.glb","e2.glb"];

// Event listener to display chosen file name
fileInput.addEventListener('change', displayFileName);

function displayFileName() {
    if (fileInput.files.length > 0) {
        display.textContent = fileInput.files[0].name;
    } else {
        display.textContent = 'No file chosen';
    }
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    if (fileInput.files.length === 0) {
        alert("Please select an audio file first.");
        return;
    }
    startAnalysis(fileInput.files[0]);
});

//code for rendering 3d models
const bigcanvas=document.getElementById("model-3d");
const renderEngine=new BABYLON.Engine(bigcanvas,true);  
const smallcanvas=[document.getElementById("s1"),document.getElementById("m1"),document.getElementById("m2"),document.getElementById("m3"),document.getElementById("m4"),document.getElementById("m5"),document.getElementById("m6"),document.getElementById("m7"),document.getElementById("m8"),document.getElementById("m9"),document.getElementById("m10"),document.getElementById("m11"),document.getElementById("m12"),document.getElementById("e1")];
let mainScene;
const makeMainScene=()=>{
    mainScene=new BABYLON.Scene(renderEngine);
    const cameraEle=new BABYLON.ArcRotateCamera("bigCamera",Math.PI/2,Math.PI/4,3.5,BABYLON.Vector3.Zero(),mainScene);
    cameraEle.attachControl(bigcanvas,true);
    const light=new BABYLON.HemisphericLight("mainlight",new BABYLON.Vector3(1,1,0),mainScene);
    return mainScene;
}

const renderSequentially=async (scene)=>{
    if (!scene){
        console.error("Scene is not defined.");
        return;
    }
    if(!scene || !scene.meshes){
        console.error("Scene or meshes are not defined.");
        return;
    }
    for(let i=0;i<dance_sequence.length;i++){
        scene.meshes.forEach(mesh=>{
            mesh.dispose();
        });
        await new Promise(resolve=>{
            BABYLON.SceneLoader.Append("./danceModels/",dance_sequence[i],scene,()=>{
                console.log(`Model:${dance_sequence[i]} loaded`);
                resolve();
            });
        });
        await new Promise(resolve=>setTimeout(resolve,2500));
    }
};

const renderOnSmallCanvas=()=>{
    smallcanvas.forEach((canvas,index)=>{
        const engineSmall=new BABYLON.Engine(canvas,true);
        const sceneSmall=new BABYLON.Scene(engineSmall);
        const cameraSmall = new BABYLON.ArcRotateCamera("smallcamera",Math.PI / 2,Math.PI / 4,3,BABYLON.Vector3.Zero(),sceneSmall);
        const light=new BABYLON.HemisphericLight("mainlight",new BABYLON.Vector3(1,1,0),sceneSmall);
        cameraSmall.attachControl(canvas, true);
        BABYLON.SceneLoader.Append("./danceModels/",dance_sequence[index],sceneSmall,()=>{
            console.log(`Model:${dance_sequence[index]}loaded`);
        });
        engineSmall.runRenderLoop(()=>{
            sceneSmall.render();
        });
    })
};

mainScene=makeMainScene();
renderEngine.runRenderLoop(()=>{
   if(mainScene){
    mainScene.render();
   }
});

window.addEventListener("resize",()=>{
    renderEngine.resize();
});
async function startAnalysis(file) {
    startButton.disabled = true;
    startButton.innerText = "Analyzing...";

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const arrayBuffer = event.target.result;
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            if (audioBuffer.duration > 32) {
                alert('The audio file must be less than 32 seconds long.');
                resetStartButton();
                return;
            }
            else{
                getSequence();
            }

            if (!waveSurfer) {
                waveSurfer = WaveSurfer.create({
                    container: '#waveform',
                    waveColor: 'white',
                    progressColor: 'grey',
                    cursorColor: 'navy',
                    height: 100,
                    audioContext: audioContext,
                    backend: 'WebAudio',
                    mute: true,
                    interact: false,
                    normalize: true
                });
            }
            waveSurfer.loadBlob(file);

            if (sourceNode) {
                sourceNode.disconnect();
            }
            sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
            waveSurfer.play();
            sourceNode.start();
            await renderSequentially(mainScene);
            renderOnSmallCanvas();



            frequencyInterval = setInterval(() => analyzeFrequency(), 500);
            sourceNode.onended=async ()=>{
                clearInterval(frequencyInterval);
                resetStartButton();
                
            };

        } catch (error) {
            console.error("Error during file analysis:", error);
            alert("An error occurred during file analysis.");
            resetStartButton();
        }
    };
    reader.readAsArrayBuffer(file);
    
}

function resetStartButton() {
    startButton.disabled = false;
    startButton.innerText = "Start Analyzing";
}

function analyzeFrequency() {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);

    const dominantFrequency = getDominantFrequency(frequencyData);
    document.getElementById('frequencyDisplay').innerText = `Frequency: ${dominantFrequency} Hz`;

    if (dominantFrequency > 1000) {
        document.getElementById('alertDisplay').innerText = "Frequency threshold crossed!";
    } else {
        document.getElementById('alertDisplay').innerText = "";
    }

    if (audioContext.currentTime >= audioBuffer.duration) {
        clearInterval(frequencyInterval);
        resetStartButton();
    }
}
function getSequence() {
    let sequence = ["s1","s2","s3"];
    let i;
    i = Math.floor(Math.random() * sequence.length);
    console.log("Sequence generated: ", sequence[i]);
    if (sequence[i] == "s1"){
        getS1();
    }
    else if (sequence[i] == "s2"){
        getS2();
    }
    if (sequence[i] == "s3"){
        getS3();
    }
}

function getRandomIndex(arr){
    return Math.floor(Math.random() * arr.length);
}

function getS1(){
    let unique_indices = [];
    let index;
    while(unique_indices.length < 4){
        index = getRandomIndex(middle_steps);
        if(!unique_indices.includes(index)){
            unique_indices.push(index);
        }
    }
    console.log(unique_indices);
    dance_sequence.push(start_steps[getRandomIndex(start_steps)]);
    for(let i = 0; i<4;i++){
    dance_sequence.push(middle_steps[unique_indices[i]]);
    dance_sequence.push(middle_steps[unique_indices[i]]);
    dance_sequence.push(middle_steps_mirrored[unique_indices[i]]);
    }
    dance_sequence.push(end_steps[getRandomIndex(end_steps)]);
    console.log(dance_sequence);
}

function getS2(){
    let unique_indices = [];
    let index;
    while(unique_indices.length < 4){
        index = getRandomIndex(middle_steps);
        if(!unique_indices.includes(index)){
            unique_indices.push(index);
        }
    }
    console.log(unique_indices);
    dance_sequence.push(start_steps[getRandomIndex(start_steps)]);
    for(let i = 0; i<4;i++){
    dance_sequence.push(middle_steps[unique_indices[i]]);
    dance_sequence.push(middle_steps_mirrored[unique_indices[i]]);
    dance_sequence.push(middle_steps[unique_indices[i]]);
    }
    dance_sequence.push(end_steps[getRandomIndex(end_steps)]);
    console.log(dance_sequence);
}

function getS3(){
    let unique_indices = [];
    let index;
    while(unique_indices.length < 4){
        index = getRandomIndex(middle_steps);
        if(!unique_indices.includes(index)){
            unique_indices.push(index);
        }
    }
    console.log(unique_indices);
    dance_sequence.push(start_steps[getRandomIndex(start_steps)]);
    for(let i = 0; i<4;i++){
    dance_sequence.push(middle_steps[unique_indices[i]]);
    dance_sequence.push(middle_steps_mirrored[unique_indices[i]]);
    dance_sequence.push(middle_steps_mirrored[unique_indices[i]]);
    }
    dance_sequence.push(end_steps[getRandomIndex(end_steps)]);
    console.log(dance_sequence);
}
// function getarray(){

//     dance_sequence.push(start_steps[getRandomIndex(start_steps)]);
//     console.log(dance_sequence);
//     for( let i = 0; i < 4; i++){
//         dance_sequence.push(middle_steps[getRandomIndex(middle_steps)]);
//     }
//     dance_sequence.push(end_steps[getRandomIndex(end_steps)]);

//     console.log(dance_sequence);

// }

function getDominantFrequency(frequencyData) {
    let maxIndex = 0;
    for (let i = 1; i < frequencyData.length; i++) {
        if (frequencyData[i] > frequencyData[maxIndex]) {
            maxIndex = i;
        }
    }
    const nyquist = audioContext.sampleRate / 2;
    const frequency = (maxIndex * nyquist) / frequencyData.length;
    return Math.round(frequency);
}

// Event listener for the reset button
resetButton.addEventListener('click', () => {
    location.reload();
});


const allCanvasElements = [bigcanvas, ...smallcanvas];
function disableScroll(event) {
    event.preventDefault();
}
allCanvasElements.forEach(canvas=>{
    canvas.addEventListener("wheel",()=>{
        window.addEventListener("wheel", disableScroll,{passive:false});
        window.addEventListener("touchmove",disableScroll,{passive:false});
    });
    canvas.addEventListener("mouseleave",()=>{
        window.removeEventListener("wheel",disableScroll);
        window.removeEventListener("touchmove",disableScroll);
    });
});
