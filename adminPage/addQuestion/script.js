    // Get values from the view section
    const titleView = document.querySelector('.titleName').innerText;
    const questionView = document.querySelector('.questionName').innerText;
    const option1View = document.querySelector('#option1 .option-text').innerText;
    const option2View = document.querySelector('#option2 .option-text').innerText;
    const option3View = document.querySelector('#option3 .option-text').innerText;
    const option4View = document.querySelector('#option4 .option-text').innerText;

    // Set values to the edit section inputs
    document.querySelector('#titlebox').value = titleView;
    document.querySelector('#questionbox').value = questionView;
    document.querySelector('#Eoption1').value = option1View;
    document.querySelector('#Eoption2').value = option2View;
    document.querySelector('#Eoption3').value = option3View;
    document.querySelector('#Eoption4').value = option4View;

    //Adding event listener to confirm
    document.querySelector('#confirm').addEventListener('click',function(event){
        event.preventDefault();

        //Get the values from the edit section
        const updatedTitle = document.querySelector('#titlebox').value;
        const updatedQuestion = document.querySelector('#questionbox').value;
        const updatedOption1 = document.querySelector('#Eoption1').value;
        const updatedOption2 = document.querySelector('#Eoption2').value;
        const updatedOption3 = document.querySelector('#Eoption3').value;
        const updatedOption4 = document.querySelector('#Eoption4').value;

        //Update the values in the view section
        document.querySelector('.titleName').innerText = updatedTitle;
        document.querySelector('.questionName').innerText = updatedQuestion;
        document.querySelector('#option1 .option-text').innerText = updatedOption1;
        document.querySelector('#option2 .option-text').innerText = updatedOption2;
        document.querySelector('#option3 .option-text').innerText = updatedOption3;
        document.querySelector('#option4 .option-text').innerText = updatedOption4;
    });

    document.querySelector('#submit').addEventListener('click',async function(){
        //get the values
        const updatedTitle=document.querySelector('#titlebox').value;
        const updatedQuestion=document.querySelector('#questionbox').value;
        const updatedOption1=document.querySelector('#Eoption1').value;
        const updatedOption2=document.querySelector('#Eoption2').value;
        const updatedOption3=document.querySelector('#Eoption3').value;
        const updatedOption4=document.querySelector('#Eoption4').value;
        const answer=document.querySelector('#Answer').value;
        if(!answer.trim()){
            alert("Please fill the answer field");
            return;
        }
        //send the data to the server using fetch API
        const response=await fetch("https://kalavriddhi-backend-1umy.onrender.com/questions/quiz/add",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: updatedQuestion,
                option1: updatedOption1,
                option2: updatedOption2,
                option3: updatedOption3,
                option4: updatedOption4,
                answer: answer
            })
        });
        const data=await response.json();

        if(response.ok){
            alert("Succefully added the question");
            window.location.href='../questionsDisplay/index.html';
        }
        else if (response.status === 400) {
            alert("This question already exists.");
        }
        else{
            alert("Not successful");
        }
    });