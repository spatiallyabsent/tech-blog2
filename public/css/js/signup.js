// Function to handle signup form submission
const handleSignup = async (event) => {
    event.preventDefault();
  
    // Get form data
    const username = document.querySelector('#new-username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#new-password').value.trim();
  
    // Send POST request to signup route
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if request was successful
      if (response.ok) {
        const data = await response.json();
        // Do something with the response data (e.g., redirect to dashboard)
        window.location.replace('/dashboard');
      } else {
        // Display error message if request was not successful
        const errorMessage = await response.json();
        console.error(errorMessage.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Add event listener to signup form
  document.querySelector('#signup-form').addEventListener('submit', handleSignup);