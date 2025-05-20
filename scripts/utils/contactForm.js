export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  const form = modal.querySelector("form");

  // Empêche le rechargement et simule un envoi
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Tu peux récupérer les valeurs ici si besoin :
    const prenom = form.querySelector("#prenom").value;
    const nom = form.querySelector("#nom").value;
    const email = form.querySelector("#email").value;
    const message = form.querySelector("#message").value;

    console.log("Formulaire envoyé :", { prenom, nom, email, message });

    // Ferme le modal après envoi simulé
    closeModal();

    // Optionnel : message de confirmation
    alert("Message envoyé avec succès !");
  });
}

export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

window.closeModal = closeModal;