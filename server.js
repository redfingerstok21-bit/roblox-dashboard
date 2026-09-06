const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let accountData = {};

app.post('/api/update', (req, res) => {
    const { accountId, username, eggs, cash, speed, eggRate, moneyRate, status, sessionTime } = req.body;
    
    if (!accountId) {
        return res.status(400).json({ error: 'Missing accountId' });
    }

    accountData[accountId] = {
        username: username || 'Unknown',
        eggs: eggs || 0,
        cash: cash || 0,
        speed: speed || 0,
        eggRate: eggRate || 0,
        moneyRate: moneyRate || 0,
        sessionTime: sessionTime || '0m',
        status: status || 'Farming Active',
        lastUpdate: new Date().toLocaleTimeString('id-ID', { hour12: false })
    };

    res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
    res.json(Object.values(accountData));
});

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Roblox Farming Analytics</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            h2 { text-align: center; color: #38bdf8; margin-bottom: 25px; }
            .card { background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
            .card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 15px; }
            .username { font-size: 1.2rem; font-weight: bold; color: #f1f5f9; }
            .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; }
            .active { background: #059669; color: #ecfdf5; }
            .offline { background: #dc2626; color: #fef2f2; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .stat-box { background: #0f172a; padding: 12px; border-radius: 8px; border: 1px solid #1e293b; }
            .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
            .stat-value { font-size: 1.1rem; font-weight: bold; color: #38bdf8; margin-top: 4px; }
            .rate { color: #4ade80; font-size: 0.85rem; }
            .footer-info { font-size: 0.8rem; color: #64748b; text-align: right; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>⚡ Roblox Farming Analytics</h2>
            <div id="dashboard">Memuat data akun...</div>
        </div>

        <script>
            async function fetchStats() {
                try {
                    const res = await fetch('/api/stats');
                    const data = await res.json();
                    const container = document.getElementById('dashboard');

                    if (data.length === 0) {
                        container.innerHTML = '<div style="text-align:center; color:#94a3b8;">Belum ada akun yang berjalan di Executor.</div>';
                        return;
                    }

                    container.innerHTML = data.map(acc => \`
                        <div class="card">
                            <div class="card-header">
                                <div class="username">👤 \${acc.username}</div>
                                <div class="status-badge \${acc.status.includes('Active') ? 'active' : 'offline'}">\${acc.status}</div>
                            </div>
                            <div class="grid">
                                <div class="stat-box">
                                    <div class="stat-label">Total Eggs</div>
                                    <div class="stat-value">🥚 \${acc.eggs.toLocaleString()}</div>
                                    <div class="rate">+\${acc.eggRate}/sec</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-label">Total Cash</div>
                                    <div class="stat-value">💰 $\${acc.cash.toLocaleString()}</div>
                                    <div class="rate">+\$\${acc.moneyRate}/sec</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-label">Walk Speed</div>
                                    <div class="stat-value">⚡ \${acc.speed} Speed</div>
                                </div>
                                <div class="stat-box">
                                    <div class="stat-label">Farm Duration</div>
                                    <div class="stat-value">⏱️ \${acc.sessionTime}</div>
                                </div>
                            </div>
                            <div class="footer-info">Terakhir Update: \${acc.lastUpdate}</div>
                        </div>
                    \`).join('');
                } catch (err) {
                    console.error(err);
                }
            }

            setInterval(fetchStats, 3000);
            fetchStats();
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
