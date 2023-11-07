const btnMenuToggle = document.querySelector('.header__icon-menu');
const menu = document.querySelector('.header__menu');

function closeMenu(event) {
    // if (event.target !== menu) {
    // console.log('document.addEventListener click');
    menu.classList.remove('header__menu_mobile');
    document.removeEventListener('click', closeMenu);
    btnMenuToggle.addEventListener('click', openMenu, { once: true });

    // убираем иконку закрытия (на случай если закрытие было кликом не по иконке)
    btnMenuToggle.classList.remove('header__icon-menu_close')
    // }
}

function openMenu() {
    // console.log('btnMenuToggle.onclick');
    menu.classList.add('header__menu_mobile');

    // btnMenuToggle.removeEventListener('click', openMenu); не надо убирать т.к листнер вешался с { once: true }

    // вешаем листнер закрытия с задержкой т.к. если не сделать задержку листнер закрытия мгновенно повесится на документ и обработается клик который его же и повесил - меню откроется и закроется мгновенно - т.е. не откроется вообще
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 16);
}

btnMenuToggle.addEventListener('click', openMenu, { once: true });

btnMenuToggle.onclick = () => {
    btnMenuToggle.classList.toggle('header__icon-menu_close')
}





// Если зарегистрировано несколько одинаковых EventListener-ов на одном EventTarget с одинаковыми параметрами, дублирующиеся слушатели игнорируются. Они не позволяют EventListener-у быть вызванным дважды, и так как одинаковые слушатели игнорируются, не требуется удалять их вручную с помощью метода removeEventListener. 
// То есть список разрастается потихоньку, что, конечно, не очень то хорошо, но события повторно не вызываются.
// https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener