
document.querySelector('.wrapper').classList.add('loaded');



//начало кода для горизонтального скролла. Менять можно, если знаешь точно что за что отвечает или там, где есть комментарии

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
        target.scrollBy(2 * i * dir, 0);//здесь можно менять цифру. меньше - медленнее скролл, больше - быстрее скролл
    } else {
        window.scrollBy(2 * i * dir, 0);//здесь можно менять цифру. меньше - медленнее скролл, больше - быстрее скролл
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

//конец кода для горизонтального скролла


//начало кода про шкалу

// первоначальные места картинок
let imageSpawns = document.querySelectorAll('.image-spawn');
let imageSpawnsSmall = document.querySelectorAll('.image-spawn-small');
let imageSpawnsLarge = document.querySelectorAll('.image-spawn-large');

// баллы
let score = document.querySelector('.score');
//изначльное количество баллов
score.textContent = '0';

//начальная позиция при открытии страницы
let countScale = 0;
let indexOfQuestion = 0;

//звук при неправильном движении
let wrongSound = new Audio('audio/wrong.mp3');//если нужен другой файл - просто поменять путь до файла и/или название файла.

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

//код про движение картинки
//картинка начинает движение
var dragged;

document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
    dragged = event.target;
}, false);

document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {

}, false);

document.addEventListener("dragleave", function(event) {

}, false);

document.addEventListener("drop", function(event) {
    //код про то, что происходит, когда картинка приземляется куда-либо

    //предотвратить стандартное поведение
    event.preventDefault();

    //если картинка падает в место для картинки, оно пустое и картинка по месту совпадает (из первой строки или остальных)
    if (event.target.classList.contains("place") && event.target.classList.contains("empty") && event.target.dataset.place === dragged.dataset.place) {
        //если картинка перемещалась из нижней строки
        if (dragged.parentNode.classList.contains('image-spawn')) {
            //скрыть уже пустующее место в нижней строке
            dragged.parentNode.style.width = '0px';
            dragged.parentNode.style.margin = '0px';
        } else {
            //иначе если перемещается из места на шкале, доабавлять предыдущему месту класс "пустой"
            dragged.parentNode.classList.add('empty');
        }
        //убрать текущему месту класс "пустой"
        event.target.classList.remove('empty');
        //убрать перемещаемый объект из кода в предыдущем месте и добавить в текущем
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        //если ответ правильный
        if (dragged.dataset.answer === dragged.parentNode.dataset.answer) {
            //добавить баллы минус штраф
            score.textContent = `${+(score.textContent) + 2 - dragged.dataset.penalty}`;
            //сделать картинку неперемещаемой
            dragged.draggable = false;
            //количество правильных ответов + 1
            countScale++;
            //если количество правильных ответов равно количеству картинок (все картинки на своих местах)
            if (countScale === images.length) {
                //скрыть шкалу, запустить первый вопрос
                scale.style.display = "none";
                setOfImages.style.display = "none";
                //если первый вопрос есть, запустить его
                if (questions.length !== 0) {
                    question(questions[indexOfQuestion]);
                }
            }
        } else {//если вопрос неправильный
            //включить звук
            wrongSound.play();
            //увеличить штраф
            dragged.dataset.penalty = '2';
            //уменьшить текущие баллы
            score.textContent = `${+(score.textContent) - 1}`;
        }
        //если перемещается из шкалы в место не для картинки
    } else if (!(event.target.classList.contains('place')) && !(event.target.parentNode.classList.contains('place'))) {
        //добавить предыдущему месту класс "пустой" и удалить картинку оттуда
        dragged.parentNode.classList.add('empty');
        dragged.parentNode.removeChild(dragged);
        //вернуть картинку на ее начальное место в нижней полосе
        imageSpawns[+(dragged.dataset.startplace) - 1].style.width = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].style.margin = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].appendChild(dragged);
    }
}, false);

//конец кода про шкалу


//начало кода про вопросы

//выборка блоков из html
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


//функция инициализации вопроса
function question(question) {
    //добавить текст вопроса на страницу
    let questionText = "";
    question.question.forEach(paragraph => {
        questionText += "<p>" + paragraph + "</p>";
    })
    quizQuestion.innerHTML = questionText;

    //добавить картинку если есть
    quizImage.src = question.imageSrc;

    //добавить таблицу в текст вопроса
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

    //чтение типа ответа
    //если тип ответа "текст"
    if (question.typeOfAnswer === "text") {
        //показать тип ответа "строка"
        quizAnswerTextBlock.style.display = "flex";
        quizRightAnswerTextBlock.style.display = "flex";
        typeOfAnswer = question.typeOfAnswer;
        //если тип ответа "горизонтальная таблица"
    } else if (question.typeOfAnswer === "table-horizontal") {
        quizAnswerTableHorizontal.style.display = "block";
        quizRightAnswerTableHorizontal.style.display = "block";
        //рисование кода таблицы для ответов
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
        //рисование кода таблицы для правильного ответа
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
        //если тип ответа "вертикальная таблица"
    } else if (question.typeOfAnswer === "table-vertical") {
        quizAnswerTableVertical.style.display = "block";
        quizRightAnswerTableVertical.style.display = "block";
        //рисование кода таблицы для ответов
        let alphabet = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ";
        let tableInner = "<p>Ваш ответ:</p><table><tr><td>" + question.nameOfLeftColumn + "</td><td>" + question.nameOfRightColumn + "</td></tr>";
        for (let i = 0; i < question.rows; i++) {
            tableInner += "<tr><td>" + alphabet[i] + "</td><td><input type=\"number\" class=\"quiz__answer-number\"></td></tr>";
        }
        tableInner += "</table>";
        quizAnswerTableVertical.innerHTML = tableInner;
        //рисование кода таблицы для правильного ответа
        tableInner = "<p>Правильный ответ:</p><table><tr><td>" + question.nameOfLeftColumn + "</td><td>" + question.nameOfRightColumn + "</td></tr>";
        for (let i = 0; i < question.rows; i++) {
            tableInner += "<tr><td>" + alphabet[i] + "</td><td><span>" + question.answer[i] + "</span></td></tr>";
        }
        tableInner += "</table>";
        quizRightAnswerTableVertical.innerHTML = tableInner;
        typeOfAnswer = question.typeOfAnswer;
        //если тип ответа "текстовая область"
    } else if (question.typeOfAnswer === "textarea") {
        //рисование кода таблицы для текстовой области
        quizAnswerTextareaBlock.style.display = "flex";
        let answerTextarea = "";
        question.answerTextarea.forEach(paragraph => {
            answerTextarea += "<p>" + paragraph + "</p>";
        })
        quizRightAnswerTextarea.innerHTML += answerTextarea;
        typeOfAnswer = question.typeOfAnswer;
    } else {
        //если тип ответа был написан неверно, выводит в консоль разработчика сообщение об ошибке
        console.error('Тип ответа неправильный');
    }

    //если нужны советники
    if (question.countHelpers) {
        //нарисовать кнопки
        let helpersInner = "";
        for (let i = 0; i < question.countHelpers; i++) {
            helpersInner += "<button class=\"helper-btn\">Советник <span>" + (i + 1) + "</span></button>";
        }
        helpers.innerHTML = helpersInner;
        //добавить каждой кнопке действие при клике
        for (let i = 0; i < question.countHelpers; i++) {
            let helperBtns = helpers.querySelectorAll('button');
            helperBtns[i].addEventListener('click', () => {
                //вывод на экран совета поверх страницы
                alert(`${question.helpers[i]}`);
                //советник использован
                isHelperUsed = true;
            })
        }
    }
    //после отрисовки нужной информации на странице, наконец показать вопрос
    quiz.style.display = "block";
    helpers.style.display = "block";
    quizQuestion.style.display = "block";
    quizAnswer.style.display = "block";
    quizSubmit.style.display = "block";
}

//нажатие на кнопку "отправить"
quizSubmit.addEventListener('click', () => {
    //показать ответ, скрыть кнопку "отправить"
    quizRightAnswer.style.display = "block";
    quizSubmit.style.display = "none";
    //если тип ответа "текст"
    if (typeOfAnswer === "text") {
        //если ответ правильный (даже с учетом регистра)
        if (quizAnswerText.value.toLowerCase() === quizRightAnswerText.textContent.toLowerCase()) {
            if (!isHelperUsed) {//если советник не был использован
                score.textContent = `${+(score.textContent) + 2}`;
            } else {//если советник был использован
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {//если ответ неправильный
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        }
        //если тип ответа "горизонтальная таблица"
    } else if (typeOfAnswer === "table-horizontal") {
        //проверка ответа
        let answerTable = "";
        let answerInputs = quizAnswerTableHorizontal.querySelectorAll('input');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableHorizontal.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        //если ответ правильный
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {//если советник не был использован
                score.textContent = `${+(score.textContent) + 2}`;
            } else {//если советник был использован
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {//если ответ неправильный
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        }
        //если тип ответа "вертикальная таблица"
    } else if (typeOfAnswer === "table-vertical") {
        //проверка ответа
        let answerTable = "";
        let answerInputs = quizAnswerTableVertical.querySelectorAll('input');
        answerInputs.forEach(input => answerTable += input.value);
        let rightAnswerTable = "";
        let rightAnswerSpans = quizRightAnswerTableVertical.querySelectorAll('span');
        rightAnswerSpans.forEach(span => rightAnswerTable += span.textContent);
        //если ответ правильный
        if (answerTable.toLowerCase() === rightAnswerTable.toLowerCase()) {
            if (!isHelperUsed) {//если советник не был использован
                score.textContent = `${+(score.textContent) + 2}`;
            } else {//если советник был использован
                score.textContent = `${+(score.textContent) + 1}`;
            }
        } else {//если ответ неправильный
            score.textContent = `${+(score.textContent) - 1}`;
            //неприятный звук
            wrongSound.play();
        }
        //если тип ответа "текстовая область"
    } else if (typeOfAnswer === "textarea") {
        //показать правильный текст
        quizRightAnswerTextarea.style.display = "block";
    } else {
        //если тип ответа неправильный, выводит в консоль ошибку
        console.error('Тип ответа неправильный');
    }
    //если вопрос не последний
    if (indexOfQuestion !== questions.length - 1) {
        //показать кнопку к следующему вопросу
        quizNext.style.display = "table";
    } else {//если вопрос последний
        //показать кнопку на следующий тест/страницу с результатом
        quizNextPage.style.display = "table";
    }
})

//если нажать на кнопку "далее"
quizNext.addEventListener('click', () => {
    //скрыть все блоки, стереть все значения
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
    //инициализация следующего вопроса, если еще не последний
    indexOfQuestion++;
    if (indexOfQuestion !== questions.length) {
        question(questions[indexOfQuestion]);
    }
})

