function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting the default way
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (email === 'cashier@vetflow.com' && password === '1234') {
        window.location.href = '/html/pos_terminal-services.html'; // Redirect to pos_terminal.html
    } else {
        alert('Invalid email or password'); // Show an alert for invalid credentials
    }
}
