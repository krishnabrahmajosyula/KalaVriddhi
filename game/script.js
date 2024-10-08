const container=document.querySelector('.container');

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let flippedCards=[];
const keyValuePairs=[
    {key:'Punjab',value:'Bhangra'},
    {key:'Kerala',value:'Kathakali'},
    {key:'Gujarat',value:'Garba'},
    {key:'TamilNadu',value:'Bharatnatyam'},
    {key:'UttarPradesh',value:'Kathak'},
    {key:'Maharashtra',value:'Lavani'},
    {key:'AndhraPradesh',value:'Kuchipudi'},
    {key:'Assam',value:'Bihu'},
]

let allCards = keyValuePairs.flatMap(pair => [pair.key, pair.value]);
shuffle(allCards);

for(let i=0;i<allCards.length;i++){
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
    flipCardBack.textContent=allCards[i];

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    gridelements.appendChild(flipCardInner);

    container.appendChild(gridelements);

    flipCardInner.setAttribute('data-value', allCards[i]);
}

const allgridelements=document.querySelectorAll('.flip-card-inner');
allgridelements.forEach((flipcard)=>{
    flipcard.addEventListener("click",()=>{

        if (flipcard.classList.contains('disabled') || flipcard.classList.contains('flipped')) return;
        flipcard.classList.add('flipped');
        flippedCards.push(flipcard);

        if(flippedCards.length === 2){
            const card1 = flippedCards[0].getAttribute('data-value');
            const card2 = flippedCards[1].getAttribute('data-value');
            
            const isMatch = keyValuePairs.some(pair =>
                (pair.key === card1 && pair.value === card2) ||
                (pair.key === card2 && pair.value === card1)
            );

            allgridelements.forEach((card) => card.style.pointerEvents = 'none');

            setTimeout(() => {
                if (isMatch) {
                    flippedCards[0].classList.add('disabled');
                    flippedCards[1].classList.add('disabled');
                } else {
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                }
                flippedCards = [];
                allgridelements.forEach((card) => card.style.pointerEvents = 'auto');
            }, 600);
        }
    })
})

const reset=document.querySelector('#reset');
reset.addEventListener("click",()=>{
    window.location.reload();
})