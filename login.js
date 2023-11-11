// Wait for the DOM to fully load before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
  // Get the login form by its ID
  const form = document.getElementById('loginForm');

  // Listen for the form submission event
  form.addEventListener('submit', function(event) {
	// Prevent the form from submitting the traditional way
    event.preventDefault();

	// Get the values entered by the user in the form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hard-coded user credentials (for demonstration purposes only, not secure)
    const hardcodedUsername = 'user';
    const hardcodedPassword = 'pass';

	// Check if the entered credentials match the hard-coded ones
    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Redirect to 'index.html' on successful login
      window.location.href = 'index.html';
    } else {
	  // Show an alert if the credentials are incorrect
      alert('Incorrect username or password. Please try again.');
    }
  });
});
