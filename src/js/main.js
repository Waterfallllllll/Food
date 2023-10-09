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
        modal = document.querySelector(".modal"),
        close = document.querySelector("[data-close]");
    
    function modalOpen() {
        btn.forEach(item => {
            item.addEventListener("click", () => {
                modal.classList.add("show");
                document.body.style.overflow = "hidden"; // Не позволяет прокручиваться странице
            });
        });
    }

    function modalClose() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalOpen();
    close.addEventListener("click", modalClose);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modalClose();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            modalClose();
        }
    });
});