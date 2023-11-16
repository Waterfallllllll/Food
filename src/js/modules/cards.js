function cards() {
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
}

module.exports = cards;