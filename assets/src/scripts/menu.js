const btnMenuToggle = document.querySelector('.header__icon-menu');
const menu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const nav = document.querySelector('.header__nav');
const catalog = document.querySelector('.header__catalog-menu');
const btnMobSubMenu = document.querySelector('.header__submenu-opener');
const btnCatDesktOpener = document.querySelector('.header__catalog')


function closeMenu(event) {
    //  объединил закрытие мобильного и десктоп меню в одну функцию без условий по ширине экрана - закрывает ВСË.
    if (event.target !== btnMobSubMenu) {
        // console.log('document.addEventListener click');
        menu.classList.remove('header__menu_mobile');
        catalog.classList.remove('header__catalog-menu_visible');
        nav.classList.remove('header__nav_mob-menu');
        catalog.classList.remove('header__catalog-menu_visible-desktop');
        btnMenuToggle.classList.remove('header__icon-menu_close');

        // возобновляем возможность прокрутки страницы при закрытии меню
        document.body.style.overflow = 'visible';

        // main.style.filter = 'none';

        document.removeEventListener('click', closeMenu);
        btnCatDesktOpener.addEventListener('click', openMenu, { once: true });
    }
}

function openMenu() {
    if (window.innerWidth < 768) {
        // console.log('btnMenuToggle.onclick');
        menu.classList.add('header__menu_mobile');

        // btnMenuToggle.removeEventListener('click', openMenu); не надо убирать т.к листнер вешался с { once: true }

        // перематывем страницу вверх (к меню) - на случай если меню откроют когда иконка меню уже  частично скрыта перемоткой
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // запрещаем прокрутку страницы при открытии меню
        // на iPhone всё равно можно прокрутить страницу - выглядит очень странно. - Делаем непрозрачный фиксированный фон в цвет и добавляем лого, дублируя HTML
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        // main.style.filter = 'contrast(0.01)';

        nav.classList.add('header__nav_mob-menu');
    } else {
        catalog.classList.add('header__catalog-menu_visible-desktop');
        btnMenuToggle.classList.add('header__icon-menu_close');
    }

    // вешаем листнер закрытия с задержкой т.к. если не сделать задержку листнер закрытия мгновенно повесится на документ и обработается клик который его же и повесил - меню откроется и закроется мгновенно - т.е. не откроется вообще
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 16);
}

// повесили этот листнер на btnCatDesktOpener
// btnMenuToggle.addEventListener('click', openMenu, { once: true });

btnMobSubMenu.onclick = () => {
    catalog.classList.toggle('header__catalog-menu_visible');
}

btnCatDesktOpener.addEventListener('click', openMenu, { once: true });


// повесить отдельный дублирующий листнер закрытия мобильного меню на кнопку закрытия моб.меню - на всякий случай  - не надо т.к. функция closeMenu закрывает ВСЕ меню - и мобильное и десктопное




// Если зарегистрировано несколько одинаковых EventListener-ов на одном EventTarget с одинаковыми параметрами, дублирующиеся слушатели игнорируются. Они не позволяют EventListener-у быть вызванным дважды, и так как одинаковые слушатели игнорируются, не требуется удалять их вручную с помощью метода removeEventListener. 
// То есть список разрастается потихоньку, что, конечно, не очень то хорошо, но события повторно не вызываются.
// https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener