import { createPhotographerHeader } from "../templates/photographer.js";

// Variables globales
let medias = [];
let folder = "";

// Récupère les données JSON
async function getData() {
  const response = await fetch("./data/photographers.json");
  return await response.json();
}

// Extrait l'ID du photographe depuis l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// Associe les ID de photographes aux noms de dossier
function getSampleFolderName(id) {
  const folders = {
    243: "Mimi",
    930: "Ellie Rose",
    82: "Tracy",
    527: "Nabeel",
    925: "Rhode",
    195: "Marcel",
  };
  return folders[id];
}

// Affiche les médias à l'écran
function displayMedia(mediasToDisplay, folder) {
  const section = document.createElement("section");
  section.classList.add("media-section");

  for (let index = 0; index < mediasToDisplay.length; index++) {
    const media = mediasToDisplay[index];
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-card");

    // Image ou vidéo cliquable pour lightbox
    if (media.image) {
      const img = document.createElement("img");
      img.src = `assets/photographers/Sample Photos/${folder}/${media.image}`;
      img.alt = media.title || "";
      img.addEventListener("click", () =>
        openLightbox(index, mediasToDisplay, folder)
      );
      mediaContainer.appendChild(img);
    } else if (media.video) {
      const video = document.createElement("video");
      video.src = `assets/photographers/Sample Photos/${folder}/${media.video}`;
      video.controls = true;
      video.addEventListener("click", () =>
        openLightbox(index, mediasToDisplay, folder)
      );
      mediaContainer.appendChild(video);
    }

    // Infos sous le média
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("media-info");

    const title = document.createElement("p");
    title.textContent = media.title || "Sans titre";

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");

    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    likeCount.textContent = media.likes || 0;

    const heartIcon = document.createElement("span");
    heartIcon.classList.add("heart-icon");
    heartIcon.textContent = "♡";

    heartIcon.addEventListener("click", () => {
      const liked = heartIcon.classList.toggle("liked");
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = liked ? count + 1 : count - 1;
      heartIcon.textContent = liked ? "❤" : "♡";
    });

    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(heartIcon);

    infoContainer.appendChild(title);
    infoContainer.appendChild(likeContainer);
    mediaContainer.appendChild(infoContainer);
    section.appendChild(mediaContainer);
  }

  document.getElementById("main").appendChild(section);
}

// Initialise la page
async function init() {
  const id = getPhotographerIdFromUrl();
  const data = await getData();
  const photographer = data.photographers.find((p) => p.id === id);
  medias = data.media.filter((m) => m.photographerId === id);
  folder = getSampleFolderName(id);

  if (photographer) {
    createPhotographerHeader(photographer);
    displayMedia(medias, folder);
  } else {
    document.querySelector("#main").innerHTML =
      "<p>Photographe introuvable.</p>";
  }
}

init();

// 🔽 Gestion du menu personnalisé de tri
const sortToggle = document.getElementById("sort-toggle");
const sortOptions = document.getElementById("sort-options");

sortToggle.addEventListener("click", () => {
  sortOptions.classList.toggle("hidden");
});

// Écoute les clics sur les options
document.querySelectorAll("#sort-options li").forEach((item) => {
  item.addEventListener("click", (e) => {
    const selected = e.target;
    const sortBy = selected.dataset.value;

    // Met à jour le texte du bouton
    sortToggle.innerHTML = `${selected.textContent} <span class="arrow">▾</span>`;

    // Ajoute la classe active uniquement à l'élément sélectionné
    document.querySelectorAll("#sort-options li").forEach((li) => {
      li.classList.remove("active");
    });
    selected.classList.add("active");

    // Cache le menu
    sortOptions.classList.add("hidden");

    // Trie et réaffiche les médias
    let sortedMedias = [...medias];

    if (sortBy === "popularity") {
      sortedMedias.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "title") {
      sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Réaffichage
    document.querySelector(".media-section")?.remove();
    displayMedia(sortedMedias, folder);
  });
});