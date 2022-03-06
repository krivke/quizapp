/*HAMBURGER - NAVBAR */
var hamburger = document.querySelector(".hamb-menu");

hamburger.addEventListener("click",(e)=>{
   anime({
        targets:".navbar-link-item",
        translateX:[-200,0],/*[FROM.TO] */
        delay: anime.stagger(80,{easing: 'easeInOutSine'})
    });
   
    e.preventDefault();
    var ul = document.getElementById("navbar-ul")

    ul.classList.toggle("hidden")
   
})

/*NAVBAR ANIMATIONS */
anime({
    targets:".logo",
  
    opacity:[0,1],
    duration:3000
    
})
anime({
    targets:"#navbar-ul",
   
    opacity:[0,1],
    duration:3000
    
})



