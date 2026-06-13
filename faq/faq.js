document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll(".faq-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const item = trigger.parentElement;
            const panel = trigger.nextElementSibling;
            const isActive = item.classList.contains("active");




            document.querySelectorAll(".faq-item").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".faq-panel").style.maxHeight = null;
                el.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                panel.style.maxHeight = panel.scrollHeight + "px";
                trigger.setAttribute("aria-expanded", "true");
            }
        });
    });
});