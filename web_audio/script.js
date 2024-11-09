const thresholdFrequency = 1000; // Frequency threshold in Hz
const interval = 500; // Interval in ms

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // Size of the FFT for better frequency resolution

document.getElementById('startButton').addEventListener('click', () => {
    const fileInput = document.getElementById('audioFile');
    if (fileInput.files.length === 0) {
        alert("Please select an audio file first.");
        return;
    }
    const file = fileInput.files[0];
    processAudioFile(file);
});

function processAudioFile(file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        source.start();

        setInterval(() => analyzeFrequency(), interval);
    };
    reader.readAsArrayBuffer(file);
}

function analyzeFrequency() {
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);

    const dominantFrequency = getDominantFrequency(frequencyData);
    document.getElementById('frequencyDisplay').innerText = `Frequency: ${dominantFrequency} Hz`;

    // Trigger action if the dominant frequency crosses the threshold
    if (dominantFrequency > thresholdFrequency) {
        document.getElementById('alertDisplay').innerText = "Frequency threshold crossed!";
    } else {
        document.getElementById('alertDisplay').innerText = "";
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
