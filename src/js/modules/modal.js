
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

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            modalClose(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
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

export default modal;
export { modalClose };
export { modalOpen };