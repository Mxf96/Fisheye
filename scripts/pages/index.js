import { photographerTemplate } from "../templates/photographer.js";

// Fonction asynchrone pour récupérer les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("./data/photographers.json"); // Requête pour récupérer le fichier JSON
  const data = await response.json(); // Conversion de la réponse en objet JavaScript
  return {
    photographers: data.photographers, // Retourne uniquement la liste des photographes
  };
}

// Fonction pour afficher dynamiquement les cartes des photographes sur la page
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section"); // Sélectionne la section du DOM où insérer les cartes

  // Parcourt chaque photographe et insère sa carte dans le DOM
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer); // Crée une instance de modèle à partir des données
    const userCardDOM = photographerModel.getUserCardDOM(); // Génère le DOM correspondant à la carte du photographe
    photographersSection.appendChild(userCardDOM); // Ajoute la carte à la section de la page
  });
}

// Fonction d'initialisation de la page
async function init() {
  const { photographers } = await getPhotographers(); // Récupère les photographes depuis le fichier JSON
  displayData(photographers); // Affiche les cartes des photographes
}

// Lance l'initialisation dès le chargement du script
init();