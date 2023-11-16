import { modalClose, modalOpen } from "./modal";
import { postData } from "../services/services";

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
        modalOpen(".modal", modalTimerId);

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
            modalClose(".modal");
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

export default forms;