const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Tempat penyimpanan data akun sementara di memori
const accounts = {};

// Serve file HTML dashboard
app.use(express.static(path.join(__dirname, 'public')));

// API 1: Menerima update data dari Roblox Executer
app.post('/api/update', (req, res) => {
    const { accountId, username, eggs, cash, status } = req.body;
    if (!accountId) return res.status(400).json({ error: "accountId required" });

    accounts[accountId] = {
        accountId,
        username: username || "Unknown",
        eggs: eggs || 0,
        cash: cash || 0,
        status: status || "Farming Active",
        lastSeen: Date.now()
    };
    res.json({ success: true });
});

// API 2: Menyediakan data akun ke Frontend Dashboard
app.get('/api/accounts', (req, res) => {
    const now = Date.now();
    const result = Object.values(accounts).map(acc => {
        // Jika tidak ada update data > 2 menit, tandai sebagai Offline
        const isOffline = (now - acc.lastSeen) > 120000;
        return {
            ...acc,
            status: isOffline ? "Offline" : acc.status
        };
    });
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server monitoring aktif di port ${PORT}`);
});
