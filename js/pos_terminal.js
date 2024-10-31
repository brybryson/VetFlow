
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

        // Function to update the date and time
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

        