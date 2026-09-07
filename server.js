'use client';

import React from 'react';

function getIncomeNumber(acc) {
  const rawStr = acc.cash || acc.income || "0";
  if (typeof rawStr === 'number') return rawStr;
  
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

export default function Dashboard({ accounts = [] }) {
  const accountArray = Array.isArray(accounts) 
    ? accounts 
    : Object.values(accounts || {});

  const sortedAccounts = [...accountArray].sort((a, b) => {
    return getIncomeNumber(b) - getIncomeNumber(a);
  });

  return (
    <div className="min-h-screen bg-[#070b15] text-white p-4 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER DASHBOARD */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl shadow-lg">
              🥚
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">DASHBOARD</h1>
                <span className="text-yellow-400 text-lg">👑</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                STEAL AN EGG
              </h2>
              <p className="text-[11px] text-gray-400">
                • Multi-Account Real-Time Monitor • Safe & Read-Only
              </p>
            </div>
          </div>

          <div className="bg-[#0f172a]/80 border border-slate-800 rounded-xl p-3 flex items-center gap-4 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs border border-slate-700">
              Rb
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Roblox</p>
              <p className="text-[10px] text-gray-400">Multi-Client Active</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live ({sortedAccounts.length})
            </div>
          </div>
        </header>

        {/* DAFTAR AKUN CARDS */}
        <main className="space-y-8">
          {sortedAccounts.map((account, index) => {
            const bestPetName = account.bestPet || account.best_pet || "-";
            const incomeVal = account.cash || account.income || "0/s";
            const speedVal = account.speed || "0";
            const equippedVal = account.equippedPets || account.equipped_pets || "0 Active";
            const farmTimeVal = account.sessionTime || account.farm_time || "0h 0m";

            return (
              <div 
                key={account.username || index} 
                className="bg-[#0b1120]/90 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm space-y-6"
              >
                {/* AKUN HEADER */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-lg font-black shadow-md">
                      #{index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-blue-300 flex items-center gap-2">
                      👤 {account.username}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
                      ⏱️ Farm: {farmTimeVal}
                    </span>
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-bold">
                      ACTIVE EXECUTE
                    </span>
                  </div>
                </div>

                {/* 4 STAT BOXES */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#0d1527] border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400 shrink-0">💰</div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">INCOME/S</p>
                      <p className="text-base font-black text-emerald-400">{incomeVal}</p>
                    </div>
                  </div>

                  <div className="bg-[#0d1527] border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-lg text-cyan-400 shrink-0">🪙</div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">MONEY</p>
                      <p className="text-base font-black text-cyan-400">{account.money || "N/A"}</p>
                    </div>
                  </div>

                  <div className="bg-[#0d1527] border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg text-purple-400 shrink-0">🏃</div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">SPEED</p>
                      <p className="text-base font-black text-purple-400">{speedVal}</p>
                    </div>
                  </div>

                  <div className="bg-[#0d1527] border border-pink-500/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-lg text-pink-400 shrink-0">🐾</div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">PET EQUIP</p>
                      <p className="text-base font-black text-pink-400">{equippedVal}</p>
                    </div>
                  </div>
                </div>

                {/* BEST PET & DETAIL SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 bg-[#0a0f1d] border border-yellow-500/50 rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
                    <div className="space-y-1 z-10">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-bold">
                        <span>👑</span> BEST PET
                      </div>
                      <span className="inline-block bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-[9px] font-black px-2 py-0.5 rounded-md">
                        TOP EQUIPPED
                      </span>
                      <h4 className="text-lg font-black text-white">{bestPetName}</h4>
                      <p className="text-xs font-bold text-yellow-400">💰 {incomeVal}</p>
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center text-4xl shadow-inner">
                      🦊
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-[#0a0f1d] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-300 font-bold flex items-center gap-1.5">
                        🐾 Detail Pet Active
                      </span>
                      <span className="text-cyan-400 font-black">{equippedVal}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-[#111827] p-2 rounded-lg text-xs">
                        <span className="text-gray-300 font-medium">1. {bestPetName}</span>
                        <span className="text-yellow-400 font-bold">{incomeVal}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </main>

        <footer className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-slate-800">
          <p className="italic">⭐ “Collect more pets, get more income!”</p>
          <p className="flex items-center gap-1">🛡️ Read Only Mode</p>
        </footer>

      </div>
    </div>
  );
    }
