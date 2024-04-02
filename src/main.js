const questions = [
    {
        question: "¿Cómo te llamas?",
        answers: [
            {text: "Me llamo Juan.", correct: true},
            {text: "Hola, ¿cómo estás?", correct: false},
            {text: "¿Cuántos años tienes?", correct: false},
            {text: "¿Dónde vives?", correct: false},
        ]
    },
    {
        question: "¿Cómo estás?",
        answers: [
            {text: "Estoy bien, gracias.", correct: true},
            {text: "¿Cómo te llamas?", correct: false},
            {text: "Tengo hambre.", correct: false},
            {text: "¿Cuál es tu número de teléfono?", correct: false},
        ]
    },
    {
        question: "¿Cuántos años tienes?",
        answers: [
            {text: "Tengo veinte años.", correct: true},
            {text: "Me llamo María.", correct: false},
            {text: "¿Dónde está el baño?", correct: false},
            {text: "Estoy cansado.", correct: false},
        ]
    },
    {
        question: "¿Dónde vives?",
        answers: [
            {text: "Vivo en Madrid.", correct: true},
            {text: "¿Cuál es tu comida favorita?", correct: false},
            {text: "¿Cómo se dice 'hola' en inglés?", correct: false},
            {text: "Tengo sueño.", correct: false},
        ]
    },
    {
        question: "¿Cuál es tu comida favorita?",
        answers: [
            {text: "Mi comida favorita es la pizza.", correct: true},
            {text: "¿Qué hora es?", correct: false},
            {text: "¿Cómo te llamas?", correct: false},
            {text: "¿Dónde está la estación de tren?", correct: false},
        ]
    },
    {
        question: "¿Dónde está el baño?",
        answers: [
            {text: "El baño está a la derecha.", correct: true},
            {text: "Me gusta la música.", correct: false},
            {text: "¿Cuántos hermanos tienes?", correct: false},
            {text: "¿Cuál es tu color favorito?", correct: false},
        ]
    },
    {
        question: "¿Cuál es tu color favorito?",
        answers: [
            {text: "Mi color favorito es el azul.", correct: true},
            {text: "¿Cómo estás?", correct: false},
            {text: "¿Cuántos años tienes?", correct: false},
            {text: "¿Dónde vives?", correct: false},
        ]
    },
    {
        question: "¿Qué hora es?",
        answers: [
            {text: "Son las dos en punto.", correct: true},
            {text: "¿Cuál es tu comida favorita?", correct: false},
            {text: "¿Dónde está el supermercado?", correct: false},
            {text: "¿Cuántos años tienes?", correct: false},
        ]
    },
    {
        question: "¿Cómo se dice 'hola' en inglés?",
        answers: [
            {text: "Hello", correct: true},
            {text: "¿Cómo te llamas?", correct: false},
            {text: "¿Dónde está el restaurante?", correct: false},
            {text: "¿Cuántos hermanos tienes?", correct: false},
        ]
    },
    {
        question: "¿Cuántos hermanos tienes?",
        answers: [
            {text: "Tengo un hermano.", correct: true},
            {text: "¿Dónde está el parque?", correct: false},
            {text: "¿Cómo estás?", correct: false},
            {text: "¿Cuál es tu color favorito?", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correto");
        score++;
    } else {
        selectedBtn.classList.add("incorreto");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });    
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `¡Obtuviste ${score} de ${questions.length} puntos!`;
    nextButton.innerHTML = 'Juega de nuevo';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
