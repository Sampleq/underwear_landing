const btnMenuToggle = document.querySelector('.header__icon-menu');
const menu = document.querySelector('.header__menu');

function closeMenu(event) {
    if (event.target !== menu) {
        console.log('document.addEventListener click');
        menu.classList.remove('header__menu_mobile');
        document.removeEventListener('click', closeMenu);
        btnMenuToggle.addEventListener('click', openMenu);
    }
}

function openMenu() {
    console.log('btnMenuToggle.onclick');
    menu.classList.add('header__menu_mobile');
    btnMenuToggle.removeEventListener('click', openMenu);

    // вешаем листнер закрытия с задержкой т.к. если не сделать задержку листнер закрытия мгновенно повесится на документ и обработается клик который его же и повесил - меню откроется и закроется мгновенно - т.е. не откроется вообще
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 16);
}

btnMenuToggle.addEventListener('click', openMenu);
