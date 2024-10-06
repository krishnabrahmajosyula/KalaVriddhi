
const mudras = {
    pataka: {
        title: "Pataka",
        description: "A hand gesture symbolizing a flag or stop. It is used to express firmness, heat, or denial.",
        image: "images/pataka.jpeg"
    },
    tripataka: {
        title: "Tripataka",
        description: "A hand gesture symbolizing a crown or a tree. It is often used to depict thunderbolt or arrows.",
        image: "images/tripataka.jpeg"
    },
    simhamukha: {
        title: "Simhamukha",
        description: "This mudra symbolizes  representing division, balance, or unity in duality.",
        image: "images/simhamukha.jpeg"
    },
    kartarimukha: {
        title: "Kartarimukha",
        description: "A hand gesture symbolizing scissors or separation. It often depicts opposition or sharpness.",
        image: "images/kartarimukha.jpeg"
    },
    arala: {
        title: "Arala",
        description: "A hand gesture symbolizing a bent hand or wind. It depicts flowing breeze or gentle actions.",
        image: "images/arala.jpg"
    },
    shukatunda: {
        title: "Shukatunda",
        description: "This mudra symbolizes a parrot's beak. It is used to represent a fierce or angry state.",
        image: "images/shukatunda.jpg"
    }
};
document.addEventListener("DOMContentLoaded", function() {
   

   
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close-btn");

    
    function openModal(mudra) {
        
        if (modal && modalImage && modalTitle && modalDescription) {
            modalImage.style.backgroundImage = `url(${mudras[mudra].image})`;
            modalTitle.textContent = mudras[mudra].title;
            modalDescription.textContent = mudras[mudra].description;
            modal.style.display = "flex";
        }
    }


    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

    document.querySelectorAll(".mudra").forEach(mudraCard => {
        mudraCard.addEventListener("click", function() {
            const mudraId = mudraCard.id;
            // openModal(mudraId);
            window.location.href=`mudras3D/${mudraId.toLowerCase()}.html`;
        });
    });

    window.addEventListener("click", function(event) {
        // console.log(event.target);
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

function showProgress(){
    let userProgress=0;
    Object.keys(mudras).forEach(mudra=>{
        let mudraStatus=localStorage.getItem(mudra);
        console.log(`Mudra: ${mudra}, Status: ${mudraStatus}`);
        if(mudraStatus==="done"){
            userProgress++;
        }
    });
    updateBar(userProgress);
}

function updateBar(progress){
    const total=Object.keys(mudras).length;
    const progressPercent=(progress/total)*100;
    const bar=document.querySelector(".progress-bar");
    if(bar){
        bar.style.width=`${progressPercent}%`;
    }
}

window.onload=function(){
    showProgress();
}