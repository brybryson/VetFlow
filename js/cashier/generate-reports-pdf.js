document.querySelector('.export-report-button').addEventListener('click', async function () {
    const { jsPDF } = window.jspdf;

    // Create a new PDF document
    const pdf = new jsPDF();

    // Define some positioning offsets for layout
    let yOffset = 20;

    // Title of the Report
    pdf.setFontSize(18);
    pdf.text("Shepherd Animal Clinic - Sales Report", 20, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    pdf.text("Date: " + document.getElementById('dateTime').textContent, 20, yOffset);
    yOffset += 20;

    // Add Summary Data
    const todaySales = document.querySelector('.today-sale-amount').textContent;
    const todayOrders = document.querySelector('.today-total-order-amount').textContent;
    const todayRevenue = document.querySelector('.today-revenue-amount').textContent;
    pdf.text(`Today's Sales: ${todaySales}`, 20, yOffset);
    yOffset += 10;
    pdf.text(`Today's Total Orders: ${todayOrders}`, 20, yOffset);
    yOffset += 10;
    pdf.text(`Today's Revenue: ${todayRevenue}`, 20, yOffset);
    yOffset += 20;

    // Top Selling Item
    const topSellingItemRow = document.querySelector('.top-selling-table .table-row');
    if (topSellingItemRow) {
        const topItemData = Array.from(topSellingItemRow.children).map(cell => cell.textContent.trim());
        pdf.setFontSize(14);
        pdf.text("Top Selling Item", 20, yOffset);
        yOffset += 10;
        pdf.setFontSize(12);
        pdf.text(`Item Name: ${topItemData[0]}`, 20, yOffset);
        yOffset += 10;
        pdf.text(`SKU: ${topItemData[1]}`, 20, yOffset);
        yOffset += 10;
        pdf.text(`Items Sold: ${topItemData[2]}`, 20, yOffset);
        yOffset += 10;
        pdf.text(`Total Sell: ${topItemData[3]}`, 20, yOffset);
        yOffset += 10;
        pdf.text(`Status: ${topItemData[4]}`, 20, yOffset);
        yOffset += 10;
        pdf.text(`Price: ${topItemData[5]}`, 20, yOffset);
        yOffset += 20;
    }

    // Capture Chart Images with html2canvas
    async function addChartToPDF(chartElementId, label) {
        const chartElement = document.getElementById(chartElementId);
        const canvasImage = await html2canvas(chartElement);
        const imageData = canvasImage.toDataURL('image/png');
        pdf.text(label, 20, yOffset);
        yOffset += 10;
        pdf.addImage(imageData, 'PNG', 20, yOffset, 160, 90); // Adjust image dimensions as needed
        yOffset += 100; // Move the cursor down
    }

    await addChartToPDF('orderSalesChart', 'Order Statistics');
    await addChartToPDF('salesOverviewChart', 'Sales Overview');

    // Top Selling Items Table
    pdf.text("Top Selling Items", 20, yOffset);
    yOffset += 10;
    pdf.setFontSize(10);
    const tableHeaders = ["Item Name", "SKU", "Item Sold", "Total Sell", "Status", "Price"];
    pdf.text(tableHeaders.join(" | "), 20, yOffset);
    yOffset += 10;

    document.querySelectorAll('.top-selling-table .table-row').forEach(row => {
        const rowData = Array.from(row.children).map(cell => cell.textContent.trim());
        pdf.text(rowData.join(" | "), 20, yOffset);
        yOffset += 10;
    });

    // Save the PDF
    pdf.save("Sales_Report.pdf");
});
