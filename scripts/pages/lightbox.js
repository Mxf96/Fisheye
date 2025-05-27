// Indice du média actuellement affiché dans la lightbox
let currentIndex = 0;

// Liste des médias affichables dans la lightbox
let currentMediaList = [];

// Fonction qui retourne le nom du dossier correspondant à l'ID du photographe
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

// Fonction principale pour ouvrir la lightbox avec le média à l'index donné
export function openLightbox(index, medias, folder) {
  const lightbox = document.getElementById("lightbox"); // Sélectionne la lightbox
  const img = lightbox.querySelector(".lightbox-image"); // Sélectionne l'image dans la lightbox
  const video = lightbox.querySelector(".lightbox-video"); // Sélectionne la vidéo dans la lightbox
  const title = lightbox.querySelector(".lightbox-title"); // Sélectionne le titre dans la lightbox

  // Mise à jour de la liste et de l’index actuel
  currentMediaList = medias;
  currentIndex = index;

  // Récupération du média courant
  const media = medias[index];
  const src = `assets/photographers/Sample Photos/${folder}/${
    media.image || media.video
  }`;
  const isImage = !!media.image;

  // Affiche ou masque les balises <img> ou <video> selon le type
  img.classList.toggle("hidden", !isImage);
  video.classList.toggle("hidden", isImage);

  // Configuration de l’élément image si le média est une image
  if (isImage) {
    img.src = src;
    img.alt = media.title || "Média sans titre";
    img.setAttribute("tabindex", "0");
  } else {
    // Configuration de l’élément vidéo sinon
    video.src = src;
    video.setAttribute("aria-label", media.title || "Vidéo sans titre");
  }

  // Affiche le titre du média
  title.textContent = media.title || "";

  // Rend visible la lightbox et empêche le scroll en arrière-plan
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-label", "Visionneuse de média agrandi");
  document.body.style.overflow = "hidden"; // Empêche le scroll derrière la lightbox
}

// Ferme la lightbox et réactive le scroll de la page
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

// Affiche le média suivant dans la lightbox
function showNextMedia() {
  currentIndex = (currentIndex + 1) % currentMediaList.length; // Passage circulaire au média suivant
  openLightbox(
    currentIndex,
    currentMediaList,
    getSampleFolderName(currentMediaList[currentIndex].photographerId)
  );
}

// Affiche le média précédent dans la lightbox
function showPreviousMedia() {
  currentIndex =
    (currentIndex - 1 + currentMediaList.length) % currentMediaList.length; // Passage circulaire au média précédent
  openLightbox(
    currentIndex,
    currentMediaList,
    getSampleFolderName(currentMediaList[currentIndex].photographerId)
  );
}

// Récupération des boutons de contrôle de la lightbox
const closeBtn = document.querySelector(".lightbox-close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

// Accessibilité : ajout des rôles et labels ARIA aux boutons
closeBtn.setAttribute("role", "button");
closeBtn.setAttribute("aria-label", "Fermer la visionneuse");
nextBtn.setAttribute("role", "button");
nextBtn.setAttribute("aria-label", "Photo suivante");
prevBtn.setAttribute("role", "button");
prevBtn.setAttribute("aria-label", "Photo précédente");

// Gestion des événements clics sur les boutons de la lightbox
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextMedia);
prevBtn.addEventListener("click", showPreviousMedia);

// Navigation clavier : flèches gauche/droite pour naviguer, Échap pour fermer
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.classList.contains("hidden")) return; // Ignore si la lightbox est fermée

  switch (e.key) {
    case "ArrowRight":
      showNextMedia(); // Flèche droite → média suivant
      break;
    case "ArrowLeft":
      showPreviousMedia(); // Flèche gauche → média précédent
      break;
    case "Escape":
      closeLightbox(); // Échap → fermeture de la lightbox
      break;
  }
});