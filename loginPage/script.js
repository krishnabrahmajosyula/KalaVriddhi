const passwordInput=document.getElementById('password');
const togglePassword=document.getElementById('togglePassword');
const loginForm=document.getElementById('loginForm');
togglePassword.addEventListener('click',()=>{
    const type=passwordInput.getAttribute('type')==='password'?'text':'password';
    passwordInput.setAttribute('type',type);
    //toggle visibility
    togglePassword.classList.toggle("fa-eye-slash");
    togglePassword.classList.toggle("fa-eye");
});

loginForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(Validate()){
        window.location.href="../homepage/index.html"
    }
})

function Validate(){
    //backend logic comes here
    return true;
}
