import { getResource } from "../services/services";

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



    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризация объекта
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

export default cards;