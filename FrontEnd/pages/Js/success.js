// Fetch protected data
async function fetchProtectedData() {
  const token = localStorage.getItem('token'); // Get token from local storage

  if (!token) {
    alert('Unauthorized! Please login first.');
    window.location.href = './signin.html'; // Redirect to login page
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/protected-route', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token to the request
      }
    });

    const data = await response.json();
    if (response.ok) {
      document.getElementById('protected-content').innerText = data.message;
    } else {
      alert('Access Denied! Redirecting to login...');
      logout(); // Logout if access denied
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch protected data!');
    logout(); // Logout on error
  }
}

// Logout Function
function logout() {
  localStorage.removeItem('token'); // Remove token from local storage
  alert('You have been logged out!');
  window.location.href = './signin.html'; // Redirect to login page
}

// Attach logout button event listener
document.getElementById('logoutBtn').addEventListener('click', logout);

// Load protected data on page load
window.onload = fetchProtectedData;
