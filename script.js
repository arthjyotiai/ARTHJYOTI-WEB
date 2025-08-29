async function loadStocks() {
    let response = await fetch('screener_filtered.json');
    let data = await response.json();
    let container = document.getElementById('stock-cards');
    container.innerHTML = '';
    data.forEach(stock => {
        let card = document.createElement('div');
        card.className = 'card ' + (stock.combined_score > 4 ? 'green':'red');
        card.innerHTML = `<h3>${stock.symbol}</h3>
        <p>Price: ₹${stock.current_price}</p>
        <p>MarketCap: ${stock.market_cap}</p>
        <p>ROE: ${stock.roe}% | PE: ${stock.pe}</p>
        <p>Monte Carlo 1Y: ₹${stock.mc_min} – ₹${stock.mc_max}</p>
        <p>Qualitative Score: ${stock.qual_score} ⭐</p>
        <p>Combined Score: ${stock.combined_score} 🌟</p>`;
        container.appendChild(card);
    });
}
loadStocks();

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
