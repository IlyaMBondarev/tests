
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

// места для картинок
let placesForImages = document.querySelectorAll('.place');
let placesForImagesSmall = document.querySelectorAll('.place-small');
let placesForImagesLarge = document.querySelectorAll('.place-large');

// баллы
let score = document.querySelector('.score');
score.textContent = '0';


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
            score.textContent = +(score.textContent) + 2 - dragged.dataset.penalty;
            dragged.draggable = false;
        } else {
            dragged.dataset.penalty = dragged.dataset.penalty === '2' ? '2' : `${+(dragged.dataset.penalty) + 1}`;
            score.textContent = +(score.textContent) - 1;
        }
    } else if (!(event.target.classList.contains('place')) && !(event.target.parentNode.classList.contains('place'))) {
        dragged.parentNode.classList.add('empty');
        dragged.parentNode.removeChild(dragged);
        imageSpawns[+(dragged.dataset.startplace) - 1].style.width = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].style.margin = '';
        imageSpawns[+(dragged.dataset.startplace) - 1].appendChild(dragged);
    }
}, false);











