const logoWebkit = document.querySelector('.main__logo');
const logoMixBlend = document.querySelector('.main__logo_mixblend');
const logoTranspMaskImg = document.querySelector('.main__logo_transp-mask-img');


function moveBg(element) {
    document.onmousemove = function (event) {
        element.style.backgroundPosition = (78 - 7 + (1.0 * event.clientX / 100)) + '% ' + (70 - 4 + (1.5 * event.clientY / 100)) + '%';
        element.style.backgroundSize = (135 - 3.5 + (event.clientX / 400) + 2 - (event.clientY / 400)) + '%';
    }
}

// "примеряемся" )
// logoWebkit.onclick = function () {
//     moveBg(this);
// };


const observer = new IntersectionObserver(
    function (entries) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                // применяем действие только когда больше половины (0.5) entry будет в зоне видимости - это убирает глюк, когда обе entry видны на экране
                if (entry.intersectionRatio > 0.5) {
                    // console.log(entry.target);
                    moveBg(entry.target);
                }
            } else {
                document.onmousemove = undefined;
            }
        }
    }, { threshold: [0, 0.5, 1] }
)
//  добавляем объекты для наблюдения (после объявления самого const observer)
observer.observe(logoWebkit);
observer.observe(logoMixBlend);
observer.observe(logoTranspMaskImg);