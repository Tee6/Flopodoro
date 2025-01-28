const express = require('express');
const path = require('path');
const app = express();
const port = 5173;

// Der korrekte Ordner, den du in der Produktion verwenden möchtest, ist 'out/renderer'
app.use(express.static(path.join(__dirname, 'out/renderer')));

// Fallback für Single-Page-Apps (falls keine Datei gefunden wird)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'out/renderer/index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
