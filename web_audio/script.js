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
                getarray();
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

            frequencyInterval = setInterval(() => analyzeFrequency(), 500);
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
function getarray(){
    let start_steps = ["s1","s2"];
    let middle_steps = ["m1","m2","m3","m4","m6","m8"];
    let end_steps = ["e1","e2"];
    function getRandomIndex(arr){
        return Math.floor(Math.random() * arr.length);
    }
    
    dance_sequence.push(start_steps[getRandomIndex(start_steps)]);
    console.log(dance_sequence);
    for( let i = 0; i < 4; i++){
        dance_sequence.push(middle_steps[getRandomIndex(middle_steps)]);
    }
    dance_sequence.push(end_steps[getRandomIndex(end_steps)]);

    console.log(dance_sequence);

}
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
