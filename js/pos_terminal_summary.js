// pos_terminal_summary.js

document.addEventListener("DOMContentLoaded", function() {
    const customerNameDisplay = document.getElementById('customer-name');
    const petNameDisplay = document.getElementById('pet-name');
    const contactNumberDisplay = document.getElementById('contact-number');
    const discountTypeDisplay = document.getElementById('discount-type');

    // Load values from localStorage
    customerNameDisplay.textContent = localStorage.getItem('customerName') || 'None';
    petNameDisplay.textContent = localStorage.getItem('petName') || 'None';
    contactNumberDisplay.textContent = localStorage.getItem('contactNumber') || 'None';

    // Convert discount value to readable format
    const discountType = localStorage.getItem('discountType') || '0';
    discountTypeDisplay.textContent = (discountType === "none" ? "None" : 
                                        discountType === "pwd" ? "PWD" : 
                                        discountType === "promo" ? "Promo" : "None");
});


// 
// 
// TOGGLE THE SIDEBAR
// 
// 
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const logo = document.querySelector('.logo');
    sidebar.classList.toggle('collapsed');
    logo.classList.toggle('collapsed');
}

function setActiveLink(event) {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', setActiveLink);
});

// 
// 
// Function to update the date and time
// 
// 
function updateDateTime() {
    const now = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = now.toLocaleString('en-US', options).replace(',', '   '); // Formatting to match desired output
    document.getElementById('dateTime').textContent = formattedDateTime;
}

// Update date and time every second
setInterval(updateDateTime, 1000);
// Initial call to set date and time immediately on page load
updateDateTime();


// 
// 
// INPUT NUMBER ONLY ON THE input-field-tendered
// TENDERED AMOUNT AND CHANGE
// 
// 
// Function to calculate change based on input
function calculateChange() {
    const totalAmount = 490.50; // Replace this with the dynamic total amount if necessary
    const tenderedInput = document.getElementById('tenderedInput');
    const changeAmountDisplay = document.getElementById('changeAmount');

    // Ensure the input is numeric and set the value to 0 if it's empty
    let tenderedAmount = parseFloat(tenderedInput.value) || 0;

    // Calculate change
    const change = (tenderedAmount - totalAmount).toFixed(2); // Calculate change and format to 2 decimal places

    // Display the change amount
    changeAmountDisplay.textContent = change < 0 ? "0.00" : change; // Show 0.00 if tendered is less than total
}

// Add event listener to allow only numbers and a decimal point
document.getElementById('tenderedInput').addEventListener('keypress', function (e) {
    // Allow only numbers and decimal points
    if (!/[0-9.]/.test(e.key)) {
        e.preventDefault();
    }
});



// 
// 
// CANCEL-BUTTON -- it will go back to its previous page
// 
// 
function goBack() {
    window.history.back();
}


// 
// 
//  MODAL FOR THE RECEIPT
// 
// 

// Function to open the modal
function openModal() {
    document.getElementById("payModal").classList.remove("hidden");
}

// Function to close the modal and redirect
function closeModal() {
    document.getElementById("payModal").classList.add("hidden");
    window.location.href = '/html/pos_terminal-services.html';
}

// Function to calculate change and manage button state
function calculateChange() {
    const tenderedInput = document.getElementById("tenderedInput");
    const changeAmount = document.getElementById("changeAmount");
    const payButton = document.getElementById("payButton");
    
    const tenderedValue = parseFloat(tenderedInput.value) || 0;
    const totalAmount = 490.50; // Example total amount
    
    // Calculate change
    const change = tenderedValue - totalAmount;
    changeAmount.textContent = change >= 0 ? change.toFixed(2) : "0.00";

    // Enable or disable the PAY button
    payButton.disabled = tenderedInput.value.trim() === "" || tenderedValue <= 0;
}

// Event listener for the pay button
document.querySelector('.pay-button').addEventListener('click', function() {
    openModal();
});

// Close the modal when clicking anywhere on the screen
window.addEventListener('click', function(event) {
    const modal = document.getElementById("payModal");
    if (!modal.classList.contains("hidden") && event.target === modal) {
        closeModal();
    }
});

// Add event listener for the input field to calculate change and manage button state
document.getElementById("tenderedInput").addEventListener("input", calculateChange);