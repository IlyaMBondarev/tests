
document.querySelector('.wrapper').classList.add('loaded');


let dropBtns = document.querySelectorAll('.drop');

dropBtns.forEach(button => {
    let dropMenu = button.querySelector('.drop-menu');
    button.addEventListener('click', () => {
        dropMenu.classList.toggle('dropped');
    })
})

document.addEventListener('click', (event) => {
    let target = event.target;
    dropBtns.forEach(button => {
        if (target !== button || !(button.contains(target))) {
            let droppedMenu = button.querySelector('.dropped');
            if (droppedMenu) {
                droppedMenu.classList.remove('dropped');
            }
        }
    })
})
let sliders = document.querySelectorAll('.slider');

for (let i = 0; i < sliders.length; i++) {
    let sliderLength = sliders[i].querySelectorAll('.slider__slide').length;
    let firstSlide = sliders[i].querySelector('.slider__first-slide');
    let currentSlide = sliders[i].querySelector('.slider__current-slide');
    let totalSlides = sliders[i].querySelector('.slider__total-slides');
    let arrowLeft = sliders[i].querySelector('.slider__arrow-left');
    let arrowRight = sliders[i].querySelector('.slider__arrow-right');
    currentSlide.textContent = '1';
    totalSlides.textContent = `${sliderLength}`;
    if (sliderLength === 1) {
        arrowLeft.classList.add('hidden');
        arrowRight.classList.add('hidden');
    }
    arrowLeft.addEventListener('click', () => {
        if (currentSlide.textContent == '1') {
            currentSlide.textContent = `${sliderLength}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        } else {
            currentSlide.textContent = `${+(currentSlide.textContent) - 1}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        }
    });
    arrowRight.addEventListener('click', () => {
        if (currentSlide.textContent == `${sliderLength}`) {
            currentSlide.textContent = '1';
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        } else {
            currentSlide.textContent = `${+(currentSlide.textContent) + 1}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        }
    });
}