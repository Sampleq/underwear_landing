const ordering = document.querySelector('.ordering');
let scrolledY;
let offset;

window.onscroll = (e) => {
    scrolledY = scrollY;
    orderingOffset = ordering.offsetTop;
    console.log(scrolledY);
    // console.log(scrollY);
    console.log(orderingOffset);
    // ordering.style.backgroundPosition = 'center ' + (scrolledY - 1850) + 'px';
    ordering.style.backgroundPosition = 'center ' + (scrolledY - orderingOffset - 314) + 'px';
    console.log(scrolledY - 1850);
    console.log(scrolledY - orderingOffset);

    // ordering.style.backgroundPosition = 'center ' + (100) + 'px';
    // 1850 - вручную подобранный коэфф. смещения - по факту это расстояние от начала (верха) страницы до .ordering
    // 314 - коэфф для красивого отображения (т.е. тоже что и 15% в CSS для десктопа)
}

ordering.style.backgroundPosition = 'center ' + (scrolledY - orderingOffset - 314) + 'px';
