const questions = [
    {
        question: "Qual o nome da besta selada dentro do Naruto?",
        answers: [
            {text: "Shukaku ", correct: "false"},
            {text: "Kurama", correct: "true"},
            {text: "Son Goku", correct: "false"},
            {text: "Utakata", correct: "false"},
        ]
    },
    {
        question: "Quemo é o pai do Naruto?",
        answers: [
            {text: "Jiraiya", correct: "false"},
            {text: "Gai", correct: "false"},
            {text: "Iruka", correct: "false"},
            {text: "Minato", correct: "true"},
        ]
    },
    {
        question: "No total há quantos hokages na obra?",
        answers: [
            {text: "5", correct: "false"},
            {text: "4", correct: "false"},
            {text: "6", correct: "false"},
            {text: "7", correct: "true"},
        ]
    },
    {
        question: "Com quem o Gaara lutou e venceu (injustamente) no primeiro torneio do anime?",
        answers: [
            {text: "Sasuke", correct: "false"},
            {text: "Naruto", correct: "false"},
            {text: "Rock Lee", correct: "true"},
            {text: "Hinata", correct: "false"},
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
                btn.style.animation = 'none'
            }else{
                btn.classList.add("false");
                // btn.style.color = 'white';
            }
        
            Array.from(btnAnswer.children).forEach(btn =>{
                if(btn.dataset.true === "true"){
                    btn.classList.add("correct");
                    btn.style.color = 'white';
                }
                btn.disabled = true;
                btn.classList.add("hidebefore");
                btn.style.hover = 'none'
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