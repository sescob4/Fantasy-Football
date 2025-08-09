// Hardcoded player names
const players = [
  "Seabass", "Rory", "Gabe", "Tristin", "Luke",
  "Nathan", "Henri", "Austin", "Hadi", "Truman"
];

const eventData = [
  { name: "100m Run", scores: [5, 4, 3, 7, 6, 2, 1, 10, 9, 8] },
  { name: "800m Run", scores: [4, 9, 7, 3, 6, 1, 2, 10, 8, 5] },
  { name: "Lacrosse Accuracy", scores: [6, 9, 1, 8, 5, 4, 2, 10, 3, 7] },
  { name: "Consective Pull Ups", scores: [9, 2, 4, 6, 8, 7, 1, 10, 5, 3] },
  { name: "Max Bench", scores: [null, null, null, null, null, null, null, 10, null, null] },
  { name: "Soccer Cross Bar", scores: [4, 1, 9, 6, 8, 7, 3, 10, 5, 2] },
  { name: "Mario Kart Time Trial", scores: [null, null, null, null, null, null, null, 10, null, null] },
  { name: "Pokemon Naming", scores: [null, null, null, null, null, null, null, 10, null, null] },
  { name: "NBA Starter Colleges", scores: [null, null, null, null, null, null, null, 10, null, null] },
  { name: "Beer Drinking", scores: [null, null, null, null, null, null, null, 10, null, null] }
];

// Generate all event tables
function createEventTables() {
  const container = document.getElementById('eventTables');
  container.innerHTML = '';

  eventData.forEach(event => {
    const block = document.createElement('div');
    block.className = 'event-block';

    const title = document.createElement('h2');
    title.textContent = event.name;
    block.appendChild(title);

    const table = document.createElement('table');
    const header = document.createElement('tr');
    header.innerHTML = `<th>Player</th><th>Placement</th>`;
    table.appendChild(header);

    for (let i = 0; i < players.length; i++) {
      const row = document.createElement('tr');
      const score = event.scores[i];
      row.innerHTML = `
        <td>${players[i]}</td>
        <td>${score === null ? "—" : score}</td>
      `;
      table.appendChild(row);
    }

    block.appendChild(table);
    container.appendChild(block);
  });
}

// Calculate average placement (ignores nulls)
function calculateAverages() {
  const numPlayers = players.length;
  const scores = [];

  for (let i = 0; i < numPlayers; i++) {
    let total = 0;
    let count = 0;

    eventData.forEach(event => {
      const score = event.scores[i];
      if (typeof score === 'number') {
        total += score;
        count++;
      }
    });

    const average = count > 0 ? total / count : null;
    scores.push({ name: players[i], average, rank: i });
  }

  // Sort by average ascending (lower is better), nulls last
  scores.sort((a, b) => {
    if (a.average === null) return 1;
    if (b.average === null) return -1;
    return a.average - b.average;
  });

  const averagesBody = document.getElementById('averagesBody');
  averagesBody.innerHTML = '';

  scores.forEach(score => {
    averagesBody.innerHTML += `
      <tr class="highlight">
        <td>${score.name}</td>
        <td>${score.average !== null ? score.average.toFixed(2) : 'N/A'}</td>
      </tr>
    `;
  });
}

// Show average overlay
function showAverages() {
  calculateAverages();
  document.getElementById('averageOverlay').classList.remove('hidden');
  document.getElementById('eventTables').style.display = 'none';
}

// Hide overlay, return to events
function hideAverages() {
  document.getElementById('averageOverlay').classList.add('hidden');
  document.getElementById('eventTables').style.display = 'grid';
}

// Init
window.onload = createEventTables;
