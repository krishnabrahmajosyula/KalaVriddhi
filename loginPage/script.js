const passwordInput=document.getElementById('password');
const togglePassword=document.getElementById('togglePassword');
document.getElementById('togglePassword').addEventListener('click',()=>{
    const type=passwordInput.getAttribute('type')==='password'?'text':'password';
    passwordInput.setAttribute('type',type);
    //toggle visibility
    togglePassword.classList.toggle("fa-eye-slash");
    togglePassword.classList.toggle("fa-eye");
});

