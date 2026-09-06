'use client';

// Fungsi parser tangguh untuk mengubah string Income (misal: "31.59B/s", "928.4M/s") jadi angka murni
function getIncomeNumber(acc) {
  // Cek apakah data income disimpan di acc.cash, acc.income, atau field lainnya
  const rawStr = acc.cash || acc.income || "0";
  if (typeof rawStr === 'number') return rawStr;
  
  // Ambil angka dan huruf satuan (K, M, B, T)
  const cleanStr = String(rawStr).replace(/,/g, '');
  const match = cleanStr.match(/([\d\.]+)\s*([a-zA-Z]*)/);
  if (!match) return 0;

  const val = parseFloat(match[1]) || 0;
  const unit = (match[2] || '').toUpperCase();

  if (unit.includes('T')) return val * 1000000000000;
  if (unit.includes('B')) return val * 1000000000;
  if (unit.includes('M')) return val * 1000000;
  if (unit.includes('K')) return val * 1000;
  
  return val;
}

export default function Dashboard({ accounts }) {
  // 1. Ubah data accounts menjadi array
  const accountArray = Array.isArray(accounts) 
    ? accounts 
    : Object.values(accounts || {});

  // 2. URUTKAN DARI INCOME TERTINGGI KE TERENDAH
  const sortedAccounts = [...accountArray].sort((a, b) => {
    return getIncomeNumber(b) - getIncomeNumber(a);
  });

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white p-4">
      <h1 className="text-center text-xl font-bold mb-4 text-blue-400">
        🔒 Multi-Account Dashboard
      </h1>

      <div className="max-w-md mx-auto space-y-4">
        {sortedAccounts.map((account, index) => (
          <div 
            key={account.username || index} 
            className="bg-[#121829] border border-gray-800 rounded-lg p-3 shadow-lg"
          >
            {/* HEADER AKUN DENGAN NOMOR URUT SAJA (#1, #2, dst) */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-bold">
                  #{index + 1}
                </span>
                <span className="font-bold text-blue-300 text-sm">
                  👤 {account.username}
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                ACTIVE EXECUTE
              </span>
            </div>

            {/* BEST VALUE PET */}
            <div className="bg-[#1a2238] p-2 rounded mb-2 border border-blue-900/40">
              <span className="text-[10px] text-gray-400 block font-semibold">BEST VALUE PET</span>
              <span className="text-yellow-400 text-xs font-bold flex items-center gap-1">
                👑 {account.bestPet || account.best_pet || "-"}
              </span>
            </div>

            {/* STATS: INCOME & SPEED */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-[#161d30] p-2 rounded">
                <span className="text-[10px] text-gray-400 block">INCOME / S</span>
                <span className="text-yellow-300 text-xs font-bold">
                  💰 {account.cash || account.income || "0/s"}
                </span>
              </div>
              <div className="bg-[#161d30] p-2 rounded">
                <span className="text-[10px] text-gray-400 block">SPEED</span>
                <span className="text-yellow-300 text-xs font-bold">
                  ⚡ {account.speed || "0"}
                </span>
              </div>
            </div>

            {/* FARM TIME */}
            <div className="bg-[#161d30] p-2 rounded mb-2">
              <span className="text-[10px] text-gray-400 block">FARM TIME</span>
              <span className="text-white text-xs font-medium">
                ⚪ {account.sessionTime || account.farm_time || "0h 0m"}
              </span>
            </div>

            {/* EQUIPPED PETS */}
            <div className="bg-[#161d30] p-2 rounded">
              <span className="text-[10px] text-gray-400 block">EQUIPPED PETS</span>
              <span className="text-yellow-400 text-xs font-bold">
                🐾 {account.equippedPets || account.equipped_pets || "0 Active"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
                }
