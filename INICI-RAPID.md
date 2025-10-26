# 🚀 Inici Ràpid - PWA Billar 3 Bandes

## ✅ PWA Completada!

La teva Progressive Web App visual de billar a tres bandes està llesta per usar.

## 📁 Arxius Creats

```
Escalfament/
├── index.html                    ✅ Pàgina principal
├── settings.html                 ✅ Pàgina de configuració
├── manifest.json                 ✅ Manifest PWA
├── service-worker.js             ✅ Service Worker (offline)
├── README.md                     ✅ Documentació completa
├── INICI-RAPID.md               ✅ Aquest fitxer
├── css/
│   └── styles.css               ✅ Estils complets
├── js/
│   ├── app.js                   ✅ Lògica principal
│   ├── exercises-visual.js      ✅ 21 exercicis amb diagrames
│   ├── billiard-diagrams.js     ✅ Sistema de diagrames SVG
│   ├── diagram-generator.js     ✅ Generador dinàmic
│   ├── media-manager.js         ✅ Gestió multimedia
│   ├── interactive-study.js     ✅ Mode d'estudi
│   └── icons.js                 ✅ Icones SVG
└── icons/
    ├── INSTRUCCIONS.md          ✅ Com crear icones
    └── icon-generator.html      ✅ Generador d'icones
```

## 🎬 Com Començar

### 1. Generar les Icones (Opcional però recomanat)

```bash
# Obre el generador d'icones en el teu navegador
open icons/icon-generator.html
# o navega a: file:///path/to/Escalfament/icons/icon-generator.html
```

Descarrega les dues icones (192x192 i 512x512) i col·loca-les a la carpeta `/icons/`.

### 2. Provar l'Aplicació Localment

**Opció A: Servidor HTTP Simple (Recomanat)**
```bash
# Si tens Python 3 instal·lat:
cd Escalfament
python -m http.server 8000

# Obre http://localhost:8000 en el navegador
```

**Opció B: Obrir Directament**
```bash
# Obre index.html directament en el navegador
# Nota: Algunes funcions PWA requereixen servidor HTTP
```

### 3. Instal·lar com a PWA

1. Obre l'app en Chrome, Edge o Safari
2. Cerca la icona "Instal·lar" a la barra d'adreces
3. Clica "Instal·lar" o "Afegir a pantalla d'inici"
4. L'app s'obrirà com una aplicació nativa!

## 🎯 Funcionalitats Principals

### Diagrames Interactius
- ✅ Cada exercici té un diagrama SVG visual
- ✅ Animacions de trajectòria
- ✅ Sistema de diamants numerat
- ✅ Indicadors d'efecte
- ✅ Punts d'impacte a les bandes

### Seguiment de Progrés
- ✅ Marcar exercicis com completats
- ✅ Estadístiques per categoria
- ✅ Cronòmetre de sessió
- ✅ Notes personals per exercici

### Mode Offline
- ✅ Funciona completament sense internet
- ✅ Dades guardades en localStorage
- ✅ Service Worker actiu

### Exportar/Importar
- ✅ Exporta el teu progrés en JSON
- ✅ Importa dades d'altres dispositius
- ✅ Backup de dades

## 📱 Controls

### Teclat
- `←` / `→` : Navegació entre exercicis
- `Espai` : Marcar completat
- `Esc` : Tancar modal

### Tàctil (Mòbil)
- **Swipe** esquerra/dreta: Navegar
- **Tap** : Obrir detalls
- **Long press** : Opcions (pròximament)

## 🎨 Personalització

### Canviar Colors
Edita `css/styles.css` i modifica les variables:
```css
:root {
  --color-felt-green: #0d5016;  /* Color del tapet */
  --color-wood-dark: #3e2723;   /* Fusta */
  --color-yellow: #ffd54f;      /* Diamants */
}
```

### Afegir Més Exercicis
Edita `js/exercises-visual.js` i afegeix nous objectes a l'array EXERCISES_DATA.

## 🐛 Resolució de Problemes

### Els diagrames no es mostren
1. Comprova que tots els arxius JS estan a la carpeta `/js/`
2. Obre la consola del navegador (F12) i mira errors
3. Assegura't que l'app està servida per HTTP (no file://)

### No funciona offline
1. Recàrrega amb Ctrl+Shift+R (hard refresh)
2. Comprova que el Service Worker s'ha registrat (DevTools > Application > Service Workers)
3. Verifica que tots els arxius estan al cache

### No es guarda el progrés
1. Comprova que localStorage està habilitat
2. Alguns navegadors bloquegen localStorage en mode privat
3. Exporta les dades regularment com a backup

## 🚀 Desplegar Online

### GitHub Pages (Gratuït)
```bash
git init
git add .
git commit -m "PWA Billar 3 Bandes"
git remote add origin https://github.com/username/billar-3bandes.git
git push -u origin main

# Activa GitHub Pages a Settings > Pages
```

### Netlify
1. Arrossega la carpeta `Escalfament` a https://netlify.com/drop
2. La teva app estarà online en segons!

### Vercel
```bash
npm install -g vercel
cd Escalfament
vercel
```

## 📚 Més Informació

Consulta [README.md](README.md) per documentació completa.

## 🎉 A Gaudir!

La teva PWA està llesta. Practica els 21 exercicis i millora la teva tècnica al billar a tres bandes!

---

**Fet amb ❤️ en català**
🎱 Bona sort!
