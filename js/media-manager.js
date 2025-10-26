// ============================================
// GESTOR DE MITJANS (Imatges, Vídeos, etc.)
// ============================================

class MediaManager {
  constructor() {
    this.cache = new Map();
    this.lazyLoadObserver = null;
    this.initLazyLoading();
  }

  // Inicialitzar lazy loading per diagrames
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.lazyLoadObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadDiagram(entry.target);
              this.lazyLoadObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px'
        }
      );
    }
  }

  // Carregar diagrama quan sigui visible
  loadDiagram(element) {
    const exerciseId = element.dataset.exerciseId;
    if (!exerciseId) return;

    // Aquí pots carregar recursos addicionals si cal
    element.classList.add('loaded');
  }

  // Observar elements per lazy loading
  observe(elements) {
    if (!this.lazyLoadObserver) return;

    elements.forEach(el => {
      this.lazyLoadObserver.observe(el);
    });
  }

  // Cachear imatge
  async cacheImage(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      this.cache.set(url, objectURL);
      return objectURL;
    } catch (error) {
      console.error('Error cacheant imatge:', error);
      return null;
    }
  }

  // Generar miniatura d'un diagrama SVG
  generateThumbnail(svg, width = 200, height = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = url;
    });
  }

  // Netejar cache
  clearCache() {
    this.cache.forEach(url => URL.revokeObjectURL(url));
    this.cache.clear();
  }
}

// Exportar classe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MediaManager;
}
