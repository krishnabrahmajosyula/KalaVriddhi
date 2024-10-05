const container=document.querySelector('.container');

for(let i=0;i<16;i++){
    const gridelements=document.createElement('div');
    gridelements.classList.add('grid_items');
    gridelements.style.width=`calc(25% - 10px)`;
    gridelements.style.height=`calc(25% - 10px)`;
    gridelements.style.margin=`5px`;
    gridelements.style.borderRadius='2%';
    gridelements.style.boxSizing='border-box';

    const flipCardInner=document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const flipCardFront=document.createElement('div');
    flipCardFront.classList.add('flip-card-front');

    const flipCardBack=document.createElement('div');
    flipCardBack.classList.add('flip-card-back');

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    gridelements.appendChild(flipCardInner);

    container.appendChild(gridelements);
}

const allgridelements=document.querySelectorAll('.flip-card-inner');
allgridelements.forEach((flipcard)=>{
    flipcard.addEventListener("click",()=>{
        flipcard.classList.toggle('flipped');
    })
})