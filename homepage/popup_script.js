document.addEventListener('DOMContentLoaded', function () {
  const popupExpiry = localStorage.getItem("popupExpiry");

  // If expiry is not set or has passed, show the popup and set a new expiry
  if (!popupExpiry || Date.now() > popupExpiry) {
    document.getElementById("instructionPopup").classList.add("show");
    document.getElementById("mainContent").classList.add("blurred");
    
    // Set popup shown flag and expiry time (e.g., one day)
    localStorage.setItem("popupShown", "true");
    localStorage.setItem("popupExpiry", Date.now() + 86400000); // 1 day in ms
  }
});

function closePopup() {
  document.getElementById("instructionPopup").classList.remove("show");
  document.getElementById("mainContent").classList.remove("blurred");
}



