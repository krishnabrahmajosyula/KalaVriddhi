function toggleVisibility(element){
    console.log*"eye clicked";
    let field=element.parentNode.querySelector("input");
    let eye=element.querySelector("i");
    if(field.type==="password"){
        field.type="text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
    }else{
        field.type="password";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    }
}