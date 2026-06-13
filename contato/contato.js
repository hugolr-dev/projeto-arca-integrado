document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("premium-contact-form");
    const successOverlay = document.getElementById("form-success-msg");



    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Pega os campos de texto
        const nameField = document.getElementById("contact-name");
        const emailField = document.getElementById("contact-email");
        const msgField = document.getElementById("contact-message");



        if(nameField.value.trim().length < 3) {
            highlightError(nameField);
            return;
        }

        if(!validateEmail(emailField.value)) {
            highlightError(emailField);
            return;
        }



        successOverlay.classList.add("active");
        form.reset();
    });

    function highlightError(element) {
        element.style.borderBottomColor = "#ff4757";
        setTimeout(() => {
            element.style.borderBottomColor = "var(--gray-200)";
        }, 2000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});