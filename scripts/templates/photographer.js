import { displayModal } from "../utils/contactForm.js";

// Fonction template représentant un photographe
export function photographerTemplate(data) {
  // Déstructure les données du photographe
  const { name, portrait, city, country, tagline, price, id } = data;

  // Chemin vers la photo du photographe
  const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

  // Fonction qui génère la carte HTML du photographe pour la page d'accueil
  function getUserCardDOM() {
    const article = document.createElement("article"); // Élément racine de la carte

    // Lien cliquable vers la page du photographe
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", name);
    link.classList.add("photographer-link");

    // Image du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", ""); // L'image est décorative, le nom est déjà en texte

    // Nom du photographe
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Ajout de l’image et du nom dans le lien
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);

    // Ville et pays du photographe
    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("photographer-location");

    // Slogan du photographe
    const taglineEl = document.createElement("p");
    taglineEl.textContent = tagline;
    taglineEl.classList.add("photographer-tagline");

    // Tarif journalier du photographe
    const priceEl = document.createElement("p");
    priceEl.textContent = `${price} €/jour`;
    priceEl.classList.add("photographer-price");

    // Ajout des infos supplémentaires à l'article
    article.appendChild(location);
    article.appendChild(taglineEl);
    article.appendChild(priceEl);

    // Retourne l'article complet représentant la carte du photographe
    return article;
  }

  // Retourne les données utiles et la fonction de génération DOM
  return { name, picture, getUserCardDOM };
}

// Fonction qui crée l’en-tête du photographe sur sa page dédiée
export function createPhotographerHeader(photographer) {
  const header = document.querySelector(".photograph-header"); // Sélectionne le conteneur de l'en-tête
  header.innerHTML = ""; // Réinitialise son contenu

  const info = document.createElement("div"); // Conteneur des infos textuelles
  info.classList.add("info");

  // Nom du photographe
  const name = document.createElement("h1");
  name.textContent = photographer.name;

  // Ville et pays
  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = `${photographer.city}, ${photographer.country}`;

  // Slogan
  const tagline = document.createElement("p");
  tagline.classList.add("tagline");
  tagline.textContent = photographer.tagline;

  // Ajout des infos dans le conteneur
  info.appendChild(name);
  info.appendChild(location);
  info.appendChild(tagline);

  // Bouton de contact qui déclenche l'ouverture du formulaire
  const button = document.createElement("button");
  button.classList.add("contact_button");
  button.textContent = "Contactez-moi";
  button.onclick = () => displayModal?.(); // Utilise la fonction importée si disponible (secure call)

  // Image du portrait du photographe
  const img = document.createElement("img");
  img.classList.add("portrait");
  img.setAttribute(
    "src",
    `assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}`
  );
  img.setAttribute("alt", ""); // Décoratif

  // Ajout de tous les éléments dans le header
  header.appendChild(info);
  header.appendChild(button);
  header.appendChild(img);
}