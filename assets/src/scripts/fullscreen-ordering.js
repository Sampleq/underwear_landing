
const orderingImgCont = document.querySelector('.ordering__img-cont');
const orderingImgContOuter = document.querySelector('.ordering__img-cont-outer');
const ordering = document.querySelector('.ordering');
const orderingOuter = document.querySelector('.ordering-outer');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

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
    ordering.style.transition = '0.5s';
    orderingOuter.style.transition = '0s';

    // orderingOuter.style.transition = '0.2s';

    ordering.scrollIntoView({ block: "center" });

    // ordering.scrollIntoView({ block: "center" });





    setTimeout(() => {
        // orderingOuter.style.position = 'fixed'


        // orderingOuter.style.height = '100vh';

        // ordering.style.height = '100vh';


        // html.style.scrollBehavior = 'smooth';
        // ordering.scrollIntoView({ block: "center" });

        html.style.scrollBehavior = 'auto';
        // orderingOuter.style.transition = '0.2s';
        orderingOuter.style.height = '100vh';
        ordering.style.height = '100vh';
        window.scrollBy(0, ((window.innerHeight - ordering.offsetHeight) / 2));

    }, 500);
}

orderingImgCont.addEventListener('mouseenter', fullscreenSection, { once: true });

orderingImgContOuter.onmouseleave = () => {
    // orderingOuter.style.transition = '0.5s';

    footer.style.height = '100vh';

    // html.style.scrollBehavior = 'smooth';
    orderingOuter.scrollIntoView({ block: "center" });

    // orderingOuter.style.transition = '0.5s';


    setTimeout(() => {
        ordering.style.removeProperty('height');

        orderingImgCont.addEventListener('mouseenter', fullscreenSection, { once: true });

        // document.body.style.overflow = 'hidden';
        // orderingOuter.style.removeProperty('height');

        setTimeout(() => {
            orderingOuter.style.removeProperty('height');

            // написать вместо 87 формулу
            // window.scrollTo(0, (html.scrollTop - 87));
            window.scrollTo(0, (html.scrollTop - 87));

            footer.style.removeProperty('height');


        }, 500);

        // setInterval(() => {
        //     orderingOuter.scrollIntoView({ block: "center" });
        // }, 16);
        // window.scrollTo(0, (html.scrollTop - 80));

    }, 300);

}

