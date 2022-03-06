/*HOME PAGE ANIMATIONS */
anime({
    targets:".play",
    opacity:[0,1],
    duration:8000
})

anime({
    targets:".stats",
    opacity:[0,1],
    duration:8000
})

anime({
    targets:".main-image",
    opacity:[0,1],
    duration:8000
})

/*FIXED SVG */
var path = document.getElementById("Path_3");
var path2 = document.getElementById("Path_4");
var pathLength = path.getTotalLength();
var pathLength2 = path2.getTotalLength();

//array u svg su crtice i dashevi koji crtaj taj lik u svg-u
path.style.strokeDasharray = pathLength + " " + pathLength;
path2.style.strokeDasharray = pathLength2 + " " + pathLength2;
//offset  - 

if(document.documentElement.scrollTop == 0){

    path.style.strokeDashoffset = pathLength - (pathLength*0.3);
    path2.style.strokeDashoffset = pathLength2 - (pathLength2*0.3);
}else{

    path.style.strokeDashoffset = pathLength - (pathLength*((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)));
    path2.style.strokeDashoffset = pathLength2 - (pathLength2*((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)));
   
}



window.addEventListener("scroll",function(e){
    // WHAT % IS IT DOWN
    var scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
   
    if(scrollPercent < 0.3){
        scrollPercent = 0.3;
    }
    // length to offset the dashes
    var drawLength = pathLength * scrollPercent;
    var drawLength2 = pathLength2 * scrollPercent;
    
    // draw in reverse
    path.style.strokeDashoffset = pathLength - drawLength;
    path2.style.strokeDashoffset = pathLength2 - drawLength2;

})



$(document).ready(function(){
    $(".home-link  .register-link").on("click",function(e){
        if(this.hash !==""){
            e.preventDefault()
            hash = this.hash;
           
            $("html,body").animate({
                scrollTop:$(hash).offset().top
            },300,function(){
                window.location.hash = hash;
            }
            )
        }
    })
})

/*LOGIN-REGISTER */


var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash:true,
 
});


/*SEE MORE */
var seeMoreBtns = Array.from(document.getElementsByClassName("see-more-button"))
var notSlicedCategories = document.getElementById("not-sliced-categories")
seeMoreBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();

        if(btn.id == "arrow-down"){
            btn.classList.add("hidden");
            btn.nextElementSibling.classList.remove("hidden")
            notSlicedCategories.style.height = "auto"
            
        }else{
            btn.classList.add("hidden")
            btn.previousElementSibling.classList.remove("hidden")
            notSlicedCategories.style.height = "500px"
        }
    })
  
})

var x = document.getElementById("delete-message")
x.addEventListener("click",function(e){
    var message = document.querySelector(".alert-message")
    message.classList.add("hidden")
})

//TODO:stats,profile, after 6 hours of inactivity users must regenerate their token(not create another accnount)
var bars = Array.from(document.getElementsByClassName("progress-bar-inner"))

bars.forEach(bar=>{
    var percentage = bar.dataset["id"]
    bar.style.width = percentage
})
