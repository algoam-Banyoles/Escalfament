// ============================================
// GENERADOR DE DIAGRAMES DINÀMICS
// ============================================

class DiagramGenerator {
  constructor() {
    this.taula = new TaulaBillar(800, 400);
    this.animationSpeed = 2000; // ms per segment
  }

  // Generar diagrama complet per un exercici
  generarDiagrama(exercici) {
    const container = document.createElement('div');
    container.className = 'diagram-container';
    container.dataset.exerciseId = exercici.id;

    // Crear SVG base
    const svg = this.crearTaulaSVG();

    // Afegir contingut del diagrama
    if (exercici.diagram) {
      this.afegirBoles(svg, exercici.diagram);
      this.dibuixarTrajectoria(svg, exercici.diagram);
      this.afegirIndicadors(svg, exercici.diagram);
    }

    container.appendChild(svg);

    // Afegir controls
    const controls = this.crearControls(exercici);
    container.appendChild(controls);

    return container;
  }

  // Crear SVG de la taula
  crearTaulaSVG() {
    const svg = this.taula.crearSVG();
    this.taula.dibuixarTaula(svg);
    this.taula.dibuixarDiamants(svg);
    return svg;
  }

  // Afegir boles al diagrama
  afegirBoles(svg, config) {
    const { bolaBLanca, bolaGroga, bolaVermella } = config;

    if (bolaBLanca) {
      const pos = this.taula.taulaAPx(bolaBLanca.x, bolaBLanca.y);
      this.taula.dibuixarBola(svg, pos.x, pos.y, '#ffffff', null, 'bola-blanca');
    }

    if (bolaGroga) {
      const pos = this.taula.taulaAPx(bolaGroga.x, bolaGroga.y);
      this.taula.dibuixarBola(svg, pos.x, pos.y, '#ffd700', 1, 'bola-groga');
    }

    if (bolaVermella) {
      const pos = this.taula.taulaAPx(bolaVermella.x, bolaVermella.y);
      this.taula.dibuixarBola(svg, pos.x, pos.y, '#dc143c', 3, 'bola-vermella');
    }
  }

  // Dibuixar trajectòria
  dibuixarTrajectoria(svg, config) {
    if (!config.trajectoria || config.trajectoria.length < 2) return;

    // Convertir coordenades de percentatge a píxels
    const punts = config.trajectoria.map(p => this.taula.taulaAPx(p.x, p.y));

    // Tipus de trajectòria segons efecte
    const tipus = config.efecte === 0 ? 'normal' : 'efecte';

    // Dibuixar la trajectòria
    const path = this.taula.dibuixarTrajectoria(svg, punts, tipus, config.efecte);

    // Marcar punts d'impacte a les bandes
    if (config.bandes) {
      this.marcarBandes(svg, punts, config.bandes);
    }

    return path;
  }

  // Marcar punts d'impacte a les bandes
  marcarBandes(svg, punts, bandes) {
    // Els punts d'impacte són els punts intermedis (no el primer ni l'últim)
    const impactes = punts.slice(1, -1);

    impactes.forEach((punt, index) => {
      if (index < bandes.length) {
        this.taula.marcarImpacte(svg, punt.x, punt.y, bandes[index]);
      }
    });
  }

  // Afegir indicadors (efecte, notes visuals, etc.)
  afegirIndicadors(svg, config) {
    if (config.efecte && config.efecte !== 0 && config.bolaBLanca) {
      const pos = this.taula.taulaAPx(config.bolaBLanca.x, config.bolaBLanca.y);
      this.taula.dibuixarIndicadorEfecte(svg, pos.x, pos.y, config.efecte);
    }

    // Afegir notes visuals si n'hi ha
    if (config.puntsCritics) {
      this.afegirPuntsCritics(svg, config.puntsCritics);
    }
  }

  // Afegir punts crítics amb anotacions
  afegirPuntsCritics(svg, puntsCritics) {
    // Això es pot expandir per marcar punts específics amb icones o text
    puntsCritics.forEach((nota, index) => {
      const text = this.taula.crearElement('text', {
        x: this.taula.width - 120,
        y: 30 + (index * 20),
        'font-size': '11',
        fill: '#ff9800',
        'font-weight': 'bold'
      });
      text.textContent = `⚠️ ${nota}`;
      svg.appendChild(text);
    });
  }

  // Crear controls del diagrama
  crearControls(exercici) {
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';

    // Botó d'animació
    const btnAnimate = document.createElement('button');
    btnAnimate.className = 'btn btn-primary btn-sm';
    btnAnimate.textContent = '▶ Animar tir';
    btnAnimate.onclick = () => this.animarTir(exercici);

    // Botó de reset
    const btnReset = document.createElement('button');
    btnReset.className = 'btn btn-secondary btn-sm';
    btnReset.textContent = '↻ Reset';
    btnReset.onclick = () => this.resetDiagrama(exercici);

    // Botó per rotar vista
    const btnRotate = document.createElement('button');
    btnRotate.className = 'btn btn-secondary btn-sm';
    btnRotate.textContent = '🔄 Rotar vista';
    btnRotate.onclick = () => this.rotarVista(exercici);

    // Botó per ampliar
    const btnExpand = document.createElement('button');
    btnExpand.className = 'btn btn-secondary btn-sm';
    btnExpand.textContent = '🔍 Ampliar';
    btnExpand.onclick = () => this.ampliarDiagrama(exercici);

    controls.appendChild(btnAnimate);
    controls.appendChild(btnReset);
    controls.appendChild(btnRotate);
    controls.appendChild(btnExpand);

    return controls;
  }

  // Animar el tir
  animarTir(exercici) {
    const container = document.querySelector(`[data-exercise-id="${exercici.id}"] svg`);
    if (!container) return;

    const bolaBLanca = container.querySelector('.bola-blanca .bola-principal');
    if (!bolaBLanca) return;

    const trajectoria = exercici.diagram.trajectoria;
    if (!trajectoria || trajectoria.length < 2) return;

    // Convertir a píxels
    const punts = trajectoria.map(p => this.taula.taulaAPx(p.x, p.y));

    // Animar segment per segment
    this.animarSegments(bolaBLanca, punts, 0);
  }

  // Animar segments de trajectòria
  animarSegments(bola, punts, index) {
    if (index >= punts.length - 1) {
      // Animació completada
      setTimeout(() => this.resetBola(bola, punts[0]), 500);
      return;
    }

    const start = punts[index];
    const end = punts[index + 1];
    const duration = this.animationSpeed;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolació lineal
      const x = start.x + (end.x - start.x) * progress;
      const y = start.y + (end.y - start.y) * progress;

      bola.setAttribute('cx', x);
      bola.setAttribute('cy', y);

      // Actualitzar brillantor també
      const parent = bola.parentElement;
      const shine = parent.querySelector('circle:nth-child(2)');
      if (shine) {
        shine.setAttribute('cx', x - 3);
        shine.setAttribute('cy', y - 3);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Segment completat, passar al següent
        setTimeout(() => this.animarSegments(bola, punts, index + 1), 200);
      }
    };

    requestAnimationFrame(animate);
  }

  // Reset bola a posició inicial
  resetBola(bola, posInicial) {
    bola.setAttribute('cx', posInicial.x);
    bola.setAttribute('cy', posInicial.y);

    const parent = bola.parentElement;
    const shine = parent.querySelector('circle:nth-child(2)');
    if (shine) {
      shine.setAttribute('cx', posInicial.x - 3);
      shine.setAttribute('cy', posInicial.y - 3);
    }
  }

  // Reset diagrama
  resetDiagrama(exercici) {
    const container = document.querySelector(`[data-exercise-id="${exercici.id}"]`);
    if (!container) return;

    // Regenerar diagrama
    const newDiagram = this.generarDiagrama(exercici);
    container.replaceWith(newDiagram);
  }

  // Rotar vista (invertir taula)
  rotarVista(exercici) {
    const svg = document.querySelector(`[data-exercise-id="${exercici.id}"] svg`);
    if (!svg) return;

    const currentRotation = svg.dataset.rotation || '0';
    const newRotation = currentRotation === '0' ? '180' : '0';

    svg.style.transform = `rotate(${newRotation}deg)`;
    svg.dataset.rotation = newRotation;
  }

  // Ampliar diagrama en modal
  ampliarDiagrama(exercici) {
    // Crear modal amb diagrama ampliat
    const modal = document.createElement('div');
    modal.className = 'modal modal-diagrama active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 1200px;">
        <div class="modal-header">
          <h2>Diagrama #${exercici.id} - ${exercici.title}</h2>
          <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div id="diagram-ampliado"></div>
          <p style="margin-top: 1rem;"><strong>Notes visuals:</strong> ${exercici.visualNotes || 'Sense notes'}</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Generar diagrama ampliat
    const diagramAmpliado = this.generarDiagrama(exercici);
    diagramAmpliado.style.maxWidth = '100%';
    document.getElementById('diagram-ampliado').appendChild(diagramAmpliado);

    // Tancar en clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Exportar diagrama com SVG
  exportarSVG(exercici) {
    const svg = document.querySelector(`[data-exercise-id="${exercici.id}"] svg`);
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `exercici-${exercici.id}-${exercici.title.replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Exportar com PNG (utilitzant canvas)
  async exportarPNG(exercici) {
    const svg = document.querySelector(`[data-exercise-id="${exercici.id}"] svg`);
    if (!svg) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `exercici-${exercici.id}-${exercici.title.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
      });
    };

    img.src = url;
  }
}

// Exportar classe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiagramGenerator;
}
