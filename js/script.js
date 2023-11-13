const questions = [
    {
        question: "Qual o nome da besta selada dentro do Naruto?",
        img: "./img/img0.jpg",
        answers: [
            {text: "Shukaku ", correct: "false"},
            {text: "Kurama", correct: "true"},
            {text: "Son Goku", correct: "false"},
            {text: "Utakata", correct: "false"},
        ]
    },
    {
        question: "Quem é o pai do Naruto?",
        img: "./img/img1.jpg",
        answers: [
            {text: "Jiraiya", correct: "false"},
            {text: "Gai", correct: "false"},
            {text: "Iruka", correct: "false"},
            {text: "Minato", correct: "true"},
        ]
    },
    {
        question: "No total há quantos hokages na obra?",
        img: "./img/img2.jpg",
        answers: [
            {text: "5", correct: "false"},
            {text: "4", correct: "false"},
            {text: "6", correct: "false"},
            {text: "7", correct: "true"},
        ]
    },
    {
        question: "Com quem o Gaara lutou e venceu no primeiro torneio do anime?",
        img: "./img/img3.jpg",
        answers: [
            {text: "Sasuke", correct: "false"},
            {text: "Naruto", correct: "false"},
            {text: "Rock Lee", correct: "true"},
            {text: "Hinata", correct: "false"},
        ]
    },
];

const checks = [];

const h1 = document.querySelector(".h1");
const quizElement = document.querySelector(".quiz");
const app = document.querySelector(".app");
const questionElement = document.querySelector("#question");
const btnAnswer = document.querySelector("#answer-btn");
const nextBtn = document.querySelector("#next-btn");
const imgQuiz = document.querySelector(".img-quiz");

let currentQuestionIndex = 0;
let score = 0;
let questionNo = 0;

let img = document.createElement("img");
imgQuiz.appendChild(img);

console.log(`Questions Length: ${questions.length} `);

const startIndex = () => {
    let indexRandom = Math.floor(Math.random() * questions.length);

    if(checks.includes(indexRandom) === true){
        let newNum = indexRandom;
        while(newNum === indexRandom){
            newNum = Math.floor(Math.random() * questions.length);
        }
        checks.push(newNum);
        console.log(checks);
        currentQuestionIndex = newNum;
    }else if(checks.includes(indexRandom) === false){
        checks.push(indexRandom);
        console.log(checks);
        currentQuestionIndex = indexRandom;
    }
}

clearArray = () => {
    for(let i = 0; i < checks.length; i++){
        checks.splice(i);
        console.log('A array ficou vazia');
    }
    console.log(checks);
}

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    questionNo = 0;
    nextBtn.children[0].innerHTML = 'Next';
    quizElement.classList.remove("flex");
    app.classList.remove("appPadding");
    h1.innerHTML = 'Quiz de Naruto';
    clearArray();
    showQuestion(); 
};

const showQuestion = () => {
    startIndex();
    let currentQuestion = questions[currentQuestionIndex];
    questionNo = questionNo + 1;
    img.src = `./img/img${currentQuestionIndex}.jpg`;
    questionElement.innerHTML = `${questionNo}.${currentQuestion.question}`;
    reset();
    currentQuestion.answers.forEach((e)=>{
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = e.text;
        btnAnswer.appendChild(btn);

        if(e.correct === "true"){
            btn.dataset.true = e.correct;
        }

        btn.addEventListener("click", () => {
            const isCorrect = btn.dataset.true === "true";
            if(isCorrect){
                btn.classList.add("correct");
                score++;
                btn.style.animation = 'none';
            }else{
                btn.classList.add("false");
            }
        
            Array.from(btnAnswer.children).forEach(btn =>{
                if(btn.dataset.true === "true"){
                    btn.classList.add("correct");
                    btn.style.color = 'white';
                }
                btn.disabled = true;
                btn.classList.add("hidebefore");
                btn.style.hover = 'none';
            });
            nextBtn.style.display = "block";
        });
    });
};

nextBtn.addEventListener("click", ()=>{
    if(checks.length == questions.length){
        reset();
        quizElement.classList.add("flex");
        app.classList.add("appPadding");
        questionElement.innerHTML = `Você acertou ${score}/4 das questões.`;
        if(score <=1 ){
            img.src = './img/score-baixo.jpg';
            h1.innerHTML = 'Errou feio, tente novamente!';
        }else if(score == 2){
            img.src = './img/score-metade.png';
            h1.innerHTML = 'Você acertou metade, dá pra melhorar!';
        }else if(score == 3){
            img.src = './img/score-alto.jpg';
            h1.innerHTML = 'Quase lá, o Rock Lee está animado pra te ver tentar de novo!';
        }else if(score == 4){
            img.src = './img/score-max.jpg';
            h1.innerHTML = 'Parabéns, você deixou o Naruto orgulhoso!';
        };
        const btnRestart = document.createElement("button");
        const span = document.createElement("span");
        btnRestart.setAttribute("id", "btn-restart");
        btnRestart.setAttribute("class", "next-btn");
        span.innerHTML = 'Recomeçando quiz'
        btnRestart.appendChild(span);
        btnRestart.style.display = 'block';
        quizElement.appendChild(btnRestart);

        // nextBtn.children[0].innerHTML = 'Recomeçar Quiz';
        recomecandoQuiz(btnRestart);
    }else if(checks.length < questions.length){
        showQuestion();
        console.log(checks.length);
    }
});

const recomecandoQuiz = (btn) => {
    btn.addEventListener("click", ()=>{
        btn.style.display = 'none';
        startQuiz();
    });
}

const reset = () => {
    nextBtn.style.display = 'none';
    while(btnAnswer.firstChild){
        btnAnswer.removeChild(btnAnswer.firstChild);
    };
}

startQuiz();
