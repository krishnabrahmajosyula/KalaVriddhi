
document.addEventListener("DOMContentLoaded", function() {
    
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
        },
        ardhachandra:{},mrigashirsha:{},katakamukha:{},sarpashirsha:{},suchi:{},chandrakala:{},
    };

   
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


    function showProgress(){
        const totalCnt=12;  //need to be changed whenever new mudras are added
        let doneCnt=0;
        for(let ele in mudras){
            if(localStorage.getItem(ele)==="done"){
                doneCnt++;
            }
        }
        const bar=document.getElementById("progress-bar");
        const progressPercent=(doneCnt/totalCnt)*100;
        bar.style.width=progressPercent+"%";
        document.getElementById("done-cnt").innerText=`Done:${doneCnt}/${totalCnt}`;
    }   

    showProgress();

    // window.addEventListener("beforeunload",function(){
    //     this.localStorage.clear();
    // });
    document.querySelector(".reset-progress").addEventListener("click",()=>{
        console.log("cleared local storage");
        localStorage.clear();
        showProgress();
    });

});
