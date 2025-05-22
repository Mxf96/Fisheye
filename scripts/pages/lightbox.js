let currentIndex = 0;
let currentMediaList = [];

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

export function openLightbox(index, medias, folder) {
  const lightbox = document.getElementById("lightbox");
  const img = lightbox.querySelector(".lightbox-image");
  const video = lightbox.querySelector(".lightbox-video");
  const title = lightbox.querySelector(".lightbox-title");

  currentMediaList = medias;
  currentIndex = index;

  const media = medias[index];
  const src = `assets/photographers/Sample Photos/${folder}/${
    media.image || media.video
  }`;
  const isImage = !!media.image;

  img.classList.toggle("hidden", !isImage);
  video.classList.toggle("hidden", isImage);

  if (isImage) {
    img.src = src;
    img.alt = media.title || "Média sans titre";
    img.setAttribute("tabindex", "0");
  } else {
    video.src = src;
    video.setAttribute("aria-label", media.title || "Vidéo sans titre");
  }

  title.textContent = media.title || "";
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-label", "Visionneuse de média agrandi");
  document.body.style.overflow = "hidden"; // Empêche le scroll derrière la lightbox
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

function showNextMedia() {
  currentIndex = (currentIndex + 1) % currentMediaList.length;
  openLightbox(
    currentIndex,
    currentMediaList,
    getSampleFolderName(currentMediaList[currentIndex].photographerId)
  );
}

function showPreviousMedia() {
  currentIndex =
    (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
  openLightbox(
    currentIndex,
    currentMediaList,
    getSampleFolderName(currentMediaList[currentIndex].photographerId)
  );
}

// Boutons accessibles à la souris
const closeBtn = document.querySelector(".lightbox-close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

closeBtn.setAttribute("role", "button");
closeBtn.setAttribute("aria-label", "Fermer la visionneuse");
nextBtn.setAttribute("role", "button");
nextBtn.setAttribute("aria-label", "Photo suivante");
prevBtn.setAttribute("role", "button");
prevBtn.setAttribute("aria-label", "Photo précédente");

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextMedia);
prevBtn.addEventListener("click", showPreviousMedia);

// Navigation clavier globale (flèches et Échap)
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.classList.contains("hidden")) return;

  switch (e.key) {
    case "ArrowRight":
      showNextMedia();
      break;
    case "ArrowLeft":
      showPreviousMedia();
      break;
    case "Escape":
      closeLightbox();
      break;
  }
});
