/**
 * You may import this file via the `script` shortcode into your base.njk layout file for sitewide scripts or create other files and import them into a specific site template.
 * You can install node modules via npm and import them here, or import other functions you wrote, e.g.:
 * `import gsap from 'gsap';`
 * `import { myFunction } from './myFunction';`
 */

import "./decoline.js";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const swiper = new Swiper(".stories-slider__content", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
});
