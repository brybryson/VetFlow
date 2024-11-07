// Wait for the DOM to load before running the chart code
document.addEventListener('DOMContentLoaded', function () {
    const ctxSales = document.getElementById('salesOverviewChart').getContext('2d');
    
    // Data for the Sales Overview chart
    const salesData = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        datasets: [
            {
                label: 'Sales (₱)',
                data: [5, 15, 10, 25, 18],
                backgroundColor: 'rgba(60, 136, 0, 0.2)',
                borderColor: '#3C8800',
                tension: 0.4, // Curved line
                borderWidth: 2,
                pointRadius: 4,
                yAxisID: 'y1' // Use left y-axis
            },
            {
                label: 'Profit per Sales (%)',
                data: [10, 15, 7, 20, 25],
                backgroundColor: 'rgba(54, 171, 255, 0.2)',
                borderColor: '#36ABFF',
                tension: 0.4, // Curved line
                borderWidth: 2,
                pointRadius: 4,
                yAxisID: 'y2' // Use right y-axis
            }
        ]
    };

    // Configuration for the Sales Overview chart
    const salesChartConfig = {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            scales: {
                y1: {
                    beginAtZero: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Sales (₱ in K)',
                        color: '#000'
                    },
                    ticks: {
                        stepSize: 5,
                        max: 30,
                        callback: function (value) {
                            return '₱' + value + 'K';
                        },
                        color: '#000'
                    }
                },
                y2: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Profit (%)',
                        color: '#000'
                    },
                    ticks: {
                        stepSize: 5,
                        max: 30,
                        callback: function (value) {
                            return value + '%';
                        },
                        color: '#000'
                    }
                },
                x: {
                    ticks: {
                        color: '#000'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter Regular',
                            size: 10
                        },
                        color: '#000'
                    }
                }
            }
        }
    };

    // Render the Sales Overview chart
    new Chart(ctxSales, salesChartConfig);
});
