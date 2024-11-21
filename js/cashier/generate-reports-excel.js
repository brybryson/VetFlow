function exportReportToExcel() {
    // Create a workbook and add sheets
    const workbook = XLSX.utils.book_new();

    // Today's Sales Data
    const todayData = [
        ["Metric", "Amount"],
        ["Today's Sales", "₱9.6K"],
        ["Today's Total Order", "132"],
        ["Today's Revenue", "₱12.8K"]
    ];
    const todaySheet = XLSX.utils.aoa_to_sheet(todayData);
    XLSX.utils.book_append_sheet(workbook, todaySheet, "Today's Summary");

    // Order Statistics Data
    const orderLabels = ["Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 7", "Sep 8"];
    const orderData = [100, 270, 700, 800, 300, 120, 600];
    const salesData = [7, 20, 17, 21, 18, 22, 10];

    const orderStats = [
        ["Date", "Orders", "Sales (in K)"],
        ...orderLabels.map((date, i) => [date, orderData[i], salesData[i]])
    ];
    const orderStatsSheet = XLSX.utils.aoa_to_sheet(orderStats);
    XLSX.utils.book_append_sheet(workbook, orderStatsSheet, "Order Statistics");

    // Sales Overview Data
    const salesOverviewLabels = ["MON", "TUE", "WED", "THU", "FRI"];
    const salesAmounts = [5, 15, 10, 25, 18];
    const profitPercents = [10, 15, 7, 20, 25];

    const salesOverviewData = [
        ["Day", "Sales (₱ in K)", "Profit (%)"],
        ...salesOverviewLabels.map((day, i) => [day, salesAmounts[i], profitPercents[i]])
    ];
    const salesOverviewSheet = XLSX.utils.aoa_to_sheet(salesOverviewData);
    XLSX.utils.book_append_sheet(workbook, salesOverviewSheet, "Sales Overview");

    // Top Selling Items Data
    const topSellingData = [
        ["Item Name", "SKU", "Item Sold", "Total Sell", "Status", "Price"],
        ["Floof Pets Cat Multivitamins", "CMV85106", 423, "₱65,565", "Low Stock", "₱155.00"],
        ["Papi MVP", "PP05641", 367, "₱69,730", "Low Stock", "₱190.00"],
        ["Goodest Cat Tender Tuna Pate", "CT749120", 334, "₱13,360", "In Stock", "₱40.00"],
        ["Himalaya Nefrotec DS", "PB90084", 295, "₱66,375", "Low Stock", "₱255.00"],
        ["Monodex D Glucose Monohydrate", "S98511", 188, "₱17,860", "Active", "₱95.00"],
        ["Bengal Pro Immune Cat Treat", "PP30181", 171, "₱61,389", "Active", "₱359.00"]
    ];
    const topSellingSheet = XLSX.utils.aoa_to_sheet(topSellingData);
    XLSX.utils.book_append_sheet(workbook, topSellingSheet, "Top Selling Items");

    // Export the workbook to Excel
    XLSX.writeFile(workbook, "Sales_Report.xlsx");
}

// Attach the function to the Export button
document.querySelector(".export-report-button").addEventListener("click", exportReportToExcel);
