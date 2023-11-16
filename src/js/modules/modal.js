function modal() {
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
}

module.exports = modal;