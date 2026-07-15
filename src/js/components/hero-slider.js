import Swiper from "swiper";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

export function initHeroSlider() {
  const slider = document.querySelector("[data-hero-slider]");

  if (!slider) {
    return null;
  }

  const swiperElement = slider.querySelector(".hero-slider__swiper");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return new Swiper(swiperElement, {
    modules: [A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination],
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: prefersReducedMotion ? 0 : 700,
    autoplay: prefersReducedMotion
      ? false
      : {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      prevEl: slider.querySelector(".hero-slider__button--prev"),
      nextEl: slider.querySelector(".hero-slider__button--next"),
      addIcons: false,
    },
    pagination: {
      el: slider.querySelector(".hero-slider__pagination"),
      clickable: true,
      bulletElement: "button",
      renderBullet(index, className) {
        return `<button class="${className}" type="button" aria-label="Перейти к слайду ${index + 1}"></button>`;
      },
    },
    a11y: {
      prevSlideMessage: "Предыдущий слайд",
      nextSlideMessage: "Следующий слайд",
      paginationBulletMessage: "Перейти к слайду {{index}}",
      containerMessage: "Промо-предложения",
      containerRoleDescriptionMessage: "Карусель",
      itemRoleDescriptionMessage: "Слайд",
      slideLabelMessage: "{{index}} из {{slidesLength}}",
    },
  });
}
