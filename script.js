document.addEventListener("DOMContentLoaded", function () {
    const projetContainer = document.getElementById("projet-container");
    let projets; // Déclaration de la variable projets à l'extérieur de la fonction fetch
    let currentPage = 1; // Page actuelle

    // Fonction pour afficher un projet
    function afficherProjet(projet) {
        const projetHTML = `
            <div class="projet">
                <img src="assets/img/${projet.image}" alt="${projet.nom}">
                <h3>${projet.nom}</h3>
                <p>Date: ${projet.date}</p>
                <button type="button" class="btn btn-primary" data-projet-id="${projet.id}">Voir plus</button>
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

        // Réattacher les écouteurs d'événements aux boutons "Voir plus"
        attacherEcouteursVoirPlus();

        // Affiche les boutons de pagination
        afficherPagination();
    }

    function attacherEcouteursVoirPlus() {
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const projetId = parseInt(this.getAttribute('data-projet-id'));
                ouvrirModal(projetId);
            });
        });}

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

    

    // Fonction pour ouvrir la modal
    function ouvrirModal(projetId) {
        const projet = projets.find(p => p.id === projetId);
    
        if (projet) {
            const modalTitle = document.getElementById("exampleModalLabel");
            const modalBody = document.querySelector(".modal-body");
    
            modalTitle.innerHTML = projet.nom;
    
            // Créer une balise img pour chaque image alternative dans imgTab
            let imgTabHTML = "";
            if (projet.imgTab) {
                projet.imgTab.forEach(img => {
                    imgTabHTML += `<img src="assets/img/${img}" alt="${projet.nom}">`;
                });
            }
            
            // Modifier le contenu de la modal avec les détails du projet, y compris les images alternatives
            modalBody.innerHTML = `
                <p>Date: ${projet.date}</p>
                <p>Description: ${projet.description}</p>
                <p>Lien du projet: <a href="${projet.lien}" target="_blank">${projet.lien}</a></p>
                <div class="imgTab">${imgTabHTML}</div>
                <!-- Ajoutez d'autres détails du projet ici si nécessaire -->
            `;
    
            $('#exampleModal').modal('show');
        } else {
            console.error("Projet introuvable");
        }
    }

    // Récupération des données depuis le fichier JSON
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            projets = data; // Initialisation de la variable avec les données JSON
            afficherProjets(currentPage); // Affichage des projets de la page actuelle

            // Ajout des écouteurs d'événements pour les boutons "Voir plus"
            const buttons = document.querySelectorAll('.btn-primary');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const projetId = parseInt(this.getAttribute('data-projet-id'));
                    ouvrirModal(projetId);
                });
            });
        })
        .catch(error => console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error));
});
