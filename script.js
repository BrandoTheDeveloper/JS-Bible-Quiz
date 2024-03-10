const questions = [
  {
    question: "What day was the sun, moon, and stars created?",
    answers: [
      {text: "Day 1", correct: false},
      {text: "Day 2", correct: false},
      {text: "Day 3", correct: true},
      {text: "Day 4", correct: false},
    ]
  },
  {
    question: "How many nights did the flood last?",
    answers: [
      {text: "40", correct: true},
      {text: "12", correct: false},
      {text: "7", correct: false},
      {text: "30", correct: false},
    ]
  },
  {
    question: "What book can you find the curses for breaking the law?",
    answers: [
      {text: "Exodus", correct: false},
      {text: "Genesis", correct: false},
      {text: "Duetronomy", correct: true},
      {text: "Numbers", correct: false},
    ]
  },
  {
    question: "How many sons did Israel have?",
    answers: [
      {text: "7", correct: false},
      {text: "18", correct: false},
      {text: "2", correct: false},
      {text: "12", correct: true},
    ]
  },
];


// variables for html elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});


startQuiz();

