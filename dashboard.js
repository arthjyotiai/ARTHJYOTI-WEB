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
// 🌐 Global Chart Instances
let chartInstance = null;
let simulationChart = null;

// 📊 Run Screener
function runScreener() {
  const sector = document.getElementById("sectorSelect").value;
  const cap = parseInt(document.getElementById("marketCapInput").value) || 0;

  fetch("data/stocks.json")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(stock =>
        (sector === "All" || stock.sector === sector) &&
        stock.marketCap >= cap
      );
      renderTable(filtered);
      renderChart(filtered);
      saveScreener(sector, cap);
      logAuditTrail(sector, cap, filtered.length);
    });
}

// 📋 Render Table
function renderTable(data) {
  const tableHTML = `
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
  `;
  document.getElementById("screenerResults").innerHTML = data.length ? tableHTML : "<p>No matching stocks found.</p>";
}

// 📤 Export CSV
function exportCSV() {
  const rows = [["Company", "Sector", "Market Cap"]];
  document.querySelectorAll("#screenerResults tbody tr").forEach(row => {
    const cols = row.querySelectorAll("td");
    rows.push([cols[0].innerText, cols[1].innerText, cols[2].innerText]);
  });
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screener_results.csv";
  link.click();
}

// 📊 Render Chart
function renderChart(data) {
  const ctx = document.getElementById("strategyChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(stock => stock.name),
      datasets: [{
        label: "Market Cap (₹ Cr)",
        data: data.map(stock => stock.marketCap),
        backgroundColor: data.map((_, i) => `hsl(${i * 40}, 80%, 60%)`)
      }]
    },
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

// 📊 Toggle Chart Type
function toggleChart() {
  if (!chartInstance) return;
  chartInstance.config.type = chartInstance.config.type === "bar" ? "pie" : "bar";
  chartInstance.update();
}

// 💾 Save Screener
function saveScreener(sector, cap) {
  const config = { sector, cap, timestamp: new Date().toISOString() };
  localStorage.setItem("arthjyoti_screener", JSON.stringify(config));
  updateSavedConfigs(config);
}

// 🔁 Load Screener
function loadScreener() {
  const saved = JSON.parse(localStorage.getItem("arthjyoti_screener"));
  if (saved) {
    document.getElementById("sectorSelect").value = saved.sector;
    document.getElementById("marketCapInput").value = saved.cap;
    document.getElementById("marketCapSlider").value = saved.cap;
  }
}

// 🔄 Sync Slider/Input
document.getElementById("marketCapSlider").addEventListener("input", e => {
  document.getElementById("marketCapInput").value = e.target.value;
});
document.getElementById("marketCapInput").addEventListener("input", e => {
  document.getElementById("marketCapSlider").value = e.target.value;
});

// 🧾 Audit Trail
function logAuditTrail(sector, cap, resultCount) {
  const log = { sector, cap, resultCount, timestamp: new Date().toISOString() };
  const logs = JSON.parse(localStorage.getItem("arthjyoti_audit") || "[]");
  logs.push(log);
  localStorage.setItem("arthjyoti_audit", JSON.stringify(logs));
  renderAuditTable(logs);
}

function renderAuditTable(logs) {
  const tbody = logs.map(log => `
    <tr>
      <td>${log.sector}</td>
      <td>${log.cap}</td>
      <td>${log.resultCount}</td>
      <td>${new Date(log.timestamp).toLocaleString()}</td>
    </tr>
  `).join('');
  document.querySelector("#auditTable tbody").innerHTML = tbody;
}

// 📤 Export Audit Logs
function exportAudit() {
  const logs = JSON.parse(localStorage.getItem("arthjyoti_audit") || "[]");
  const rows = [["Sector", "Market Cap", "Results", "Timestamp"]];
  logs.forEach(log => rows.push([log.sector, log.cap, log.resultCount, log.timestamp]));
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "audit_logs.csv";
  link.click();
}

// 📊 Strategy Simulation
function simulateStrategy() {
  const type = document.getElementById("strategyType").value;
  const config = JSON.parse(localStorage.getItem("arthjyoti_screener"));
  if (!config) return;

  fetch("data/stocks.json")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(stock =>
        (config.sector === "All" || stock.sector === config.sector) &&
        stock.marketCap >= config.cap
      );

      const ctx = document.getElementById("simulationChart").getContext("2d");
      if (simulationChart) simulationChart.destroy();

      const multiplier = type === "momentum" ? 1.2 : 1.05;
      const simulated = filtered.map(stock => stock.marketCap * multiplier);

      simulationChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: filtered.map(stock => stock.name),
          datasets: [{
            label: `${type === "momentum" ? "Momentum" : "Buy & Hold"} Simulation`,
            data: simulated,
            backgroundColor: "#ffcc00"
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: "Simulated Strategy Performance" }
          }
        }
      });

      document.getElementById("strategySummary").innerText =
        `Simulated ${filtered.length} stocks using ${type} strategy.`;
    });
}

// 🌓 Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🧠 Load on Start
window.onload = () => {
  loadScreener();
  const logs = JSON.parse(localStorage.getItem("arthjyoti_audit") || "[]");
  renderAuditTable(logs);
};
window.addEventListener('load', () => {
  const modal = document.getElementById('onboardingModal');
  const startBtn = document.getElementById('startBtn');

  // Show modal only on first visit (basic localStorage check)
  if (!localStorage.getItem('arthjyotiOnboarded')) {
    modal.style.display = 'flex';
  }

  startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    localStorage.setItem('arthjyotiOnboarded', 'true');
  });
});
