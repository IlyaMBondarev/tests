//файл скриптов для главной страницы


document.querySelector('.wrapper').classList.add('loaded');

//слайдер
let sliders = document.querySelectorAll('.slider');

//работает с несколькими слайдерами, их можно копировать(в html), менять количество картинок.
for (let i = 0; i < sliders.length; i++) {
    //все строчки с let - выбирает нужные блоки из html
    let sliderLength = sliders[i].querySelectorAll('.slider__slide').length;
    let firstSlide = sliders[i].querySelector('.slider__first-slide');
    let currentSlide = sliders[i].querySelector('.slider__current-slide');
    let totalSlides = sliders[i].querySelector('.slider__total-slides');
    let arrowLeft = sliders[i].querySelector('.slider__arrow-left');
    let arrowRight = sliders[i].querySelector('.slider__arrow-right');
    //номер текущей картинки
    currentSlide.textContent = '1';
    //количество картинок
    totalSlides.textContent = `${sliderLength}`;
    //если картинка только одна
    if (sliderLength === 1) {
        //скрыть стрелочку влево
        arrowLeft.classList.add('hidden');
        //скрыть стрелочку вправо
        arrowRight.classList.add('hidden');
    }
    //при нажатии на кнопку влево
    arrowLeft.addEventListener('click', () => {
        //если текущая картинка первая
        if (currentSlide.textContent == '1') {
            //переход на последнюю картинку
            currentSlide.textContent = `${sliderLength}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        } else {//если картинка не первая
            //переход на предыдущую картинку
            currentSlide.textContent = `${+(currentSlide.textContent) - 1}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        }
    });
    //если нажали на кнопку вправо
    arrowRight.addEventListener('click', () => {
        //если текущая картинка последняя
        if (currentSlide.textContent == `${sliderLength}`) {
            //переход на первую картинку
            currentSlide.textContent = '1';
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        } else {//если картинка не последняя
            //переход на следующую картинку
            currentSlide.textContent = `${+(currentSlide.textContent) + 1}`;
            firstSlide.style.marginLeft = `${(+(currentSlide.textContent) - 1) * (-100)}%`;
        }
    });
}