# PowerShell helper to create a virtual environment and install requirements
# Run in PowerShell (pwsh) from the project root:
#   .\setup-env.ps1

$venvDir = ".venv"
if (-Not (Test-Path $venvDir)) {
    Write-Host "Creant virtualenv a $venvDir..."
    python -m venv $venvDir
} else {
    Write-Host "Virtualenv ja existeix: $venvDir"
}

$python = Join-Path $venvDir "Scripts\python.exe"
if (-Not (Test-Path $python)) {
    Write-Error "No s'ha trobat python dins de $venvDir. Assegura't que Python està instal·lat i disponible com a 'python'."
    exit 1
}

Write-Host "Instal·lant dependències des de requirements.txt..."
& $python -m pip install --upgrade pip
& $python -m pip install -r requirements.txt

Write-Host "Entorn preparat. Activa'l amb:` .\$venvDir\Scripts\Activate.ps1 ` o usant `$python` directament."

# --- Afegir CLAUDE_CODE_GIT_BASH_PATH i el directori de Git Bash al PATH per la sessió actual ---
# Aquesta secció estableix la variable d'entorn CLAUDE_CODE_GIT_BASH_PATH i afegeix el directori del binari al PATH
# per la sessió actual. Si vols persistir els canvis per a l'usuari, canvia $persist a $true.

$gitBashExe = 'C:\Program Files\Git\bin\bash.exe'
if (Test-Path $gitBashExe) {
    # estableix la variable només per la sessió actual
    [System.Environment]::SetEnvironmentVariable('CLAUDE_CODE_GIT_BASH_PATH', $gitBashExe, 'Process')

    # afegeix el directori al PATH de la sessió actual si encara no hi és
    $gitBashDir = Split-Path $gitBashExe
    if ($env:PATH -notlike "*${gitBashDir}*") {
        $env:PATH = "$($env:PATH);$gitBashDir"
        Write-Host "Afegit $gitBashDir al PATH per la sessió actual."
    } else {
        Write-Host "$gitBashDir ja està al PATH de la sessió actual."
    }

    Write-Host "Variable CLAUDE_CODE_GIT_BASH_PATH definida per la sessió actual: $gitBashExe"

    # Opcional: persistir al PATH d'usuari
    # Per defecte ara s'activa perquè vols que sigui automàtic
    $persist = $true
    if ($persist) {
        Write-Host "Persistint CLAUDE_CODE_GIT_BASH_PATH i PATH al perfil d'usuari..."
        [System.Environment]::SetEnvironmentVariable('CLAUDE_CODE_GIT_BASH_PATH', $gitBashExe, 'User')
        $userPath = [System.Environment]::GetEnvironmentVariable('PATH', 'User')
        if ($userPath -notlike "*${gitBashDir}*") {
            [System.Environment]::SetEnvironmentVariable('PATH', "$userPath;${gitBashDir}", 'User')
            Write-Host "S'ha afegit $gitBashDir al PATH de l'usuari. Tanca i torna a obrir la sessió per veure els canvis."
        } else {
            Write-Host "$gitBashDir ja existia al PATH de l'usuari."
        }
    }
} else {
    Write-Host "No s'ha trobat $gitBashExe — no s'ha modificat PATH ni la variable CLAUDE_CODE_GIT_BASH_PATH."
}