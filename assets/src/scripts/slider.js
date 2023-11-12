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
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_2card"></div>');
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
const sliderDots = document.querySelectorAll('.slider__dot');

// делаем активной первую точку слайдера
sliderDots[0].classList.add('slider__dot_active');

// btnRight.onclick = () => {
//     sliderCardsCont.style.transform = 'translateX(' + 40 + 'rem);'
// }

sliderCardsCont.style.transition = '0.3s';
sliderWrapper.style.transition = '0.3s';

let shownImage = 0; // индекс отображаемой картинки (карточки)
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
    sliderWrapper.style.transform = 'translateX(-' + (shownImage * slideWidth) + 'rem)'
}


btnRight.onclick = () => {
    // 
    shownImage++;
    // задаём на какой карточке при листании вперёд нужно будет переходить к первой карточке, в зависимости от ширины экрана (т.е. кол-ва отображаемых карточек в окне слайдера)
    if (window.innerWidth < 825) {
        if (shownImage >= (sliderCards.length)) {
            shownImage = 0;
        };
    } else if (window.innerWidth < 1250) {
        if (shownImage >= (sliderCards.length - 1)) {
            shownImage = 0;
        };
    } else if (shownImage >= (sliderCards.length - 2)) {
        shownImage = 0;
    };

    setSlideWidth();
    slideToImage(shownImage);

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
    sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
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
    sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
}


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
})


