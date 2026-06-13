document.addEventListener("DOMContentLoaded", () => {
    // Navegação por mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
        navLinks.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";

        const backToTop = document.getElementById("back-to-top");
        if (winScroll > 400) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Animação do Anime.js
    anime({
        targets: '.hero-content h1, .hero-content p, .hero-cta',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 1000,
        easing: 'easeOutQuad'
    });

    // Animação de observação
    const statsSection = document.querySelector('.stats-section');
    let animated = false;

    const countUp = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            anime({
                targets: counter,
                innerHTML: [0, target],
                round: 1,
                easing: 'linear',
                duration: 2000
            });
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                countUp();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    if(statsSection) observer.observe(statsSection);
});