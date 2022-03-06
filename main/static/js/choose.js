/*SETTINGS */

/*global variables */
GAME_MODE  = "" //or friends
SET_DIFFICULTY = "" //
SET_CATEGORY = "" //
SET_TYPE = "" //
function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getToken('csrftoken');
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//const csrftoken = getCookie('csrftoken');

/*global initiation */
var choose_btns = document.getElementsByClassName("primary");
var progress = document.querySelector(".progress");
var primarySection = document.querySelector(".primary-section")
var secondarySection = document.querySelector(".secondary-section")

var go_back = document.querySelector(".go-back");


//Array.from(choowse_btns) jer nemoze forEach na getElementsByClassName
Array.from(choose_btns).forEach(element => {
    element.addEventListener("click",function(e){
        //until i figure out a way of playing with friends
        if(element.id=="friends"){return}
        GAME_MODE = element.id
        progress.innerText = "2/2";
        secondarySection.classList.remove("invisible-section")
        secondarySection.classList.add("visible-section")
        primarySection.classList.remove("visible-section")
        primarySection.classList.add("invisible-section")
        go_back.style.visibility = "visible";
        

    })
});


go_back.addEventListener("click",function(e){
  progress.innerText = "1/2";
    go_back.style.visibility = "hidden"
    secondarySection.classList.remove("visible-section");
    secondarySection.classList.add("invisible-section")
    primarySection.classList.add("visible-section");
    primarySection.classList.remove("invisible-section")
})

var play_btn = document.querySelector(".play-button")
play_btn.addEventListener("click",function(e){
    /*GET DIFFICULTY */
    
    var category = e.target.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.firstElementChild.childNodes
    category.forEach(e=>{
        if(e.classList.contains("is-selected")){
            SET_CATEGORY = e.dataset.id;
          
        }
    })
    /*GET CATEGORY */
    var difficulty = e.target.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.firstElementChild.childNodes
    difficulty.forEach(e=>{
        if(e.classList.contains("is-selected")){
       
            SET_DIFFICULTY = e.dataset.id;
        }
    })
    /*GET TYPE */
    var type = e.target.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.firstElementChild.childNodes
    type.forEach(e=>{
        if(e.classList.contains("is-selected")){
            SET_TYPE = e.dataset.id;
        }
    })
    
 
    window.location.href = "https://myawsomequizapp.herokuapp.com/play/" + SET_CATEGORY + "/" + SET_DIFFICULTY + "/"+SET_TYPE + "/"+ GAME_MODE + "/"
    
    
})

/*CAROUSEL SETTINGS */
var elem = document.querySelector('.main-carousel-play');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash:true,
  freeScroll: true,
wrapAround: true,
draggable: false
  
});

var elem2 = document.querySelector('.main-carousel-difficulty');
var flkty2 = new Flickity( elem2, {
  // options
  cellAlign: 'left',
  contain: true,
  hash:true,
  freeScroll: true,
    wrapAround: true,
    draggable: false
  
});

var elem3 = document.querySelector('.main-carousel-type');
var flkty3 = new Flickity( elem3, {
  // options
  cellAlign: 'left',
  contain: true,
  hash:true,
  freeScroll: true,
    wrapAround: true,
    draggable: false
  
});




