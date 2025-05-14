export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", name);
    link.classList.add("photographer-link");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);

    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("photographer-location");

    const taglineEl = document.createElement("p");
    taglineEl.textContent = tagline;
    taglineEl.classList.add("photographer-tagline");

    const priceEl = document.createElement("p");
    priceEl.textContent = `${price} €/jour`;
    priceEl.classList.add("photographer-price");

    article.appendChild(location);
    article.appendChild(taglineEl);
    article.appendChild(priceEl);

    return article;
  }

  return { name, picture, getUserCardDOM };
}

export function createPhotographerHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  header.innerHTML = "";

  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("h1");
  name.textContent = photographer.name;

  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = `${photographer.city}, ${photographer.country}`;

  const tagline = document.createElement("p");
  tagline.classList.add("tagline");
  tagline.textContent = photographer.tagline;

  info.appendChild(name);
  info.appendChild(location);
  info.appendChild(tagline);

  const button = document.createElement("button");
  button.classList.add("contact_button");
  button.textContent = "Contactez-moi";
  button.onclick = () => displayModal?.(); // safe call

  const img = document.createElement("img");
  img.classList.add("portrait");
  img.setAttribute(
    "src",
    `assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}` // ✅ mis à jour
  );
  img.setAttribute("alt", "");

  header.appendChild(info);
  header.appendChild(button);
  header.appendChild(img);
}