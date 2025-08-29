// onboarding.js

export function showOnboardingModal() {
  if (localStorage.getItem("onboardingSeen")) return;

  const modalHTML = `
    <div id="onboardingModal" class="modal">
      <div class="modal-content">
        <h2>Welcome to ArthJyoti 🪙</h2>
        <p>Your ethical analytics dashboard for stocks, options, and strategies.</p>
        <ul>
          <li>📊 <strong>Screener:</strong> Filter stocks by PE, ROE, volume</li>
          <li>🔗 <strong>Option Chain:</strong> View NIFTY/BankNIFTY with PCR</li>
          <li>🧠 <strong>Strategy Lab:</strong> Simulate and compare filters</li>
          <li>🧾 <strong>Audit Trail:</strong> Track your actions and exports</li>
        </ul>
        <button id="startBtn">Let’s Begin</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("onboardingModal");
  const startBtn = document.getElementById("startBtn");

  modal.style.display = "block";

  startBtn.onclick = () => {
    modal.style.display = "none";
    localStorage.setItem("onboardingSeen", "true");
  };
}
