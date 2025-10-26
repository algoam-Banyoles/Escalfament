// ============================================
// MODE D'ESTUDI INTERACTIU
// ============================================

class InteractiveStudy {
  constructor(exerciseManager) {
    this.exerciseManager = exerciseManager;
    this.currentStep = 0;
    this.isPlaying = false;
  }

  // Mode pas a pas
  startStepByStep(exerciseId) {
    const exercise = this.exerciseManager.exercises.find(ex => ex.id === exerciseId);
    if (!exercise || !exercise.diagram || !exercise.diagram.trajectoria) return;

    this.currentStep = 0;
    const trajectoria = exercise.diagram.trajectoria;

    // Crear modal per mode pas a pas
    this.createStepByStepModal(exercise);
  }

  // Crear modal de mode pas a pas
  createStepByStepModal(exercise) {
    const modal = document.createElement('div');
    modal.className = 'modal modal-step-by-step active';
    modal.id = 'step-by-step-modal';

    const trajectoria = exercise.diagram.trajectoria;
    const totalSteps = trajectoria.length - 1;

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 1000px;">
        <div class="modal-header">
          <h2>📚 Mode Estudi: Exercici #${exercise.id}</h2>
          <button class="modal-close" onclick="document.getElementById('step-by-step-modal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div id="step-diagram"></div>
          <div class="step-controls" style="margin-top: 1rem; text-align: center;">
            <p style="font-weight: bold; margin-bottom: 0.5rem;">
              Pas <span id="current-step">1</span> de ${totalSteps}
            </p>
            <div class="progress-bar" style="margin-bottom: 1rem;">
              <div id="step-progress" class="progress-fill" style="width: 0%;"></div>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-secondary" onclick="interactiveStudy.previousStep()">⏮ Anterior</button>
              <button class="btn btn-primary" id="play-pause-btn" onclick="interactiveStudy.togglePlayPause()">▶ Reproduir</button>
              <button class="btn btn-secondary" onclick="interactiveStudy.nextStep()">Següent ⏭</button>
            </div>
            <p id="step-description" style="margin-top: 1rem; padding: 0.75rem; background: #f5f5f5; border-radius: 4px; min-height: 50px;">
              Posició inicial
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Generar diagrama inicial
    this.showStep(exercise, 0);

    // Tancar en clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        this.isPlaying = false;
      }
    });
  }

  // Mostrar pas específic
  showStep(exercise, step) {
    if (!exercise.diagram || !exercise.diagram.trajectoria) return;

    const trajectoria = exercise.diagram.trajectoria;
    const totalSteps = trajectoria.length - 1;

    if (step < 0) step = 0;
    if (step >= totalSteps) step = totalSteps - 1;

    this.currentStep = step;

    // Actualitzar UI
    const currentStepEl = document.getElementById('current-step');
    if (currentStepEl) {
      currentStepEl.textContent = step + 1;
    }

    const progress = ((step + 1) / totalSteps) * 100;
    const progressBar = document.getElementById('step-progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Generar diagrama amb trajectòria parcial
    const partialExercise = {
      ...exercise,
      diagram: {
        ...exercise.diagram,
        trajectoria: trajectoria.slice(0, step + 2)
      }
    };

    const diagramGenerator = new DiagramGenerator();
    const diagram = diagramGenerator.generarDiagrama(partialExercise);

    const container = document.getElementById('step-diagram');
    if (container) {
      container.innerHTML = '';
      container.appendChild(diagram);
    }

    // Actualitzar descripció del pas
    this.updateStepDescription(exercise, step);
  }

  // Actualitzar descripció del pas
  updateStepDescription(exercise, step) {
    const descriptions = this.generateStepDescriptions(exercise);
    const descEl = document.getElementById('step-description');
    if (descEl && descriptions[step]) {
      descEl.textContent = descriptions[step];
    }
  }

  // Generar descripcions per cada pas
  generateStepDescriptions(exercise) {
    const trajectoria = exercise.diagram.trajectoria;
    const bandes = exercise.diagram.bandes || [];
    const descriptions = [];

    descriptions.push('🎯 Posició inicial de les boles');

    for (let i = 1; i < trajectoria.length - 1; i++) {
      if (i <= bandes.length) {
        descriptions.push(`${i}ª banda: La bola blanca impacta a la ${bandes[i-1]}ª banda`);
      } else {
        descriptions.push(`Trajectòria cap a la bola objectiu`);
      }
    }

    descriptions.push('✅ La bola blanca arriba a la bola objectiu');

    return descriptions;
  }

  // Pas anterior
  previousStep() {
    const modal = document.getElementById('step-by-step-modal');
    if (!modal) return;

    // Trobar exercici actual
    const exercise = this.exerciseManager.exercises[0]; // Simplificat
    this.showStep(exercise, this.currentStep - 1);
  }

  // Següent pas
  nextStep() {
    const modal = document.getElementById('step-by-step-modal');
    if (!modal) return;

    const exercise = this.exerciseManager.exercises[0]; // Simplificat
    this.showStep(exercise, this.currentStep + 1);
  }

  // Toggle reproduir/pausar
  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    const btn = document.getElementById('play-pause-btn');
    if (btn) {
      btn.textContent = this.isPlaying ? '⏸ Pausar' : '▶ Reproduir';
    }

    if (this.isPlaying) {
      this.playAnimation();
    }
  }

  // Reproduir animació
  playAnimation() {
    if (!this.isPlaying) return;

    const exercise = this.exerciseManager.exercises[0]; // Simplificat
    const trajectoria = exercise.diagram.trajectoria;

    if (this.currentStep >= trajectoria.length - 2) {
      this.currentStep = 0;
    }

    this.showStep(exercise, this.currentStep);
    this.currentStep++;

    if (this.isPlaying) {
      setTimeout(() => this.playAnimation(), 1500);
    }
  }
}

// Exportar classe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveStudy;
}
