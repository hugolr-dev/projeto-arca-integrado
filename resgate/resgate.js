document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const previewImg = document.getElementById("preview-img");
    const rescueForm = document.getElementById("rescue-form");
    const successFeedback = document.getElementById("success-feedback");
    const phoneInput = document.getElementById("phone");

    //Mascara
    phoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 6) {
            e.target.value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            e.target.value = `(${value.slice(0,2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            e.target.value = `(${value}`;
        }
    });

    // Aumentar e diminuir valores
    dropZone.addEventListener("click", () => fileInput.click());

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--green)";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "var(--gray-300)";
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--gray-300)";
        const files = e.dataTransfer.files;
        if(files.length) handleFile(files[0]);
    });

    fileInput.addEventListener("change", (e) => {
        if(e.target.files.length) handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if(!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.style.display = "block";
        };
        reader.readAsDataURL(file);
    }




    rescueForm.addEventListener("submit", (e) => {
        e.preventDefault();
        rescueForm.style.display = "none";
        successFeedback.style.display = "block";
    });
});