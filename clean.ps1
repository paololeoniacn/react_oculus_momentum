# Vai nella cartella del progetto
$projectPath = ".\my-routine-app"  # Cambia con il tuo percorso
Set-Location -Path $projectPath

Write-Host "🧹 Pulizia del progetto React con Vite..." -ForegroundColor Yellow

# Verifica se la cartella node_modules esiste ed eliminala
if (Test-Path "node_modules") {
    Write-Host "🗑️ Rimuovendo node_modules..."
    Remove-Item -Recurse -Force "node_modules"
} else {
    Write-Host "✅ node_modules già rimosso."
}

# Verifica se il file package-lock.json esiste ed eliminalo
if (Test-Path "package-lock.json") {
    Write-Host "🗑️ Rimuovendo package-lock.json..."
    Remove-Item -Force "package-lock.json"
} else {
    Write-Host "✅ package-lock.json già rimosso."
}

# Verifica se la cartella dist (build) esiste ed eliminala
if (Test-Path "dist") {
    Write-Host "🗑️ Rimuovendo cartella di build (dist)..."
    Remove-Item -Recurse -Force "dist"
} else {
    Write-Host "✅ Cartella dist già rimossa."
}


Write-Host "🚀 Pulizia completata! Il progetto è tornato alla versione base."
Set-Location -Path ".\"

