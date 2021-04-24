const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScoresList.compareDocumentPosition(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')