const API_URL = 'https://freecashe.ws/api/scorigami';

function getColor(count) {
    return count > 0 ? 'green' : 'white';
}

async function buildTable() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const table = document.getElementById('scorigami');
    const countDisplay = document.getElementById('game-count');
    const tooltip = document.getElementById('tooltip');

    let maxWinner = 0;
    for (const item of data) {
        if (item.max > maxWinner) maxWinner = item.max;
    }
    const paddedMax = maxWinner + 5;

    const matrix = Array.from({ length: paddedMax + 1 }, () =>
        Array(paddedMax + 1).fill(null)
    );

    let totalCount = 0;
    for (const item of data) {
        const winner = item.max;
        const loser = item.min;
        matrix[loser][winner] = item;
        totalCount += item.count;
    }

    countDisplay.textContent = `Total games: ${totalCount.toLocaleString()}`;

    // Clear previous table if any
    table.innerHTML = '';

    // Header row
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th'));
    for (let x = 0; x <= paddedMax; x++) {
        const th = document.createElement('th');
        th.textContent = x;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    let currentTooltipCell = null;

    // Data rows
    for (let y = 0; y <= paddedMax; y++) {
        const row = document.createElement('tr');

        const rowLabel = document.createElement('th');
        rowLabel.textContent = y;
        row.appendChild(rowLabel);

        for (let x = 0; x <= paddedMax; x++) {
            const cell = document.createElement('td');
            cell.style.cursor = 'pointer';

            if (y >= x) {
                cell.style.backgroundColor = '#555';
                // Impossible scores
            } else {
                const entry = matrix[y][x];
                cell.style.backgroundColor = entry && entry.count > 0 ? 'green' : 'white';
                // Scorigami Achieved
                
                // Placeholder for cell text, which I probably won't use
                // cell.textContent = `${x}/${y}`;
            }

            cell.addEventListener('click', (e) => {
                e.stopPropagation();

                if (currentTooltipCell === cell) {
                    tooltip.style.display = 'none';
                    currentTooltipCell = null;
                    return;
                }
                currentTooltipCell = cell;

                const rect = cell.getBoundingClientRect();
                tooltip.style.left = window.scrollX + rect.left + rect.width / 2 + 'px';
                tooltip.style.top = window.scrollY + rect.top - 75 + 'px';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.display = 'block';

                if (y >= x) {
                    tooltip.innerHTML = `<strong>${x}-${y}</strong><br>Impossible score`;
                } else {
                    const entry = matrix[y][x];
                    if (!entry) {
                        tooltip.innerHTML = `<strong>${x}-${y}</strong><br>No occurrences`;
                    } else {
                        const url = `https://mmolb.com/watch/${entry.first}`;
                        tooltip.innerHTML = `
              <strong>${x}-${y}</strong><br>
              Count: ${entry.count}<br>
              <a href="${url}" target="_blank" rel="noopener">First game</a>
            `;
                    }
                }
            });

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    document.addEventListener('click', () => {
        tooltip.style.display = 'none';
        currentTooltipCell = null;
    });
}

buildTable();
