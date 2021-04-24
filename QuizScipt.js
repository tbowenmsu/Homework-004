const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let secondsLeft = 10
let timer = document.getElementById("timer");

let questions = [
    {
        question: 'Commonly used data types DO NOT include?',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'Alerts',
        choice4: 'Numbers',
        answer: 3,
    },
    {
        question: 'The condition in an If/Else statement is enclosed within ____.',
        choice1: 'Quotes',
        choice2: 'Curly Brackets',
        choice3: 'Parenthesis',
        choice4: 'Square Brackets',
        answer: 3,
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        choice1: 'Numbers & Strings',
        choice2: 'Other Arrays',
        choice3: 'Booleans',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        choice1: 'Commas',
        choice2: 'Curly Brackets',
        choice3: 'Quotes',
        choice4: 'Parenthesis',
        answer: 4,
    },
    {
        question: 'A very useful tool during development and debugging for printing content to the debugger is?',
        choice1: 'JavaScript',
        choice2: 'Terminal/Bash',
        choice3: 'For Loops',
        choice4: 'Console Log',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startTimer ()
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})

function startTimer() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "";
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0 ||questionCounter === questions.length) {
            clearInterval(timerInterval);
            localStorage.setItem('mostRecentScore', score);

            return window.location.assign('end.html')
        }
    },1000)
}


incrementScore = num => {
   score +=num
   scoreText.innerText = score
}

startQuiz()