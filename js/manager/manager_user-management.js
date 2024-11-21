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





// 
// 
// SEARCH BAR FUNCTIONALITY
// 
// 

document.addEventListener("DOMContentLoaded", function () {
    // Other code ...

    // Search functionality
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const userRows = document.querySelectorAll(".user-row");
    const noResultsMessage = document.getElementById("noResultsMessage");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasMatch = false;

        // Loop through each user row and check for a match
        userRows.forEach(userRow => {
            const userName = userRow.querySelector(".user-full-name").textContent.toLowerCase();
            const userCode = userRow.querySelector(".user-code").textContent.toLowerCase();

            // Show the row if it matches the search term in user name or user code
            if (userName.includes(searchTerm) || userCode.includes(searchTerm)) {
                userRow.style.display = "grid";
                hasMatch = true;
            } else {
                userRow.style.display = "none";
            }
        });

        // Show 'no results' message if no match was found
        noResultsMessage.style.display = hasMatch ? "none" : "block";
    });

    // Clear search results when search input is cleared
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            userRows.forEach(userRow => {
                userRow.style.display = "grid";
            });
            noResultsMessage.style.display = "none"; // Hide message when input is cleared
        }
    });
});




// 
// 
//  UPDATES THE USER NUMBER WHEN A USER-ROW IS DELETED
// 
// 

// Function to update the user count
function updateUserCount() {
    // Count only visible user rows
    const visibleUserRows = document.querySelectorAll(".user-row:not([style*='display: none'])");
    const userNumberElement = document.querySelector(".user-number");
    userNumberElement.textContent = visibleUserRows.length;
}

document.addEventListener("DOMContentLoaded", function () {
    // Handle 'Select All' functionality
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    const userCheckboxes = document.querySelectorAll(".user-row .user-checkbox");

    selectAllCheckbox.addEventListener("change", function () {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Archive selected user rows and update count
    const archiveButton = document.querySelector(".archive-user-button");
    archiveButton.addEventListener("click", function () {
        const selectedUserRows = document.querySelectorAll(".user-row input:checked");
        
        selectedUserRows.forEach(checkbox => {
            const userRow = checkbox.closest(".user-row");
            userRow.style.display = "none"; // Hide the row
        });

        selectAllCheckbox.checked = false; // Reset 'select all' checkbox
        updateUserCount(); // Update user count
    });

    // Archive individual user rows and update count
    const individualArchiveButtons = document.querySelectorAll(".user-row .archive-icon");
    individualArchiveButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const userRow = event.target.closest(".user-row");
            userRow.style.display = "none"; // Hide the row
            updateUserCount(); // Update user count
        });
    });

    // Initial update of user count
    updateUserCount();
});



// UPDATE: NOV 10 
// STILL NOT WORKING UNTIL THE END OF THE JS
// START OF NOT FUNCTIONING CODE
// 
// LOADING THE SAVE USER INFO FROM THE LOCAL STORAGE FROM THE INPUTS ON ADMIN_ADD-USER.HTML
// 
// 
// Function to load saved user data and create a new user row
// Function to load user data from localStorage and display it
function loadUserData() {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the user list before loading

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        document.getElementById('noResultsMessage').classList.remove('hidden');
    } else {
        document.getElementById('noResultsMessage').classList.add('hidden');
        users.forEach(user => {
            const userRow = document.createElement('div');
            userRow.classList.add('user-row', 'grid', 'relative');

            // User checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('user-checkbox');
            userRow.appendChild(checkbox);

            // User name and code
            const userNameContainer = document.createElement('div');
            userNameContainer.classList.add('user-name-container');

            const userPhoto = document.createElement('img');
            userPhoto.src = user.photo || '/graphics/pictures/default-user.png'; // Default if no photo
            userPhoto.alt = user.name;
            userPhoto.classList.add('user-photo');
            userNameContainer.appendChild(userPhoto);

            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

            const fullName = document.createElement('p');
            fullName.classList.add('user-full-name');
            fullName.textContent = user.name;
            userInfo.appendChild(fullName);

            const userCode = document.createElement('p');
            userCode.classList.add('user-code');
            userCode.textContent = user.code;
            userInfo.appendChild(userCode);

            userNameContainer.appendChild(userInfo);
            userRow.appendChild(userNameContainer);

            // User role
            const roleContainer = document.createElement('div');
            roleContainer.classList.add('role-container');
            const roleSpan = document.createElement('span');
            roleSpan.classList.add(`role-${user.role.toLowerCase()}`);
            roleSpan.textContent = user.role;
            roleContainer.appendChild(roleSpan);
            userRow.appendChild(roleContainer);

            // Last active date
            const lastActive = document.createElement('span');
            lastActive.classList.add('last-active-date');
            lastActive.textContent = user.lastActive || 'N/A';
            userRow.appendChild(lastActive);

            // Date added
            const dateAdded = document.createElement('span');
            dateAdded.classList.add('date-added');
            dateAdded.textContent = user.dateAdded || 'N/A';
            userRow.appendChild(dateAdded);

            // Options button with menu
            const optionsButton = document.createElement('button');
            optionsButton.classList.add('options-button');
            optionsButton.onclick = event => toggleOptionsMenu(event);
            const optionsIcon = document.createElement('img');
            optionsIcon.src = '/graphics/icons/3-vertical-dots.png';
            optionsIcon.alt = 'Options';
            optionsIcon.classList.add('ellipsis-icon');
            optionsButton.appendChild(optionsIcon);
            userRow.appendChild(optionsButton);

            const optionsMenu = document.createElement('div');
            optionsMenu.classList.add('options-menu', 'hidden', 'absolute', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'mt-2', 'p-2', 'w-32');
            optionsMenu.innerHTML = `
                <ul>
                    <li class="view-profile p-2 hover:bg-gray-200 cursor-pointer">
                        <img src="/graphics/icons/view-profile.png" alt="View Profile Icon" class="menu-icon"> View Profile
                    </li>
                    <li class="edit-details p-2 hover:bg-gray-200 cursor-pointer">
                        <img src="/graphics/icons/edit-details.png" alt="Edit Details Icon" class="menu-icon"> Edit Details
                    </li>
                    <li class="move-to-archive p-2 hover:bg-gray-200 cursor-pointer">
                        <img src="/graphics/icons/move-to-archive-3.png" alt="Archive Icon" class="menu-icon"> Archive
                    </li>
                </ul>
            `;
            userRow.appendChild(optionsMenu);

            // Append userRow to userList
            userList.appendChild(userRow);
        });
    }
}

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