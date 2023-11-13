// создаём точки слайдера
const sliderCards = document.querySelectorAll('.slider__card');
const divSliderDots = document.querySelector('.slider__dots');

// не используется т.к. метод  .appendChild не добавляет один и тот же элемент больше одного раза
// const sliderDot = document.createElement('div');
// // sliderDot.id = 'test';
// sliderDot.classList.add('slider__dot');
// // document.body.appendChild(sliderDot);

function createSliderDots() {
    let i = 0;
    while (i < (sliderCards.length / 3)) {
        // divSliderDots.appendChild(sliderDot); - не добавляет один и тот же элемент больше одного раза
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot"></div>');
        i++;
        console.log(i);
    }

    // добавляем точки для версий сладера с двумя карточками на экране - в дополнение к уже созданным точкам. 
    //создаём новый счётчик для цикла. (или можно попробовать обнулить i после прекращения выполнения предудущего цикла. Или продолжить счётчик i, отредактировав условие while)
    let k = 0;
    while (k < ((sliderCards.length / 2) - (sliderCards.length / 3))) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_2card"></div>');
        k++;
        console.log(k);
    }

    // добавляем точки для версий сладера с одной карточкой на экране
    let l = 0;
    // while (l < (sliderCards.length - (sliderCards.length / 3) - ((sliderCards.length / 2) - (sliderCards.length / 3)))) {
    while (l < (sliderCards.length / 2)) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_1card"></div>');
        l++;
        console.log(l);
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

let shownImage = 0; //задаём индекс отображаемой картинки (карточки) - (при загрузке страницы отображается первая карточка, её индекс 0 )
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


btnRight.onclick = () => {
    // 
    shownImage++;
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

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }

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

btnLeft.onclick = () => {
    shownImage--;

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

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }

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


// при наведении (вхождении курсора мыши - т.е. однократно) на контейнер с точками (divSliderDots - .slider__dots) в зависимости от window.innerWidth создаем массив только из отображаемых точек и присваиваем точкам (из вновь созданного массива sliderDots) действие перелистывания слайдера по клику:
divSliderDots.onmouseenter = () => {

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
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

    if (window.innerWidth < 825) {
        sliderDots.forEach((sliderDot, i) => {
            sliderDot.onclick = () => {
                shownImage = i;
                setSlideWidth();
                slideToImage(shownImage);

                // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
                // вынести в отдельную функцию
                for (let sliderDot of sliderDots) {
                    sliderDot.classList.remove('slider__dot_active');
                }
                sliderDots[i].classList.add('slider__dot_active');
            }
        });
    }
    else if (window.innerWidth < 1250) {
        sliderDots.forEach((sliderDot, i) => {
            sliderDot.onclick = () => {
                shownImage = i * 2;

                setSlideWidth();
                slideToImage(shownImage);

                // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
                // вынести в отдельную функцию
                for (let sliderDot of sliderDots) {
                    sliderDot.classList.remove('slider__dot_active');
                }
                sliderDots[i].classList.add('slider__dot_active');
            }
        })
    } else {
        sliderDots.forEach((sliderDot, i) => {
            sliderDot.onclick = () => {
                shownImage = i * 3;

                setSlideWidth();
                slideToImage(shownImage);

                // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
                // вынести в отдельную функцию
                for (let sliderDot of sliderDots) {
                    sliderDot.classList.remove('slider__dot_active');
                }
                sliderDots[i].classList.add('slider__dot_active');
            }
        });
    }
}




// sliderDots.forEach((sliderDot, i) => {
//     sliderDot.onclick = () => {
//         shownImage = i * 3;

//         setSlideWidth();
//         slideToImage(shownImage);

//         // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
//         // вынести в отдельную функцию
//         for (let sliderDot of sliderDots) {
//             sliderDot.classList.remove('slider__dot_active');
//         }
//         sliderDots[i].classList.add('slider__dot_active');
//     }
// })


