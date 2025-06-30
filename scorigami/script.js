const API_URL = 'https://freecashe.ws/api/scorigami';

function getColor(count) {
  return count > 0 ? 'green' : 'white';
}

async function buildTable() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const table = document.getElementById('scorigami');
  const countDisplay = document.getElementById('game-count');

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

  // Header row
  const headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));
  for (let x = 0; x <= paddedMax; x++) {
    const th = document.createElement('th');
    th.textContent = x;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // Data rows
  for (let y = 0; y <= paddedMax; y++) {
    const row = document.createElement('tr');

    const rowLabel = document.createElement('th');
    rowLabel.textContent = y;
    row.appendChild(rowLabel);

    for (let x = 0; x <= paddedMax; x++) {
      const cell = document.createElement('td');

      if (y >= x) {
        cell.style.backgroundColor = '#555';
        cell.title = `${x}-${y}: Impossible`;
      } else {
        const entry = matrix[y][x];
        if (!entry) {
          cell.style.backgroundColor = 'white';
          cell.title = `${x}-${y}: 0 times`;
        } else {
          cell.style.backgroundColor = getColor(entry.count);
          cell.title = `${x}-${y}: ${entry.count} time(s)`;
        }
      }

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

buildTable();
