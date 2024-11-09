const thresholdFrequency = 1000; // Frequency threshold in Hz
const interval = 500; // Interval in ms

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // Size of the FFT for better frequency resolution

let waveSurfer;
let audioBuffer;
let sourceNode;
let frequencyInterval;
let audioPlayed = false;

document.getElementById('startButton').addEventListener('click', () => {
    const fileInput = document.getElementById('audioFile');
    if (fileInput.files.length === 0) {
        alert("Please select an audio file first.");
        return;
    }
    startAnalysis(fileInput.files[0]);
});

function startAnalysis(file) {
    // Disable the start button and change its text
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.innerText = "Analyzing...";

    const reader = new FileReader();
    reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Decode audio data and create WaveSurfer instance
        if (!audioBuffer) {
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Initialize WaveSurfer and create the waveform
            waveSurfer = WaveSurfer.create({
                container: '#waveform', // The div where the waveform will be displayed
                waveColor: 'white', // Waveform color
                progressColor: 'grey', // Color for the progress bar
                cursorColor: 'navy', // Color of the cursor
                height: 100, // Height of the waveform
                audioContext: audioContext, // Use the same AudioContext for both
                backend: 'WebAudio', 
                mute: true, // Mute the audio in WaveSurfer (no audio will be played from WaveSurfer)
                interact: false, // Disable waveform interaction
                normalize: true // Normalize the waveform to improve visibility
            });

            waveSurfer.loadBlob(file); // Load the audio file into WaveSurfer
        }

        // Create a new audio source and connect it to the analyser node
        if (sourceNode) {
            sourceNode.disconnect();
        }
        sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);

        // Start playback (muted) using WaveSurfer
        waveSurfer.play();
        
        // Play the audio from the source node (to trigger frequency analysis)
        sourceNode.start();

        // Start frequency analysis and monitor until done
        frequencyInterval = setInterval(() => analyzeFrequency(), interval);

        // Mark that audio has been played
        audioPlayed = true;
    };
    reader.readAsArrayBuffer(file);
}

function analyzeFrequency() {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);

    const dominantFrequency = getDominantFrequency(frequencyData);
    document.getElementById('frequencyDisplay').innerText = `Frequency: ${dominantFrequency} Hz`;
    document.getElementById('resetButton').addEventListener('click', () => {
        location.reload(); // Refreshes the page when clicked
    });
    
    // Trigger action if the dominant frequency crosses the threshold
    if (dominantFrequency > thresholdFrequency) {
        document.getElementById('alertDisplay').innerText = "Frequency threshold crossed!";
    } else {
        document.getElementById('alertDisplay').innerText = "";
    }

    // Check if the analysis is complete (based on file length or another condition)
    if (audioContext.currentTime >= audioBuffer.duration) {
        clearInterval(frequencyInterval); // Stop frequency analysis interval
        document.getElementById('startButton').disabled = false; // Enable the start button
        document.getElementById('startButton').innerText = "Start Analyzing"; // Reset button text
    }
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
