async function fetchQuestions() {
    try {
        const response = await fetch("https://kalavriddhi-backend-1umy.onrender.com/questions/display/display");

        // Check if the response status is OK (2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const questionsData = await response.json();

        // Ensure the data is an array
        if (Array.isArray(questionsData)) {
            displayQuestions(questionsData);
        } else {
            console.error("Expected an array, but received:", questionsData);
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}


window.onload = fetchQuestions;


function displayQuestions(questionsData) {
    const questionsContainer = document.getElementById('questionsList');
    questionsContainer.innerHTML = '';
    questionsData.forEach(question => {
        
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');

        
        questionItem.innerHTML = `
            <p class="question-title">${question.artName}</p>
            <p>${question.Question}</p>
        `;

        
        questionItem.addEventListener('click', () => {
            // Passing title, question, and options as query parameters
            const _id=question._id;
            const title = question.artName;
            const questionText = question.Question;
            const option1 = question.option1; 
            const option2 = question.option2; 
            const option3 = question.option3; 
            const option4 = question.option4; 
        
            window.location.href = `../VerifyQuizQuestions/index.html?_id=${_id}&title=${encodeURIComponent(title)}&question=${encodeURIComponent(questionText)}&option1=${encodeURIComponent(option1)}&option2=${encodeURIComponent(option2)}&option3=${encodeURIComponent(option3)}&option4=${encodeURIComponent(option4)}`;
        });

        
        questionsContainer.appendChild(questionItem);
    });
}