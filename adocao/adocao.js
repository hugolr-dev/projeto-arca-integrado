// Animais geral

const mockAnimals = [
    { id: 1, nome: "Tuco", tipo: "cachorro", idade: "Adulto", porte: "Pequeno", sexo: "Macho", img: "https://i.pinimg.com/1200x/52/de/9e/52de9ecbd56705c1cda745345d761a61.jpg" },
    { id: 2, nome: "Luna", tipo: "gato", idade: "Filhote", porte: "Pequeno", sexo: "Fêmea", img: "https://i.pinimg.com/736x/12/61/90/126190be00db8971c5fa4de619a6fb66.jpg" },
    { id: 3, nome: "Mel", tipo: "cachorro", idade: "Filhote", porte: "Grande", sexo: "Fêmea", img: "https://i.pinimg.com/736x/c9/e5/2b/c9e52b4e57df80acb08e6ba31e5c72d5.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("animals-grid");
    const searchInput = document.getElementById("search-input");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Render Cards Function
    function renderAnimals(data) {
        grid.innerHTML = "";
        if(data.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--gray-500)">Nenhum bichinho encontrado com esses critérios.</p>`;
            return;
        }
        data.forEach(animal => {
            const card = document.createElement("div");
            card.className = "animal-card";
            card.innerHTML = `
                <button class="favorite-btn" aria-label="Favoritar"><i class="fa-solid fa-heart"></i></button>
                <div class="animal-img-box">
                    <img src="${animal.img}" alt="${animal.nome}">
                </div>
                <div class="animal-info">
                    <h3>${animal.nome}</h3>
                    <div class="badge-group">
                        <span class="badge-tag">${animal.idade}</span>
                        <span class="badge-tag">${animal.porte}</span>
                        <span class="badge-tag">${animal.sexo}</span>
                    </div>
                    <button class="btn btn-primary open-details" data-id="${animal.id}" style="width:100%; justify-content:center;">Quero Adotar</button>
                </div>
            `;
            grid.appendChild(card);
        });
        initCardEvents();
    }

    // Filtros
    function filterData() {
        const searchValue = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");

        const filtered = mockAnimals.filter(animal => {
            const matchesSearch = animal.nome.toLowerCase().includes(searchValue);
            const matchesCategory = activeFilter === "all" || 
                                     animal.tipo === activeFilter || 
                                     animal.idade.toLowerCase() === activeFilter;
            return matchesSearch && matchesCategory;
        });
        renderAnimals(filtered);
    }

    searchInput.addEventListener("input", filterData);

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterData();
        });
    });

    // Interação
    const modal = document.getElementById("animal-modal");
    const closeModal = document.querySelector(".close-modal");

    function initCardEvents() {
        document.querySelectorAll(".open-details").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                const animal = mockAnimals.find(a => a.id == id);
                
                document.getElementById("modal-body").innerHTML = `
                    <img src="${animal.img}" alt="${animal.nome}" style="width:100%; height:300px; object-fit:cover;">
                    <div style="padding:24px;">
                        <h2>Adote o ${animal.nome}</h2>
                        <p style="margin: 16px 0;">Esse lindo campeão está vacinado, castrado e ansioso por um lar.</p>
                        <a href="https://wa.me/5527999999999?text=Quero%20adotar%20o%20${animal.nome}" class="btn btn-primary" style="width:100%; justify-content:center;">Conversar pelo WhatsApp</a>
                    </div>
                `;
                modal.classList.add("active");
            });
        });

        document.querySelectorAll(".favorite-btn").forEach(favBtn => {
            favBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                favBtn.classList.toggle("active");
            });
        });
    }

    closeModal.addEventListener("click", () => modal.classList.remove("active"));
    window.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("active"); });

    // Loading simulator(Tava com dificuldade/Load da tela instantaneo)
    setTimeout(() => { renderAnimals(mockAnimals); }, 800);
});