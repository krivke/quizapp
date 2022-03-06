var fetchUrl = JSON.parse(document.getElementById("url").textContent)
var fetchUrl = fetchUrl.replace("\u0026","&")
var choices = Array.from(document.getElementsByClassName("choice-text"))
var question = document.getElementById("question")
var btns = Array.from(document.getElementsByClassName("btn-choose"))

var CORRECT_ANSWER = ""
var ACCEPTING_ANSWERS = true
var CURRENT_CATEGORY = ""
var CURRENT_QUESTION = ""

var localStorage = window.localStorage


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
//ONE LINER TO CHECK LOCALSTORAGE SIZE - za sa oko 4KB / 5MB
//var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");


function hidden_loader(length){
    var loader = document.getElementById("loader");
    loader.classList.add("hidden")
    question.classList.remove("hidden")

    for(let i=0;i<length;i++){
        btns[i].classList.remove("hidden")
    }  
}

function fetchForDatabase(category,text,correct_answer,solved){
    var url = "https://myawsomequizapp.herokuapp.com/add_question/"
    var data = {
        category:category,
        text:text,
        answer:correct_answer,
        solved:solved,
    }

    fetch(url,{
        method:"POST",
        headers:{
          
            "Content-Type":"application/json",
            "X-CSRFToken":csrftoken
        },
        body:JSON.stringify(data)
    }).then(response=>{return response.json()})
    .then(data=>{
        console.log("Success")
    })
    .catch(error=>{
        console.log("Error")
    })
}   



function fetchQuestion(url){
    fetch(url).then(response=>{
        if(!response.ok){
            throw new Error("Could not reach website!")
        }
        return response.json()}
    )
    .then((data)=>{
      
       
        var questionArray = data["results"][0]

        if(questionArray == undefined){
            var message = document.getElementById("noMoreQ")
            message.classList.remove("hidden")
            return
        }

        var answers = [...questionArray.incorrect_answers]
        //random number where correct answer will live
        var random_number =  Math.floor(Math.random()*3) + 1
        //adding correct_answer in a random place in a answers list
        answers.splice(random_number-1,0,questionArray.correct_answer)
        
        question.textContent = decodeURIComponent(questionArray.question)
        var questionCategory = decodeURIComponent(questionArray.category)
        
        CORRECT_ANSWER = decodeURIComponent(questionArray.correct_answer)
        CURRENT_CATEGORY = questionCategory
        CURRENT_QUESTION = decodeURIComponent(questionArray.question)

        for (var i=0, n=answers.length; i < n; ++i){
            btns[i].innerHTML = decodeURIComponent(answers[i])
            
        }
        //set all of them to hidden after every question so it can show only T/F  buttons
        for(let i=0;i<4;i++){
            btns[i].classList.add("hidden")
        }

        hidden_loader(answers.length);

        ACCEPTING_ANSWERS = true

    })
    .catch((error)=>{
        console.log("New Error")
    })
}



fetchQuestion(fetchUrl)


btns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        //prevent users to click all choices
        if(!ACCEPTING_ANSWERS){ return }

        var selectedChoice = e.target
        if(selectedChoice.textContent == CORRECT_ANSWER){
                var classToApply = "correct"
                fetchForDatabase(CURRENT_CATEGORY,CURRENT_QUESTION,CORRECT_ANSWER,true)
            }else{
                var classToApply = "incorrect"
                fetchForDatabase(CURRENT_CATEGORY,CURRENT_QUESTION,CORRECT_ANSWER,false)
            }
        selectedChoice.classList.add(classToApply)
        
        ACCEPTING_ANSWERS = false
          
        /*ako samo stavis setTimeout(fetchQuestions(fetchUrl),1000) - nece radit jel treba 
        izgledati ovak sa parametrima
        */
        //on every click fetch new question and hide classes to Apply when clicked
        setTimeout(()=>{
            selectedChoice.classList.remove(classToApply);
            fetchQuestion(fetchUrl);
        },1000,fetchUrl)     
    })    
})

/*PERHAPS user localStorage for completion of categories */
/*TODO: na svakih 10% dobijaju neku novu medalju koja je na njihovim profilima
        za svaku kategoriju imaju medalje
*/



