"use strict";

require("es6-promise").polyfill(); // Иногда babel и core-js могут не дать нужный полифил и из-за этого сайт может сломаться. Для этого мы устанавливаем нужный нам полифил(в данном случае полифил для промисов. Это всё легко гуглиться). Они устанавливаются как отдельные npm пакеты и там всё указано как и что установить.
import "nodelist-foreach-polyfill"; // NodeList.forEach polyfill

// import "slick-slider";  import очень полезная штука. Мы можем устанавливать пакеты в npm пакет, а затем просто импортом брать их из npm папки. Это очень круто для слик слайдера например. Мы можем просто устанавливать пакет слик слайдера и подключить его в наш джс файл. А не устанавливать ещё один джс файл и по итогам у нас может быть много джс файлов. Это не совсем правильно. Мы хотим, чтобы у нас был один джс файл куда все подключается. 

import  tabs  from "./modules/tabs";
import  modal  from "./modules/modal";
import  calc  from "./modules/calc";
import  cards  from "./modules/cards";
import  forms  from "./modules/forms";
import  slider  from "./modules/slider";
import  timer  from "./modules/timer";
import { modalOpen } from "./modules/modal";
 

window.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => modalOpen(".modal", modalTimerId), 50000);
    
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalTimerId);
    calc();
    cards();
    forms("form", modalTimerId);
    slider({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        slide: ".offer__slide",
        totalCounter: "total",
        currentCounter: "current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    timer(".timer", "2024-11-11");
});

