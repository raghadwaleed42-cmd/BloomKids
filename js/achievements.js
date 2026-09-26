document.addEventListener("DOMContentLoaded",()=>{

    const cards=document.querySelectorAll(".top-card,.progress-card,.badges-card,.robot-card");

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-5px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0)";

        });

    });

});