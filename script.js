document.addEventListener("DOMContentLoaded", function () {
    const projetContainer = document.getElementById("projet-container");
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modal-details");
    const closeBtn = document.querySelector(".close-btn");
    let projets; // Déclaration de la variable projets à l'extérieur de la fonction fetch
    let currentPage = 1; // Page actuelle


    // Récupération des données depuis le fichier JSON
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            projets = data; // Initialisation de la variable avec les données JSON
            afficherProjets(currentPage); // Affichage des projets de la page actuelle
        })
        .catch(error => console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error));

    // Fonction pour afficher un projet
    function afficherProjet(projet) {
        const projetHTML = `
            <div class="projet">
                <img src="assets/img/${projet.image}" alt="${projet.nom}">
                <h3>${projet.nom}</h3>
                <p>Date: ${projet.date}</p>
                <button OnClick="afficherModal()">Voir plus</button>
            </div>
        `;
        return projetHTML;
    }

    // Affichage des projets par groupes de 4
    function afficherProjets(page) {
        if (!projets) return; // Vérifie si projets est défini
        currentPage = page; // Met à jour la page actuelle
        projetContainer.innerHTML = "";
        const startIndex = (page - 1) * 4;
        const endIndex = startIndex + 4;
        const projetsPage = projets.slice(startIndex, endIndex);
        projetsPage.forEach(projet => {
            projetContainer.innerHTML += afficherProjet(projet);
        });

        // Affiche les boutons de pagination
        afficherPagination();
    }

    // Fonction pour afficher les boutons de pagination
    function afficherPagination() {
        const totalPages = Math.ceil(projets.length / 4); // Calcul du nombre total de pages
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = "";

        // Ajoute un bouton pour chaque page
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", () => afficherProjets(i));
            paginationContainer.appendChild(button);
        }
    }

     // Fonction pour afficher la modale avec les détails du projet
     function afficherModal() {
        const projet = projets.find(p => p.id === id);
        modal.style.visibility = "visible"
        modalContent.innerHTML = `
            <h2>${projet.nom}</h2>
            <p>${projet.description}</p>
            <p>Date: ${projet.date}</p>
            <button><a href="${projet.lien}" target="_blank">Accéder au lien du projet</a></button>
        `;
        modal.style.display = "block";
    }
});