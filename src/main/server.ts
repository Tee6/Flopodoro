const express = require('express');
const path = require('path');
const app = express();
const port = 5173;

console.log('Starte Server...');

// Statische Dateien aus dem Build-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'dist')));

// Bei allen Requests index.html zurückgeben (für Single-Page-Apps)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

