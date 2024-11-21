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


