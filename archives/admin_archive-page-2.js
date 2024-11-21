
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
            // Log for debugging
            console.log('Delete button clicked:', event.target);

            // Find the parent container (.archive-activity)
            const archiveActivity = event.target.closest('.archive-activity');

            // Log to ensure we found the correct element
            console.log('Archive activity to delete:', archiveActivity);

            if (archiveActivity) {
                // Add slide-out class for animation
                archiveActivity.classList.add('slide-out');

                // Wait for the animation to complete before removing the element
                archiveActivity.addEventListener('transitionend', () => {
                    archiveActivity.remove();
                });
            }
        });
    });
});

