import { createPhotographerHeader } from "../templates/photographer.js";

async function getData() {
  const response = await fetch("./data/photographers.json");
  return await response.json();
}

function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function displayMedia(medias, folder) {
  const section = document.createElement("section");
  section.classList.add("media-section");

  for (let index = 0; index < medias.length; index++) {
    const media = medias[index];
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-card");

    // Image ou vidéo
    if (media.image) {
      const img = document.createElement("img");
      img.src = `assets/photographers/Sample Photos/${folder}/${media.image}`;
      img.alt = media.title || "";
      img.addEventListener("click", () => openLightbox(index, medias, folder));
      mediaContainer.appendChild(img);
    } else if (media.video) {
      const video = document.createElement("video");
      video.src = `assets/photographers/Sample Photos/${folder}/${media.video}`;
      video.controls = true;
      video.addEventListener("click", () =>
        openLightbox(index, medias, folder)
      );
      mediaContainer.appendChild(video);
    }

    // Titre + cœur dans un conteneur stylisé
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("media-info");

    const title = document.createElement("p");
    title.textContent = media.title || "Sans titre";

    const heartIcon = document.createElement("span");
    heartIcon.classList.add("heart-icon");
    heartIcon.textContent = "❤";

    infoContainer.appendChild(title);
    infoContainer.appendChild(heartIcon);
    mediaContainer.appendChild(infoContainer);

    section.appendChild(mediaContainer);
  }

  document.getElementById("main").appendChild(section);
}

async function init() {
  const id = getPhotographerIdFromUrl();
  const data = await getData();
  const photographer = data.photographers.find((p) => p.id === id);
  const medias = data.media.filter((m) => m.photographerId === id);
  const folder = getSampleFolderName(id);

  if (photographer) {
    createPhotographerHeader(photographer);
    displayMedia(medias, folder);
  } else {
    document.querySelector("#main").innerHTML =
      "<p>Photographe introuvable.</p>";
  }
}

init();
