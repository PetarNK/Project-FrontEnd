// Generating the table body and appending it to a div
export function generateTable(headers, data) {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const tbody = table.createTBody();
    const tableDiv = document.getElementById('tableDiv');

    const headerRow = thead.insertRow();
    headers.forEach((header) => {
        const cell = document.createElement('th');
        cell.textContent = header;
        headerRow.appendChild(cell);
        console.log(header);
    });

    const row = tbody.insertRow();
    data.forEach((rowData) => {
        rowData.forEach((cellData) => {
            if (cellData != undefined) {
                const cell = row.insertCell();
                cell.textContent = cellData || '';
                console.log(cellData);
            }
        });
    });

    tableDiv.appendChild(table);
    return table;
}
