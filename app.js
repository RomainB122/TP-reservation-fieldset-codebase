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

    // Active/désactive le bouton "+" en fonction des dates disponibles
    document.getElementById("add").classList.toggle("disabled", selectElement.options.length === 0);
}

// Fonction pour ajouter une nouvelle réservation
function ajouterReservation(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    let lastSelect = document.querySelector("fieldset:last-of-type .date");
    let selectedDate = lastSelect.value;

    if (!selectedDate || datesReservees.includes(selectedDate)) return;

    // Ajoute la date à la liste des réservations et la retire des choix disponibles
    datesReservees.push(selectedDate);

    // Désactive tous les champs du fieldset précédent
    let allFieldsets = document.querySelectorAll(".fieldset");
    if (allFieldsets.length > 0) {
        let previousFieldset = allFieldsets[allFieldsets.length - 1]; // Dernière réservation active
        previousFieldset.classList.add("disabled-fieldset"); // Ajoute une classe CSS
        previousFieldset.querySelector(".date").disabled = true;
        previousFieldset.querySelector(".quantite").disabled = true;
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
