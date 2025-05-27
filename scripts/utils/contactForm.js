let formSubmitted = false; // Empêche les alertes multiples

// Fonction qui affiche la modale de contact
export function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Formulaire de contact du photographe");

  const form = modal.querySelector("form");
  form.querySelector("#prenom").focus();

  // Empêche le scroll en arrière-plan
  document.body.style.overflow = "hidden";

  if (!form.dataset.listenerAdded) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formSubmitted) return;
      formSubmitted = true;

      const prenom = form.querySelector("#prenom").value;
      const nom = form.querySelector("#nom").value;
      const email = form.querySelector("#email").value;
      const message = form.querySelector("#message").value;

      console.log("Formulaire envoyé :", { prenom, nom, email, message });
      closeModal();
      alert("Message envoyé avec succès !");
      formSubmitted = false;
    });
    form.dataset.listenerAdded = "true";
  }

  // Accessibilité clavier : Échap pour fermer
  window.addEventListener("keydown", escCloseModal);
}

// Fonction pour fermer la modale
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
  window.removeEventListener("keydown", escCloseModal);
}

function escCloseModal(e) {
  if (e.key === "Escape" || e.code === "Escape") {
    closeModal();
  }
}

window.closeModal = closeModal;