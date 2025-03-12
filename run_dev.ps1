# Verifica se Node.js è installato
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Node.js non è installato. Scaricalo da https://nodejs.org/ e installalo." -ForegroundColor Red
    exit
}

# Verifica se npm è installato
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ npm non è installato. Assicurati di aver installato Node.js correttamente." -ForegroundColor Red
    exit
}

# Vai nella cartella del progetto
$projectPath = ".\my-routine-app"  # Cambia con il tuo percorso
Set-Location -Path $projectPath

# Installa le dipendenze se necessario
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installazione delle dipendenze..."
    npm install
}

# Opzionale: Pulizia della cache npm prima di avviare
Write-Host "🧹 Pulizia della cache npm..."
npm cache clean --force

# Avvia l'app con Vite
Write-Host "🚀 Avvio dell'applicazione React con Vite..."
npm run dev -- --port 3001

# Start-Process "npm" -ArgumentList "run dev" -NoNewWindow -PassThru

# aprire automaticamente il browser su localhost:5173
Start-Process "http://localhost:5173"

# Mantieni aperta la finestra per vedere i log
Write-Host "✅ Applicazione avviata! Premi Ctrl+C per chiudere." -ForegroundColor Green