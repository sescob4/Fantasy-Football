// Hardcoded player names
const players = [
  "Seabass", "Rory", "Gabe", "Tristin", "Luke",
  "Nathan", "Henri", "Austin", "Hadi", "Truman"
];

// Placeholder scores — all null (no data yet)
const eventData = [
  { name: "100m Run", scores: Array(10).fill(null) },
  { name: "800m Run", scores: [7, 9, 4, 5, 1, null, null, null, null, null] },
  { name: "Lacrosse Accuracy", scores: Array(10).fill(null) },
  { name: "Consective Pull Ups", scores: Array(10).fill(null) },
  { name: "Max Bench", scores: Array(10).fill(null) },
  { name: "Soccer Accuracy", scores: Array(10).fill(null) },
  { name: "Mario Kart Time Trial", scores: Array(10).fill(null) },
  { name: "Pokemon Naming", scores: Array(10).fill(null) },
  { name: "NBA Starter Colleges", scores: Array(10).fill(null) },
  { name: "Beer Drinking", scores: Array(10).fill(null) }
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
