// создаём точки слайдера
const sliderCards = document.querySelectorAll('.slider__card');
const divSliderDots = document.querySelector('.slider__dots');

function createSliderDots() {
    let i = 0;
    while (i < (sliderCards.length / 3)) {
        // divSliderDots.appendChild(sliderDot); - не добавляет один и тот же элемент больше одного раза
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot"></div>');
        i++;
        console.log(i);
    }

    // добавляем точки для версий сладера с двумя карточками на экране - в дополнение к уже созданным точкам. 
    // продолжаем счётчик i, отредактировав условие while - указав сколько точек должно быть в итоге 
    while (i < (sliderCards.length / 2)) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_2card"></div>');
        i++;
        console.log(i);
    }

    // добавляем точки для версий сладера с одной карточкой на экране
    while (i < sliderCards.length) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_1card"></div>');
        i++;
        console.log(i);
    }

}
createSliderDots();

// функционал слайдера
const btnLeft = document.querySelector('.btn_arrow_l');
const btnRight = document.querySelector('.btn_arrow_r');
const sliderCardsCont = document.querySelector('.slider__cards-cont');
const sliderWrapper = document.querySelector('.slider__wrapper');
let sliderDots = document.querySelectorAll('.slider__dot');

// делаем активной первую точку слайдера
sliderDots[0].classList.add('slider__dot_active');

sliderCardsCont.style.transition = '0.3s';
sliderWrapper.style.transition = '0.3s';

let shownImage = 0; // задаём индекс отображаемой картинки (карточки) - (при загрузке страницы отображается первая карточка, её индекс 0 )
let slideWidth; // расстояние сдвига карточек при листании (ширина карточки + расстояние между карточками)

function setSlideWidth() {
    if (window.innerWidth < 375) {
        slideWidth = 30 + 2.4; //ширина карточки + расстояние между карточками
    } else if (window.innerWidth < 425) {
        slideWidth = 35.4 + 2.4; //ширина карточки + расстояние между карточками
    } else {
        slideWidth = 38.4 + 2.4; //ширина карточки + расстояние между карточками
    }
}

function slideToImage(shownImage) {
    //смещаем внутреннюю обёртку карточек внутри внешней с overflow:hidden; ("окошка") 
    sliderWrapper.style.transform = 'translateX(-' + (shownImage * slideWidth) + 'rem)';
}

function removeSliderDotActive() {
    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
}

function slideLeft() {
    shownImage--; // уменьшаем индекс отображаемой картинки на 1 (т.к. мы листаем вправо)

    // задаём на какую карточку при листании назад с первой краточки нужно будет переходить, в зависимости от ширины экрана (т.е. кол-ва отображаемых карточек в окне слайдера)
    if (window.innerWidth < 825) {
        if (shownImage < 0) {
            shownImage = (sliderCards.length - 1);
        };
    } else if (window.innerWidth < 1250) {
        if (shownImage < 0) {
            shownImage = (sliderCards.length - 2);
        };
    } else if (shownImage < 0) {
        shownImage = (sliderCards.length - 3);
    };

    console.log(shownImage);

    setSlideWidth();
    slideToImage(shownImage);

    removeSliderDotActive();

    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его)
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');
        }
        else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }
}

function slideRight() {
    shownImage++; // увеличиваем индекс отображаемой картинки на 1 (т.к. мы листаем вправо)
    // задаём на какой карточке при листании вперёд нужно будет переходить к первой карточке, в зависимости от ширины экрана (т.е. кол-ва отображаемых карточек в окне слайдера)
    if (window.innerWidth < 825) {
        if (shownImage >= (sliderCards.length)) {
            shownImage = 0;
        }
    } else if (window.innerWidth < 1250) {
        if (shownImage >= (sliderCards.length - 1)) {
            shownImage = 0;
        }
    } else if (shownImage >= (sliderCards.length - 2)) {
        shownImage = 0;
    }

    setSlideWidth();
    slideToImage(shownImage);

    removeSliderDotActive();

    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его)
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');

        } else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }
}

btnRight.onclick = slideRight;

btnLeft.onclick = slideLeft;




// при наведении (вхождении курсора мыши - т.е. однократно) на контейнер с точками (divSliderDots - .slider__dots) в зависимости от window.innerWidth создаем массив только из отображаемых точек и присваиваем точкам (из вновь созданного массива sliderDots) действие перелистывания слайдера по клику:
function turnOnSliderDots() {

    removeSliderDotActive();
    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его):
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');
        }
        else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }

    // присваиваем точкам (из вновь созданного массива sliderDots) действие перелистывания слайдера по клику
    sliderDots.forEach((sliderDot, i) => {
        sliderDot.onclick = () => {
            if (window.innerWidth < 825) {
                shownImage = i;
            } else if (window.innerWidth < 1250) {
                shownImage = i * 2;
            } else {
                shownImage = i * 3;
            }
            setSlideWidth();
            slideToImage(shownImage);

            // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
            removeSliderDotActive();
            sliderDots[i].classList.add('slider__dot_active');
        }
    });
}

// turnOnSliderDots();

divSliderDots.onmouseenter = turnOnSliderDots;
divSliderDots.ontouchstart = turnOnSliderDots;



// touch slider

let xStart;
let xEnd;
let xEndTouch;
let distanceX;
let distanceXTouch;

sliderWrapper.onmousedown = (e) => {
    e.preventDefault(); // чтоб не перетягивалась картинка
    // e.stopPropagation();
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    xStart = e.clientX;
    console.log(xStart);
}
sliderWrapper.ontouchstart = (e) => {
    e.preventDefault(); // чтоб не перетягивалась картинка
    // e.stopPropagation();
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    xStart = e.clientX;
    console.log(xStart);
}

function touchSlide(e) {
    e.preventDefault(); // чтоб не перетягивалась картинка
    // e.stopPropagation();
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    xEnd = e.clientX;
    console.log(xEnd);

    console.log('distanceX = xEnd - xStart = ' + (xEnd - xStart));

    distanceX = (xEnd - xStart);
    console.log(distanceX);


    if (distanceX > 10) {
        slideLeft();
    }
    if (distanceX < -10) {
        slideRight();
    }
}

// sliderWrapper.onmouseup = (e) => {
//     touchSlide(e);
// }

sliderWrapper.addEventListener('mouseup', (e) => { touchSlide(e) }, { passive: false });
// sliderWrapper.addEventListener('mousemove', (e) => { touchSlide(e) }, { passive: false });


sliderWrapper.addEventListener('touchstart', (e) => { touchSlide(e) }, { passive: false });
sliderWrapper.addEventListener('touchmove', (e) => { touchSlide(e) }, { passive: false });
