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
