
const orderingImgCont = document.querySelector('.ordering__img-cont');
const orderingImgContOuter = document.querySelector('.ordering__img-cont-outer');
const ordering = document.querySelector('.ordering');
const orderingOuter = document.querySelector('.ordering-outer');

// ! selecting an <html> tag element - 3 ways:
// const html = document.getElementsByTagName('html')[0];
// const html = document.body.parentNode;
const html = document.querySelector(':root');

// let initScrollY;
function fullscreenSection() {
    // console.log(orderingImgCont);
    // console.log(ordering);
    // initScrollY = scrollY;
    html.style.scrollPaddingTop = 0;
    ordering.style.transition = '0.5s linear';
    ordering.scrollIntoView({ block: "center" });

    // orderingOuter.style.transition = '0.0s linear';
    // orderingOuter.style.height = '100vh';
    // window.scrollTo(0, 0);

    ordering.style.height = '100vh';
    ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.75)';

    // // убрал после добавления внешнего orderingOuter, который разворачивается без transition. Вернул после добавления небольшого transition = '0.2s' orderingOute-у  - для большей визуальной плавности
    setTimeout(() => {
        // без задержки не прокручивается до самого верха  блока (т.к. блок растёт медленней прокрутки)
        // ordering.scrollIntoView({ block: "center" });

        // window.scrollTo({ left: 0, top: (orderingOuter.offsetTop), behavior: 'instant' });
        window.scrollTo({ left: 0, top: (orderingOuter.offsetTop), behavior: 'instant' });

        // window.scroll({top: 0, left: 0, behavior: 'smooth' });

    }, 0);
}

orderingImgCont.addEventListener('mouseenter', fullscreenSection, { once: true });

orderingImgContOuter.onmouseleave = () => {
    orderingOuter.style.transition = '0.5s';


    setTimeout(() => {
        ordering.style.removeProperty('height');
        orderingOuter.style.removeProperty('height');
        ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.99)';
        //html.style.removeProperty('scrollPaddingTop'); // not applying((
        html.style.scrollPaddingTop = '4rem'; // 4rem - as in CSS

        setTimeout(() => {
            ordering.style.removeProperty('transition');
            orderingOuter.style.removeProperty('transition');
        }, 500);

        orderingImgCont.addEventListener('mouseenter', fullscreenSection, { once: true });

        // window.scrollTo(0, (ordering.offsetTop) - 60);
        // ordering.scrollIntoView({ block: "center" });


    }, 300);

}

