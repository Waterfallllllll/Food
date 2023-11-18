/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
  //Calc

  const calcRes = document.querySelector(".calculating__result span");
  let sex = "female",
    height,
    weight,
    age,
    ratio = 1.375;
  if (!localStorage.getItem("sex")) {
    localStorage.setItem("sex", "female");
  }
  if (!localStorage.getItem("ratio")) {
    localStorage.setItem("ratio", 1.375);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);
    elements.forEach(e => {
      e.classList.remove(activeClass);
      if (e.getAttribute("id") === localStorage.getItem("sex")) {
        e.classList.add(activeClass);
      }
      if (e.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        e.classList.add(activeClass);
      }
    });
  }
  initLocalSettings("#gender", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big", "calculating__choose-item_active");
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      calcRes.textContent = "____";
      return;
    }
    if (sex == "male") {
      calcRes.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    } else {
      calcRes.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(item => {
      item.addEventListener("click", e => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }
        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", e => {
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }
      if (e.target.getAttribute("id") == "height") {
        height = +input.value;
      } else if (e.target.getAttribute("id") == "weight") {
        weight = +input.value;
      } else {
        age = +input.value;
      }
      calcTotal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards() {
  // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length == 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
      this.parentSelector.append(element);
    }
  }

  // const div = new MenuCard();
  // div.render();

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      // Деструктуризация объекта
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });

  // axios.get("http://localhost:3000/menu")
  //     .then(data => data.data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризация объекта. Обращаемся к тем данным которые мы получили от библиотеки axios.
  //         new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  //     }));

  // Этот метод не использует классы, а просто формирует верстку на лету.
  // getResource('http://localhost:3000/menu')
  //     .then(data => createCard(data));

  // function createCard(data) {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement('div');

  //         element.classList.add("menu__item");

  //         element.innerHTML = `
  //             <img src=${img} alt=${altimg}>
  //             <h3 class="menu__item-subtitle">${title}</h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //             </div>
  //         `;
  //         document.querySelector(".menu .container").append(element);
  //     });
  // }

  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     "Меню \"Фитнес\"",
  //     "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
  //     9,
  //     ".menu .container",
  //     "menu__item",
  //     "big"
  // ).render();

  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     "Меню \"Фитнес\"",
  //     "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
  //     9,
  //     ".menu .container",
  //     "menu__item"
  // ).render();

  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     "Меню \"Фитнес\"",
  //     "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
  //     9,
  //     ".menu .container",
  //     "menu__item"
  // ).render();
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalTimerId) {
  //Forms

  const forms = document.querySelectorAll(formSelector);
  // console.log(forms);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, скоро мы с вами свяжимся",
    failure: "Что-то пошло не так..."
  };
  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // в него можем записать css стили×
      form.insertAdjacentElement("afterend", statusMessage); // Позволяет помещать наши элементы в разные места верстки. Используем вместо append. 1 аргумент это куда вставляем элемент. afterend - после формы, 2 аргумент - то, что нам нужно вставить.
      //Обычный PHP метод

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");

      // // request.setRequestHeader("Content-type", "multipart/form-data"); При связке XMLHttpRequest() и FormData, заголовок не нужен

      // const formData = new FormData(form);

      // request.send(formData);

      //JSON

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");

      //  request.setRequestHeader("Content-type", "application/json");

      // const formData = new FormData(form); // Собираем все данные из нашей формы.

      // const object = {};

      // formData.forEach((value, key) => {
      //     object[key] = value;
      // });

      // const json = JSON.stringify(object);

      // request.send(json);

      // request.addEventListener("load", () => { // когда наш запрос полностью завершится 
      //     if (request.status === 200) {
      //         console.log(request.response);
      //         showThanksModal(message.success);
      //         form.reset(); // Очистка формы
      //         statusMessage.remove();
      //     } else {
      //         showThanksModal(message.failure);
      //     }
      // });

      // Обычный PHP метод

      // const formData = new FormData(form);

      // fetch("server.php", { // Отправляем наши данные.
      //     method: "POST",
      //     body: formData
      // }).then(data => data.text()) // переделываем наш ответ в обычный текст.
      //     .then(data => { // Обрабатываем результат нашего запроса
      //         console.log(data);
      //         showThanksModal(message.success);
      //         statusMessage.remove();
      //     }).catch(() => {
      //         showThanksModal(message.failure);
      //     }).finally(() => {
      //         form.reset(); // Очистка формы
      //     });

      // JSON метод   
      const formData = new FormData(form); // Собираем все данный с формы

      // const object = {};

      // formData.forEach((value, key) => {
      //     object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // Берём нашу formData, превращаем в массив массивов для того, чтобы мы могли нормально работать с ней. После этого мы превращаем её в классический объект, а после этот объект превращаем в JSON 

      // Пример:
      // const obj = { a: 23, b: 50 };
      // console.log(Object.entries(obj));
      // Ответ: [["a", 23], ["b", 50]]
      // fromentries - из вот такой структуры [["a", 23], ["b", 50]], сделать обычный объект. Обратная операция

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json).then(data => {
        // Обрабатываем результат нашего запроса
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset(); // Очистка формы
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(".modal", modalTimerId);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `<div class = "modal__content"> 
                                    <div data-close class="modal__close">×</div>
                                    <div class="modal__title">${message}</div>
                                </div>`;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)(".modal");
    }, 4000);
  }

  // Получаем доступ к базе данные db.json
  // fetch("http://localhost:3000/menu")
  //     .then(data => data.json())
  //     .then(res => console.log(res)); 

  // fetch("https://jsonplaceholder.typicode.com/posts", { // Классический post запрос 
  //     method: "POST",
  //     body: JSON.stringify({name: "Alex"}), // Тут может быть строка или объект
  //     headers: {
  //         "Content-type": "application/json" 
  //     }
  // })
  //     .then(response => response.json())
  //     .then(json => console.log(json));

  // fetch("https://jsonplaceholder.typicode.com/posts/1") // Классический get запрос.
  //     .then((response) => response.json()) // обрабатывает данные сервера, чтобы мы могли их использовать. response.json() это альтернаьтива parse.
  //     .then((json) => console.log(json)); // Выводим наш объект.
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modalClose: function() { return /* binding */ modalClose; },
/* harmony export */   modalOpen: function() { return /* binding */ modalOpen; }
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Не позволяет прокручиваться странице

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal

  const btn = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  btn.forEach(item => {
    item.addEventListener("click", () => modalOpen(modalSelector, modalTimerId));
  });
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      modalClose(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      modalClose(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  //Slider

  const sliderPrev = document.querySelector(prevArrow),
    slider = document.querySelector(container),
    sliderNext = document.querySelector(nextArrow),
    sliders = document.querySelectorAll(slide),
    current = document.getElementById(currentCounter),
    total = document.getElementById(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    // Этот блок мы будем сдвигать либо влево, либо вправо.
    width = window.getComputedStyle(slidesWrapper).width; // Когда мы будем инициализировать наш слайдер, нам понадобится знать, сколько места у нас занимает .offer__slider-wrapper, окошко через которое мы будем видеть наши слайды. Именно на ширину этого блока мы будем ориентироваться, когда будем подстраивать наши слайды под него уже внутри. Поэтому нам необходимо получить ширину которая была применина к этому блоку. Ширину возможно получить через computed style, это примененные стили которые идут от нашего css. Мы можем получать их при помощи скриптов. slidesWrapper - это общее окошко через которое мы будем смотреть на слайды. window.getComputedStyle(slidesWrapper) - вытаскиваем объект. Указываем свойство width, чтобы получить это свойство у объекта.

  // Вариант 2
  // Для второго варианта потребуется обернуть в html слайдеры в дополнительную обёртку offer__slider-inner, делается это для того, чтобы главная обёртка была у нас как окошко через которое мы можем видеть текущий слайд. У нас есть большая обёртка как offer__slider-wrapper, ей мы назначим свойство которое называется overflow hidden, которе значит, что всё что не подходит под ширину этого блока, оно будет скрыто. offer__slider-inner этот блок будет в виде карусели, он займёт столько места, сколько у нас слайдов в ширину. Допустим у нас 4 слайда и он будет занимать 400% в ширину от ширины 1 слайда который есть на странице.

  let slideIndex = 1;
  let offset = 0; // Нам понадобится какой-то отступ, чтобы мы точно могли знать, насколько мы отступили вправо, или влево.

  if (sliders.length < 10) {
    total.innerHTML = `0${sliders.length}`;
    current.innerHTML = `0${slideIndex}`;
  } else {
    total.innerHTML = `${sliders.length}`;
    current.innerHTML = `${slideIndex}`;
  }
  slidesField.style.width = 100 * sliders.length + "%"; // Делается это для того, чтобы поместить все слайды которые есть на странице во внутрь slidesField и они у нас помещались полностью.
  slidesField.style.display = "flex"; // Для того, чтобы картинки выстроились по горизонтале, а не по вертикале.
  slidesField.style.transition = "0.5s all";
  //Ну и понятное дело, что все слайды которые будут помещаться во внутрь они могут быть абсолютно разной ширины. Поэтому нужно четко указать им ширину.

  slidesWrapper.style.overflow = "hidden"; // Все потомки, которые не подходят под ширину этого блока - скрываются.

  sliders.forEach(item => {
    item.style.width = width;
  });
  slider.style.position = "relative";
  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);
  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1); // Устанавливаем определенный атрибут. Устанавливаем атрибут data-slide-to, и устанавливаем номерацию.
    dot.classList.add("dot");
    indicators.append(dot);
    dots.push(dot);
  }
  dots[0].style.opacity = 1;
  sliderNext.addEventListener("click", () => {
    if (offset == elementReplace(width) * (sliders.length - 1)) {
      // С width мы получаем "500px" - это строка, а нужно число и без пикселей.
      offset = 0;
    } else {
      offset += elementReplace(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`; // Говорим, смещаемся влево 

    if (slideIndex == sliders.length) {
      slideIndex = 1;
    } else {
      ++slideIndex;
    }
    viewCurrentSlider();
    dotsAction();
  });
  function elementReplace(e) {
    return +e.replace(/\D/g, "");
  }
  function dotsAction() {
    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[slideIndex - 1].style.opacity = 1;
  }
  function viewCurrentSlider() {
    if (sliders.length < 10) {
      current.innerHTML = `0${slideIndex}`;
    } else {
      current.innerHTML = `${slideIndex}`;
    }
  }
  sliderPrev.addEventListener("click", () => {
    if (offset == 0) {
      // С width мы получаем "500px" - это строка, а нужно число и без пикселей.
      offset = elementReplace(width) * (sliders.length - 1);
    } else {
      offset -= elementReplace(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`; // Говорим, смещаемся влево

    if (slideIndex == 1) {
      slideIndex = sliders.length;
    } else {
      --slideIndex;
    }
    viewCurrentSlider();
    dotsAction();
  });
  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = elementReplace(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      viewCurrentSlider();
      dotsAction();
    });
  });

  // Вариант 1
  // if (sliders.length < 10) {
  //     total.innerHTML = `0${sliders.length}`;
  //     current.innerHTML = `0${slideIndex}`;
  // } else {
  //     total.innerHTML = `${sliders.length}`;
  //     current.innerHTML = `${slideIndex}`;
  // }

  // function showSlides(n) {
  //     if (n > sliders.length) {
  //         slideIndex = 1;
  //     }

  //     if (n < 1) {
  //         slideIndex = sliders.length;
  //     }

  //     sliders.forEach(item => {
  //         item.style.display = "none";
  //     });

  //     sliders[slideIndex - 1].style.display = "block"; 

  //     if (sliders.length < 10) {
  //         current.innerHTML = `0${slideIndex}`;
  //     } else {
  //         current.innerHTML = `${slideIndex}`;
  //     }
  // }

  // showSlides(slideIndex);

  // sliderPrev.addEventListener("click", () => {
  //     showSlides(--slideIndex);
  // });

  // sliderNext.addEventListener("click", () => {
  //     showSlides(++slideIndex);
  // });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    // Если функция вызываетяся без аргумента, то по умолчанию i будет равен 0.
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", e => {
    const target = e.target;
    if (target && target.matches(tabsSelector)) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  //Timer

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // Количество м/c делим на скобочку.
      // В скобочке 1000 * 60 - получаем кол-во м/c в 1 минуте
      // 1000 * 60 * 60 - получаем кол-во м/с в 1 часе
      // 1000 * 60 * 60 * 24 - получаем кол-во м/с в сутках
      hours = Math.floor(t / (1000 * 60 * 60) % 24); // Мы можем получить 150 часов или даже больше. Поэтому нам нужен %. Этот оператор делит на 24 и возвращает остаток от деления. Если 5/2 то вернет 1, так как 1 никуда не идёт и соответственно это наш остаток от деления. Если мы просто разделим на 24, то мы получим кол-во суток. А так мы получим хвостик которого не хватает до полных суток. Пример: 50 / 24 - получаем 2 дня, 2 дня отбрасываем и получаем 2 часа.
      minutes = Math.floor(t / 1000 / 60 % 60); // t/1000 - получаем колво секунд. Далее получаем кол-во минут. Ну а дальше по прошлой логике ставим % 60, так как мнут 60 вообще-то.
      seconds = Math.floor(t / 1000 % 60); // С секундами тоже самое.
    }

    return {
      "total": t,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: function() { return /* binding */ getResource; },
/* harmony export */   postData: function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json(); // Тут у нас возвращается промис. Мы не знаем, какой там большой объект мы обрабатываем. Поэтому тут тоже нужен await.
};

const getResource = async url => {
  const res = await fetch(url);
  // fetch если столкнется с какой-то ошибкой в http запросе(404, 500, 502 и так далее), то он нам не выдаст catch(не выдаст reject). Это не будет для него ошибкой, ошибкой для него является отсуствие интернета, или какие-то критические неполадки в самом запросе. Поэтому такое поведение мы должны в ручную обработать. Тут мы знакомимся с двумя свойствами которые есть у промиса которые возвращаются из fetch. 1) .ok - говорит о том, что мы что-то получили и все ок, либо не ок. 2) status - тут мы попадаем на тот статус который выдал нам сервер. Это может 200(ок), 404(not found), 500 и так далее.

  if (!res.ok) {
    // Тут мы знакомимся с объектом ошибки. new Error(). Для того, чтобы выкинуть ошибку нужен throw. Это как раз те ошибки которые выпадают нам в консоль и мы можем их видеть. Сейчас мы просто конструируем её руками.
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json(); // Тут у нас возвращается промис. Мы не знаем, какой там большой объект мы обрабатываем. Поэтому тут тоже нужен await.
};




/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");


(__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill)(); // Иногда babel и core-js могут не дать нужный полифил и из-за этого сайт может сломаться. Для этого мы устанавливаем нужный нам полифил(в данном случае полифил для промисов. Это всё легко гуглиться). Они устанавливаются как отдельные npm пакеты и там всё указано как и что установить.
 // NodeList.forEach polyfill

// import "slick-slider";  import очень полезная штука. Мы можем устанавливать пакеты в npm пакет, а затем просто импортом брать их из npm папки. Это очень круто для слик слайдера например. Мы можем просто устанавливать пакет слик слайдера и подключить его в наш джс файл. А не устанавливать ещё один джс файл и по итогам у нас может быть много джс файлов. Это не совсем правильно. Мы хотим, чтобы у нас был один джс файл куда все подключается. 









window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.modalOpen)(".modal", modalTimerId), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "total",
    currentCounter: "current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])(".timer", "2024-11-11");
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map