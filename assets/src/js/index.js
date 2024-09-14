import { menuOpener } from "./_menu";
import { collapsableFAQ } from "./_collapsable";
import { fakeInputFile } from "./_fakeInputFile";
import { validateForm } from "./_validateForm";
import { Swiper } from "../js_libs/swiper-bundle.min";

menuOpener();

collapsableFAQ(document.querySelector('.faq__questions'));

fakeInputFile();

const form = document.forms.signing_form;
validateForm(form);




// console.log(Swiper);

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    speed: 500,
    spaceBetween: 28,
    slidesPerView: 1,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 28
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 28
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 28
        },
        // when window width is >= 1280px
        1280: {
            slidesPerView: 4,
            spaceBetween: 28
        }
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

