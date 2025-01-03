// Signup Form Submission
if (document.getElementById('registrationForm')) {
  document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect input values
    const name = document.getElementById('typenameX').value;
    const email = document.getElementById('typeEmailX').value;
    const password = document.getElementById('typePasswordX').value;

    // Send POST request to backend
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Send form data as JSON
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        alert('Registration successful! Redirecting to sign-in page...');
        window.location.href = './signin.html';
      } else {
        alert(`Error: ${data.message || 'Failed to register user!'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register user!');
    }
  });
}

// Login Form Submission
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const email = document.getElementById('typeEmail').value;
    const password = document.getElementById('typePassword').value;

    // Validate inputs
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send POST request to server for authentication
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        

        // Save user data in local storage (optional)
        if (data.token) {
  localStorage.setItem('token', data.token); // Save JWT token
  localStorage.setItem('user', JSON.stringify(data.user)); // Save user info
}
        // Redirect to dashboard
        window.location.href = './successLogin.html';
      } else {
        alert(`Error: ${data.message || 'Invalid email or password'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  });
}
