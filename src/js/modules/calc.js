function calc() {
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
}

module.exports = calc;