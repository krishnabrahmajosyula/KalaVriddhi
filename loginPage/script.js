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

loginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    if(adminCheck.checked){
        if(await Validate1()){
            window.location.href="../adminPage/index.html"
        }
    }
    else{
        if(await Validate()){
            window.location.href="../homepage/index.html"
        }
    }
})

async function Validate(){
    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;

    try{
        const response=await fetch("https://kalavriddhi-backend-1umy.onrender.com/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username,password})
        });

        const data=await response.json();
        if(response.ok){
            console.log(data.message);
            return true;
        }
        else{
            console.error(data.message);
            alert(data.message);
            return false;
        }
    }
    catch(error){
        console.error("Error:",error);
        alert("An error occured. Please try again.");
        return false;
    }
}

async function Validate1(){
    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    const isAdmin=true;
    try{
        const response=await fetch("https://kalavriddhi-backend-1umy.onrender.com/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({username,password,isAdmin})
        });

        const data=await response.json();
        console.log("data.isAdmin=",data.isAdmin);
        console.log("data=",data);
        if(response.ok && data.isAdmin){
            console.log("data.isAdmin=",data.isAdmin);
            console.log("Admin login successful. Redirecting to admin page....");
            return true;
        }
        else if(!data.isAdmin){
            console.log("data.isAdmin=",data.isAdmin);
            alert("Admin access required. Please check your credentials.");
            return false;
        }
        else{
            alert(data.message);
            return false;
        }
    }
    catch(error){
        console.error("Error:",error);
        alert("An error occured. Please try again");
        return false;
    }
}