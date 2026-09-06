const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const MY_SECRET_PASS = "AKUN_SAYA_SAJA_123";
let myAccount = null;

app.post('/api/update', (req, res) => {
    const { pass, username, eggs, cash, speed, equippedPets, sessionTime } = req.body;
    
    if (pass !== MY_SECRET_PASS) {
        return res.status(403).json({ error: 'Access Denied' });
    }

    myAccount = {
        username: username || 'Unknown',
        eggs: eggs || '0',
        cash: cash || '0/s',
        speed: speed || '0',
        equippedPets: equippedPets || 'None',
        sessionTime: sessionTime || '0m',
        lastSeen: Date.now(),
        lastUpdate: new Date().toLocaleTimeString('id-ID', { hour12: false })
    };

    res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
    if (myAccount && (Date.now() - myAccount.lastSeen > 30000)) {
        myAccount = null;
    }
    res.json(myAccount ? [myAccount] : []);
});

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Private Account Dashboard</title>
        <style>
            body { font-family: -apple-system, sans-serif; background-color: #090d16; color: #f1f5f9; margin: 0; padding: 16px; }
            .container { max-width: 500px; margin: 0 auto; }
            h2 { text-align: center; color: #38bdf8; font-size: 1.3rem; margin-bottom: 20px; }
            .card { background: #131b2e; border-radius: 14px; padding: 18px; border: 1px solid #1e293b; }
            .card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px; }
            .username { font-size: 1.1rem; font-weight: bold; color: #38bdf8; }
            .badge { background: #10b981; color: #022c22; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .stat-box { background: #090d16; padding: 10px; border-radius: 8px; border: 1px solid #1e293b; }
            .label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; }
            .val { font-size: 1.05rem; font-weight: bold; color: #f8fafc; margin-top: 2px; }
            .pet-box { grid-column: span 2; background: #090d16; padding: 10px; border-radius: 8px; border: 1px solid #1e293b; }
            .empty { text-align: center; color: #64748b; margin-top: 50px; font-size: 0.9rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>🔒 Private Account Dashboard</h2>
            <div id="dashboard"><div class="empty">Menunggu Executor akun Anda...</div></div>
        </div>
        <script>
            async function fetchStats() {
                try {
                    const res = await fetch('/api/stats');
                    const data = await res.json();
                    const container = document.getElementById('dashboard');

                    if (data.length === 0) {
                        container.innerHTML = '<div class="empty">Tidak ada akun terhubung. Jalankan script di Executor Anda.</div>';
                        return;
                    }

                    const acc = data[0];
                    container.innerHTML = \`
                        <div class="card">
                            <div class="card-header">
                                <div class="username">👤 \${acc.username}</div>
                                <div class="badge">MY EXECUTOR</div>
                            </div>
                            <div class="grid">
                                <div class="stat-box">
                                    <div class="label">Total Eggs</div>
                                    <div class="val">🥚 \${acc.eggs}</div>
                                </div>
                                <div class="stat-box">
                                    <div class="label">Money / sec</div>
                                    <div class="val">💰 \${acc.cash}</div>
                                </div>
                                <div class="stat-box">
                                    <div class="label">Walk Speed</div>
                                    <div class="val">⚡ \${acc.speed}</div>
                                </div>
                                <div class="stat-box">
                                    <div class="label">Farm Time</div>
                                    <div class="val">⏱️ \${acc.sessionTime}</div>
                                </div>
                                <div class="pet-box">
                                    <div class="label">Equipped Pets</div>
                                    <div class="val" style="color:#f59e0b; font-size:0.9rem;">🐾 \${acc.equippedPets}</div>
                                </div>
                            </div>
                        </div>
                    \`;
                } catch (e) {}
            }
            setInterval(fetchStats, 3000);
            fetchStats();
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running`));
