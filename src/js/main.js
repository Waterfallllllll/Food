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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container",
        "menu__item",
        "big"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container",
        "menu__item"
    ).render();

    //Forms

    const forms = document.querySelectorAll("form");
    console.log(forms);
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с вами свяжимся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
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
            const formData = new FormData(form);

            const object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            // const json = JSON.stringify(object);    
            
            fetch("server.php", { // Отправляем наши данные.
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(data => data.text()) // переделываем наш ответ в обычный текст.
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
});

