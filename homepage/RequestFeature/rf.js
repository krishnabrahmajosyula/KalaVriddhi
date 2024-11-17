const submitbtn = document.getElementById('submit'); 
const rqform = document.getElementById('rqForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

rqform.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('titlebox').value;
    const description = document.getElementById('descriptionbox').value;
    const category = document.getElementById('category').value;
    const rating = document.getElementById('ratingPick').value;

    
    if (!title || !description || !category || rating === 'choose') {
        alert("Invalid input: All fields must be filled out.");
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

   
    if (!isNaN(title) || !isNaN(description) || !isNaN(category)) {
        alert("Invalid input: Title, Description, and Category should not contain numbers.");
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

   
    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Invalid input: Rating must be a number between 1 and 5.");
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/feature-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, category, rating: parseInt(rating) })
        });

        const data = await response.json();
        if (response.status === 200) {
           
            errorMessage.style.display = 'none';
            successMessage.style.display = 'block';
            alert("Requested a feature successfully");
            rqform.reset();
        } else {
       
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    } catch (error) {
        
        alert("There was an error submitting your request. Please try again.");
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
});
