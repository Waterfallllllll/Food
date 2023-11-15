"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) { // Если функция вызываетяся без аргумента, то по умолчанию i будет равен 0.
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.matches(".tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Timer

    const deadline = "2023-10-15";
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
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // Мы можем получить 150 часов или даже больше. Поэтому нам нужен %. Этот оператор делит на 24 и возвращает остаток от деления. Если 5/2 то вернет 1, так как 1 никуда не идёт и соответственно это наш остаток от деления. Если мы просто разделим на 24, то мы получим кол-во суток. А так мы получим хвостик которого не хватает до полных суток. Пример: 50 / 24 - получаем 2 дня, 2 дня отбрасываем и получаем 2 часа.
            minutes = Math.floor((t / 1000 / 60) % 60); // t/1000 - получаем колво секунд. Далее получаем кол-во минут. Ну а дальше по прошлой логике ставим % 60, так как мнут 60 вообще-то.
            seconds = Math.floor((t / 1000) % 60); // С секундами тоже самое.
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

    setClock(".timer", deadline);

    //Modal

    const btn = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");
    
    function modalOpen() {
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Не позволяет прокручиваться странице
        clearInterval(modalTimerId);
    }

    function modalClose() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    btn.forEach(item => {
        item.addEventListener("click", modalOpen);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            modalClose();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            modalClose();
        }   
    });

    const modalTimerId = setTimeout(modalOpen, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            modalOpen();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
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

    const getResource = async (url) => {
        const res = await fetch(url);
        // fetch если столкнется с какой-то ошибкой в http запросе(404, 500, 502 и так далее), то он нам не выдаст catch(не выдаст reject). Это не будет для него ошибкой, ошибкой для него является отсуствие интернета, или какие-то критические неполадки в самом запросе. Поэтому такое поведение мы должны в ручную обработать. Тут мы знакомимся с двумя свойствами которые есть у промиса которые возвращаются из fetch. 1) .ok - говорит о том, что мы что-то получили и все ок, либо не ок. 2) status - тут мы попадаем на тот статус который выдал нам сервер. Это может 200(ок), 404(not found), 500 и так далее.

        if (!res.ok) {
            // Тут мы знакомимся с объектом ошибки. new Error(). Для того, чтобы выкинуть ошибку нужен throw. Это как раз те ошибки которые выпадают нам в консоль и мы можем их видеть. Сейчас мы просто конструируем её руками.
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        } 

        return await res.json(); // Тут у нас возвращается промис. Мы не знаем, какой там большой объект мы обрабатываем. Поэтому тут тоже нужен await.
    };

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризация объекта
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    axios.get("http://localhost:3000/menu")
        .then(data => data.data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризация объекта. Обращаемся к тем данным которые мы получили от библиотеки axios.
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        }));

    
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

    //Forms

    const forms = document.querySelectorAll("form");
    // console.log(forms);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с вами свяжимся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
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

            postData("http://localhost:3000/requests", json)
                .then(data => { // Обрабатываем результат нашего запроса
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
        modalOpen();

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
            modalClose();
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

    //Slider

    const sliderPrev = document.querySelector(".offer__slider-prev"),
        slider = document.querySelector(".offer__slider"),
        sliderNext = document.querySelector(".offer__slider-next"),
        sliders = document.querySelectorAll(".offer__slide"),
        current = document.getElementById("current"),
        total = document.getElementById("total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"), // Этот блок мы будем сдвигать либо влево, либо вправо.
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

        if (offset == elementReplace(width) * (sliders.length - 1)) { // С width мы получаем "500px" - это строка, а нужно число и без пикселей.
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

        if (offset == 0) { // С width мы получаем "500px" - это строка, а нужно число и без пикселей.
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
        dot.addEventListener("click", (e) => {
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
    
    //Calc
    
    const calcRes = document.querySelector(".calculating__result span");
    let sex = "female", height, weight, age, ratio = 1.375;

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
            calcRes.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            calcRes.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(item => {
            item.addEventListener("click", (e) => {
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

        input.addEventListener("input", (e) => {

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
});

