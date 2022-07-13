//Getting all the required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const result_box = document.querySelector(".result_box");

const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const next_btn = quiz_box.querySelector(".next_btn");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");


//If start button is clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //Shows Info box
}

//if exit button is clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo") //Hides Info box
}

let que_count = 0;
let que_numb = 1;
let counter;
let userScore = 0;


//if continue button is clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    ShowQuestion(que_count);
    queCounter(que_numb);
    startTimer(15);
}

//if next button is clicked
next_btn.onclick = () => {
    if (que_count < questions.length -1){
        que_count++;
        que_numb++;
        ShowQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(15);
        next_btn.style.display = "none";
    } else {
        showResultBox();
    }
}

//replay quiz
restart_quiz.onclick = () => {
    location.reload();
}
   

//getting the questions from array
function ShowQuestion(index){
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div>'
                   + '<div class="option"><span>' + questions[index].options[1] +'</span></div>' 
                   + '<div class="option"><span>' + questions[index].options[2] +'</span></div>'
                   + '<div class="option"><span>' + questions[index].options[3] +'</span></div>'
    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = ' <div class="icon cross"><i class="fas fa-times"></i></div>';

//Correct answer function
function optionSelected(answer){
    clearInterval(counter); //When user selects an answer, time stops
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;

    if (userAns == correctAns){
        userScore +=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answer is incorrect, then automatically select the correct answer
        for (i = 0; i < option_list.children.length; i++){
            if (option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //Once user has selected, disable all options
    for (i = 0; i < option_list.children.length; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hides info box
    quiz_box.classList.remove("activeQuiz"); //hides quiz box
    result_box.classList.add("activeResult"); //show result box

    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3){
        let scoreTag = '<span>and congrats!, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }

    else if (userScore > 1){
        let scoreTag = '<span>and nice, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }

    else {
        let scoreTag = '<span>and sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }

    
}

//Quiz time 
function startTimer(time){
    counter = setInterval(timer, "1000");
    
    function timer(){
        timeCount.textContent = time;
        time--;

        if (time < 9){
            timeCount.textContent = "0" + timeCount.textContent;
        }

        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";

            let correctAns = questions[que_count].answer;
            for (i = 0; i < option_list.children.length; i++){
                if (option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (i = 0; i < option_list.children.length; i++){
                option_list.children[i].classList.add("disabled");
            }
            
            next_btn.style.display = "block";
        }
    }
}

//getting question counts at the bottom of page
function queCounter(index){
    const bottom_que_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>'
    
    bottom_que_counter.innerHTML = totalQuesCountTag;
}