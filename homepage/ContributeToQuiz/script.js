document.addEventListener("DOMContentLoaded",()=>{
    const contributeForm=document.getElementById("rqForm");
    contributeForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const questionData={
            artName:document.getElementById("titlebox").value,
            Question:document.getElementById("questionbox").value,
            option1:document.getElementById("option1").value,
            option2:document.getElementById("option2").value,
            option3:document.getElementById("option3").value,
            option4:document.getElementById("option4").value
        };
        try{
            const response=await fetch("http://localhost:3000/questions/contribute",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(questionData),
            });
            const res=await response.json();
            alert(res.message);
        }catch(error){
            alert("Error in submitting the question. Please try again.");
            console.error("Error in submitting:",error);
        }
    });
});