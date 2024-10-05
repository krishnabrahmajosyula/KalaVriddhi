const instructionsBox=document.getElementById('quizContainer');
const startBtn=document.getElementById('startbtn');
const questionsBox=document.getElementById('questionContainer');
const answeredStatus=document.getElementById('answeredStatus');
const prevbtn1=document.getElementById('prevbtn1');
const nextbtn1=document.getElementById('nextbtn1');
const prevbtn2=document.getElementById('prevbtn2');
const nextbtn2=document.getElementById('nextbtn2');
const prevbtn3=document.getElementById('prevbtn3');
const nextbtn3=document.getElementById('nextbtn3');
const prevbtn4=document.getElementById('prevbtn4');
const nextbtn4=document.getElementById('nextbtn4');
const prevbtn5=document.getElementById('prevbtn5');
const submitbtn=document.getElementById('submit');
const q1=document.getElementById('q1');
const q2=document.getElementById('q2');
const q3=document.getElementById('q3');
const q4=document.getElementById('q4');
const q5=document.getElementById('q5');
const resultsBox=document.querySelector('.circular-score-container');
const scoreDisplay=document.querySelector('.score-text');
const circle = document.querySelector('.circle'); 
const scoreMessage = document.getElementById('finalScore');  // Select "You scored X/Y" message
const nextButtons = document.getElementById('nextbtns'); 
const restartbtn=document.getElementById('restartbtn');
const leaderboard=document.getElementById('leaderboard');

let timer=null;
let timeLeft=120;
const timeDisplay=document.getElementById('timeDisplay');

let answered=0;
let correctAnswers=0;
const totalQuestions=5;

const correctAnswersList = ['opt1', 'opt2', 'opt2', 'opt2', 'opt1'];//correct answers
let selectedOptions=[null,null,null,null,null];//selected options

answeredStatus.style.fontFamily="poppins";
answeredStatus.style.fontWeight="600"
window.onload=()=>{
    startQuiz();
}

function updateAnsweredStatus(){
    answeredStatus.textContent = `Answered: ${answered}/${totalQuestions}`;
}

function startTimer(){
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--; // Decrease the time left by 1 second
        updateTimerDisplay();
        if(timeLeft==60){
            timeDisplay.style.color="yellow";
        }
        if(timeLeft==20){
            timeDisplay.style.color="red";
        }
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            displayResults(); // Auto-submit the quiz
        }
    }, 1000); // Update every second
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.innerText = `Time Left: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startQuiz(){
    answered=0;
    correctAnswers=0;
    selectedOptions=[null,null,null,null,null];
    timeLeft=120;
    timeDisplay.style.color="green";
    // clearInterval(timer);
    updateTimerDisplay();
    updateAnsweredStatus();
    
    instructionsBox.style.display="block";
    
    startBtn.addEventListener('click',()=>{
        instructionsBox.style.display="none";
        questionsBox.style.display="block";
        startTimer();
        displayQ1();
    })
}

function displayQ1(){
    q1.style.display="block";
    prevbtn1.disabled=true;

    q1.querySelectorAll('input[name="danceForm"]').forEach(input => {
        if (input.value === selectedOptions[0]) {
            input.checked = true; // Set the checked status based on stored value
        }
        console.log(selectedOptions);
        input.addEventListener('change', () => {
            if (selectedOptions[0] !== input.value) {
                if (!selectedOptions[0]) {
                    answered++; // Increment only if it was not answered before
                }
                selectedOptions[0] = input.value; // Update the selected option
            }
            
            updateAnsweredStatus();
        });
    });

    nextbtn1.addEventListener('click',()=>{
        q1.style.display="none";
        displayQ2();
    })
}

function displayQ2(){
    q2.style.display="block";
    prevbtn2.addEventListener('click',()=>{
        q2.style.display="none";
        displayQ1();
    });

    q2.querySelectorAll('input[name="danceForm"]').forEach(input => {
        if (input.value === selectedOptions[1]) {
            input.checked = true; // Set the checked status based on stored value
        }
        console.log(selectedOptions);
        input.addEventListener('change', () => {
            if (selectedOptions[1] !== input.value) {
                if (!selectedOptions[1]) {
                    answered++; // Increment only if it was not answered before
                }
                selectedOptions[1] = input.value; // Update the selected option
            }
           
            
            updateAnsweredStatus();
        });
    });
    nextbtn2.addEventListener('click',()=>{
        q2.style.display="none";
        displayQ3();
    });
}

function displayQ3(){
    q3.style.display="block";

    q3.querySelectorAll('input[name="danceForm"]').forEach(input => {
        if (input.value === selectedOptions[2]) {
            input.checked = true; // Set the checked status based on stored value
        }
        console.log(selectedOptions);
        input.addEventListener('change', () => {
            if (selectedOptions[2] !== input.value) {
                if (!selectedOptions[2]) {
                    answered++; // Increment only if it was not answered before
                }
                selectedOptions[2] = input.value; // Update the selected option
            }
            
            updateAnsweredStatus();
        });
    });
    prevbtn3.addEventListener('click',()=>{
        q3.style.display="none";
        displayQ2();
    });
    nextbtn3.addEventListener('click',()=>{
        q3.style.display="none";
        displayQ4();
    });
}

function displayQ4(){
    q4.style.display="block";

    q4.querySelectorAll('input[name="danceForm"]').forEach(input => {
        if (input.value === selectedOptions[3]) {
            input.checked = true; // Set the checked status based on stored value
        }
        console.log(selectedOptions);
        input.addEventListener('change', () => {
            if (selectedOptions[3] !== input.value) {
                if (!selectedOptions[3]) {
                    answered++; // Increment only if it was not answered before
                }
                selectedOptions[3] = input.value; // Update the selected option
            }
            
            updateAnsweredStatus();
        });
    });
    prevbtn4.addEventListener('click',()=>{
        q4.style.display="none";
        displayQ3();
    });
    nextbtn4.addEventListener('click',()=>{
        q4.style.display="none";
        displayQ5();
    });
}

function displayQ5(){
    q5.style.display="block";
    q5.querySelectorAll('input[name="danceForm"]').forEach(input => {
        if (input.value === selectedOptions[4]) {
            input.checked = true; // Set the checked status based on stored value
        }
        console.log(selectedOptions);
        input.addEventListener('change', () => {
            if (selectedOptions[4] !== input.value) {
                if (!selectedOptions[4]) {
                    answered++; // Increment only if it was not answered before
                }
                selectedOptions[4] = input.value; // Update the selected option
            }
            
            updateAnsweredStatus();
        });
    });
    prevbtn5.addEventListener('click',()=>{
        q5.style.display="none";
        displayQ4();
    });
    submitbtn.addEventListener('click',()=>{
        q5.style.display="none";
        displayResults();
    });
}

function displayResults(){
    questionsBox.style.display="none";
    // Reset correctAnswers count before checking
    correctAnswers = 0;
    console.log(selectedOptions);
    console.log(correctAnswersList);
    // Iterate over selected options and compare with correct answers
    selectedOptions.forEach((selected, index) => {
        if (selected === correctAnswersList[index]) {
            correctAnswers++;
        }
        console.log(correctAnswers);
    });
    console.log(correctAnswers);
    resultsBox.style.display="flex";
    scoreDisplay.textContent=(correctAnswers/totalQuestions * 100) + '%';
    scoreMessage.textContent = `You scored ${correctAnswers}/${totalQuestions}`;

    const circumference=440;
    const scorePercentage=(correctAnswers/totalQuestions)*100;
    const offset=circumference-(circumference*(scorePercentage/100));
    circle.style.strokeDashoffset= offset;

    restartbtn.addEventListener('click',()=>{
        resultsBox.style.display="none";
        startQuiz();
    });
    //we can add leaderboard option once it is available
}