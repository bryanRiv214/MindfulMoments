// Wait for the entire HTML document to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Select all buttons within the form that have the name attribute "event"
    document.querySelectorAll('#entry-form button[name="event"]').forEach(button => {
        // Add an event listener to each button for 'click' events
        button.addEventListener('click', function() {
            // When a button is clicked, toggle the 'active' class on or off
            // This can change the appearance of the button to show it's been selected
            this.classList.toggle('active');
        });
    });

    // Select the form with the ID 'entry-form'
    const form = document.getElementById('entry-form');

    // Add an event listener to the form for 'submit' events
    form.addEventListener('submit', function(event) {
        // Check if any of the event buttons are selected (have the 'active' class)
        const isSelected = form.querySelector('button[name="event"].active');

        // Check if all the text input fields, except the 'more-info' field, are filled out
        // It does this by converting the NodeList of input elements to an array
        // and then using 'filter' and 'every' to ensure all required fields have values
        const isFilled = Array.from(form.querySelectorAll('input[type="text"]'))
							  .filter(input => input.id !== 'why') // Exclude "Why?" field
							  .filter(input => input.id !== 'helped') // Exclude "What Helped?" field
                              .filter(input => input.id !== 'more-info') // Exclude "More Info?" field
                              .every(input => input.value.trim() !== '');

        // If not all required fields are filled or no event is selected
        if (!isSelected || !isFilled) {
            event.preventDefault(); // Stop the form from being submitted
            // Show a custom alert message
            showCustomAlert('Please fill in all required fields and select an event.');
            return false; // Return false to prevent further actions
        }
        
        // Add any additional logic here for when the form passes validation
        // For example, you could send the data to a server or display a confirmation message
    });
});

// Function to display a custom alert message
function showCustomAlert(message) {
    // Find the div with the ID 'custom-alert'
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'block'; // Make the alert box visible
    alertBox.textContent = message; // Set the text of the alert box to the provided message
    
    // Set a timeout to automatically hide the alert box after 5 seconds
    setTimeout(() => {
        alertBox.style.display = 'none'; // Hide the alert box
    }, 5000);
}
