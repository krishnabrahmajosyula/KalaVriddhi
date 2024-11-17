    // Get values from the view section
    const urlParams = new URLSearchParams(window.location.search);
    const _id=urlParams.get('_id');
    const title = decodeURIComponent(urlParams.get('title'));
    const question = decodeURIComponent(urlParams.get('question'));
    const questionBuff=decodeURIComponent(urlParams.get('question'));
    const option1 = decodeURIComponent(urlParams.get('option1'));
    const option2 = decodeURIComponent(urlParams.get('option2'));
    const option3 = decodeURIComponent(urlParams.get('option3'));
    const option4 = decodeURIComponent(urlParams.get('option4'));

    // Set values to the edit section inputs
    document.querySelector('#titlebox').value = title;
    document.querySelector('#questionbox').value = question;
    document.querySelector('#Eoption1').value = option1;
    document.querySelector('#Eoption2').value = option2;
    document.querySelector('#Eoption3').value = option3;
    document.querySelector('#Eoption4').value = option4;

    //Set values in the view section
    document.querySelector('.titleName').innerText = title;
document.querySelector('.questionName').innerText = question;
document.querySelector('#option1 .option-text').innerText = option1;
document.querySelector('#option2 .option-text').innerText = option2;
document.querySelector('#option3 .option-text').innerText = option3;
document.querySelector('#option4 .option-text').innerText = option4;

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
        const answer = document.querySelector('#Answer').value;
        if (!answer) {
            alert("Please fill in the answer field before submitting.");
            return; // Stop the form submission if answer is empty
        }
        const questionData={
            questionB: questionBuff,
            artName: document.querySelector('#titlebox').value,
            question: document.querySelector('#questionbox').value,
            option1: document.querySelector('#Eoption1').value,
            option2: document.querySelector('#Eoption2').value,
            option3: document.querySelector('#Eoption3').value,
            option4: document.querySelector('#Eoption4').value,
            answer: answer,
            isApproved: document.querySelector('#approve input').checked
        };
        console.log("Sending question data:", questionData);
        try{
            const response=await fetch('https://kalavriddhi-backend-1umy.onrender.com/questions/verify/verify',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionData)
            });
            const result=await response.json();
            if(response.ok){
                alert(result.message);
                window.location.href='../questionsDisplay/index.html';
            }
            else {
                alert(result.error || "Failed to process the question.");
            }
        }
        catch (error) {
            console.error("Error submitting verification:", error);
            alert("An error occurred. Please try again.");
        }
    });