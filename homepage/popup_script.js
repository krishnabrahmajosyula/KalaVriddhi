document.addEventListener('DOMContentLoaded', function () {
    // Check if the popup has been shown before using localStorage
    if (!localStorage.getItem("popupShown")) {
      document.getElementById("instructionPopup").classList.add("show");
      document.getElementById("mainContent").classList.add("blurred");
      localStorage.setItem("popupShown", "true");
    }
  });
  
  // Close the popup
  function closePopup() {
    document.getElementById("instructionPopup").classList.remove("show");
    document.getElementById("mainContent").classList.remove("blurred");
  }
  


