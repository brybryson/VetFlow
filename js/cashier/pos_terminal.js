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
// DELETE FUNCTION ON THE SUMMARY OF RECEIPT
// 
// 
// Select all cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    let startX; // Starting X position
    let currentX = 0; // Current X position
    let isSliding = false; // Flag for sliding

    // Mouse down event to start sliding
    card.addEventListener('mousedown', (e) => {
        startX = e.clientX; // Get starting position
        isSliding = true; // Set sliding flag to true
        card.style.transition = 'none'; // Disable transition while sliding
    });

    // Mouse move event to handle sliding
    card.addEventListener('mousemove', (e) => {
        if (isSliding) {
            currentX = e.clientX - startX; // Calculate current X offset
            if (currentX > 0) {
                card.style.transform = `translateX(${currentX}px)`; // Slide the card
                // Show the delete icon when the card is moved
                card.querySelector('.delete-icon').style.opacity = '1'; // Show delete icon
            }
        }
    });

    // Mouse up event to finalize sliding
    card.addEventListener('mouseup', () => {
        if (isSliding) {
            isSliding = false; // Reset sliding flag
            card.style.transition = 'transform 0.3s ease'; // Re-enable transition

            if (currentX > 100) {
                card.style.transform = 'translateX(100%)'; // Slide out of view
                setTimeout(() => card.remove(), 300); // Remove after sliding
            } else {
                card.style.transform = 'translateX(0)'; // Reset position
                card.querySelector('.delete-icon').style.opacity = '0'; // Hide delete icon
            }
            currentX = 0; // Reset currentX after mouse up
        }
    });

    // Handle touch events for mobile devices
    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Get starting position
        isSliding = true; // Set sliding flag to true
        card.style.transition = 'none'; // Disable transition while sliding
    });

    card.addEventListener('touchmove', (e) => {
        if (isSliding) {
            currentX = e.touches[0].clientX - startX; // Calculate current X offset
            if (currentX > 0) {
                card.style.transform = `translateX(${currentX}px)`; // Slide the card
                // Show the delete icon when the card is moved
                card.querySelector('.delete-icon').style.opacity = '1'; // Show delete icon
            }
        }
    });

    card.addEventListener('touchend', () => {
        if (isSliding) {
            isSliding = false; // Reset sliding flag
            card.style.transition = 'transform 0.3s ease'; // Re-enable transition

            if (currentX > 100) {
                card.style.transform = 'translateX(100%)'; // Slide out of view
                setTimeout(() => card.remove(), 300); // Remove after sliding
            } else {
                card.style.transform = 'translateX(0)'; // Reset position
                card.querySelector('.delete-icon').style.opacity = '0'; // Hide delete icon
            }
            currentX = 0; // Reset currentX after touch end
        }
    });

    // Add click event to delete icon
    card.querySelector('.delete-icon').addEventListener('click', () => {
        card.style.transform = 'translateX(100%)'; // Slide out of view
        setTimeout(() => card.remove(), 300); // Remove after sliding
    });
});

// 
// 
// ADDING AMOUNT OF THE ITEM OR SERVICE
// 
// 
document.querySelectorAll('.product-service-amount').forEach(container => {
    const decrementButton = container.querySelector('.decrement-button');
    const incrementButton = container.querySelector('.increment-button');
    const itemCountDisplay = container.querySelector('.item-count');
    const priceDisplay = container.closest('.card').querySelector('.price'); // Get the price display element
    const card = container.closest('.card'); // Get the card for price data

    let count = parseInt(itemCountDisplay.textContent);
    const pricePerItem = parseFloat(card.dataset.price); // Get price from data attribute

    // Function to update the price display
    const updatePriceDisplay = () => {
        const totalPrice = pricePerItem * count; // Calculate total price
        priceDisplay.textContent = `₱${totalPrice.toFixed(2)}`; // Update price display
    };

    decrementButton.addEventListener('click', () => {
        if (count > 1) {
            count--;
            itemCountDisplay.textContent = count;
            updatePriceDisplay(); // Update price on decrement
        }
    });

    incrementButton.addEventListener('click', () => {
        count++;
        itemCountDisplay.textContent = count;
        updatePriceDisplay(); // Update price on increment
    });
});

// 
// 
// CONTACT NUMBER - to avoid letters input - right container
// 
// 
// Select the contact input field
const contactNumberInput = document.getElementById('contact-number');

// Restrict input to only digits
contactNumberInput.addEventListener('input', function () {
    // Remove any non-numeric characters
    this.value = this.value.replace(/\D/g, '');
});

// 
// 
// WHEN CLEAR BUTTON IS CLICKED, service-cards-container WILL BE CLEARED
// 
// 
// Function to clear all service cards and reset customer details
function clearServiceCards() {
    // Clear service cards
    const serviceCardsContainer = document.getElementById('service-cards-container');
    serviceCardsContainer.innerHTML = '';

    // Reset customer details
    document.getElementById('customer-name').value = '';
    document.getElementById('pet-name').value = '';
    document.getElementById('contact-number').value = '';
    document.getElementById('discount-type').selectedIndex = 0;

    // Clear localStorage
    localStorage.removeItem('customerName');
    localStorage.removeItem('petName');
    localStorage.removeItem('contactNumber');
    localStorage.removeItem('discountType');
}

// Add event listener to the CLEAR button
document.querySelector('.clear-button').addEventListener('click', clearServiceCards);

// CLOSES THE MODAL NOTIFICATION FOR LOW STOCK
function closeModal() {
    document.getElementById("notification-modal").style.display = "none";
}

// 
// 
// WHEN NEXT BUTTON IS CLICKED
// 
// 
// Event listener for the NEXT button
document.querySelector('.next-button').addEventListener('click', function() {
    window.location.href = '/html/cashier/pos_terminal_summary.html'; // Redirect to the summary page
});


// 
// 
// MODAL TO AVOID OVERFLOW OF ITEMS
// 
// 

// JavaScript to show only two products and add "..." if there are more
document.addEventListener("DOMContentLoaded", function() {
    const productList = document.querySelectorAll(".products-low-stock p");
    
    if (productList.length > 2) {
        // Display only the first two products
        productList[0].style.display = "block";
        productList[1].innerText += " ..."; // Add ellipsis to the second product
        // Hide the rest of the products
        for (let i = 2; i < productList.length; i++) {
            productList[i].style.display = "none";
        }
    }
});

// 
// 
// CLOSE MODAL SLIDE TO THE RIGHT 
// 
// 

function closeModal() {
    const modal = document.getElementById('notification-modal');
    modal.classList.add('slide-out'); // Add slide-out class to start the animation

    // Wait for the transition to complete, then hide the modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400); // 400ms matches the transition duration in CSS
}

// Show the modal after a 3-second delay
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('notification-modal');
    
    // Show the modal after a 3-second delay
    setTimeout(() => {
        modal.classList.add('show'); // Add the show class to trigger entrance animation
    }, 3000); // 3000 milliseconds = 3 seconds
});



// 
// 
// 
// Load saved values from localStorage
document.addEventListener("DOMContentLoaded", function() {
    const customerNameInput = document.getElementById('customer-name');
    const petNameInput = document.getElementById('pet-name');
    const contactNumberInput = document.getElementById('contact-number');
    const discountTypeSelect = document.getElementById('discount-type');

    customerNameInput.value = localStorage.getItem('customerName') || '';
    petNameInput.value = localStorage.getItem('petName') || '';
    contactNumberInput.value = localStorage.getItem('contactNumber') || '';
    discountTypeSelect.value = localStorage.getItem('discountType') || '0'; // Assuming '0' is the default index
});

// Save inputs to localStorage on change
const customerNameInput = document.getElementById('customer-name');
const petNameInput = document.getElementById('pet-name');
const discountTypeSelect = document.getElementById('discount-type');

customerNameInput.addEventListener('input', () => {
    localStorage.setItem('customerName', customerNameInput.value);
});

petNameInput.addEventListener('input', () => {
    localStorage.setItem('petName', petNameInput.value);
});

contactNumberInput.addEventListener('input', () => {
    localStorage.setItem('contactNumber', contactNumberInput.value);
});

discountTypeSelect.addEventListener('change', () => {
    localStorage.setItem('discountType', discountTypeSelect.value);
});
