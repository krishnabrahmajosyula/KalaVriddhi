const passwordInput=document.getElementById('password');
const togglePassword=document.getElementById('togglePassword');
const loginForm=document.getElementById('loginForm');
const adminCheck=document.getElementById('adminCheck');
togglePassword.addEventListener('click',()=>{
    const type=passwordInput.getAttribute('type')==='password'?'text':'password';
    passwordInput.setAttribute('type',type);
    //toggle visibility
    togglePassword.classList.toggle("fa-eye-slash");
    togglePassword.classList.toggle("fa-eye");
});

loginForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(adminCheck.checked){
        console.log("Admin checkbox is checked. Redirecting to admin page...");
        if(Validate1()){
            window.location.href="../adminPage/index.html"
        }
    }
    else{
        console.log("User checkbox is checked. Redirecting to home page...");
        if(Validate()){
            window.location.href="../homepage/index.html"
        }
    }
})

function Validate(){
    //backend logic comes here
    return true;
}

function Validate1(){
    //backend logic comes here
    return true;
}