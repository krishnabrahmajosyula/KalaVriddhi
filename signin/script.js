function toggleVisibility(element) {
    console.log("eye clicked");
    let field = element.parentNode.querySelector("input");
    let eye = element.querySelector("i");
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
document.addEventListener("DOMContentLoaded",()=>{
    const signInForm=document.getElementById("signinForm");
    signInForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const signInData={
            name:document.getElementById("name").value,
            email:document.getElementById("email").value,
            username:document.getElementById("user-name").value,
            password:document.getElementById("enter-password").value,
            reEnterPassword:document.getElementById("reverify-password").value,
            artForm:document.getElementById("art-select").value,
            isArtist:document.getElementById("isartist").checked,
            contribute:document.getElementById("contribute").checked,
        };
        if(signInData.password!=signInData.reEnterPassword){
            alert("Password entered for verification should be same as the one entered in the password");
            return;
        }
        try{
            const response=await fetch("http://localhost:3000/auth/signin",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(signInData),
            });
            const res=await response.json();
            alert(res.message);
        }catch(error){
            alert("Error in signing in. Please try again");
            console.error("Error signing up:",error);
        }
    });
});