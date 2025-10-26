// ============================================
// SISTEMA DE DIAGRAMES SVG PER BILLAR
// ============================================

class TaulaBillar {
  constructor(width = 800, height = 400) {
    this.width = width;
    this.height = height;
    this.aspectRatio = 2; // Taula de billar 2:1
    this.margin = 40;
    this.tableWidth = width - (this.margin * 2);
    this.tableHeight = height - (this.margin * 2);

    // Sistema de diamants (7 a cada banda llarga, 3 a cada banda curta)
    this.diamantsLlargs = 7;
    this.diamantsCurts = 3;
  }

  // Crear SVG base de la taula
  crearSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    svg.setAttribute('class', 'taula-billar-svg');
    svg.style.width = '100%';
    svg.style.height = 'auto';

    return svg;
  }

  // Dibuixar taula base
  dibuixarTaula(svg) {
    // Fons de la taula (verd)
    const fons = this.crearElement('rect', {
      x: this.margin,
      y: this.margin,
      width: this.tableWidth,
      height: this.tableHeight,
      fill: 'url(#feltGradient)',
      stroke: '#3e2723',
      'stroke-width': '3'
    });

    // Gradient per el tapet
    const defs = this.crearElement('defs');
    const gradient = this.crearElement('linearGradient', {
      id: 'feltGradient',
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '100%'
    });

    gradient.innerHTML = `
      <stop offset="0%" style="stop-color:#0d5016;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a3d12;stop-opacity:1" />
    `;

    defs.appendChild(gradient);
    svg.appendChild(defs);
    svg.appendChild(fons);

    // Vora de fusta
    const vora = this.crearElement('rect', {
      x: this.margin - 15,
      y: this.margin - 15,
      width: this.tableWidth + 30,
      height: this.tableHeight + 30,
      fill: 'none',
      stroke: '#3e2723',
      'stroke-width': '15',
      rx: '8'
    });
    svg.insertBefore(vora, fons);

    return svg;
  }

  // Dibuixar sistema de diamants
  dibuixarDiamants(svg) {
    const diamantSize = 4;
    const color = '#ffd54f';

    // Diamants banda superior
    for (let i = 1; i <= this.diamantsLlargs; i++) {
      const x = this.margin + (this.tableWidth / (this.diamantsLlargs + 1)) * i;
      this.afegirDiamant(svg, x, this.margin, diamantSize, color, i);
    }

    // Diamants banda inferior
    for (let i = 1; i <= this.diamantsLlargs; i++) {
      const x = this.margin + (this.tableWidth / (this.diamantsLlargs + 1)) * i;
      this.afegirDiamant(svg, x, this.margin + this.tableHeight, diamantSize, color, i);
    }

    // Diamants banda esquerra
    for (let i = 1; i <= this.diamantsCurts; i++) {
      const y = this.margin + (this.tableHeight / (this.diamantsCurts + 1)) * i;
      this.afegirDiamant(svg, this.margin, y, diamantSize, color, i);
    }

    // Diamants banda dreta
    for (let i = 1; i <= this.diamantsCurts; i++) {
      const y = this.margin + (this.tableHeight / (this.diamantsCurts + 1)) * i;
      this.afegirDiamant(svg, this.margin + this.tableWidth, y, diamantSize, color, i);
    }
  }

  // Afegir un diamant individual
  afegirDiamant(svg, x, y, size, color, numero) {
    const group = this.crearElement('g', {
      class: 'diamant',
      'data-numero': numero
    });

    const diamant = this.crearElement('circle', {
      cx: x,
      cy: y,
      r: size,
      fill: color,
      stroke: '#8d6e63',
      'stroke-width': '1'
    });

    group.appendChild(diamant);
    svg.appendChild(group);
  }

  // Dibuixar bola
  dibuixarBola(svg, x, y, color, numero = null, className = '') {
    const radius = 10;
    const group = this.crearElement('g', {
      class: `bola ${className}`,
      'data-numero': numero
    });

    // Bola principal
    const bola = this.crearElement('circle', {
      cx: x,
      cy: y,
      r: radius,
      fill: color,
      stroke: this.getStrokeColor(color),
      'stroke-width': '2',
      class: 'bola-principal'
    });

    // Efecte de brillantor
    const brillantor = this.crearElement('circle', {
      cx: x - 3,
      cy: y - 3,
      r: radius / 3,
      fill: 'white',
      opacity: '0.6'
    });

    // Número (si n'hi ha)
    if (numero !== null) {
      const circleBlanc = this.crearElement('circle', {
        cx: x,
        cy: y,
        r: radius * 0.6,
        fill: 'white'
      });

      const text = this.crearElement('text', {
        x: x,
        y: y + 4,
        'text-anchor': 'middle',
        'font-size': '10',
        'font-weight': 'bold',
        fill: '#333'
      });
      text.textContent = numero;

      group.appendChild(circleBlanc);
      group.appendChild(text);
    }

    group.appendChild(bola);
    group.appendChild(brillantor);
    svg.appendChild(group);

    return group;
  }

  // Dibuixar trajectòria
  dibuixarTrajectoria(svg, punts, tipus = 'normal', efecte = 0) {
    const colors = {
      normal: '#4caf50',
      efecte: '#2196f3',
      alternativa: '#f44336'
    };

    const path = this.crearElement('path', {
      d: this.puntsAPath(punts),
      fill: 'none',
      stroke: colors[tipus] || colors.normal,
      'stroke-width': efecte > 0 ? '3' : '2',
      'stroke-dasharray': efecte > 0 ? '8,4' : '5,5',
      'stroke-linecap': 'round',
      class: `trajectoria trajectoria-${tipus}`,
      opacity: '0.8'
    });

    svg.appendChild(path);
    return path;
  }

  // Convertir array de punts a path SVG
  puntsAPath(punts) {
    if (punts.length === 0) return '';

    let path = `M ${punts[0].x} ${punts[0].y}`;
    for (let i = 1; i < punts.length; i++) {
      path += ` L ${punts[i].x} ${punts[i].y}`;
    }
    return path;
  }

  // Marcar punt d'impacte a banda
  marcarImpacte(svg, x, y, numeroBanda) {
    const group = this.crearElement('g', { class: 'punt-impacte' });

    const cercle = this.crearElement('circle', {
      cx: x,
      cy: y,
      r: 6,
      fill: '#ff9800',
      stroke: '#f57c00',
      'stroke-width': '2',
      opacity: '0.8'
    });

    const label = this.crearElement('text', {
      x: x,
      y: y - 12,
      'text-anchor': 'middle',
      'font-size': '12',
      'font-weight': 'bold',
      fill: '#fff',
      stroke: '#333',
      'stroke-width': '0.5'
    });
    label.textContent = `${numeroBanda}ª`;

    group.appendChild(cercle);
    group.appendChild(label);
    svg.appendChild(group);
  }

  // Indicador d'efecte
  dibuixarIndicadorEfecte(svg, x, y, efecte, angle = 0) {
    if (efecte === 0) return;

    const group = this.crearElement('g', {
      class: 'indicador-efecte',
      transform: `translate(${x}, ${y}) rotate(${angle})`
    });

    // Fletxa corbada
    const path = this.crearElement('path', {
      d: efecte > 0
        ? 'M -15,-10 Q -10,0 -15,10'
        : 'M 15,-10 Q 10,0 15,10',
      fill: 'none',
      stroke: '#2196f3',
      'stroke-width': '2',
      'stroke-linecap': 'round'
    });

    // Punta de fletxa
    const arrowhead = this.crearElement('polygon', {
      points: efecte > 0 ? '-15,10 -17,8 -13,8' : '15,10 17,8 13,8',
      fill: '#2196f3'
    });

    // Text amb valor d'efecte
    const text = this.crearElement('text', {
      x: efecte > 0 ? -25 : 25,
      y: 5,
      'text-anchor': efecte > 0 ? 'end' : 'start',
      'font-size': '10',
      fill: '#2196f3',
      'font-weight': 'bold'
    });
    text.textContent = `E${Math.abs(efecte)}`;

    group.appendChild(path);
    group.appendChild(arrowhead);
    group.appendChild(text);
    svg.appendChild(group);
  }

  // Crear element SVG genèric
  crearElement(tag, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  }

  // Obtenir color de vora segons color de bola
  getStrokeColor(fillColor) {
    const colors = {
      '#ffffff': '#cccccc',
      '#ffd700': '#ccaa00',
      '#dc143c': '#aa0020'
    };
    return colors[fillColor] || '#333';
  }

  // Coordenades de taula a píxels
  taulaAPx(tx, ty) {
    // tx, ty són de 0-100 (percentatge de la taula)
    return {
      x: this.margin + (tx / 100) * this.tableWidth,
      y: this.margin + (ty / 100) * this.tableHeight
    };
  }

  // Píxels a coordenades de taula
  pxATaula(px, py) {
    return {
      x: ((px - this.margin) / this.tableWidth) * 100,
      y: ((py - this.margin) / this.tableHeight) * 100
    };
  }
}

// Exportar classe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaulaBillar;
}
