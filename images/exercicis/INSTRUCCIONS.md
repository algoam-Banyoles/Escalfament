# 📸 Instruccions per Afegir Imatges dels Exercicis

## 📁 Estructura

Col·loca les imatges dels 21 exercicis en aquesta carpeta amb el format:

```
images/exercicis/
├── exercici-01.jpg
├── exercici-02.jpg
├── exercici-03.jpg
├── ...
├── exercici-21.jpg
```

## 🖼️ Especificacions de les Imatges

### Format Recomanat
- **Format**: JPG o PNG
- **Mida**: 800x400 píxels (aspecte 2:1)
- **Pes**: < 200KB per imatge
- **Qualitat**: 80-85% (comprimit)

### Nomenclatura
- Nom del fitxer: `exercici-XX.jpg` on XX és el número amb 2 dígits
- Exemples:
  - `exercici-01.jpg` ← Exercici #1
  - `exercici-15.jpg` ← Exercici #15
  - `exercici-21.jpg` ← Exercici #21

## 📊 Contingut de les Imatges

Cada imatge hauria de mostrar:

1. **Taula de billar** vista des de dalt (perspectiva bird's eye)
2. **3 boles** clarament marcades:
   - ⚪ Bola blanca (bola del jugador)
   - 🟡 Bola groga o número 1 (objectiu 1)
   - 🔴 Bola vermella o número 3 (objectiu 2)
3. **Trajectòria** indicada amb:
   - Línia discontínua o fletxes
   - Punts d'impacte a les bandes numerats (1ª, 2ª, 3ª...)
4. **Sistema de diamants** (opcional però recomanat)

## 🎨 Com Crear les Imatges

### Opció 1: Screenshots del Document Original
Si tens el document Word/PDF original:
1. Fes captures de pantalla de cada diagrama
2. Retalla l'imatge per deixar només la taula
3. Redimensiona a 800x400px
4. Guarda com JPG amb qualitat 80%

### Opció 2: Eines de Disseny
- **Canva**: Plantilles de diagrames esportius
- **Figma**: Disseny vectorial professional
- **PowerPoint**: Dibuix simple de diagrames
- **GIMP/Photoshop**: Edició d'imatges

### Opció 3: Generadors Online
- **Billiard Diagram Maker**: Cerca "billiard diagram generator"
- **Draw.io**: Per crear diagrames senzills

### Opció 4: Usar els Diagrames SVG Generats
Si vols usar els diagrames SVG que estan al codi:
1. Obre [test-diagrams.html](../../test-diagrams.html)
2. Clica botó dret sobre cada diagrama SVG
3. "Guardar imatge com..." → PNG
4. Converteix a JPG i optimitza

## 📝 Llista d'Exercicis

### Exercicis de Comprovació
- [ ] `exercici-01.jpg` - Sistema de diamants (50/30, 70/40, 30/20)
- [ ] `exercici-02.jpg` - Cinc bandes al centre
- [ ] `exercici-13.jpg` - Posició comprovació cinc bandes
- [ ] `exercici-14.jpg` - Comprovació cinc bandes (variant)
- [ ] `exercici-16.jpg` - Mètode Tüzül
- [ ] `exercici-17.jpg` - Mètode DPM

### Sense Efecte
- [ ] `exercici-03.jpg` - Sense efecte bàsic
- [ ] `exercici-05.jpg` - Mitja bola sense efecte
- [ ] `exercici-08.jpg` - Línia blanca
- [ ] `exercici-09.jpg` - Mitja bola variant
- [ ] `exercici-11.jpg` - Doblet efecte zero

### Contra Efecte
- [ ] `exercici-06.jpg` - Contra efecte bàsic
- [ ] `exercici-07.jpg` - El renversé

### Altres
- [ ] `exercici-04.jpg` - La cabanya amb bola retrasada
- [ ] `exercici-10.jpg` - Efecte i atac a la tangent
- [ ] `exercici-12.jpg` - Passabola amb efecte 4
- [ ] `exercici-15.jpg` - Màxim efecte vertical
- [ ] `exercici-18.jpg` - Assajar atac
- [ ] `exercici-19.jpg` - Bola fina
- [ ] `exercici-20.jpg` - Bola fina (variant)
- [ ] `exercici-21.jpg` - Sortida

## 🔄 Què Passa si no Hi Ha Imatge?

L'aplicació mostrarà un placeholder amb fons verd/marró indicant:
- 📊 Número de l'exercici
- 📁 Nom del fitxer esperat

Això permet que l'app funcioni igualment mentre afegeixes les imatges progressivament.

## ✅ Verificar que Funciona

1. Col·loca una imatge (p.ex. `exercici-01.jpg`)
2. Recarrega l'aplicació (Ctrl+R)
3. Hauries de veure la imatge en lloc del placeholder

## 📦 Optimitzar Imatges (Recomanat)

Abans de pujar les imatges, optimitza-les:

### Online
- **TinyJPG**: https://tinyjpg.com/
- **Squoosh**: https://squoosh.app/

### Línia de comandes
```bash
# Si tens ImageMagick instal·lat:
mogrify -resize 800x400 -quality 80 *.jpg
```

## 🎯 Consells

1. **Consistència**: Usa el mateix estil per totes les imatges
2. **Claredat**: Assegura't que les boles i trajectòries es veuen clarament
3. **Colors**: Usa colors consistents (blanc, groc, vermell)
4. **Resolució**: Mínim 800px d'ample per veure's bé en pantalles grans
5. **Pes**: Comprimeix per millorar temps de càrrega

## 📱 Cache Offline

Un cop afegides les imatges, el Service Worker les cachearà automàticament per funcionament offline.

---

**Fet amb ❤️ per la comunitat de billar català**
