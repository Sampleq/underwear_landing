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
setSlideWidth();

function slideToImage(shownImage, manualSlideDist = 0) {
    //смещаем внутреннюю обёртку карточек внутри внешней с overflow:hidden; ("окошка") 
    sliderWrapper.style.transform = 'translateX(' + ((-(shownImage * slideWidth)) + ((manualSlideDist) / 10)) + 'rem)';
}

function removeSliderDotActive() {
    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
}

function slideToLeft() {
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

function slideToRight() {
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

btnRight.onclick = slideToRight;

btnLeft.onclick = slideToLeft;




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



// MOUSE DRAG touch slider

let xStart;
let xEnd;
let xCurr;
let distanceX; // расстояние между нажатием и отжатием мышки
let xDrag; //  расстояние между нажатием и убиранием указателя мыши за пределы sliderWrapper

let outBounds; // маркер что мы не отжали мышку над sliderWrapper а убрали указатель за его пределы


sliderWrapper.onmousedown = (e) => {
    // e.preventDefault(); // чтоб не перетягивалась картинка -  от этого "зависал" :hover на карточке - переделал через CSS: .card__img {pointer-events: none;}
    // e.stopPropagation();
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    xStart = e.clientX;
    // console.log(xStart);
    outBounds = true;

    sliderWrapper.style.transition = '0.016s';

    setSlideWidth();
    sliderWrapper.onmousemove = (e) => {
        xCurr = e.clientX;
        xDrag = (xCurr - xStart) * 1.5; // 1.5 - коэфф. увеличения "движения мыши"
        // console.log(xDrag);
        // console.log(((shownImage * slideWidth) - (xDrag / 10)));
        sliderWrapper.style.transform = 'translateX(' + ((-(shownImage * slideWidth)) + (xDrag / 10)) + 'rem)';
        // slideToImage(manualSlideDist = xDrag);
    }
}

function touchSlide(e) {
    //e.preventDefault(); // чтоб не перетягивалась картинка

    xEnd = e.clientX;

    // console.log(xEnd);
    // console.log('distanceX = xEnd - xStart = ' + (xEnd - xStart));

    distanceX = (xEnd - xStart) * 1.5; // 1.5 - коэфф. увеличения "движения мыши"
    // console.log(distanceX);

    if (distanceX < ((-slideWidth / 2) * 10)) {
        slideToRight();
        if (distanceX < ((-3 * slideWidth / 2) * 10)) {
            slideToRight();
        }
    } else {
        if (distanceX > ((slideWidth / 2) * 10)) {
            slideToLeft();
            if (distanceX > ((3 * slideWidth / 2) * 10)) {
                slideToLeft();
            }
        } else {
            sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
        }
    }
}

sliderWrapper.onmouseup = (e) => {
    outBounds = false;  // сбрасываем маркер что мышь не отчали над sliderWrapper
    sliderWrapper.style.transition = '0.3s';
    touchSlide(e);
    sliderWrapper.onmousemove = undefined;

}
sliderWrapper.onmouseleave = () => {
    if (outBounds === true) {

        if (xDrag < ((-slideWidth / 2) * 10)) {
            slideToRight();
            if (xDrag < ((-3 * slideWidth / 2) * 10)) {
                slideToRight();
            }
        } else {
            if (xDrag > ((slideWidth / 2) * 10)) {
                slideToLeft();
                if (xDrag > ((3 * slideWidth / 2) * 10)) {
                    slideToLeft();
                }
            } else {
                sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
            }
        }

        outBounds = false;  // т.к. мы уже выполнили необходимое действие, поэтому сбрасываем маркер что мышь не отчали над sliderWrapper
        sliderWrapper.style.transition = '0.3s';

        sliderWrapper.onmousemove = undefined;
    }
}



// don't work on iPhone - ПЕРЕПРОВЕРИТЬ!!! - возможно не успел обновиться GitPages
// sliderWrapper.addEventListener('touchstart', (e) => {
//     e.preventDefault(); // чтоб не перетягивалась картинка
//     xStart = e.clientX;
//     console.log(xStart);
// }, { passive: false });
// sliderWrapper.addEventListener('touchmove', (e) => { touchSlide(e) }, { passive: false });
// sliderWrapper.addEventListener('touchend', (e) => { touchSlide(e) }, { passive: false });



//  TOUCH SCREENS touch slider

//https://css-tricks.com/simple-swipe-with-vanilla-javascript/
// https://codepen.io/thebabydino/pen/QQRwRy/

//https://stackoverflow.com/questions/62823062/adding-a-simple-left-right-swipe-gesture

let touchstartX;
let touchstartY;
let touchendX;
let touchendY;

const slider = document.querySelector('.slider');

// slider.style.background = 'red';

slider.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

// попробовать двигать реалтайм  через touchmove!!
slider.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);


function handleGesture() {
    if (touchendX < touchstartX) {
        console.log('Swiped Left');
        // alert('Swiped Left');
        slideToRight();
    }

    if (touchendX > touchstartX) {
        console.log('Swiped Right');
        // alert('Swiped Right');
        slideToLeft();
    }

    if (touchendY < touchstartY) {
        console.log('Swiped Up');
    }

    if (touchendY > touchstartY) {
        console.log('Swiped Down');
    }

    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}

// Убрать БАГ с зависающим ховером на iPhone при перелистывании
// не скролит строницу вверх/вниз по слуйдеру - исправить  - вернуть поведение по умолчанию ил  дописать действие через scrollBy(). 