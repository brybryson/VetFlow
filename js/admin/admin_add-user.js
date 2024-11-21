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
//    PREVIEW PICTURE 
// 
// 
window.onload = function() {
    const fileInput = document.querySelector(".file-input");
    const uploadCircle = document.querySelector(".upload-circle");
    const cameraIcon = document.querySelector(".camera-icon");

    fileInput.addEventListener("change", function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadCircle.style.backgroundImage = `url(${e.target.result})`;
                uploadCircle.style.backgroundSize = "cover";
                uploadCircle.style.backgroundPosition = "center";
                cameraIcon.style.display = "none"; // Hide the camera icon
            };
            reader.readAsDataURL(file);
        }
    });
};


// 
// 
//  GENERATE EID CODE
// 
// 

// JavaScript function to generate and display Employee ID
function generateEmployeeID() {
    const roleSelect = document.getElementById("roleSelect");
    const role = roleSelect.value;
    const idDisplay = document.getElementById("employee-id-display");

    if (!role) {
        alert("Please assign a role before generating an ID.");
        return;
    }

    // Generate ID format based on role
    const prefix = "T";
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    let employeeID = "";

    switch (role) {
        case "Manager":
            employeeID = `${prefix}01-MNG${uniqueNumber}`;
            break;
        case "Cashier":
            employeeID = `${prefix}02-CAS${uniqueNumber}`;
            break;
        case "Stock Controller":
            employeeID = `${prefix}03-STC${uniqueNumber}`;
            break;
        default:
            employeeID = `${prefix}00-UNK${uniqueNumber}`;
    }

    // Display the generated ID
    idDisplay.textContent = employeeID;
}


// 
// 
// INPUT FIELDS FOR THE CONTACT NUMBER AND EMAIL ADDRESS
// 
// 
// Validate the contact number to accept only numbers and ensure 11 digits.
document.querySelector('.contact-number-input').addEventListener('input', function (e) {
    // Remove any non-digit characters
    e.target.value = e.target.value.replace(/\D/g, '');

    // Limit to 11 characters
    if (e.target.value.length > 11) {
        e.target.value = e.target.value.slice(0, 11);
    }
});



// 
// 
// CLEAR BUTTON
// 
// 

function clearForm() {
    // Clear all personal information input fields
    const personalInfoInputs = document.querySelectorAll('.personal-info-container input[type="text"], .personal-info-container input[type="email"]');
    personalInfoInputs.forEach(input => {
        input.value = '';
    });

    // Reset the Employee ID display text
    const employeeIdDisplay = document.getElementById('employee-id-display');
    if (employeeIdDisplay) {
        employeeIdDisplay.textContent = 'Employee ID';
    }

    // Reset the file input
    const fileInput = document.querySelector('.user-photo-id-container .file-input');
    if (fileInput) {
        fileInput.value = ''; // Clear the file input value
    }

    // Reset the preview image back to the default icon by resetting background image
    const uploadCircle = document.querySelector('.upload-circle');
    if (uploadCircle) {
        uploadCircle.style.backgroundImage = 'none'; // Clear the background image
    }

    // Show the camera icon again
    const cameraIcon = document.querySelector('.camera-icon');
    if (cameraIcon) {
        cameraIcon.style.display = 'block'; // Make sure the camera icon is visible
    }

    // Reset the role select dropdown to the default disabled option
    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
        roleSelect.selectedIndex = 0; // Set to the default option
    }
}

// Attach clearForm function to clear button
document.querySelector('.clear-button').addEventListener('click', clearForm);





// UPDATE: NOV 10 
// STILL NOT WORKING UNTIL THE END OF THE JS
// START OF NOT FUNCTIONING CODE
// 
// SAVE BUTTON SO THAT IT WILL REFLECT ON THE ADMIN_LANDING-PAGE.HTML
// 
// 
// Function to handle saving the user data
function saveUserData() {
    // Get input values
    const firstName = document.querySelector('.first-name-input').value.trim();
    const middleName = document.querySelector('.middle-name-input').value.trim();
    const lastName = document.querySelector('.last-name-input').value.trim();
    const roleSelect = document.querySelector('#roleSelect').value;
    const employeeId = document.getElementById('employee-id-display').textContent.trim();
    const fileInput = document.querySelector('.file-input');

    // Combine first, middle, and last names into one full name
    const fullName = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();

    // Get today's date for last active and date added
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Prepare the data object to store
    const userData = {
        fullName: fullName,
        employeeId: employeeId,
        role: roleSelect,
        lastActiveDate: today,
        dateAdded: today
    };

    // Handle file upload for the photo
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userData.photo = e.target.result;
            localStorage.setItem('newUser', JSON.stringify(userData));
            alert('User data saved!');
            window.location.href = '/html/admin/admin_landing-page.html';
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        userData.photo = '/graphics/icons/camera-icon.png'; // Default icon if no photo
        localStorage.setItem('newUser', JSON.stringify(userData));
        alert('User data saved!');
        window.location.href = '/html/admin/admin_landing-page.html';
    }
}

// Attach saveUserData to the save button
document.querySelector('.save-button').addEventListener('click', saveUserData);




// END OF NOT FUNCTIONING CODE