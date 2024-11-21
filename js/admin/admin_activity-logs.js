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
// FOR THE DELETE BUTTON
// 
// 
document.addEventListener('DOMContentLoaded', () => {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');

    // Add a click event listener to each delete button
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // Find the parent container (.archive-activity)
            const archiveActivity = event.target.closest('.archive-activity');

            if (archiveActivity) {
                // Add slide-out class for animation
                archiveActivity.classList.add('slide-out');

                // Wait for the animation to complete before removing the element
                archiveActivity.addEventListener('transitionend', () => {
                    archiveActivity.remove();

                    // Check if the parent .outer-archiveee-container has any remaining .archive-activity elements
                    const outerContainer = archiveActivity.closest('.outer-archiveee-container');
                    const remainingActivities = outerContainer.querySelectorAll('.archive-activity');

                    // If no .archive-activity elements remain, remove the associated .time-deleted-label
                    if (remainingActivities.length === 0) {
                        const label = outerContainer.querySelector('.time-deleted-label');
                        if (label) {
                            label.remove();
                        }
                    }
                });
            }
        });
    });
});
