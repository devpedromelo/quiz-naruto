const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answers: [
            {text: "Tubarão", correct: "false"},
            {text: "Baleia Azul", correct: "true"},
            {text: "Elefante", correct: "false"},
            {text: "Girafa", correct: "false"},
        ]
    },
    {
        question: "Qual é o menor continente do mundo?",
        answers: [
            {text: "Ásia", correct: "false"},
            {text: "Ártico", correct: "false"},
            {text: "África", correct: "false"},
            {text: "Austrália", correct: "true"},
        ]
    },
    {
        question: "Qual é o maior deserto do mundo?",
        answers: [
            {text: "Kalahari", correct: "false"},
            {text: "Gobi", correct: "false"},
            {text: "Saara", correct: "false"},
            {text: "Antártico", correct: "true"},
        ]
    },
    {
        question: "Qual é o maior animal do mundo?",
        answers: [
            {text: "Tubarão", correct: "false"},
            {text: "Baleia Azul", correct: "true"},
            {text: "Elefante", correct: "false"},
            {text: "Girafa", correct: "false"},
        ]
    },
];

const questionElement = document.querySelector("#question");
const btnAnswer = document.querySelector("#answer-btn");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion(); 
};

const showQuestion = () => {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
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
            console.log(isCorrect);
            if(isCorrect){
                btn.classList.add("correct");
                score++;
            }else{
                btn.classList.add("false");
            }
        
            Array.from(btnAnswer.children).forEach(btn =>{
                if(btn.dataset.true === "true"){
                    btn.classList.add("correct");
                }
                btn.disabled = true;
            });
            nextBtn.style.display = "block";
        });
    });
};

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            reset();
            questionElement.innerHTML = `Você acertou ${score}/4 das questões.`
        }
    }else{
        startQuiz()
    }
});

const reset = () => {
    nextBtn.style.display = 'none';
    while(btnAnswer.firstChild){
        btnAnswer.removeChild(btnAnswer.firstChild);
    };
}

startQuiz()