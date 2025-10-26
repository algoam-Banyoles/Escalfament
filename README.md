# 🎱 5 Minuts d'Escalfament - Billar a Tres Bandes

Una Progressive Web App (PWA) visual i interactiva per practicar els 21 exercicis d'escalfament de billar a tres bandes.

## ✨ Característiques

### 📊 Diagrames Interactius
- **Diagrames SVG dinàmics** per cada exercici
- **Sistema de diamants** numerat a les bandes
- **Trajectòries animades** que mostren el recorregut de la bola
- **Indicadors d'efecte** visuals
- **Punts d'impacte** marcats a cada banda

### 🎯 Funcionalitats Principals
- ✅ **21 exercicis complets** amb diagrames visuals
- 📈 **Seguiment de progrés** amb localStorage
- ⏱️ **Cronòmetre de sessió** automàtic
- 📊 **Estadístiques detallades** per categoria
- 🎲 **Mode aleatori** per practicar
- 📝 **Notes personals** per cada exercici
- 💾 **Exportar/Importar dades** en format JSON
- 📱 **100% offline** després de la primera càrrega

### 🎬 Modes d'Estudi
- **Animació automàtica** del tir complet
- **Mode pas a pas** (pròximament)
- **Comparador de variants** (pròximament)
- **Rotació de vista** per veure des de diferents angles

### 📱 PWA Completa
- **Instal·lable** com a aplicació nativa
- **Funciona offline** completament
- **Responsive** - adaptat a mòbil, tablet i escriptori
- **Gesture controls** - swipe per navegar
- **Haptic feedback** en mòbils compatibles

## 🚀 Instal·lació

### Opció 1: Usar des del navegador
1. Obre `index.html` en un navegador modern
2. L'aplicació funcionarà immediatament

### Opció 2: Instal·lar com a PWA
1. Obre l'aplicació en Chrome, Edge o Safari
2. Cerca l'opció "Instal·lar aplicació" o "Afegir a pantalla d'inici"
3. L'app s'instal·larà i funcionarà com una aplicació nativa

### Opció 3: Desplegar en línia
Puja els arxius a qualsevol servei d'hosting amb HTTPS:
- **GitHub Pages**: Gratuït, ideal per projectes personals
- **Netlify**: Desplegament automàtic des de Git
- **Vercel**: Optimitzat per aplicacions web

## 📂 Estructura del Projecte

```
/
├── index.html                 # Pàgina principal
├── manifest.json             # Manifest de la PWA
├── service-worker.js         # Service Worker per offline
├── css/
│   └── styles.css           # Estils complets amb tema billar
├── js/
│   ├── app.js               # Lògica principal de l'aplicació
│   ├── exercises-visual.js  # Dades dels 21 exercicis amb configuració visual
│   ├── billiard-diagrams.js # Sistema base de diagrames SVG
│   ├── diagram-generator.js # Generador dinàmic de diagrames
│   ├── media-manager.js     # Gestió de recursos multimedia
│   ├── interactive-study.js # Mode d'estudi interactiu
│   └── icons.js             # Icones SVG
├── icons/
│   ├── icon-192.png         # Icona 192x192
│   └── icon-512.png         # Icona 512x512
└── README.md                # Aquest fitxer
```

## 🎨 Característiques Visuals

### Diagrames SVG
Cada exercici inclou un diagrama SVG personalitzat amb:
- **Taula de billar** amb textura de tapet verd
- **Boles**: Blanca (jugador), Groga (#1), Vermella (#3)
- **Trajectòries**:
  - 🟢 Verd: Trajectòria sense efecte
  - 🔵 Blau: Trajectòria amb efecte
  - 🔴 Vermell: Trajectòria alternativa
- **Diamants numerats** a les quatre bandes
- **Punts d'impacte** marcats amb número de banda

### Animacions
- ▶️ Animació del tir complet
- 📈 Dibuix progressiu de trajectòries
- ✨ Efectes hover sobre boles i diamants
- 💫 Celebració en completar exercicis

## 🎯 Ús de l'Aplicació

### Vista Principal
1. **Escull un exercici** de la llista
2. **Visualitza el diagrama** amb la posició de les boles
3. **Clica "Animar tir"** per veure la trajectòria completa
4. **Marca com completat** quan l'hagis practicat

### Filtres
Utilitza els botons de filtre per veure només:
- 🔍 **Comprovació**: Exercicis de verificació de sistemes
- ⚪ **Sense efecte**: Trajectòries naturals
- 🔄 **Contra efecte**: Tècniques avançades
- 🎯 **Altres**: Resta d'exercicis

### Estadístiques
Accedeix a les estadístiques per veure:
- Percentatge d'exercicis completats
- Temps total de sessió
- Progrés per categoria
- Exercicis més practicats

### Exportar/Importar
- **Exportar**: Descarrega les teves dades en format JSON
- **Importar**: Recupera dades des d'un altre dispositiu

## 🛠️ Tecnologies Utilitzades

- **HTML5** - Estructura semàntica
- **CSS3** - Disseny responsive amb variables CSS
- **JavaScript (ES6+)** - Lògica de l'aplicació
- **SVG** - Diagrames vectorials escalables
- **Service Workers** - Funcionament offline
- **LocalStorage** - Persistència de dades
- **PWA APIs** - Instal·lació i notificacions

## 🎓 Exercicis Inclosos

Tots els 21 exercicis clàssics d'escalfament:

1. **Sistema de diamants** (50/30, 70/40, 30/20)
2. **Cinc bandes** al centre
3. **Sense efecte** bàsic
4. **La cabanya** amb bola retrasada
5. **Mitja bola** sense efecte
6. **Contra efecte** bàsic
7. **El renversé**
8. **Línia blanca** comportament normal
9. **Mitja bola** variant
10. **Efecte i atac** a la tangent
11. **Doblet** efecte zero
12. **Passabola** amb efecte 4
13-14. **Comprovació cinc bandes** (variants)
15. **Màxim efecte** vertical
16. **Mètode Tüzül**
17. **Mètode DPM**
18. **Assajar atac**
19-20. **Bola fina** (variants)
21. **Sortida**

## ⚙️ Configuració Avançada

### Service Worker
El service worker cacheja tots els recursos per funcionament offline.
Per forçar una actualització:
```javascript
navigator.serviceWorker.getRegistration().then(reg => reg.update());
```

### Personalitzar Colors
Edita les variables CSS a `styles.css`:
```css
:root {
  --color-felt-green: #0d5016;  /* Color del tapet */
  --color-wood-dark: #3e2723;   /* Color de la fusta */
  --color-yellow: #ffd54f;      /* Color dels diamants */
}
```

## 🐛 Resolució de Problemes

### L'app no funciona offline
- Assegura't que el Service Worker s'ha registrat correctament
- Comprova la consola del navegador per errors
- Esborra la cache i torna a carregar

### Els diagrames no es mostren
- Verifica que tots els arxius JS estan carregats
- Comprova que `billiard-diagrams.js` i `diagram-generator.js` existeixen
- Revisa la consola per errors de JavaScript

### No es guarda el progrés
- Comprova que localStorage està habilitat al navegador
- Alguns navegadors en mode privat no guarden dades
- Exporta les dades com a backup

## 📱 Compatibilitat

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Chrome Android
- ✅ Safari iOS

## 🤝 Contribucions

Aquesta és una eina educativa de codi obert. Si vols millorar-la:
1. Fork del repositori
2. Crea una branca per la teva funcionalitat
3. Fes commit dels canvis
4. Crea un Pull Request

## 📄 Llicència

Aquest projecte és de domini públic. Ets lliure d'usar-lo, modificar-lo i distribuir-lo com vulguis.

## 🙏 Agraïments

Basat en els exercicis clàssics d'escalfament de billar a tres bandes utilitzats per jugadors professionals arreu del món.

---

**Fet amb ❤️ per a la comunitat de billar català**

🎱 Practica, millora i gaudeix del billar a tres bandes!
