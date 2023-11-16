function slider() {
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
}

module.exports = slider;