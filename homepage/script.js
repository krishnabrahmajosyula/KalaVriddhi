const loginbtn=document.getElementById('loginbtn');
const requestFeature=document.getElementById('requestFeature');
const contributeQuestions=document.getElementById('contribute');

loginbtn.addEventListener('click',()=>{
    window.location.href="../loginPage/index.html";
})

requestFeature.addEventListener('click',()=>{
    window.location.href="./RequestFeature/rf.html";
})

contributeQuestions.addEventListener('click',()=>{
    window.location.href="./ContributeToQuiz/index.html";
})