// Wait for the DOM to load before running the chart code
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('orderSalesChart').getContext('2d');
    
    // Data for the chart
    const chartData = {
        labels: ['Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Sep 7', 'Sep 8'],
        datasets: [
            {
                label: 'Orders',
                data: [100, 270, 700, 800, 300, 120, 600],
                backgroundColor: '#FFB0B0',
                yAxisID: 'y1', // Use the primary y-axis
                // borderRadius: 10
            },
            {
                label: 'Sales (in thousands)',
                data: [7, 20, 17, 21, 18, 22, 10],
                backgroundColor: '#3C8800',
                yAxisID: 'y2', // Use the secondary y-axis
                // borderRadius: 10
            }
        ]
    };

    // Configuration for the chart
    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y1: {
                    beginAtZero: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Orders',
                        color: '#000' // Set title color to black
                    },
                    ticks: {
                        stepSize: 200,
                        max: 1000,
                        color: '#000' // Set tick color to black
                    }
                },
                y2: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Sales (in K)',
                        color: '#000' // Set title color to black
                    },
                    ticks: {
                        stepSize: 5,
                        max: 30,
                        callback: function (value) {
                            return value + 'k';
                        },
                        color: '#000' // Set tick color to black
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
                        color: '#000' // Set legend text color to black
                    }
                }
            }
        }
    };

    // Render the chart
    new Chart(ctx, chartConfig);
});
