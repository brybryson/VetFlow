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
// Function to update the date and time
//
function updateDateTime() {
    const now = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDateTime = now.toLocaleString('en-US', options).replace(',', '   ');
    document.getElementById('dateTime').textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();

//
// MODAL FUNCTIONALITY FOR VIEW TRANSACTIONS
//
function openModal() {
    document.getElementById("payModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("payModal").classList.add("hidden");
}

// Add click event listener to each "View Transaction" button
document.querySelectorAll(".viewTransactionBtn").forEach(button => {
    button.addEventListener("click", openModal);
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
