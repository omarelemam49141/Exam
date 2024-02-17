let exam = [
    {
        qs: "How many Continents are there?",
        options: [3, 4, 5, 6, 7],
        rightAnswer: 6,
        checkedAnswer: ""
    },
    {
        qs: "What is 4 * 4?",
        options: [12, 16, 18, 20],
        rightAnswer: 16,
        checkedAnswer: ""
    },
    {
        qs: "Which planet is known as the 'Blue Planet'?",
        options: ["Earth", "Mars", "Pluto", "Jupitar"],
        rightAnswer: "Earth",
        checkedAnswer: ""
    },
    {
        qs: "How many sides does a triangle have?",
        options: [ 4, 5, 6, 3, 7],
        rightAnswer: 3,
        checkedAnswer: ""
    },
    {
        qs: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        rightAnswer: "Paris",
        checkedAnswer: ""
    },
    {
        qs: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        rightAnswer: "Pacific Ocean",
        checkedAnswer: ""
    },
    {
        qs: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
        rightAnswer: "San Marino",
        checkedAnswer: ""
    },
    {
        qs: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        rightAnswer: "Mount Everest",
        checkedAnswer: ""
    },
    {
        qs: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        rightAnswer: "Nile",
        checkedAnswer: ""
    },
    {
        qs: "What is the largest country in the world?",
        options: ["Russia", "Canada", "China", "United States"],
        rightAnswer: "Russia",
        checkedAnswer: ""
    }
]

let timer, nextQ = -1, counter=180;

window.addEventListener("load", function(){
    let startBtn = document.getElementById("start");
    let prevBtn = document.getElementById("previous");
    let nextBtn = document.getElementById("next");
    let submitBtn = document.getElementById("submit");

    let minSpan = this.document.querySelector(".min");
    let secSpan = this.document.querySelector(".sec");

    let body = this.document.querySelector(".body").addEventListener("click", markAnswer);

    CalcTimer(counter, secSpan, minSpan);
    startBtn.addEventListener("click", function(){
        startExam(secSpan, minSpan, this);
    })

    nextBtn.addEventListener("click", Next);
    prevBtn.addEventListener("click", Prev);
    submitBtn.addEventListener("click", finish);
})

function markAnswer(e) {
    if(e.target.nodeName == "BUTTON") {
        let allBtns = document.querySelector("ul").children;
        for (let i = 0; i < allBtns.length; i++) {
            allBtns[i].children[0].classList.add("btn-outline-primary");
            allBtns[i].children[0].classList.remove("btn-primary");
        }
        e.target.classList.add("btn-primary");
        e.target.classList.remove("btn-outline-primary");
    }

    //get the question and fill its checked answer
    exam[nextQ].checkedAnswer = e.target.innerHTML;
}

function Next(e) {
    if(nextQ == -1) {
        e.preventDefault();
    } else {
        NextQuestion();
    } 
}

function finish() {
    document.querySelector("#open-modal").click();
    document.querySelector("#confirmSubmitBtn").addEventListener("click", submitAnswers);
}

function CalcTimer(counter, secSpan, minSpan) {
    let minutes, seconds;

    minutes = Math.floor(counter / 60);
    seconds = seconds=counter%60;

    minSpan.innerHTML = minutes;
    if(seconds < 10) {
        secSpan.innerHTML = "0" + seconds;
    } else {
        secSpan.innerHTML = seconds;
    }

    if (counter <= 0) {
        submitAnswers();
        return;
    }
}

function submitAnswers() {
    if(nextQ == -1)
    {
        return;
    }
    clearInterval(timer);
    let prevBtn = document.getElementById("previous");
    let nextBtn = document.getElementById("next");
    let submitBtn = document.getElementById("submit");

    prevBtn.classList.add("disabledBtn");
    nextBtn.classList.add("disabledBtn");
    submitBtn.classList.add("disabledBtn");

    prevBtn.removeEventListener("click", Prev)
    nextBtn.removeEventListener("click", Next)
    submitBtn.removeEventListener("click", submitAnswers)

    document.querySelector(".body").innerHTML = "<p class='alert alert-success'>Your answers have been submitted<p>"
    document.querySelector(".body").innerHTML += "<h2 class='text-center'>Thank you for your time!<h2>"

    ShowResult();
}

let result = {
    rightAnswers : 0,
    wrongAnswers: 0
}

function ShowResult() {
    exam.forEach(element => {
        if(element.checkedAnswer == element.rightAnswer) {
            result.rightAnswers++;
        } else {
            result.wrongAnswers++;
        }
    });

    setTimeout(()=>{
        document.querySelector("#right-result").innerHTML = `Right answers: ` + result.rightAnswers;    
        document.querySelector("#wrong-result").innerHTML = `Wrong answers: ` + result.wrongAnswers;    
        document.querySelector("#final-result").innerHTML = `Final result: ` + result.rightAnswers + " / " + exam.length;    

        document.querySelector("#right-result").style.display = "block";   
        document.querySelector("#wrong-result").style.display = "block"; 
        document.querySelector("#final-result").style.display = "block"; 
    }, 1500)
    
}

function startExam(secSpan, minSpan, element) {
    if (nextQ != -1) {
        return;
    } 

    document.querySelector("#totalQ").innerHTML = exam.length;
    let prevBtn = document.getElementById("previous");
    let nextBtn = document.getElementById("next");
    let submitBtn = document.getElementById("submit");

    prevBtn.classList.remove("disabledBtn");
    nextBtn.classList.remove("disabledBtn");
    submitBtn.classList.remove("disabledBtn");

    NextQuestion();

    timer = setInterval(()=>{
        counter--;
        CalcTimer(counter, secSpan, minSpan);
    }, 1000)

    element.classList.add("disabledBtn");
}

function NextQuestion() {
    if (nextQ >= exam.length - 1) {
        return;
    }
    nextQ++;
    printQuestion(nextQ);
}

function Prev() {
    if (nextQ <= 0) {
        return;
    }
    nextQ--;
    printQuestion(nextQ);
}

function printQuestion(questionNumber) {
    let questionContainer = document.querySelector("h3 span");
    questionContainer.innerHTML = exam[nextQ].qs;

    let optionsList = document.querySelector(".options-list");
    optionsList.innerHTML = "";

    for (let key in exam[questionNumber].options) {
        let optionItem = document.createElement("li");
        let option = document.createElement("button");
        option.className = "btn my-2";

        option.innerHTML = exam[questionNumber].options[key];
        if(option.innerHTML == exam[nextQ].checkedAnswer) {
            option.classList.add("btn-primary");
        } else {
            option.classList.add("btn-outline-primary");
        }
        optionItem.appendChild(option);
        optionsList.appendChild(optionItem);
    }

    document.querySelector("#currentQ").innerHTML = nextQ+1;
}