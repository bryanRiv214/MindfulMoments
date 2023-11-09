document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('healthForm');
  const healthCondition = document.getElementById('healthCondition');
  const conditionsDisplay = document.getElementById('conditionsDisplay');
  const userConditions = document.getElementById('userConditions');
  let conditionsArray = []; // Array to hold conditions

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    let condition = healthCondition.value.trim();
    
    if (condition) {
      conditionsArray.push(condition); // Add new condition to the array
      updateConditionsList(); // Update the list displayed on the page
      healthCondition.value = ''; // Clear the input field
      conditionsDisplay.classList.remove('hidden'); // Ensure the display is not hidden
    } else {
      alert('Please enter a health condition to add to the list.');
    }
  });
  
  // Function to remove a condition from the array and update the list
  function removeCondition(index) {
    conditionsArray.splice(index, 1); // Remove the condition at the specified index
    updateConditionsList(); // Refresh the list displayed in the DOM
    if (conditionsArray.length === 0) {
      conditionsDisplay.classList.add('hidden'); // Hide the list if it is empty
    }
  }

  // Function to update the conditions list in the DOM
  function updateConditionsList() {
    userConditions.innerHTML = ''; // Clear the existing list
    conditionsArray.forEach(function(condition, index) {
      let li = document.createElement('li');
      li.className = 'condition-item'; // Set the class for styling
      let conditionText = document.createElement('span');
      conditionText.textContent = condition; // Set the condition text
      li.appendChild(conditionText); // Add text to list item
      
      // Create delete button for each condition
      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X'; // Text content for delete button
      deleteBtn.className = 'delete-btn'; // Set the class for styling
      deleteBtn.onclick = function() { removeCondition(index); }; // Attach handler to remove condition
      li.appendChild(deleteBtn); // Add button to list item
      
      userConditions.appendChild(li); // Add list item to the UL element
    });
  }
});
