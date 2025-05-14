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

function openLightbox(index, medias, folder) {
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
    img.alt = media.title || "";
  } else {
    video.src = src;
  }

  title.textContent = media.title || "";
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
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

document
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
document
  .querySelector(".lightbox-next")
  .addEventListener("click", showNextMedia);
document
  .querySelector(".lightbox-prev")
  .addEventListener("click", showPreviousMedia);