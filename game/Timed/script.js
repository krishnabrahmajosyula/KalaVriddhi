const container=document.querySelector('.container');

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let flippedCards=[];
const keyValuePairs=[
    {key:'Punjab',value:'Bhangra',img:'.././images/bhangra.jpg'},
    {key:'Kerala',value:'Kathakali',img:'.././images/ka.jpg'},
    {key:'Gujarat',value:'Garba',img:'.././images/ga.jpg'},
    {key:'TamilNadu',value:'Bharatnatyam',img:'.././images/bharat.jpg'},
    {key:'UttarPradesh',value:'Kathak',img:'.././images/kathak.jpg'},
    {key:'Maharashtra',value:'Lavani',img:'.././images/la.jpg'},
    {key:'AndhraPradesh',value:'Kuchipudi',img:'.././images/ku.jpg'},
    {key:'Assam',value:'Bihu',img:'.././images/bi.jpg'},
]

let allCards = keyValuePairs.flatMap(pair => [
    { type: 'image', content: pair.value, img: pair.img },
    { type: 'text', content: pair.value }
]);
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
    
    if (allCards[i].type === 'image') {
        const imgElement = document.createElement('img');
        imgElement.src = allCards[i].img;
        imgElement.alt = allCards[i].content;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.borderRadius = '2%';
        flipCardBack.appendChild(imgElement);
    } else {
        flipCardBack.textContent = allCards[i].content;
        flipCardBack.style.display = 'flex';
        flipCardBack.style.alignItems = 'center';
        flipCardBack.style.justifyContent = 'center';
    }

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    gridelements.appendChild(flipCardInner);

    container.appendChild(gridelements);

    flipCardInner.setAttribute('data-value', allCards[i].content);
}

const allgridelements=document.querySelectorAll('.flip-card-inner');
allgridelements.forEach((flipcard)=>{
    flipcard.addEventListener("click",()=>{

        if (flipcard.classList.contains('disabled') || flipcard.classList.contains('flipped')) return;
        flipcard.classList.add('flipped');
        flippedCards.push(flipcard);

        if(flippedCards.length === 2){
            const card1Value = flippedCards[0].getAttribute('data-value');
            const card2Value = flippedCards[1].getAttribute('data-value');
            
            const isMatch = card1Value === card2Value;

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