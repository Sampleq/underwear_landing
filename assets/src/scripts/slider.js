const btnLeft = document.querySelector('.btn_arrow_l');
const btnRight = document.querySelector('.btn_arrow_r');
const sliderCardsCont = document.querySelector('.slider__cards-cont');
const sliderWrapper = document.querySelector('.slider__wrapper');
const sliderCards = document.querySelectorAll('.slider__card');
const sliderDots = document.querySelectorAll('.slider__dot');

// btnRight.onclick = () => {
//     sliderCardsCont.style.transform = 'translateX(' + 40 + 'rem);'
// }

sliderCardsCont.style.transition = '0.3s';
sliderWrapper.style.transition = '0.3s';
console.log(btnRight);


const slideWidth = 38.4 + 2.4;

let shownImage = 0

function slideToImage(shownImage) {
    sliderWrapper.style.transform = 'translateX(-' + (shownImage * slideWidth) + 'rem)'
}

btnRight.onclick = () => {
    // shownImage -= slideWidth;
    // sliderCardsCont.style.transform = 'translateX(' + (shownImage) + 'rem)'
    shownImage++;
    if (shownImage >= (sliderCards.length - 2)) {
        shownImage = 0;
    }
    slideToImage(shownImage);

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
    sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
}

btnLeft.onclick = () => {
    // shownImage += slideWidth;
    // sliderCardsCont.style.transform = 'translateX(' + (shownImage) + 'rem)'
    shownImage--;
    if (shownImage < 0) {
        shownImage = (sliderCards.length - 3);
    }
    console.log(shownImage);
    slideToImage(shownImage);

    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
    sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
}


sliderDots.forEach((sliderDot, i) => {
    sliderDot.onclick = () => {
        shownImage = i * 3;
        slideToImage(shownImage);
        for (let sliderDot of sliderDots) {
            sliderDot.classList.remove('slider__dot_active');
        }
        sliderDots[i].classList.add('slider__dot_active');
    }
})