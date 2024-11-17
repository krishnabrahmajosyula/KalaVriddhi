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
const tickingsound=new Audio('clocktick.mp3');
const last5=new Audio('last5.mp3');
const timeup=new Audio('timeup.mp3');
const nameModal=document.getElementById('nameModal');
const submitNameBtn=document.getElementById('submitNameBtn');
let userName='';
let timer=null;
let timeLeft=120;
const timeDisplay=document.getElementById('timeDisplay');

let answered=0;
let correctAnswers=0;
const totalQuestions=5;

let correctAnswersList = [];//correct answers
let selectedOptions=[null,null,null,null,null];//selected options

answeredStatus.style.fontFamily="poppins";
answeredStatus.style.fontWeight="600"
window.onload=()=>{
    nameModal.style.display='flex';
}
async function fetchRandomQuestions() {
    try {
        const response = await fetch("https://kalavriddhi-backend-1umy.onrender.com/quiz/random");
        const questions = await response.json();
        if (response.ok) {
            // Populate questions in your HTML based on the questions fetched
            questions.forEach((question, index) => {
                const questionElem = document.getElementById(`q${index + 1}`);
                questionElem.querySelector("#question").textContent = question.question;
                questionElem.querySelector("#opt1").textContent = question.option1;
                questionElem.querySelector("#opt2").textContent = question.option2;
                questionElem.querySelector("#opt3").textContent = question.option3;
                questionElem.querySelector("#opt4").textContent = question.option4;

                correctAnswersList.push(`opt${question.answer}`);
            });
        } else {
            console.error("Error fetching questions:", questions.message);
        }
    } catch (error) {
        console.error("Error fetching questions", error);
    }
}
function updateAnsweredStatus(){
    answeredStatus.textContent = `Answered: ${answered}/${totalQuestions}`;
}

function startTimer(){
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--; // Decrease the time left by 1 second
        updateTimerDisplay();
        if(timeLeft==30){
            timeDisplay.style.color="yellow";
        }
        if(timeLeft==20){
            timeDisplay.style.color="red";
            tickingsound.loop=true;
            tickingsound.play();
        }
        if(timeLeft==5){
            tickingsound.pause();
            last5.loop=true;
            last5.play();
        }
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            last5.pause();
            timeup.loop=true;
            timeup.play();
            displayResults(); // Auto-submit the quiz
        }
    }, 1000); // Update every second
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.innerText = `Time Left: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

submitNameBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('username').value.trim();
    if (nameInput) {
        userName = nameInput;
        nameModal.style.display = 'none';
        correctAnswers=5; 
        fetchRandomQuestions(); 
        startQuiz();
    } else {
        alert("Please enter your name to start the quiz.");
    }
});
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
        clearInterval(timer);
        tickingsound.pause();
        last5.pause();
        timeup.pause();
        displayResults();
    });
}
const botNames = ["Aryan", "Anvay", "Vamsi", "Raghavendra", "Srikrishna", "Akshat", "Saikrishna", "Tejas", "Srikrishna Madhusudanan","Chitraksh","Santosh","Mahesh","Rishabh","Satish","Tourist","Rupesh","Pratham","Naman","Prathik","Raghava2506"];
const leaderboardbtn=document.getElementById('leaderboard');
const leaderboardBox = document.getElementById('leaderboardbox');
function displayResults(){
    setTimeout(() => {
        timeup.pause();
    }, 3000);
    questionsBox.style.display="none";
    // Reset correctAnswers count before checking
    correctAnswers = 0;
    // Iterate over selected options and compare with correct answers
    selectedOptions.forEach((selected, index) => {
        if (selected === correctAnswersList[index]) {
            correctAnswers++;
        }
    });
    resultsBox.style.display="flex";
    scoreDisplay.textContent=(correctAnswers/totalQuestions * 100) + '%';
    scoreMessage.textContent = `You scored ${correctAnswers}/${totalQuestions}`;

    const circumference=440;
    const scorePercentage=(correctAnswers/totalQuestions)*100;
    const offset=circumference-(circumference*(scorePercentage/100));
    circle.style.strokeDashoffset= offset;

    // Clear the previous click event listener before adding a new one
    restartbtn.removeEventListener('click', restartQuiz);
    
    // Add the restart event listener
    restartbtn.addEventListener('click', restartQuiz);
    //we can add leaderboard option once it is available

    //add event listener for the leaderboard
    leaderboardbtn.addEventListener('click',displayLeaderboard);
}

function displayLeaderboard(){
    let playerScore=correctAnswers/totalQuestions*100;
    let playerRank=getRank(playerScore);
    let leaderboard=generateLeaderboard(playerScore,playerRank);

    const leaderboardList=document.getElementById('leaderboardList');
    leaderboardList.innerHTML='';

    leaderboard.forEach((entry)=>{
        const leaderboardItem=document.createElement('div');
        leaderboardItem.classList.add('leaderboard-item');
        leaderboardItem.textContent=`${entry.rank}. ${entry.name} - ${entry.score}%`;
        if (entry.type === 'player') {
            leaderboardItem.classList.add('player'); 
        } else {
            leaderboardItem.classList.add('bot');
        }
        leaderboardList.appendChild(leaderboardItem);
    });
    resultsBox.style.display = "none";
    leaderboardBox.style.display = "flex";
    restartbtn1.addEventListener('click', restartQuiz);
}
function getRank(score) {
    if (score === 100) return 1;
    if (score >= 80) return 2;
    if (score >= 60) return 4;
    if (score >= 40) return 6;
    if (score >= 20) return 8;
    return 10;
}
const restartbtn1=document.getElementById('restartbtn1');
function generateLeaderboard(playerScore,playerRank){
    const marks=[0,20,40,60,80,100];
    const shuffledBotNames = botNames.sort(() => Math.random() - 0.5).slice(0, 9);


    const bots = shuffledBotNames.map((name) => {
        let botScore = marks[Math.floor(Math.random() * marks.length)];
        return { name: name, score: botScore, type: 'bot' };
    });

    let playerName = document.getElementById('username').value;
    let player = { name: `${playerName}(You)`, score: playerScore, rank: playerRank, type: 'player' };

    
    let leaderboard = [...bots, player].sort((a, b) => b.score - a.score);
    leaderboard.forEach((entry, index) => entry.rank = index + 1);

    return leaderboard;
}
function restartQuiz() {
    resultsBox.style.display="none";
    leaderboardBox.style.display = "none";
    correctAnswersList = [];
    fetchRandomQuestions();
    startQuiz();
}
