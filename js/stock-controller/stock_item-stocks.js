function toggleOptionsMenu(event) {
    event.stopPropagation();
    const menu = event.currentTarget.nextElementSibling;
    menu.classList.toggle('hidden');
}


document.addEventListener('click', function(event) {
    const optionsMenus = document.querySelectorAll('.options-menu');
    optionsMenus.forEach(menu => {
        if (!menu.contains(event.target) && !menu.previousElementSibling.contains(event.target)) {
            menu.classList.add('hidden');
        }
    });
});


// 
// TOGGLE THE SIDEBAR
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
//   CHECKBOXES AND ARCHIVE BUTTON
// 
// 

document.addEventListener("DOMContentLoaded", function () {

    // Handle 'Select All' functionality in the user-labels-row
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    const userCheckboxes = document.querySelectorAll(".user-row .user-checkbox");

    selectAllCheckbox.addEventListener("change", function () {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Handle clicking the Archive button in the user-labels-row
    const archiveButton = document.querySelector(".archive-user-button");
    archiveButton.addEventListener("click", function () {
        // Get all user rows with selected checkboxes
        const selectedUserRows = document.querySelectorAll(".user-row input:checked");
        
        selectedUserRows.forEach(checkbox => {
            const userRow = checkbox.closest(".user-row");
            // Archive or delete the row (remove from DOM in this case)
            userRow.classList.add("archived"); // Optionally add an 'archived' class
            userRow.style.display = "none"; // Hide the row
        });

        // Optionally, reset 'select all' checkbox if no rows are selected
        selectAllCheckbox.checked = false;
    });

    // Optional: Archive action for individual user rows (can also be used to "delete")
    const individualArchiveButtons = document.querySelectorAll(".user-row .archive-icon");
    individualArchiveButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const userRow = event.target.closest(".user-row");
            userRow.classList.add("archived"); // Optionally add 'archived' class
            userRow.style.display = "none"; // Hide the row
        });
    });

});




// 
// 
//  TO HIDE PREVIOUSLY OPEN MENU BEFORE SHOWING NEW ONE (ELLIPSIS PART)
// 
// 

let currentOpenMenu = null;

function toggleOptionsMenu(event) {
    // Prevent the click event from propagating to other elements
    event.stopPropagation();

    // Get the options menu related to the clicked ellipsis button
    const optionsMenu = event.currentTarget.nextElementSibling;

    // Hide the previously open options menu if it's not the same as the clicked one
    if (currentOpenMenu && currentOpenMenu !== optionsMenu) {
        currentOpenMenu.classList.add('hidden');
    }

    // Toggle the visibility of the clicked options menu
    optionsMenu.classList.toggle('hidden');

    // Update the currentOpenMenu reference
    currentOpenMenu = optionsMenu.classList.contains('hidden') ? null : optionsMenu;
}

// Hide the options menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (currentOpenMenu && !event.target.closest('.options-button')) {
        currentOpenMenu.classList.add('hidden');
        currentOpenMenu = null;
    }
});





// 
// 
// SEARCH BAR FUNCTIONALITY
// 
// 

document.addEventListener("DOMContentLoaded", function () {
    // Search functionality
    const searchInput = document.querySelector(".search-input");
    const userRows = document.querySelectorAll(".item-row"); // Updated to `.item-row`
    const noResultsMessage = document.getElementById("noResultsMessage");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasMatch = false;

        // Loop through each item row and check for a match
        userRows.forEach(itemRow => {
            const skuNumber = itemRow.querySelector(".sku-number")?.textContent.toLowerCase() || "";
            const itemLabel = itemRow.querySelector(".item-label-name")?.textContent.toLowerCase() || "";
            const itemCategory = itemRow.querySelector(".item-category")?.textContent.toLowerCase() || "";
            const vendorInfo = itemRow.querySelector(".vendor-info")?.textContent.toLowerCase() || "";

            // Check if any field contains the search term
            if (
                skuNumber.includes(searchTerm) ||
                itemLabel.includes(searchTerm) ||
                itemCategory.includes(searchTerm) ||
                vendorInfo.includes(searchTerm)
            ) {
                itemRow.style.display = "grid"; // Show the matching row
                hasMatch = true;
            } else {
                itemRow.style.display = "none"; // Hide non-matching rows
            }
        });

        // Show 'no results' message if no match was found
        noResultsMessage.style.display = hasMatch ? "none" : "block";
    });

    // Clear search results when input is cleared
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            userRows.forEach(itemRow => {
                itemRow.style.display = "grid"; // Show all rows when search is cleared
            });
            noResultsMessage.style.display = "none"; // Hide message when input is cleared
        }
    });
});






// Function to toggle options menu visibility
function toggleOptionsMenu(event) {
    const optionsMenu = event.currentTarget.nextElementSibling;
    optionsMenu.classList.toggle('hidden');
}

// Call loadUserData on page load
document.addEventListener('DOMContentLoaded', loadUserData);


// 
// 
// 
// 
// 
// 
// 


function loadUserData() {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the user list before loading

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Loaded users from localStorage:", users);

    if (users.length === 0) {
        document.getElementById('noResultsMessage').classList.remove('hidden');
    } else {
        document.getElementById('noResultsMessage').classList.add('hidden');
        users.forEach(user => {
            console.log("User being processed:", user);
            // (existing code for creating user rows here)
        });
    }
}

// Call loadUserData when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadUserData);



// END OF NOT FUNCTIONING CODE








// 
// 
// DISCOUNT, PRICE, STOCKS SORTING PART
// 
// 

// discountSort.js

// Sorting logic for Discounts
const discountSortButton = document.querySelector('.discount-sort-button');
const discountSortIcon = discountSortButton.querySelector('.sort-icon');
let isDiscountAscending = true;

discountSortButton.addEventListener('click', () => {
  const itemRows = Array.from(document.querySelectorAll('.item-row'));
  itemRows.sort((rowA, rowB) => {
    const discountA = parseFloat(
      rowA.querySelector('.discount-amount').textContent.replace('%', '')
    );
    const discountB = parseFloat(
      rowB.querySelector('.discount-amount').textContent.replace('%', '')
    );

    return isDiscountAscending ? discountA - discountB : discountB - discountA;
  });

  discountSortIcon.style.transition = "transform 0.3s";
  discountSortIcon.style.transform = isDiscountAscending
    ? 'rotate(180deg)'
    : 'rotate(0deg)';

  const container = document.querySelector('.items-table-container');
  itemRows.forEach((row) => container.appendChild(row));

  isDiscountAscending = !isDiscountAscending;
});

// Sorting logic for Price
const priceSortButton = document.querySelector('.price-sort-button');
const priceSortIcon = priceSortButton.querySelector('.sort-icon');
let isPriceAscending = true;

priceSortButton.addEventListener('click', () => {
  const itemRows = Array.from(document.querySelectorAll('.item-row'));
  itemRows.sort((rowA, rowB) => {
    const priceA = parseFloat(
      rowA.querySelector('.price-amount').textContent.replace('₱', '').replace(',', '')
    );
    const priceB = parseFloat(
      rowB.querySelector('.price-amount').textContent.replace('₱', '').replace(',', '')
    );

    return isPriceAscending ? priceA - priceB : priceB - priceA;
  });

  priceSortIcon.style.transition = "transform 0.3s";
  priceSortIcon.style.transform = isPriceAscending
    ? 'rotate(180deg)'
    : 'rotate(0deg)';

  const container = document.querySelector('.items-table-container');
  itemRows.forEach((row) => container.appendChild(row));

  isPriceAscending = !isPriceAscending;
});

// Sorting logic for Stocks
const stocksSortButton = document.querySelector('.stocks-sort-button');
const stocksSortIcon = stocksSortButton.querySelector('.sort-icon');
let isStocksAscending = true;

stocksSortButton.addEventListener('click', () => {
  const itemRows = Array.from(document.querySelectorAll('.item-row'));
  itemRows.sort((rowA, rowB) => {
    const stocksA = parseInt(rowA.querySelector('.stock-amount').textContent, 10);
    const stocksB = parseInt(rowB.querySelector('.stock-amount').textContent, 10);

    return isStocksAscending ? stocksA - stocksB : stocksB - stocksA;
  });

  stocksSortIcon.style.transition = "transform 0.3s";
  stocksSortIcon.style.transform = isStocksAscending
    ? 'rotate(180deg)'
    : 'rotate(0deg)';

  const container = document.querySelector('.items-table-container');
  itemRows.forEach((row) => container.appendChild(row));

  isStocksAscending = !isStocksAscending;
});



// 
// 
// STATUS SORTING PART
// 
// 


document.addEventListener("DOMContentLoaded", () => {
    const statusSortButton = document.querySelector(".status-sort-button");
    const statusIcon = statusSortButton.querySelector(".sort-icon");
    const itemRows = Array.from(document.querySelectorAll(".item-row"));
    let isAscending = true; // To toggle sorting order

    statusSortButton.addEventListener("click", () => {
        // Rotate the sort icon
        statusIcon.style.transition = "transform 0.3s";
        statusIcon.style.transform = isAscending ? "rotate(180deg)" : "rotate(0deg)";
        
        // Sort the rows based on the "status" class
        itemRows.sort((rowA, rowB) => {
            const statusA = rowA.querySelector(".status").textContent.trim();
            const statusB = rowB.querySelector(".status").textContent.trim();

            // Custom sorting: Empty statuses come last, then "Low Stock", then "Empty"
            if (statusA === "" && statusB === "") return 0;
            if (statusA === "") return isAscending ? 1 : -1;
            if (statusB === "") return isAscending ? -1 : 1;
            if (statusA === "Empty" && statusB === "Low Stock") return isAscending ? 1 : -1;
            if (statusA === "Low Stock" && statusB === "Empty") return isAscending ? -1 : 1;

            return isAscending
                ? statusA.localeCompare(statusB)
                : statusB.localeCompare(statusA);
        });

        // Append sorted rows back to the container
        const itemsTableContainer = document.querySelector(".items-table-container");
        itemRows.forEach(row => itemsTableContainer.appendChild(row));

        // Toggle sorting order
        isAscending = !isAscending;
    });
});


// 
// 
// VISIBILITY BUTTON
// 
// 

function toggleRowVisibility(button) {
    // Get the row ID from the button's data attribute
    const rowId = button.getAttribute('data-row-id');
    const row = document.getElementById(rowId);

    if (row) {
        // Toggle the "disabled" class on the row
        row.classList.toggle('disabled');

        // Update the button's appearance and text
        const isDisabled = row.classList.contains('disabled');
        button.classList.toggle('disabled', isDisabled);

        // Update the toggle switch and label
        const toggleSwitch = button.querySelector('.toggle-switch');
        const toggleLabel = button.querySelector('.toggle-label');

        if (isDisabled) {
            toggleSwitch.style.backgroundColor = '#f44336'; // Red for disabled
            toggleSwitch.querySelector('.circle').style.left = '22px';
            toggleLabel.textContent = 'Hidden';
        } else {
            toggleSwitch.style.backgroundColor = '#4caf50'; // Green for enabled
            toggleSwitch.querySelector('.circle').style.left = '2px';
            toggleLabel.textContent = 'Visible';
        }
    }
}

// Toggle options menu
function toggleOptionsMenu(event) {
    const ellipsisButton = event.target.closest('.ellipsis-button');
    if (ellipsisButton) {
        const menu = ellipsisButton.nextElementSibling;
        menu.classList.toggle('hidden'); // Toggle visibility of the options menu
    }
}



// FOR THE VISIBILITY

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set data-row-id for each visibility button based on its parent row
    document.querySelectorAll('.item-row').forEach(row => {
        const rowId = row.id; // e.g., 'row-1', 'row-2'
        const toggleButton = row.querySelector('.toggle-visibility-btn');
        if (toggleButton) {
            toggleButton.setAttribute('data-row-id', rowId);
        }
    });
});
