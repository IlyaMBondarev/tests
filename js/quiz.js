//необязательный файл, нигде не используется. нужен программисту, чтобы пропустить шкалу и экспериментировать с вопросами. для этого нужно изменить в html подключение html на этот файл


let score = document.querySelector('.score');
score.textContent = '0';


let typeOfAnswer = "";
let isHelperUsed = false;

let quiz = document.querySelector('.quiz');
let helpers = document.querySelector('.helpers');
let quizQuestion = quiz.querySelector('.quiz__question');
let quizImage = quiz.querySelector('.quiz__image');
let quizTable = quiz.querySelector('.quiz__table');
let quizTableLeft = quizTable.querySelectorAll('td')[0];
let quizTableRight = quizTable.querySelectorAll('td')[1];
let quizAnswer = quiz.querySelector('.quiz__answer-block');
let quizRightAnswer = quiz.querySelector('.quiz__right-answer-block');
let quizSubmit = quiz.querySelector('.quiz__submit');
let quizNext = quiz.querySelector('.quiz__next');

let quizAnswerTextBlock = quizAnswer.querySelector('.quiz__answer');
let quizAnswerText = quizAnswer.querySelector('.quiz__answer-text');
let quizAnswerTableHorizontal = quizAnswer.querySelector('.quiz__answer-table-horizontal');
let quizAnswerTableVertical = quizAnswer.querySelector('.quiz__answer-table-vertical');
let quizAnswerTextareaBlock = quizAnswer.querySelector('.quiz__answer-big');
let quizAnswerTextarea = quizAnswer.querySelector('.quiz__answer-textarea');

let quizRightAnswerTextBlock = quizRightAnswer.querySelector('.quiz__right-answer');
let quizRightAnswerText = quizRightAnswer.querySelector('.quiz__right-answer-text');
let quizRightAnswerTableHorizontal = quizRightAnswer.querySelector('.quiz__right-answer-table-horizontal');
let quizRightAnswerTableVertical = quizRightAnswer.querySelector('.quiz__right-answer-table-vertical');

function question(question) {

    let questionText = "";
    question.question.forEach(paragraph => {
        questionText += "<p>" + paragraph + "</p>";
    })
    quizQuestion.innerHTML = questionText;

    quizImage.src = question.imageSrc;

    if (question.table) {
        let quizTableText = "";
        question.tableLeft.forEach(paragraph => {
            quizTableText += "<p>" + paragraph + "</p>";
        })
        quizTableLeft.innerHTML = quizTableText;
        quizTableText = "";
        question.tableRight.forEach(paragraph => {
            quizTableText += "<p>" + paragraph + "</p>";
        })
        quizTableRight.innerHTML = quizTableText;
        quizTable.style.display = "flex";
    }

    if (question.typeOfAnswer === "text") {
        quizAnswerTextBlock.style.display = "flex";
        quizRightAnswerTextBlock.style.display = "flex";
        typeOfAnswer = question.typeOfAnswer;

    } else if (question.typeOfAnswer === "table-horizontal") {
        quizAnswerTableHorizontal.style.display = "block";
        quizRightAnswerTableHorizontal.style.display = "block";
        let alphabet = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ";
        let tableTr = "<p>Ваш ответ:</p><table><tr>";
        let tableInner = "";
        for (let i = 0; i < question.columns; i++) {
            tableTr += "<td>" + alphabet[i] + "</td>";
        }
        tableTr += "</tr>";
        tableInner += tableTr;
        tableTr = "<tr>";
        for (let i = 0; i < question.columns; i++) {
            tableTr += "<td>" + "<input type=\"text\" class=\"quiz__answer-number\">" + "</td>";
        }
        tableTr += "</tr></table>";
        tableInner += tableTr;
        quizAnswerTableHorizontal.innerHTML = tableInner;
        tableTr = "<p>Правильный ответ:</p><table><tr>";
        tableInner = "";
        for (let i = 0; i < question.columns; i++) {
            tableTr += "<td>" + alphabet[i] + "</td>";
        }
        tableTr += "</tr>";
        tableInner += tableTr;
        tableTr = "<tr>";
        for (let i = 0; i < question.columns; i++) {
            tableTr += "<td>" + "<span>" + question.answer[i] + "</span>" + "</td>";
        }
        tableTr += "</tr></table>";
        tableInner += tableTr;
        quizRightAnswerTableHorizontal.innerHTML = tableInner;
        typeOfAnswer = question.typeOfAnswer;
    } else if (question.typeOfAnswer === "table-vertical") {
        quizAnswerTableVertical.style.display = "block";
        quizRightAnswerTableVertical.style.display = "block";
        let alphabet = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ";
        let tableInner = "<p>Ваш ответ:</p><table><tr><td>" + question.nameOfLeftColumn + "</td><td>" + question.nameOfRightColumn + "</td></tr>";
        for (let i = 0; i < question.rows; i++) {
            tableInner += "<tr><td>" + alphabet[i] + "</td><td><input type=\"number\" class=\"quiz__answer-number\"></td></tr>";
        }
        tableInner += "</table>";
        quizAnswerTableVertical.innerHTML = tableInner;
        tableInner = "<p>Правильный ответ:</p><table><tr><td>" + question.nameOfLeftColumn + "</td><td>" + question.nameOfRightColumn + "</td></tr>";
        for (let i = 0; i < question.rows; i++) {
            tableInner += "<tr><td>" + alphabet[i] + "</td><td><span>" + question.answer[i] + "</span></td></tr>";
        }
        tableInner += "</table>";
        quizRightAnswerTableVertical.innerHTML = tableInner;
        typeOfAnswer = question.typeOfAnswer;
    } else if (question.typeOfAnswer === "textarea") {
        quizAnswerTextareaBlock.style.display = "flex";
        typeOfAnswer = question.typeOfAnswer;
    } else {
        console.error('Тип вопроса неправильный');
    }

    if (question.countHelpers) {
        let helpersInner = "";
        for (let i = 0; i < question.countHelpers; i++) {
            helpersInner += "<button class=\"helper-btn\">Советник <span>" + (i + 1) + "</span></button>";
        }
        helpers.innerHTML = helpersInner;
        for (let i = 0; i < question.countHelpers; i++) {
            let helperBtns = helpers.querySelectorAll('button');
            helperBtns[i].addEventListener('click', () => {
                alert(`${question.helpers[i]}`);
                isHelperUsed = true;
            })
        }
    }

    quiz.style.display = "block";
    helpers.style.display = "block";
    quizQuestion.style.display = "block";
    quizAnswer.style.display = "block";
    quizSubmit.style.display = "block";
}


quizSubmit.addEventListener('click', () => {
    quizRightAnswer.style.display = "block";
    quizSubmit.style.display = "none";
    if (typeOfAnswer === "text") {
        if (quizAnswerText.value.toLowerCase() === quizRightAnswerText.textContent.toLowerCase()) {
            if (!isHelperUsed) {
                score.textContent = `${+(score.textContent) + 2}`;
            } else {
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
        }
    } else if (typeOfAnswer === "table-horizontal") {
        let answerTable = "";
        let answerInputs = quizAnswerTableHorizontal.querySelectorAll('.quiz__answer-number');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableHorizontal.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {
                score.textContent = `${+(score.textContent) + 2}`;
            } else {
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
        }
    } else if (typeOfAnswer === "table-vertical") {
        let answerTable = "";
        let answerInputs = quizAnswerTableHorizontal.querySelectorAll('.quiz__answer-number');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableHorizontal.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {
                score.textContent = `${+(score.textContent) + 2}`;
            } else {
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
        }
    } else if (typeOfAnswer === "textarea") {

    } else {
        console.error('Тип вопроса неправильный');
    }
    if (indexOfQuestion !== questions.length) {
        quizNext.style.display = "block";
    } else {
        quizLinkToNextPage.style.display = "block";
    }
})

quizNext.addEventListener('click', () => {
    quizRightAnswer.style.display = "none";
    quizSubmit.style.display = "block";
    quizNext.style.display = "none";
    quiz.style.display = "none";
    helpers.style.display = "none";
    helpers.innerHTML = "";
    quizQuestion.style.display = "none";
    quizTable.style.display = "none";
    quizAnswer.style.display = "none";
    quizSubmit.style.display = "none";
    quizAnswerTextBlock.style.display = "none";
    quizAnswerText.value = "";
    quizAnswerTableHorizontal.style.display = "none";
    quizAnswerTableHorizontal.innerHTML = "";
    quizAnswerTableVertical.style.display = "none";
    quizAnswerTableVertical.innerHTML = "";
    quizAnswerTextareaBlock.style.display = "none";
    quizAnswerTextarea.value = "";
    quizRightAnswerTextBlock.style.display = "none";
    quizRightAnswerText.value = "";
    quizRightAnswerTableHorizontal.style.display = "none";
    quizRightAnswerTableHorizontal.innerHTML = "";
    quizRightAnswerTableVertical.style.display = "none";
    quizRightAnswerTableVertical.innerHTML = "";
    typeOfAnswer = "";
    isHelperUsed = false;
    indexOfQuestion++;
    if (indexOfQuestion !== questions.length) {
        question(questions[indexOfQuestion]);
    }
})

let indexOfQuestion = 0;
question(questions[indexOfQuestion]);















