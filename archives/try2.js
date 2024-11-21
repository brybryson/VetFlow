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
//  LAST ACTIVE DOWN BUTTON ASCENDING AND DESCENDING ORDER
// 
// 

// Add this JavaScript code inside your `admin_part.js` file or a separate script block

// Keep track of the current sort state
let sortState = 0; // 0 - original, 1 - latest to oldest, 2 - oldest to latest

// Function to sort users
function sortUsers() {
    const userRows = document.querySelectorAll('.user-row');
    const sortedUserRows = Array.from(userRows);

    // Get the last active date for each user
    const getLastActiveDate = (userRow) => {
        const lastActiveDate = userRow.querySelector('.last-active-date').textContent.trim();
        return new Date(lastActiveDate);
    };

    // Sorting logic
    if (sortState === 1) {
        // Sort from latest to oldest (newest first)
        sortedUserRows.sort((a, b) => getLastActiveDate(b) - getLastActiveDate(a));
    } else if (sortState === 2) {
        // Sort from oldest to latest (oldest first)
        sortedUserRows.sort((a, b) => getLastActiveDate(a) - getLastActiveDate(b));
    }

    // Reset the order if sortState is 0 (original order)
    if (sortState === 0) {
        sortedUserRows.sort((a, b) => {
            const aIndex = Array.from(userRows).indexOf(a);
            const bIndex = Array.from(userRows).indexOf(b);
            return aIndex - bIndex;
        });
    }

    // Reattach the rows to the container in the new order
    const userInformationContainer = document.querySelector('.user-information-container');
    sortedUserRows.forEach(row => userInformationContainer.appendChild(row));

    // Toggle sortState
    sortState = (sortState + 1) % 3;
}

// Event listener for the arrow button click
document.querySelector('.last-active-arrow-button').addEventListener('click', sortUsers);




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
