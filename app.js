/* SCRIPT
Ce site sert à reservé des places de concert.
L'utilisateur doit etre capable de selectionner une date de 
concert et un nombre de place, ensuite si il clique sur le bouton "+ 
un nouveau bloc de reservation apparait pour pouvoir reserver une autre 
date.
Si l'utilisateur clique sur le bouton "+" la reservation précédente 
doit se griser et ne peut plus etre modifié. De plus un bouton supprimez 
apparait pour pourvoir suppimez la reservation.  
(Les dates précèdement reservé ne doit plus etre disponible a la reservation)
(Si l'utilisateur supprime une reservation, la date doit a nouveau etre disponible dans les reservation disponible)
Si l'utilisateur a reserver toute les dates le bouton "+" doit 
plus etre accessible
*/

// Liste des dates disponibles
let datesDisponibles = [
    "2024-01-06",
    "2024-01-13",
    "2024-01-20",
    "2024-01-27"
];

// Stocke les dates réservées
let datesReservees = [];

// Remplit la première liste déroulante au chargement
document.addEventListener("DOMContentLoaded", function () {
    remplirSelect(document.querySelector(".date"));
    document.getElementById("add").addEventListener("click", ajouterReservation);
});

// Fonction pour remplir une liste déroulante avec les dates disponibles
function remplirSelect(selectElement) {
    if (!selectElement) return;
    selectElement.innerHTML = ""; // Vide l'ancien contenu
    datesDisponibles.forEach(date => {
        if (!datesReservees.includes(date)) {
            let option = document.createElement("option");
            option.value = date;
            option.textContent = date;
            selectElement.appendChild(option);
        }
    });

    // Vérifie s'il reste des dates disponibles, sinon désactive le bouton "+"
    let boutonAjout = document.getElementById("add");
    boutonAjout.classList.toggle("disabled", selectElement.options.length === 0);
}

// Fonction pour ajouter une nouvelle réservation
function ajouterReservation(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    let lastSelect = document.querySelector("fieldset:last-of-type .date");
    let selectedDate = lastSelect.value;

    if (!selectedDate || datesReservees.includes(selectedDate)) return;

    // Ajoute la date à la liste des réservations et la retire des choix disponibles
    datesReservees.push(selectedDate);

    // Désactive uniquement les champs "Date" et "Nombre de places" sur la réservation précédente
    let allFieldsets = document.querySelectorAll(".fieldset");
    if (allFieldsets.length > 0) {
        let previousFieldset = allFieldsets[allFieldsets.length - 1]; // Dernière réservation active
        let dateInput = previousFieldset.querySelector(".date");
        let quantiteInput = previousFieldset.querySelector(".quantite");

        if (dateInput) dateInput.disabled = true;
        if (quantiteInput) quantiteInput.disabled = true;

        // Vérifie si un bouton "Supprimer" existe déjà, sinon l'ajoute
        if (!previousFieldset.querySelector(".suppr")) {
            let deleteButton = document.createElement("button");
            deleteButton.className = "suppr";
            deleteButton.textContent = "Supprimer";
            deleteButton.onclick = function () { supprimerReservation(this); }; // Passe "this" au lieu de previousFieldset
            previousFieldset.appendChild(deleteButton);
        }
    }

    // Création d'un nouveau bloc de réservation
    let newFieldset = document.createElement("fieldset");
    newFieldset.className = "fieldset";
    newFieldset.innerHTML = `
        <legend>Réservation</legend>
        <div class="form-group row">
            <div class="col-sm-4">
                <label> Date : </label>
            </div>
            <div class="col-sm-8">
                <select class="date form-control"></select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4">
                <label> Nombres de places : </label>
            </div>
            <div class="col-sm-8">
                <input type="number" class="quantite form-control" value="1"/>
            </div>
        </div>
    `;

    // Ajoute le nouveau bloc avant le bouton "+"
    document.querySelector("form").insertBefore(newFieldset, document.getElementById("add"));

    // Remplit la nouvelle liste déroulante
    remplirSelect(newFieldset.querySelector(".date"));
}

// Fonction pour supprimer une réservation (corrigée)
function supprimerReservation(button) {
    let fieldset = button.parentElement; // Trouve le fieldset parent du bouton
    let selectedDate = fieldset.querySelector(".date").value;

    // Retirer la date de la liste des réservations
    datesReservees = datesReservees.filter(date => date !== selectedDate);

    // Supprimer le fieldset du DOM
    fieldset.remove();

    // Réajouter la date dans les dates disponibles
    remplirSelect(document.querySelector("fieldset:last-of-type .date"));
}
