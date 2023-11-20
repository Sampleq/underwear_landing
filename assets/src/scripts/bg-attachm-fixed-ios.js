const ordering = document.querySelector('.ordering');
let scrolledY;
let offset;

// !!! скрипт тормозит на iPhone 6s, 11Pro и даже (немного) на MacBook Pro 2015 - добавил только для нагладности возможности реализации аналога background-attachment: fixed; через JS
function fixBgtoScreen() {
    scrolledY = scrollY;
    orderingOffset = ordering.offsetTop; // .offsetTop - расстояние в пикселях от элемента до верхней границы его родителя (т.е. расстояние от .ordering до начала body (т.е. страницы) )
    // console.log(scrolledY);
    // console.log(scrollY);
    // console.log(orderingOffset);

    // чисто для примерки
    // ordering.style.backgroundPosition = 'center ' + (scrolledY - 1850) + 'px';
    // console.log(scrolledY - 1850);
    // 1850 - вручную подобранный коэфф. смещения - по факту это расстояние от начала (верха) страницы до .ordering

    if (window.innerWidth >= 768) {
        ordering.style.backgroundPosition = 'center ' + (scrolledY - orderingOffset - Math.max((312 / window.innerWidth), 312)) + 'px';
        // console.log(scrolledY - orderingOffset);
        // 312 - коэфф для красивого отображения (подобран, т.к. JS даёт нам scrolledYи orderingOffset в пикселях. 1200 - ширина wrapper-a). т.е. тоже что и 26% в CSS для десктопа 312/1200 = 26%

    } else {
        ordering.style.backgroundPosition = 'center ' + (scrolledY - orderingOffset - (612 / window.innerWidth)) + 'px';
    }
    // ordering.style.backgroundPosition = `center calc(${(scrolledY - orderingOffset)}px - 26%)`; - в инлайновых стилях (которые создаёт JS) не работает CSS функция calc() - рассчитываем (выше) через JS )

}

// ordering.style.backgroundPosition = 'center ' + (scrolledY - orderingOffset - 314) + 'px';


// window.addEventListener('scroll', fixBgtoScreen)

const observerFixBg = new IntersectionObserver(
    function (entries) {
        if (entries[0].isIntersecting) {
            window.addEventListener('scroll', fixBgtoScreen)
            // window.onscroll = fixBgtoScreen;
        } else {
            window.removeEventListener('scroll', fixBgtoScreen)
            // window.onscroll = undefined;
        }
    }
)

observerFixBg.observe(ordering);