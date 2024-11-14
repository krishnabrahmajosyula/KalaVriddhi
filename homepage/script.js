window.onload = function(){
    const popup = document.getElementById('instructionPopup');
    if(sessionStorage.getItem('popupShown') !== 'true'){
        popup.classList.add('show');
        sessionStorage.setItem('popupShown', 'true');
    } else {
        popup.classList.remove('show');
    }
};

function closePopup(){
    const popup = document.getElementById('instructionPopup');
    popup.classList.remove('show');
}
