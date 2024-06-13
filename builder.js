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
    });

    const row = tbody.insertRow();
    data.forEach((rowData) => {
        rowData.forEach((cellData) => {
            if (cellData != undefined) {
                const cell = row.insertCell();
                cell.textContent = cellData || '';
            }
        });
    });

    tableDiv.appendChild(table);
    return table;
}
