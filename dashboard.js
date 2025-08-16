document.getElementById("personalizedTip").textContent =
  "Welcome to ArthJyoti. Explore the dashboard modules.";
console.log("ArthJyoti dashboard loaded.");
// Future: Add dynamic screener, simulator, compliance logic here
const mockStocks = [
  { name: "HDFC Bank", sector: "Finance", marketCap: 900000 },
  { name: "Infosys", sector: "Tech", marketCap: 400000 },
  { name: "Reliance", sector: "Energy", marketCap: 1500000 },
  { name: "TCS", sector: "Tech", marketCap: 1200000 },
  { name: "ICICI", sector: "Finance", marketCap: 700000 }
];

function runScreener() {
  const sector = document.getElementById("sectorSelect").value;
  const cap = parseInt(document.getElementById("marketCapInput").value) || 0;

  const filtered = mockStocks.filter(stock =>
    (sector === "All" || stock.sector === sector) &&
    stock.marketCap >= cap
  );

  const table = `
    <table>
      <thead>
        <tr><th>Company</th><th>Sector</th><th>Market Cap (₹ Cr)</th></tr>
      </thead>
      <tbody>
        ${filtered.map(stock => `
          <tr>
            <td>${stock.name}</td>
            <td>${stock.sector}</td>
            <td>${stock.marketCap.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById("screenerResults").innerHTML = filtered.length ? table : "<p>No matching stocks found.</p>";
}
function runScreener() {
  const sector = document.getElementById("sectorSelect").value;
  const cap = parseInt(document.getElementById("marketCapInput").value) || 0;

  const filtered = mockStocks.filter(stock =>
    (sector === "All" || stock.sector === sector) &&
    stock.marketCap >= cap
  );

  renderTable(filtered);
  renderChart(filtered);
  saveScreener(sector, cap);
  logAuditTrail(sector, cap, filtered.length);
}

function renderTable(data) {
  const table = `
    <table>
      <thead>
        <tr><th>Company</th><th>Sector</th><th>Market Cap (₹ Cr)</th></tr>
      </thead>
      <tbody>
        ${data.map(stock => `
          <tr>
            <td>${stock.name}</td>
            <td>${stock.sector}</td>
            <td>${stock.marketCap.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <button onclick="exportCSV()">📤 Export CSV</button>
  `;
  document.getElementById("screenerResults").innerHTML = data.length ? table : "<p>No matching stocks found.</p>";
}

function exportCSV() {
  const rows = [["Company", "Sector", "Market Cap"]];
  mockStocks.forEach(stock => rows.push([stock.name, stock.sector, stock.marketCap]));
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screener_results.csv";
  link.click();
}

function renderChart(data) {
  const canvas = document.getElementById("strategyChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 200;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxCap = Math.max(...data.map(s => s.marketCap));
  data.forEach((stock, i) => {
    const barHeight = (stock.marketCap / maxCap) * 150;
    ctx.fillStyle = "#2c5364";
    ctx.fillRect(i * 80 + 20, 180 - barHeight, 40, barHeight);
    ctx.fillStyle = "#333";
    ctx.fillText(stock.name, i * 80 + 20, 190);
  });
}

function saveScreener(sector, cap) {
  localStorage.setItem("lastScreener", JSON.stringify({ sector, cap }));
}

function logAuditTrail(sector, cap, count) {
  console.log(`Audit: Screener run at ${new Date().toISOString()} | Sector: ${sector} | Cap ≥ ₹${cap} Cr | Results: ${count}`);
}
const mockStocks = [
  { name: "HDFC Bank", sector: "Finance", marketCap: 900000 },
  { name: "Infosys", sector: "Tech", marketCap: 400000 },
  { name: "Reliance", sector: "Energy", marketCap: 1500000 },
  { name: "TCS", sector: "Tech", marketCap: 1200000 },
  { name: "ICICI", sector: "Finance", marketCap: 700000 }
];

function runScreener() {
  const sector = document.getElementById("sectorSelect").value;
  const cap = parseInt(document.getElementById("marketCapInput").value) || 0;

  const filtered = mockStocks.filter(stock =>
    (sector === "All" || stock.sector === sector) &&
    stock.marketCap >= cap
  );

  renderTable(filtered);
  renderChart(filtered);
  saveScreener(sector, cap);
  logAuditTrail(sector, cap, filtered.length);
}

function renderTable(data) {
  const table = `
    <table>
      <thead>
        <tr><th>Company</th><th>Sector</th><th>Market Cap (₹ Cr)</th></tr>
      </thead>
      <tbody>
        ${data.map(stock => `
          <tr>
            <td>${stock.name}</td>
            <td>${stock.sector}</td>
            <td>${stock.marketCap.toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <button onclick="exportCSV()">📤 Export CSV</button>
  `;
  document.getElementById("screenerResults").innerHTML = data.length ? table : "<p>No matching stocks found.</p>";
}

function exportCSV() {
  const rows = [["Company", "Sector", "Market Cap"]];
  mockStocks.forEach(stock => rows.push([stock.name, stock.sector, stock.marketCap]));
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screener_results.csv";
  link.click();
}

function renderChart(data) {
  const canvas = document.getElementById("strategyChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 200;
  ctx.clearRect(0,
function renderChart(data) {
  const ctx = document.getElementById("strategyChart").getContext("2d");
  const chartData = {
    labels: data.map(stock => stock.name),
    datasets: [{
      label: "Market Cap (₹ Cr)",
      data: data.map(stock => stock.marketCap),
      backgroundColor: "#ffcc00"
    }]
  };
  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Strategy Simulation" }
      }
    }
  });
}
let chartInstance;

function renderChart(data) {
  const ctx = document.getElementById("strategyChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  const chartData = {
    labels: data.map(stock => stock.name),
    datasets: [{
      label: "Market Cap (₹ Cr)",
      data: data.map(stock => stock.marketCap),
      backgroundColor: data.map((_, i) => `hsl(${i * 40}, 80%, 60%)`)
    }]
  };

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Strategy Simulation" },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw.toLocaleString()} Cr`
          }
        }
      },
      scales: {
        x: { title: { display: true, text: "Company" } },
        y: { title: { display: true, text: "Market Cap (₹ Cr)" } }
      }
    }
  });
}
function saveScreener(sector, cap) {
  const config = {
    sector,
    cap,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem("arthjyoti_screener", JSON.stringify(config));
}
function loadScreener() {
  const saved = JSON.parse(localStorage.getItem("arthjyoti_screener"));
  if (saved) {
    document.getElementById("sectorSelect").value = saved.sector;
    document.getElementById("marketCapInput").value = saved.cap;
  }
}
window.onload = () => {
  loadScreener();
};
saveScreener(sector, cap);
