// создаём точки слайдера
const sliderCards = document.querySelectorAll('.slider__card');
const divSliderDots = document.querySelector('.slider__dots');

function createSliderDots() {
    let i = 0;
    while (i < (sliderCards.length / 3)) {
        // divSliderDots.appendChild(sliderDot); - не добавляет один и тот же элемент больше одного раза
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot"></div>');
        i++;
        // console.log(i);
    }

    // добавляем точки для версий сладера с двумя карточками на экране - в дополнение к уже созданным точкам. 
    // продолжаем счётчик i, отредактировав условие while - указав сколько точек должно быть в итоге 
    while (i < (sliderCards.length / 2)) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_2card"></div>');
        i++;
        // console.log(i);
    }

    // добавляем точки для версий сладера с одной карточкой на экране
    while (i < sliderCards.length) {
        divSliderDots.insertAdjacentHTML("beforeend", '<div class="slider__dot slider__dot_1card"></div>');
        i++;
        // console.log(i);
    }

}
createSliderDots();

// функционал слайдера
const btnLeft = document.querySelector('.btn_arrow_l');
const btnRight = document.querySelector('.btn_arrow_r');
const sliderCardsCont = document.querySelector('.slider__cards-cont');
const sliderWrapper = document.querySelector('.slider__wrapper');
let sliderDots = document.querySelectorAll('.slider__dot');

// делаем активной первую точку слайдера
sliderDots[0].classList.add('slider__dot_active');

sliderCardsCont.style.transition = '0.3s';
sliderWrapper.style.transition = '0.3s';

let shownImage = 0; // задаём индекс отображаемой картинки (карточки) - (при загрузке страницы отображается первая карточка, её индекс 0 )
let slideWidth; // расстояние сдвига карточек при листании (ширина карточки + расстояние между карточками)

function setSlideWidth() {
    if (window.innerWidth < 375) {
        slideWidth = 27.3 + 2.4; //ширина карточки + расстояние между карточками
    } else if (window.innerWidth < 425) {
        slideWidth = 27.3 + 2.4; //ширина карточки + расстояние между карточками
    } else {
        slideWidth = 27.3 + 2.4; //ширина карточки + расстояние между карточками
    }
}
setSlideWidth();

function slideToImage(shownImage, manualSlideDist = 0) {
    //смещаем внутреннюю обёртку карточек внутри внешней с overflow:hidden; ("окошка") 
    sliderWrapper.style.transform = 'translateX(' + ((-(shownImage * slideWidth)) + ((manualSlideDist) / 10)) + 'rem)';
}

function removeSliderDotActive() {
    for (let sliderDot of sliderDots) {
        sliderDot.classList.remove('slider__dot_active');
    }
}

function slideToLeft() {
    shownImage--; // уменьшаем индекс отображаемой картинки на 1 (т.к. мы листаем вправо)

    // задаём на какую карточку при листании назад с первой краточки нужно будет переходить, в зависимости от ширины экрана (т.е. кол-ва отображаемых карточек в окне слайдера)
    if (window.innerWidth < 825) {
        if (shownImage < 0) {
            shownImage = (sliderCards.length - 1);
        };
    } else if (window.innerWidth < 1250) {
        if (shownImage < 0) {
            shownImage = (sliderCards.length - 2);
        };
    } else if (shownImage < 0) {
        shownImage = (sliderCards.length - 3);
    };

    // console.log(shownImage);

    setSlideWidth();
    slideToImage(shownImage);

    removeSliderDotActive();

    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его)
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        // console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            // console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');
        }
        else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            // console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }
}

function slideToRight() {
    shownImage++; // увеличиваем индекс отображаемой картинки на 1 (т.к. мы листаем вправо)
    // задаём на какой карточке при листании вперёд нужно будет переходить к первой карточке, в зависимости от ширины экрана (т.е. кол-ва отображаемых карточек в окне слайдера)
    if (window.innerWidth < 825) {
        if (shownImage >= (sliderCards.length)) {
            shownImage = 0;
        }
    } else if (window.innerWidth < 1250) {
        if (shownImage >= (sliderCards.length - 1)) {
            shownImage = 0;
        }
    } else if (shownImage >= (sliderCards.length - 2)) {
        shownImage = 0;
    }

    setSlideWidth();
    slideToImage(shownImage);

    removeSliderDotActive();

    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его)
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        // console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            // console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');

        } else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            // console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }
}

btnRight.onclick = slideToRight;
btnLeft.onclick = slideToLeft;




// при наведении (вхождении курсора мыши - т.е. однократно) на контейнер с точками (divSliderDots - .slider__dots) в зависимости от window.innerWidth создаем массив только из отображаемых точек и присваиваем точкам (из вновь созданного массива sliderDots) действие перелистывания слайдера по клику:
function turnOnSliderDots() {

    removeSliderDotActive();
    // в зависимости от ширины экрана (и кол-ва отображаемых точек) добавляем только отображаемые точки в массив (перезаписывая его):
    // for 1-card slider (window.innerWidth < 825)
    if (window.innerWidth < 825) {
        sliderDots = divSliderDots.querySelectorAll('.slider__dot');
        // console.log(sliderDots);
        sliderDots[shownImage].classList.add('slider__dot_active');
    }
    else
        // for 2-card slider (window.innerWidth < 1250)
        if (window.innerWidth < 1250) {
            sliderDots = divSliderDots.querySelectorAll('.slider__dot:not(.slider__dot_1card)');
            // console.log(sliderDots);
            sliderDots[Math.floor(shownImage / 2)].classList.add('slider__dot_active');
        }
        else {
            // for 3-card slider (window.innerWidth > 1250)
            sliderDots = divSliderDots.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)");
            // console.log(sliderDots);
            sliderDots[Math.round(shownImage / 3)].classList.add('slider__dot_active');
        }

    // присваиваем точкам (из вновь созданного массива sliderDots) действие перелистывания слайдера по клику
    sliderDots.forEach((sliderDot, i) => {
        sliderDot.onclick = () => {
            if (window.innerWidth < 825) {
                shownImage = i;
            } else if (window.innerWidth < 1250) {
                shownImage = i * 2;
            } else {
                shownImage = i * 3;
            }
            setSlideWidth();
            slideToImage(shownImage);

            // убираем со всех точек класс slider__dot_active и вешаем его на ту точку, по которой кликнули
            removeSliderDotActive();
            sliderDots[i].classList.add('slider__dot_active');
        }
    });
}

turnOnSliderDots();

divSliderDots.onmouseenter = turnOnSliderDots;
divSliderDots.ontouchstart = turnOnSliderDots;



// MOUSE DRAG touch slider

let xStart;
let xEnd;
let xCurr;
let distanceX; // расстояние между нажатием и отжатием мышки
let xDrag; //  расстояние между нажатием и убиранием указателя мыши за пределы sliderWrapper

let outBounds; // маркер что мы не отжали мышку над sliderWrapper а убрали указатель за его пределы

sliderWrapper.onmousedown = (e) => {
    // e.preventDefault(); // чтоб не перетягивалась картинка -  от этого "зависал" на ПК. :hover на карточке - переделал через CSS: .card__img {pointer-events: none;}
    // e.stopPropagation();
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    xStart = e.clientX;
    // console.log(xStart);
    outBounds = true;

    sliderWrapper.style.transition = '0.016s';

    setSlideWidth();
    sliderWrapper.onmousemove = (e) => {
        xCurr = e.clientX;
        xDrag = (xCurr - xStart) * 1.5; // 1.5 - коэфф. увеличения "движения мыши"
        // console.log(xDrag);
        // console.log(((shownImage * slideWidth) - (xDrag / 10)));
        sliderWrapper.style.transform = 'translateX(' + ((-(shownImage * slideWidth)) + (xDrag / 10)) + 'rem)';
        // slideToImage(manualSlideDist = xDrag);
    }
}

function slideByDrag(distanceX) {
    if (distanceX < ((-slideWidth / 2) * 10) * 0.4) {
        slideToRight();
        if (distanceX < ((-3 * slideWidth / 2) * 10) * 0.9) {
            slideToRight();
        }
    } else {
        if (distanceX > ((slideWidth / 2) * 10) * 0.4) {
            slideToLeft();
            if (distanceX > ((3 * slideWidth / 2) * 10) * 0.9) {
                slideToLeft();
            }
        } else {
            sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
        }
    }
}

sliderWrapper.onmouseup = (e) => {
    outBounds = false;  // сбрасываем маркер что мышь не отжали над sliderWrapper
    sliderWrapper.style.transition = '0.3s';
    //e.preventDefault(); // чтоб не перетягивалась картинка
    xEnd = e.clientX;
    // console.log(xEnd);
    distanceX = (xEnd - xStart) * 1.5; // 1.5 - коэфф. увеличения "движения мыши"
    // console.log(distanceX);
    slideByDrag(distanceX);
    // убираем следование карточек за указателем мыши
    sliderWrapper.onmousemove = undefined;

}

sliderWrapper.onmouseleave = () => {
    if (outBounds === true) {

        slideByDrag(xDrag);

        outBounds = false;  // т.к. мы уже выполнили необходимое действие, поэтому сбрасываем маркер что мышь не отчали над sliderWrapper
        sliderWrapper.style.transition = '0.3s';

        sliderWrapper.onmousemove = undefined;
    }
}

//
//  TOUCH SCREENS touch slider

//https://css-tricks.com/simple-swipe-with-vanilla-javascript/
// https://codepen.io/thebabydino/pen/QQRwRy/

//https://stackoverflow.com/questions/62823062/adding-a-simple-left-right-swipe-gesture

let touchStartX;
let touchStartY;
let touchEndX;
let touchCurrX;
let touchCurrY;
let touchDistanceX; // расстояние между началом и окончанием касания
let touchDragX; //  расстояние между  началом касания и текущим касанием или из-за выхода за пределы sliderWrapper
let touchDragY;

let noScroll;

const slider = document.querySelector('.slider');

// let currWindowScrollY;

slider.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    //event.preventDefault();// блокирует скроол страницы на айфоне при касании слайдера - не очень удобно

    // currWindowScrollY = window.scrollY;

    // to remove stucked hover on iphone
    for (let sliderCard of sliderCards) {
        sliderCard.classList.remove('card_no-hover');
    }
    sliderWrapper.style.transition = '0.016s';
    setSlideWidth();

    // console.log(window.scrollY);
    document.body.ontouchmove = (event) => {
        touchCurrX = event.changedTouches[0].screenX;
        touchCurrY = event.changedTouches[0].screenY;
        touchDragX = (touchCurrX - touchStartX) * 1.5; // 1.5 - коэфф. увеличения "движения касания"
        // slideToImage(manualSlideDist = xDrag);

        touchDragY = touchCurrY - touchStartY;

        // if (Math.abs(touchDragX) > 10) {
        if (Math.abs(touchDragX) > (0.75 * Math.abs(touchDragY))) {
            document.body.style.overflow = 'hidden';
            sliderWrapper.style.transform = 'translateX(' + ((-(shownImage * slideWidth)) + (touchDragX / 10)) + 'rem)';

        } else {

            document.body.style.overflow = 'visible';
            // document.body.style.position = 'relative';

            sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';

        }
    }

    // Чтобы при скролле страницы не листался слайдер (выглядит странно) - при событии скролла снимаем слушатель touchmove.
    document.body.onscroll = () => {
        // console.log('document.body.onscroll fires')
        document.body.ontouchmove = undefined;
    }

    // }
    // noScroll = setTimeout(() => {
    //     document.body.style.overflow = 'hidden'
    // }, 135);
}, false);

slider.addEventListener('touchend', function (event) {
    sliderWrapper.style.transition = '0.3s';
    touchEndX = event.changedTouches[0].screenX;
    touchDistanceX = (touchEndX - touchStartX) * 1.5; // 1.5 - коэфф. увеличения "движения касания"
    slideByDrag(touchDistanceX);
    // убираем следование карточек за касанием
    document.body.ontouchmove = undefined

    // to remove stucked hover on iphone
    for (let sliderCard of sliderCards) {
        sliderCard.classList.add('card_no-hover');
    }

    // clearTimeout(noScroll);
    document.body.style.overflow = 'visible';


}, false);

slider.addEventListener('touchcancel', function (event) {

    // clearTimeout(noScroll);
    document.body.style.overflow = 'visible';
}, false);

// 
// Выравниваем слайды после изменения ориентации (поворота) экрана (без этого слайды становятся криво, пока не пролистаешь вручную)
// 
// Детектирование изменения ориентации экрана (три (3) способа):
// чисто через JS 
// if (screen.orientation === true) {
// if (screen.orientation) {
//     // Не работает на iOS ((
//     screen.orientation.addEventListener("change", () => {
//         // ставим задержку -  без задержки слайды не выравниваются
//         setTimeout(() => {
//             // (заново) рассчитываем ширину сдвига (с отсрочкой после поворота экрана)
//             setSlideWidth();
//             // сдвигаем на текущий слайд
//             sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
//             console.log('screen orient change');
//         }, 133);
//     });
// } else {
//     console.log("device doesn't support screen.orientation")

//     // работает на iOS )
//     window.addEventListener("orientationchange", function () {
//         // ставим задержку -  без задержки слайды не выравниваются
//         setTimeout(() => {
//             // (заново) рассчитываем ширину сдвига (с отсрочкой после поворота экрана)
//             setSlideWidth();
//             // сдвигаем на текущий слайд
//             sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
//         }, 133);
//         //  // выводим тех. информацию
//         // console.log('aligned slider');
//         // if (window.orientation == 0 || window.orientation == 180) {
//         //     console.log('screen orient change - IN PORTRAIT MODE');
//         // } else {
//         //     console.log('screen orient change - IN LANDSCAPE MODE');
//         // }
//     }, false);
// }
// 
// через мониторинг медиа запроса - @media screen and (orientation: portrait) - с помощью JS - универсальный метод (но детектируется только факт изменения, без свойств - угол и т.д.)
let portrait = window.matchMedia("(orientation: portrait)");
portrait.addEventListener("change", function (e) {
    setTimeout(() => {
        // (заново) рассчитываем ширину сдвига (с отсрочкой после поворота экрана)
        setSlideWidth();
        // сдвигаем на текущий слайд
        sliderWrapper.style.transform = 'translateX(' + (-(shownImage * slideWidth)) + 'rem)';
    }, 133);
    if (e.matches) {
        console.log(' // Portrait mode');
    } else {
        console.log('  // Landscape');
    }
})
// https://dev.to/smpnjn/how-to-detect-device-orientation-with-javascript-29e5
// https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation

// Убрать БАГ с зависающим ховером на iPhone при перелистывании - сделано через ('card_no-hover');

//
// Slide with Buttons
function slideWithButtons(e) {
    // console.log(e);
    if (e.key === 'ArrowRight') {
        slideToRight();
    } else if (e.key === 'ArrowLeft') {
        slideToLeft();
    }
}

function slowerSlideWithButtons(e) {
    slideWithButtons(e);
    setTimeout(() => {
        document.addEventListener('keydown', slowerSlideWithButtons, { once: true });
    }, 300);
}

document.addEventListener('keydown', slowerSlideWithButtons, { once: true });



//
// https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/
// // solution for preventing scrolling on iOS - still glitchy  - needs at least prevent page reload by pulling  from top to the very down
// // src/utils/scroll-lock.js
// const $body = document.querySelector('body');
// let scrollPosition = 0;

// export default {
//   enable() {
//     scrollPosition = window.pageYOffset;
//     $body.style.overflow = 'hidden';
//     $body.style.position = 'fixed';
//     $body.style.top = `-${scrollPosition}px`;
//     $body.style.width = '100%';
//   },
//   disable() {
//     $body.style.removeProperty('overflow');
//     $body.style.removeProperty('position');
//     $body.style.removeProperty('top');
//     $body.style.removeProperty('width');
//     window.scrollTo(0, scrollPosition);
//   }
// };

// 
// Here's a work around for iOS Safari.
// Since iOS Safari prevents attaching the overflow property to the body tag, you can use the position: fixed attribute. Trouble with position: fixed is that when you want to remove the attribute (or make the body scrollable again) the page jumps back up to the top. To fix this, you can use window.scrollTo() to scroll the page back to where the user last scrolled to. Below is the code:

//     lockBackground = ({menuOpen}) => {
//         if (menuOpen) {
//             const offsetY = window.pageYOffset;
//             document.body.style.top = `${-offsetY}px`;
//             document.body.classList.add('js-lock-position');

//         } else {
//             const offsetY = Math.abs(parseInt(document.body.style.top || 0, 10));
//             document.body.classList.remove('js-lock-position');
//             document.body.style.removeProperty('top');
//             window.scrollTo(0, offsetY || 0);
//         }
//     }

//    .js-lock-position {
//      position: fixed;
//      overflow: hidden;
//    }
// Comment 44
// https://bugs.webkit.org/show_bug.cgi?id=153852

// 
// body-scroll-lock library (not tested with slider -declared "works with everything")
// https://www.npmjs.com/package/body-scroll-lock
// https://medium.com/jsdownunder/locking-body-scroll-for-all-devices-22def9615177

// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi