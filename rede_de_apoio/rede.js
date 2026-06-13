const networkData = [
    { name: "Clínica VetVida", cat: "vet", desc: "Suporte médico emergencial completo e cirurgias com profissionais especializados.", icon: "fa-user-doctor" },
    { name: "Patinhas Livres", cat: "ong", desc: "ONG parceira especializada em feiras de adoção de grande porte.", icon: "fa-hand-holding-heart" },
    { name: "Lar da Cleide", cat: "lar", desc: "Hospedagem e cuidados amorosos para cães idosos resgatados.", icon: "fa-house-chimney-window" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("network-grid");
    const filters = document.querySelectorAll(".net-filter-btn");

    function renderNetwork(filter = "all") {
        grid.innerHTML = "";
        const filtered = filter === "all" ? networkData : networkData.filter(item => item.cat === filter);
        
        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "network-card";
            card.innerHTML = `
                <div class="network-icon-box"><i class="fa-solid ${item.icon}"></i></div>
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <button class="btn btn-primary" style="width:100%; justify-content:center; background-color: var(--blue); color: var(--white);">Contatar Parceiro</button>
            `;
            grid.appendChild(card);
        });
    }

    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderNetwork(btn.getAttribute("data-cat"));
        });
    });

    renderNetwork();
});