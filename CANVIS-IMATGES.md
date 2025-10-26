# ✅ Canvis Realitzats - Imatges Estàtiques

## 📋 Resum

S'ha modificat l'aplicació per usar **imatges estàtiques** en lloc de diagrames SVG animats, simplificant molt el codi i eliminant errors de càrrega.

---

## 🔄 Arxius Modificats

### 1. **js/app.js**
- ✅ Eliminat `DiagramGenerator`
- ✅ Modificat `createExerciseCard()` per usar etiquetes `<img>`
- ✅ Afegit sistema de placeholder quan no hi ha imatge
- ✅ Simplificada la inicialització

**Com funciona ara:**
```javascript
// Busca imatge a: images/exercicis/exercici-01.jpg
// Si no existeix, mostra placeholder amb fons verd/marró
```

### 2. **css/styles.css**
- ✅ Afegits estils per `.exercise-image`
- ✅ Afegits estils per `.image-placeholder`
- ✅ Efecte hover per ampliar lleugerament
- ✅ Responsive per totes les mides

### 3. **index.html**
- ✅ Eliminats scripts innecessaris:
  - ❌ billiard-diagrams.js
  - ❌ diagram-generator.js
  - ❌ media-manager.js
  - ❌ interactive-study.js
- ✅ Només queden 3 scripts:
  - ✅ exercises-visual.js
  - ✅ icons.js
  - ✅ app.js

### 4. **service-worker.js**
- ✅ Actualitzada llista de recursos a cachear
- ✅ Eliminades referències a arxius que no existeixen
- ✅ Ara cacheja automàticament les imatges quan es carreguen

---

## 📁 Nova Estructura

```
Escalfament/
├── images/
│   └── exercicis/
│       ├── INSTRUCCIONS.md          ← Llegeix això!
│       ├── exercici-01.jpg          ← Col·loca imatges aquí
│       ├── exercici-02.jpg
│       └── ...                      (fins exercici-21.jpg)
├── js/
│   ├── app.js                       ← Simplificat
│   ├── exercises-visual.js
│   └── icons.js
└── ...
```

---

## 🖼️ Format de les Imatges

### Nomenclatura
```
exercici-01.jpg  ← Exercici #1
exercici-02.jpg  ← Exercici #2
...
exercici-21.jpg  ← Exercici #21
```

### Especificacions Recomanades
- **Format**: JPG (o PNG)
- **Mida**: 800x400px (ràtio 2:1)
- **Pes**: < 200KB
- **Qualitat**: 80-85%

---

## 🎯 Com Afegir Imatges

### Opció 1: Screenshots del Document Original
1. Obre el document Word/PDF amb els diagrames
2. Fes captura de cada diagrama
3. Retalla i redimensiona a 800x400px
4. Guarda com `exercici-01.jpg`, `exercici-02.jpg`, etc.
5. Col·loca-les a `images/exercicis/`

### Opció 2: Crear Manualment
Usa eines com:
- Canva
- PowerPoint
- Figma
- GIMP/Photoshop

### Opció 3: Placeholder Temporal
Si no tens les imatges encara:
- L'app mostrarà un placeholder verd/marró
- Pots anar afegint imatges progressivament
- Cada cop que afegeixis una, recarrega l'app

---

## 🚀 Provar els Canvis

1. **Recarrega l'aplicació** amb Ctrl+Shift+R
2. Hauries de veure:
   - 📊 Placeholders verds/marrons (si no hi ha imatges)
   - 🖼️ Imatges reals (si les has afegit)
3. **Sense errors** a la consola!

---

## ✨ Avantatges d'Usar Imatges

### ✅ Pros
- **Simple**: Només cal afegir JPGs
- **Ràpid**: Càrrega instantània
- **Compatible**: Funciona a tots els navegadors
- **Offline**: Cache automàtic amb Service Worker
- **Flexible**: Pots usar qualsevol eina per crear-les

### ⚠️ A Considerar
- Has de crear/obtenir les 21 imatges
- Les imatges ocupen espai (però comprimit ~100KB/imatge = 2MB total)
- No són interactives (però la versió SVG donava errors)

---

## 📝 Checklist

- [x] Modificar app.js
- [x] Actualitzar CSS
- [x] Simplificar index.html
- [x] Actualitzar service-worker.js
- [x] Crear carpeta images/exercicis/
- [x] Crear INSTRUCCIONS.md
- [ ] **Afegir les 21 imatges** ← El que falta per tu!

---

## 🆘 Solució de Problemes

### No es veu cap imatge
- Comprova que el nom del fitxer és exacte: `exercici-01.jpg`
- Verifica que està a la carpeta `images/exercicis/`
- Recarrega amb Ctrl+Shift+R

### Es veu el placeholder
- Normal si no has afegit la imatge encara
- Afegeix `exercici-XX.jpg` a la carpeta

### Error 404
- El nom del fitxer no coincideix
- Revisa majúscules/minúscules (ha de ser tot minúscula)

---

## 📚 Més Informació

Consulta:
- [images/exercicis/INSTRUCCIONS.md](images/exercicis/INSTRUCCIONS.md) - Guia completa per imatges
- [README.md](README.md) - Documentació general

---

**🎱 Ara l'app està molt més simple i funcional!**

Només cal afegir les imatges i estarà llesta.
