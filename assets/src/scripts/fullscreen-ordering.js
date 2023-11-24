
const orderingImgCont = document.querySelector('.ordering__img-cont');
const orderingImgContOuter = document.querySelector('.ordering__img-cont-outer');
const ordering = document.querySelector('.ordering');
const orderingOuter = document.querySelector('.ordering-outer');
const footer = document.querySelector('.footer');

let orderingInitHeight;

// создаём тег style в HEAD - вутри него можно применять и изменять сойства для псевдоэлементов
// let styleElem = document.head.appendChild(document.createElement("style"));

// ! selecting an <html> tag element - 3 ways:
// const html = document.getElementsByTagName('html')[0];
// const html = document.body.parentNode;
const html = document.querySelector(':root');

function enterFullscreenSection() {
    // применяем разворачивание секции ordering на весь экран только если высота экрана больше высоты секции ordering
    if (window.innerHeight > ordering.offsetHeight) {

        // убираем паддинг прокрутки до элемента
        html.style.scrollPaddingTop = 0;

        // // задаем плавность перехода блока с фоном (ordering)
        // убрал transition для блока с фоном - т.к. анимированое разворачивание происходит за счёт бордеров внешнего блока-обёртки
        // ordering.style.transition = '0.5s';

        // из CSS ((100vh - 50vh) / 2) = 25vh . 50vh - это высота ordering (и orderingOuter)
        footer.style.height = '25vh';

        // скроллим блок с фоном (ordering) в центр экрана
        ordering.scrollIntoView({ block: "center" });

        //задаём отсрочку в 0.5 секунды чтобы страница успела проскроллиться до блока с фоном (ordering) и/или отыгралась анимация увеличения картинки, после этого делаем анимацию разворачивания
        setTimeout(() => {
            // убираем плавность прокрутки (скроллинга) страницы, разворачиваем блок-обёртку на всю высоту экрана и cкроллим блок обертку в центр экрана (т.е. он займёт весь экран) - все эти (три) действия происходят мгновенно - пользователь видит на экране только появление контента соседних блоков
            html.style.scrollBehavior = 'auto';
            orderingOuter.style.height = '100vh';

            // Записываем в переменную orderingInitHeight текущую высоту блока с фоном (ordering)
            orderingInitHeight = ordering.offsetHeight;
            // задаём блоку-обёртке orderingOuter верхний и нижний бордеры (с цветом в цвет соседей) такой высоты, чтобы блок с фоном (ordering) оказался точно в центре блоку обёртки - (т.е. ка бы закрываем створки ограничивающие внутренний блок)
            orderingOuter.style.borderTop = ((window.innerHeight - ordering.offsetHeight) / 2) + 'px solid #FFEEEF';
            orderingOuter.style.borderBottom = ((window.innerHeight - ordering.offsetHeight) / 2) + 'px solid #FFEEEF';


            //  убрал - т.к. это работало без глюка только до 1440х900
            // window.scrollBy(0, ((window.innerHeight - ordering.offsetHeight) / 2));
            // !!! нужно временно добавить высоты футеру ( и с задержкой убрать в этой же функции) чтобы не было "скачка" на больших разрешениях, где нельзя промотать ordering.scrollIntoView({ block: "center" }); ( добавлять до line 22) в центр экрана !!!
            orderingOuter.scrollIntoView({ block: "center" });


            // разворачиваем блок с фоном (ordering) на всю высоту экрана (происходит с анимацией благодаря раннее присвоенному transition  - убрал transition  чтобы было меньше исполняемых анимация т.к. уже используем бордеры с transition)
            ordering.style.height = '100vh';


            // Добавляем плавность (transition  = '0.5s') orderingOuter - и убираем бордеры. после завершения transition (т.е. через 0.5сек) - убираем
            setTimeout(() => {
                orderingOuter.style.transition = '0.5s';
                setTimeout(() => {
                    orderingOuter.style.transition = '0.0s';
                }, 500);
                // Убираем  в ноль бордеры, закрывающие блок с фоном (происходит с анимацией благодаря раннее присвоенному (на 0.5сек) transition)
                orderingOuter.style.borderTop = '0px solid #FFEEEF';
                orderingOuter.style.borderBottom = '0px solid #FFEEEF';
            }, 0);

            // делаем фоновую картинку более ясно видимой
            // ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.75)';
            // меняем значение переменной CSS - изменится значение свойства у псевдоэлемента (оно задано переменной CSS)
            ordering.style.setProperty('--orderingBGColor', 'rgba(240, 237, 243, 0.75)');
            //  изменяем стиль псевжоэлемента меняя содержимое тега style в head-е
            // styleElem.innerHTML = '.ordering::before {transition: 0.5s; background-color: rgba(240, 237, 243, 0.75)}'


            // orderingImgCont.addEventListener('mouseleave', exitFullscreenSection, { once: true });
            // вешаем слушатель события на блок-обёртку контейнера картинки (у него высота 100% родителя) - чтоб не было зацикленного разворачивания сворачивания при определённном положении курсора мыши и скролла страницы
            orderingImgContOuter.addEventListener('mouseleave', exitFullscreenSection, { once: true });

            // не БАГ а ФИЧА - если быстро (быстрее 0.5сек) убрать курсор с картинки - блок с фоном (ordering) останется развёрнутым на весь экран, при повторном наведении и убирании блок с фоном сворачивается - это не ломает сайт - оставил такую возможность пользователю обнаружить и совершать такое "переключение") 

            // возвращаем плавность скролла - на случай если пользователь будет пользоваться сайтом после использования "переключения" багофичей)
            html.style.scrollBehavior = 'smooth';

            // возвращаем футер к нормальному размеру, пересчитывая высоту по макету  133px (или 13.5rem) в vh. 10 - это размер шрифта в HTML (переделать в переменную и брать из CSS!!!)
            // htmlFontSize = getComputedStyle(html).getPropertyValue('font-size');
            // htmlFontSize = getComputedStyle(html).fontSize.replace(/[^0-9]/g, ""); // - OK! Lasts only digits and replace all else non-digits with nothing
            htmlFontSize = getComputedStyle(html).fontSize.replace(/\D/g, ""); // - OK! Replace all leading non-digits with nothing - more common way
            // console.log(htmlFontSize);
            footer.style.height = `${100 * (13.3 * htmlFontSize) / window.innerHeight}vh`;

            // // масштабирование псевдоэлемента с фоном тормозит на MacBook Pro 2015 - не применяем
            // document.onmousemove = function (event) {
            //     // styleElem.innerHTML = '.ordering::before {transform: scale(' + ((1.2 + (1.0 * event.clientX / 10000)) - (event.clientY / 8000)) + ')}'
            //     let transformBgBefore = 'scale(' + ((1.1 + (1.0 * event.clientX / 15000)) - (event.clientY / 10000)) + ')'

            //     ordering.style.setProperty('--transformBgBefore', transformBgBefore);
            // }
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
    //  для возможности прокрутки блока с фоном в центр экрана (на больших экранах) - после мгновенного сворачивания блока-обёртки блока с фоном - 
    footer.style.transition = '0.5s';
    // из CSS ((100vh - 50vh) / 2) = 25vh . 50vh - это высота ordering (и orderingOuter)
    footer.style.height = '25vh';

    // возвращаем плавность скролла (на случай, если пользователь скроллил страницу с развернуым блоком с фоном)
    html.style.scrollBehavior = 'smooth';

    // задаём "нулевую" (16 мс = 1fps 60Hz) задержку чтобы сработало html.style.scrollBehavior = 'smooth'; - плавность скролла  - нужно было при разработке - сейчас - не требуется
    // setTimeout(() => {
    //прокручиваем блоком с фоном в центр экрана
    orderingOuter.scrollIntoView({ block: "center" });

    //задаём отсрочку в 0.5 секунды чтобы страница успела проскроллиться до блока с фоном (ordering) и/или отыгралась анимация увеличения картинки, после этого делаем анимацию разворачивания
    setTimeout(() => {
        // убираем высоту на весь экран у блока с фоном - происходит с анимацией за счёт transition  - убрал transition чтобы было меньше исполняемых анимация т.к. уже используем бордеры с transition
        ordering.style.removeProperty('height');

        // делаём фоновую картинку обратно более блёклой
        // ordering.style.backgroundColor = 'rgba(240, 237, 243, 0.99)';
        // меняем значение переменной CSS - изменится значение свойства у псевдоэлемента (оно задано переменной CSS)
        ordering.style.setProperty('--orderingBGColor', 'rgba(240, 237, 243, 0.99)');
        // изменяем стиль псевжоэлемента меняя содержимое тега style в head-е
        // styleElem.innerHTML = '.ordering::before {transition: 0.5s; background-color: rgba(240, 237, 243, 0.99)}'


        // плавно возвращаем размер ограничивающих фон бордеров до первоначального состояния (используя сохранённое в переменную orderingInitHeight значение высоты блока с фоном (ordering) в момент старта разворачивания)
        setTimeout(() => {
            orderingOuter.style.transition = '0.5s';
            setTimeout(() => {
                orderingOuter.style.transition = '0.0s';
            }, 490);
            orderingOuter.style.borderTop = ((window.innerHeight - orderingInitHeight) / 2) + 'px solid #FFEEEF';
            orderingOuter.style.borderBottom = ((window.innerHeight - orderingInitHeight) / 2) + 'px solid #FFEEEF';
        }, 0);

        // вешаем  однократный листнер для разворачивания блока с фоном (ordering) - теперь на событие 'mousemove' - чтобы не было глюка с повторным проигрыванием анимации после скрола из-за попадания неподвижного указателя мыши на картинку
        orderingImgCont.addEventListener('mousemove', enterFullscreenSection, { once: true });

        // не требуется запрещать полдьзователю скролл страницы - глюков нет
        // document.body.style.overflow = 'hidden';

        // делаем задержку на время анимации сворачивания блока с фоном
        setTimeout(() => {
            // убираем плавность прокрутки (скроллинга) страницы, сворачиваем блок-обёртку (убирая бордеры) и скроллим блок с фоном (ordering) в центр - все эти действия происходят мгновенно - пользователь видит на экране только появление контента соседних блоков (в том числе за счёт одинакового цвета фона блока-обёртки и соседних блоков) 
            html.style.scrollBehavior = 'auto';
            orderingOuter.style.removeProperty('height');

            orderingOuter.style.borderTop = '0px solid #FFEEEF';
            orderingOuter.style.borderBottom = '0px solid #FFEEEF';

            ordering.scrollIntoView({ block: "center" });

            // footer.style.height = '13.5rem';
            // возвращаем футер к нормальному размеру, пересчитывая высоту по макету  133px в vh. 10 - это размер шрифта в HTML (переделать в переменную и брать из CSS!!!)
            footer.style.height = `${100 * (13.3 * htmlFontSize) / window.innerHeight}vh`;

            // возвращаем плавность скролла - для дальнейшего просмотра сайта
            html.style.scrollBehavior = 'smooth';
        }, 500);
    }, 500);
    // }, 16);
}

// orderingImgCont.addEventListener('mouseleave', exitFullscreenSection);

