
document.querySelector('.wrapper').classList.add('loaded');


let list = document.querySelector("body"), dir, i, isOkToScroll, target;
let scale = document.querySelector('.scale');
let setOfImages = document.querySelector('.set-of-images');
setDefault();

scale.addEventListener("wheel", onWheel);
setOfImages.addEventListener("wheel", onWheel);

function onWheel(event) {
    event.preventDefault();
    dir = event.deltaY > 0 ? 1 : -1;
    isOkToScroll = true;
    target = this;
}

requestAnimationFrame(scroll);

function scroll() {
    requestAnimationFrame(scroll)
    if (!isOkToScroll) return;

    if (i < 28) i++
    else setDefault();

    if (target === setOfImages) {
        target.scrollBy(2 * i * dir, 0);
    } else {
        window.scrollBy(2 * i * dir, 0);
    }
}

function setDefault() {
    isOkToScroll = false;
    i = 1;
    dir = 0;
}

let isOkToMove, xCoordinate, yCoordinate, xCoordinateChanged, yCoordinateChanged;

scale.addEventListener('mousedown', (event) => {
    if (!(event.target.draggable)) {
        isOkToMove = true;
        xCoordinate = event.clientX;
        yCoordinate = event.clientY;
    }
})

document.addEventListener('mousemove', (event) => {
    if (isOkToMove) {
        xCoordinateChanged = event.clientX;
        yCoordinateChanged = event.clientY;
        window.scrollBy(xCoordinate - xCoordinateChanged, yCoordinate - yCoordinateChanged);
        xCoordinate = xCoordinateChanged;
        yCoordinate = yCoordinateChanged;

    }
})

document.addEventListener('mouseup', (event) => {
    isOkToMove = false;
})


// первоначальные места картинок
let imageSpawns = document.querySelectorAll('.image-spawn');
let imageSpawnsSmall = document.querySelectorAll('.image-spawn-small');
let imageSpawnsLarge = document.querySelectorAll('.image-spawn-large');

// баллы
let score = document.querySelector('.score');
score.textContent = '0';

let countScale = 0;
let indexOfQuestion = 0;
let wrongSound = new Audio('audio/wrong.mp3');

// иициализация переменной, в которой будут храниться картинки
let images = [];
let imagesSmall = [];
let imagesLarge = [];

//заполняем картинки
imageSpawns.forEach(spawn => {
    images.push(spawn.querySelector('img'));
});
imageSpawnsSmall.forEach(spawn => imagesSmall.push(spawn.querySelector('img')));
imageSpawnsLarge.forEach(spawn => imagesLarge.push(spawn.querySelector('img')));


//картинка начинает движение
var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
}, false);

document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.classList.contains("place")) {

    }

}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.classList.contains("place")) {

    }

}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.classList.contains("place") && event.target.classList.contains("empty") && event.target.dataset.place === dragged.dataset.place) {
        if (dragged.parentNode.classList.contains('image-spawn')) {
            dragged.parentNode.style.width = '0px';
            dragged.parentNode.style.margin = '0px';
        } else {
            dragged.parentNode.classList.add('empty');
        }
        event.target.classList.remove('empty');
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        if (dragged.dataset.answer === dragged.parentNode.dataset.answer) {
            score.textContent = `${+(score.textContent) + 2 - dragged.dataset.penalty}`;
            dragged.draggable = false;
            countScale++;
            if (countScale === images.length) {
                scale.style.display = "none";
                setOfImages.style.display = "none";
                question(questions[indexOfQuestion]);
            }
        } else {
            wrongSound.play();
            dragged.dataset.penalty = '2';
            score.textContent = `${+(score.textContent) - 1}`;
        }
    } else if (!(event.target.classList.contains('place')) && !(event.target.parentNode.classList.contains('place'))) {
        dragged.parentNode.classList.add('empty');
        dragged.parentNode.removeChild(dragged);
        imageSpawns[+(dragged.dataset.startplace) - 1].style.width = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].style.margin = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].appendChild(dragged);
    }
}, false);

let places = scale.querySelectorAll('.place');

document.querySelectorAll('._solved').forEach(image => {
    let rightPlace;
    image.parentNode.style.width = '0px';
    image.parentNode.style.margin = '0px';
    image.draggable = false;
    image.parentNode.removeChild(image);
    for (let i = 0; i < places.length; i++) {
        if (image.dataset.answer === places[i].dataset.answer) {
            rightPlace = places[i];
            break;
        }
    }
    rightPlace.classList.remove('empty');
    rightPlace.appendChild(image);
})












let typeOfAnswer = "";
let isHelperUsed = false;
let countUsedHelpers = 0;

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
let quizNextPage = quiz.querySelector('.quiz__next-page');

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
let quizRightAnswerTextarea = quizAnswer.querySelector('.quiz__right-answer-textarea');

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
        let answerTextarea = "";
        question.answerTextarea.forEach(paragraph => {
            answerTextarea += "<p>" + paragraph + "</p>";
        })
        quizRightAnswerTextarea.innerHTML += answerTextarea;
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
                countUsedHelpers++;
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
            } else if (countUsedHelpers === 1) {
                score.textContent = `${+(score.textContent) + 1}`;
            } else {
                score.textContent = `${+(score.textContent)}`;
            }
        } else if (countUsedHelpers < 2) {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        } else {
            score.textContent = `${+(score.textContent) - 2}`;
            //неприятный звук
            wrongSound.play();
        }
    } else if (typeOfAnswer === "table-horizontal") {
        let answerTable = "";
        let answerInputs = quizAnswerTableHorizontal.querySelectorAll('input');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableHorizontal.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {
                score.textContent = `${+(score.textContent) + 2}`;
            } else if (countUsedHelpers === 1) {
                score.textContent = `${+(score.textContent) + 1}`;
            } else {
                score.textContent = `${+(score.textContent)}`;
            }
        } else if (countUsedHelpers < 2) {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        } else {
            score.textContent = `${+(score.textContent) - 2}`;
            //неприятный звук
            wrongSound.play();
        }
    } else if (typeOfAnswer === "table-vertical") {
        let answerTable = "";
        let answerInputs = quizAnswerTableVertical.querySelectorAll('input');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableVertical.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {
                score.textContent = `${+(score.textContent) + 2}`;
            } else if (countUsedHelpers === 1) {
                score.textContent = `${+(score.textContent) + 1}`;
            } else {
                score.textContent = `${+(score.textContent)}`;
            }
        } else if (countUsedHelpers < 2) {
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        } else {
            score.textContent = `${+(score.textContent) - 2}`;
            //неприятный звук
            wrongSound.play();
        }
    } else if (typeOfAnswer === "textarea") {
        quizRightAnswerTextarea.style.display = "block";
    } else {
        console.error('Тип вопроса неправильный');
    }
    if (indexOfQuestion !== questions.length - 1) {
        quizNext.style.display = "table";
    } else {
        quizNextPage.style.display = "table";
    }
})

quizNext.addEventListener('click', () => {
    quizRightAnswer.style.display = "none";
    quizSubmit.style.display = "table";
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
    quizRightAnswerTextarea.style.display = "none";
    typeOfAnswer = "";
    isHelperUsed = false;
    indexOfQuestion++;
    if (indexOfQuestion !== questions.length) {
        question(questions[indexOfQuestion]);
    }
})
















