Configuració de l'entorn (Windows / PowerShell)

1) Requisits
- Python 3.8+ (afegit al PATH com `python`)
- Opcional: Node.js si vols un servidor de desenvolupament per fitxers estàtics

2) Crear i instal·lar (des del directori del projecte):

PowerShell (pwsh):

```powershell
# crea venv i instal·la requirements
.\setup-env.ps1
```

Si prefereixes fer-ho manual:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

3) Executar l'script de processat d'imatges

```powershell
# desactivat el venv o usant el python del venv
.\.venv\Scripts\python.exe processar.py
```

4) Servidor de desenvolupament per veure la web (opcional)
Instal·la globalment `http-server` o utilitza `npx http-server` o l'extensió Live Server de VS Code.

Exemples:

```powershell
npx http-server -c-1 .
# o
npm i -g http-server
http-server -c-1 .
```

Notes
- `processar.py` usa Pillow per manipular imatges; `requirements.txt` conté `Pillow`.
- Aquest fitxer i l'script PowerShell són només per facilitar la configuració; revisa permisos d'execució si PowerShell bloqueja scripts (Set-ExecutionPolicy).
