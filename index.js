// Wait for the entire HTML document to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Select the form with the ID 'entry-form'
  const form = document.getElementById("entry-form");
  form.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a button with the name attribute "event"
    if (
      target.tagName === "BUTTON" &&
      target.getAttribute("name") === "event"
    ) {
      target.classList.toggle("active");
    }
    // Check if the clicked element is the "Add more" button
    if (target.id === "add-more") {
      // Show the modal
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
  });
  // Add an event listener to the form for 'submit' events
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check  if any of the event buttons are selected (have the 'active' class)
    const isSelectedButton = form.querySelector('button[name="event"].active');
    const isSelected = isSelectedButton ? isSelectedButton.value : "";
    // Check if all the text input fields, except the 'more-info' field, are filled out
    // It does this by converting the NodeList of input elements to an array
    // and then using 'filter' and 'every' to ensure all required fields have values
    const isFilled = Array.from(
      form.querySelectorAll('input[type="text"] , input[type="date"')
    )
      .filter((input) => input.id !== "why") // Exclude "Why?" field
      .filter((input) => input.id !== "helped") // Exclude "What Helped?" field
      .filter((input) => input.id !== "more-info") // Exclude "More Info?" field
      .every((input) => input.value.trim() !== "");
    // If not all required fields are filled or no event is selected
    if (!isSelected || !isFilled) {
      event.preventDefault(); // Stop the form from being submitted
      // Show a custom alert message
      showCustomAlert(
        "Please fill in all required fields and select an event."
      );
      return false; // Return false to prevent further actions
    } else {
      //save the entries from the form and convert it to json and save it to local
      //storage so it can be used in different page
      const fd = new FormData(form);
      fd.append("selectedEvent", isSelected);
      const obj = Object.fromEntries(fd);

      const json = JSON.stringify(obj);
      localStorage.setItem("form", json);
      window.location.href = "journal.html";
    }

    // Close the modal when the close button is clicked
    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", function () {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
      const modal = document.getElementById("myModal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Add an event listener for the "Add Category" button in the modal
    const addCategoryButton = document.getElementById("addCategoryBtn");
    addCategoryButton.addEventListener("click", function () {
      addNewCategory();
      updateCategoryButtons();
      const modal = document.getElementById("myModal");
      modal.style.display = "none"; // Close the modal after adding a new category
    });
  });
});

// Function to display a custom alert message
function showCustomAlert(message) {
  // Find the div with the ID 'custom-alert'
  const alertBox = document.getElementById("custom-alert");
  alertBox.style.display = "block"; // Make the alert box visible
  alertBox.textContent = message; // Set the text of the alert box to the provided message

  // Set a timeout to automatically hide the alert box after 5 seconds
  setTimeout(() => {
    alertBox.style.display = "none"; // Hide the alert box
  }, 5000);
}

var categories = [
  { id: "anxiety", value: "Anxiety" },
  { id: "panic-attack", value: "Panic Attack" },
  { id: "dissociation", value: "Dissociation" },
];

function updateCategoryButtons() {
  var causeDiv = document.getElementById("cause");

  // Clear existing buttons
  causeDiv.innerHTML = "";

  // Add buttons for each category
  categories.forEach(function (category) {
    // Create the category button
    var button = document.createElement("button");
    button.type = "button";
    button.id = category.id;
    button.name = "event";
    button.value = category.value;
    button.innerHTML = category.value;

    // Append category button to the container div
    causeDiv.appendChild(button);
  });

  // Create a container div for "x" and "+" buttons
  var buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  // Add a single "Remove" button
  var removeLastButton = document.createElement("button");
  removeLastButton.type = "button";
  removeLastButton.innerHTML = "x";
  removeLastButton.onclick = function () {
    // Remove the last category from the array
    categories.pop();
    // Update category buttons after removing the last category
    updateCategoryButtons();
  };
  buttonsContainer.appendChild(removeLastButton);

  // Add the "Add more" button
  var addMoreButton = document.createElement("button");
  addMoreButton.type = "button";
  addMoreButton.name = "event";
  addMoreButton.innerHTML = "+";
  addMoreButton.onclick = function () {
    addNewCategory();
    updateCategoryButtons(); // Update buttons after adding a new category
  };
  buttonsContainer.appendChild(addMoreButton);

  // Append buttons container after the category buttons
  causeDiv.appendChild(buttonsContainer);
}

// Function to add a new category using a modal
function addNewCategory() {
  // Get the modal element
  const modal = document.getElementById("myModal");

  // Display the modal
  modal.style.display = "block";

  // Get the input field inside the modal
  const inputField = document.getElementById("newCategoryInput");

  // Function to handle the "Add Category" button click
  const addCategoryButton = document.getElementById("addCategoryButton");
  addCategoryButton.onclick = function () {
    // Get the value from the input field
    const newCategoryInput = inputField.value.trim();

    // Check if the input is not empty
    if (newCategoryInput !== "") {
      // Create an id from the input
      const newCategoryId = newCategoryInput.toLowerCase().replace(/\s+/g, "-");

      // Create a new category object
      const newCategory = { id: newCategoryId, value: newCategoryInput };

      // Push the new category to the categories array
      categories.push(newCategory);

      // Close the modal
      modal.style.display = "none";

      // Update category buttons
      updateCategoryButtons();
    }
  };
}

function openModal() {
  const modal = document.getElementById("myModal");
  // Display the modal when adding a new category
  modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Function to handle the "Cancel" button click
const cancelButton = document.getElementById("cancelButton");
cancelButton.onclick = function () {
  // Close the modal without adding a new category
  closeModal();
};
const modal = document.getElementById("myModal");
// Close the modal when the user clicks outside of it
window.onclick = function (event) {
  if (modal && event.target === modal) {
    closeModal();
  }
};

// Function to close the modal
function closeModal() {
  if (modal) {
    modal.style.display = "none";
  }
}

// Initial update of category buttons
updateCategoryButtons();
