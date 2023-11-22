
const orderingImgCont = document.querySelector('.ordering__img-cont');
const orderingImgContOuter = document.querySelector('.ordering__img-cont-outer');
const ordering = document.querySelector('.ordering');
const orderingOuter = document.querySelector('.ordering-outer');
// const footer = document.querySelector('.footer');

// ! selecting an <html> tag element - 3 ways:
// const html = document.getElementsByTagName('html')[0];
// const html = document.body.parentNode;
const html = document.querySelector(':root');

function enterFullscreenSection() {
    // применяем разворачивание секции ordering на весь экран только если высота экрана больше высоты секции ordering
    if (window.innerHeight > ordering.offsetHeight) {

        // убираем паддинг прокрутки до элемента
        html.style.scrollPaddingTop = 0;
        // задаем плавность перехода блока с фоном (ordering)
        ordering.style.transition = '0.5s';
        // скроллим блок с фоном (ordering) в центр экрана
        ordering.scrollIntoView({ block: "center" });

        //задаём отсрочку в 0.5 секунды чтобы страница успела проскроллиться до блока с фоном (ordering) и/или отыгралась анимация увеличения картинки, после этого делаем анимацию разворачивания
        setTimeout(() => {
            // убираем плавность прокрутки (скроллинга) страницы, разворачиваем блок-обёртку на всю высоту экрана и скроллим до верхней границы блока-обёртки - все эти (три) действия происходят мгновенно - пользователь видит на экране только появление контента соседних блоков
            html.style.scrollBehavior = 'auto';
            orderingOuter.style.height = '100vh';
            window.scrollBy(0, ((window.innerHeight - ordering.offsetHeight) / 2));

            // разворачиваем блок с фоном (ordering) на всю высоту экрана (происходит с анимацией благодаря раннее присвоинному transition)
            ordering.style.height = '100vh';

            // делаем фоновую картинку более ясно видимой
            ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.75)';

            // orderingImgCont.addEventListener('mouseleave', exitFullscreenSection, { once: true });
            // вешаем слушатель события на блок-обёртку контейнера картинки (у него высота 100% родителя) - чтоб не было зацикленного разворачивания сворачивания при определённном положении курсора мыши и скролла страницы
            orderingImgContOuter.addEventListener('mouseleave', exitFullscreenSection, { once: true });

            // не БАГ а ФИЧА - если быстро (быстрее 0.5сек) убрать курсор с картинки - блок с фоном (ordering) останется развёрнутым на весь экран, при повторном наведении и убирании блок с фоном сворачивается - это не ломает сайт - оставил такую возможность пользователю обнаружить и совершать такое "переключение") 

            // возвращаем плавность скролла - на случай если пользователь будет пользоваться сайтом после использования "переключения" багофичей)
            html.style.scrollBehavior = 'smooth';
        }, 500);
    } else {
        // если высота экрана больше высоты блока с фоном (ordering) - только центрируем и вешаем однократный листнер - на случай увеличения высоты экрана (окна браузера) или повторного наведени после скролла
        ordering.scrollIntoView({ block: "center" });
        orderingImgCont.addEventListener('mouseenter', enterFullscreenSection, { once: true });
    }
}

// вешаем первоначальный однократный листнер для разворачивания блока с фоном (ordering)
orderingImgCont.addEventListener('mouseenter', enterFullscreenSection, { once: true });

function exitFullscreenSection() {
    // использовал для возмеожности прокрутки до верхней границы блока с фоном - после мгновн=енного разворачивания блока-обёртки блока с фоном - увеличение футера - не требуется
    // footer.style.height = '100vh';

    // возвращаем плавность скролла (на случай, если пользователь скроллил страницу с развернуым блоком с фоном)
    html.style.scrollBehavior = 'smooth';

    // задаём "нулевую" (16 мс = 1fps 60Hz) задержку чтобы сработало html.style.scrollBehavior = 'smooth'; - плавность скролла  - нужно было при разработке - сейчас - не требуется
    // setTimeout(() => {
    //прокручиваем блоком с фоном в центр экрана
    orderingOuter.scrollIntoView({ block: "center" });

    //задаём отсрочку в 0.5 секунды чтобы страница успела проскроллиться до блока с фоном (ordering) и/или отыгралась анимация увеличения картинки, после этого делаем анимацию разворачивания
    setTimeout(() => {
        // убираем высоту на весь экран у блока с фоном - происходит с анимацией за счёт transition 
        ordering.style.removeProperty('height');
        // делаём фоновую картинку обратно более блёклой
        ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.99)';

        // вешаем  однократный листнер для разворачивания блока с фоном (ordering)
        orderingImgCont.addEventListener('mouseenter', enterFullscreenSection, { once: true });

        // не требуется запрещать полдьзователю скролл страницы - глюков нет
        // document.body.style.overflow = 'hidden';

        // делаем задержку на время анимации сворачивания блока с фоном
        setTimeout(() => {
            // убираем плавность прокрутки (скроллинга) страницы, сворачиваем блок-обёртку и скроллим блок с фоном (ordering) в центр - все эти (три) действия происходят мгновенно - пользователь видит на экране только исчезание контента соседних блоков (в том числе за счёт одинакового цвета фона блока-обёртки и соседних блоков) 
            html.style.scrollBehavior = 'auto';
            orderingOuter.style.removeProperty('height');
            ordering.scrollIntoView({ block: "center" });

            // - увеличение футера - не требуется
            // footer.style.removeProperty('height');

            // возвращаем плавность скролла - для дальнейшего просмотра сайта
            html.style.scrollBehavior = 'smooth';
        }, 500);
    }, 500);
    // }, 16);
}

// orderingImgCont.addEventListener('mouseleave', exitFullscreenSection);

