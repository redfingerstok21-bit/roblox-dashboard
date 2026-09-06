// Function untuk konversi string Income/s (misal: "27.37B/s") ke angka agar bisa di-sort
function parseIncomeValue(incomeStr) {
  if (!incomeStr || typeof incomeStr !== 'string') return 0;
  
  const match = incomeStr.match(/([\d\.]+)\s*([a-zA-Z]*)/);
  if (!match) return 0;
  
  const num = parseFloat(match[1]);
  const suffix = (match[2] || '').toUpperCase();
  
  if (suffix.includes('T')) return num * 1e12;
  if (suffix.includes('B')) return num * 1e9;
  if (suffix.includes('M')) return num * 1e6;
  if (suffix.includes('K')) return num * 1e3;
  
  return num || 0;
}

export default function Dashboard({ accounts }) {
  // Urutkan akun berdasarkan Income/s tertinggi ke terendah
  const sortedAccounts = Object.values(accounts || {}).sort((a, b) => {
    const incomeA = parseIncomeValue(a.cash);
    const incomeB = parseIncomeValue(b.cash);
    return incomeB - incomeA;
  });

  return (
    <div className="dashboard-container">
      <h2>Multi-Account Dashboard</h2>

      {sortedAccounts.map((account, index) => (
        <div key={account.username} className="account-card">
          {/* NOMOR URUT PADA HEADER */}
          <div className="account-header">
            <span className="account-number">#{index + 1}</span>
            <span className="username">{account.username}</span>
            <span className="status-tag">{account.status || "ACTIVE EXECUTE"}</span>
          </div>

          <div className="card-body">
            <div className="stat-box">
              <label>BEST VALUE PET</label>
              <div>👑 {account.bestPet || "-"}</div>
            </div>

            <div className="stat-grid">
              <div className="stat-box">
                <label>INCOME / S</label>
                <div>💰 {account.cash || "0/s"}</div>
              </div>
              <div className="stat-box">
                <label>SPEED</label>
                <div>⚡ {account.speed || "0"}</div>
              </div>
            </div>

            <div className="stat-box">
              <label>FARM TIME</label>
              <div>⏱️ {account.sessionTime || "0h 0m"}</div>
            </div>

            <div className="stat-box">
              <label>EQUIPPED PETS</label>
              <div>🐾 {account.equippedPets || "0 Active"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
          }
