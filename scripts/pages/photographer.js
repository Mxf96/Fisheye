// ./scripts/pages/photographer.js
import { createPhotographerHeader } from "../templates/photographer.js";
import { openLightbox } from "./lightbox.js";

let medias = [];
let folder = "";
let totalLikes = 0;

async function getData() {
  const response = await fetch("./data/photographers.json");
  return await response.json();
}

function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

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

function updateTotalLikesDisplay() {
  const totalLikesElement = document.querySelector(".stats-box .total-likes");
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
  }
}

function displayStatsBox(totalLikes, price) {
  const statsBox = document.createElement("div");
  statsBox.classList.add("stats-box");

  const likesContainer = document.createElement("div");
  likesContainer.classList.add("likes-container");

  const likesCount = document.createElement("span");
  likesCount.classList.add("total-likes");
  likesCount.textContent = totalLikes;

  // Crée le cœur en SVG
  const heartIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  heartIcon.setAttribute("width", "24");
  heartIcon.setAttribute("height", "24");
  heartIcon.setAttribute("viewBox", "0 0 24 24");
  heartIcon.classList.add("heart-icon");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 " +
      "2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 " +
      "1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 " +
      "0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  );
  path.setAttribute("fill", "#333");
  heartIcon.appendChild(path);

  likesContainer.appendChild(likesCount);
  likesContainer.appendChild(heartIcon);

  const pricePerDay = document.createElement("div");
  pricePerDay.classList.add("price-per-day");
  pricePerDay.textContent = `${price}€ / jour`;

  statsBox.appendChild(likesContainer);
  statsBox.appendChild(pricePerDay);

  document.body.appendChild(statsBox);
}

function displayMedia(mediasToDisplay, folder) {
  const section = document.createElement("section");
  section.classList.add("media-section");

  for (let index = 0; index < mediasToDisplay.length; index++) {
    const media = mediasToDisplay[index];
    totalLikes += media.likes;
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-card");

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

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("media-info");

    const title = document.createElement("p");
    title.textContent = media.title || "Sans titre";

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");

    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    likeCount.textContent = media.likes || 0;

    const heartIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    heartIcon.setAttribute("width", "24");
    heartIcon.setAttribute("height", "24");
    heartIcon.setAttribute("viewBox", "0 0 24 24");
    heartIcon.classList.add("heart-icon");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 " +
        "2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 " +
        "1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 " +
        "0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#901c1c");
    path.setAttribute("stroke-width", "2");

    heartIcon.appendChild(path);

    heartIcon.addEventListener("click", () => {
      const liked = path.classList.toggle("liked");
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = liked ? count + 1 : count - 1;
      totalLikes += liked ? 1 : -1;
      updateTotalLikesDisplay();
      path.setAttribute("fill", liked ? "#901c1c" : "none");
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

async function init() {
  const id = getPhotographerIdFromUrl();
  const data = await getData();
  const photographer = data.photographers.find((p) => p.id === id);
  medias = data.media.filter((m) => m.photographerId === id);
  folder = getSampleFolderName(id);
  totalLikes = 0;

  if (photographer) {
    createPhotographerHeader(photographer);
    displayMedia(medias, folder);
    displayStatsBox(totalLikes, photographer.price);
  } else {
    document.querySelector("#main").innerHTML =
      "<p>Photographe introuvable.</p>";
  }
}

init();

const sortToggle = document.getElementById("sort-toggle");
const sortOptions = document.getElementById("sort-options");

sortToggle.addEventListener("click", () => {
  sortOptions.classList.toggle("hidden");
});

document.querySelectorAll("#sort-options li").forEach((item) => {
  item.addEventListener("click", (e) => {
    const selected = e.target;
    const sortBy = selected.dataset.value;

    sortToggle.innerHTML = `${selected.textContent} <span class="arrow">▾</span>`;
    document
      .querySelectorAll("#sort-options li")
      .forEach((li) => li.classList.remove("active"));
    selected.classList.add("active");
    sortOptions.classList.add("hidden");

    let sortedMedias = [...medias];

    if (sortBy === "popularity") {
      sortedMedias.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "title") {
      sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
    }

    document.querySelector(".media-section")?.remove();
    totalLikes = 0;
    displayMedia(sortedMedias, folder);
    updateTotalLikesDisplay();
  });
});