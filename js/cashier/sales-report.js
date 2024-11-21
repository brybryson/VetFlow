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
// 
//  SORTING IN ASCENDING AND DESCENDING ORDER OF THE TOTAL SALES
// 
// 

// Sorting state
let sortState = 0; // 0: original, 1: ascending, 2: descending

// Select the icon container to add click functionality
document.querySelector('.sort-icon').addEventListener('click', () => {
    const tableRows = Array.from(document.querySelectorAll('.table-row:not(.table-header)'));
    const originalOrder = [...tableRows];

    if (sortState === 0) {
        // Sort in ascending order
        tableRows.sort((a, b) => parseCurrency(a.querySelector('.total-sell-amount').innerText) -
                                   parseCurrency(b.querySelector('.total-sell-amount').innerText));
        sortState = 1;
    } else if (sortState === 1) {
        // Sort in descending order
        tableRows.sort((a, b) => parseCurrency(b.querySelector('.total-sell-amount').innerText) -
                                   parseCurrency(a.querySelector('.total-sell-amount').innerText));
        sortState = 2;
    } else {
        // Restore original order
        tableRows.length = 0;
        tableRows.push(...originalOrder);
        sortState = 0;
    }

    // Reattach sorted rows to the table
    const table = document.querySelector('.top-selling-table');
    tableRows.forEach(row => table.appendChild(row));
});

// Utility function to parse currency to number
function parseCurrency(value) {
    return Number(value.replace(/[^0-9.-]+/g, ""));
}






// 
// 
//   FOR THE ORDER STATISTICS
//   AND SALES OVERVIEW
//   RESPONSIVENESS AND CONTAINER
// 
// 
// 

// Configuration for the Sales Overview chart
const salesChartConfig = {
    type: 'line',
    data: salesData,
    options: {
        responsive: true,
        maintainAspectRatio: false, // Allows height to adjust to container
        scales: {
            y1: { /* configuration */ },
            y2: { /* configuration */ },
            x: { /* configuration */ }
        },
        plugins: {
            legend: { /* configuration */ }
        }
    }
};

// Configuration for the Order Statistics chart
const chartConfig = {
    type: 'bar',
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: false, // Keeps chart scaling within container
        scales: {
            y1: { /* configuration */ },
            y2: { /* configuration */ }
        },
        plugins: {
            legend: { /* configuration */ }
        }
    }
};
