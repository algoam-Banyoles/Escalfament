// ============================================
// CLASSE PRINCIPAL - ExerciseManager
// ============================================
class ExerciseManager {
  constructor() {
    this.exercises = [];
    this.currentFilter = 'all';
    this.currentExerciseId = null;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.exerciseStats = {};

    this.init();
  }

  // Inicialització
  init() {
    this.loadExercises();
    this.loadStateFromStorage();
    this.renderExercises();
    this.attachEventListeners();
    this.updateProgress();
    this.checkForRandomStart();
  }

  // Carregar exercicis des de exercises.js
  loadExercises() {
    this.exercises = EXERCISES_DATA.map(ex => ({ ...ex }));
  }

  // Carregar estat des de localStorage
  loadStateFromStorage() {
    const savedState = localStorage.getItem('exerciseState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.exercises = this.exercises.map(ex => {
        const saved = state.exercises.find(s => s.id === ex.id);
        return saved ? { ...ex, completed: saved.completed, notes: saved.notes || '' } : ex;
      });
    }

    const savedStats = localStorage.getItem('exerciseStats');
    if (savedStats) {
      this.exerciseStats = JSON.parse(savedStats);
    }
  }

  // Guardar estat a localStorage
  saveStateToStorage() {
    const state = {
      exercises: this.exercises.map(ex => ({
        id: ex.id,
        completed: ex.completed,
        notes: ex.notes
      })),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('exerciseState', JSON.stringify(state));
    localStorage.setItem('exerciseStats', JSON.stringify(this.exerciseStats));
  }

  // Renderitzar exercicis
  renderExercises() {
    const container = document.getElementById('exercises-container');
    container.innerHTML = '';

    const filtered = this.getFilteredExercises();

    filtered.forEach(exercise => {
      const card = this.createExerciseCard(exercise);
      container.appendChild(card);
    });

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: white; padding: 2rem;">No hi ha exercicis per mostrar.</p>';
    }
  }

  // Crear targeta d'exercici
  createExerciseCard(exercise) {
    const card = document.createElement('div');
    card.className = `exercise-card ${exercise.completed ? 'completed' : ''}`;
    card.dataset.exerciseId = exercise.id;

    const stars = this.generateStars(exercise.difficulty);
    const categoryText = this.getCategoryText(exercise.category);

    // Ruta de la imatge (si existeix)
    const imagePath = exercise.image || `images/exercicis/exercici-${String(exercise.id).padStart(2, '0')}.jpg`;

    card.innerHTML = `
      <div class="exercise-header">
        <div class="exercise-number">#${exercise.id}</div>
        <div class="difficulty-stars">${stars}</div>
      </div>
      <h3 class="exercise-title">${exercise.title}</h3>
      <div class="diagram-wrapper">
        <img src="${imagePath}"
             alt="Diagrama exercici ${exercise.id}"
             class="exercise-image"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="image-placeholder" style="display: none;">
          <p>📊 Diagrama de l'exercici #${exercise.id}</p>
          <small>Imatge pendent: ${imagePath}</small>
        </div>
      </div>
      <p class="exercise-description">${exercise.description}</p>
      <span class="category-badge">${categoryText}</span>
      <div class="exercise-actions">
        <button class="btn ${exercise.completed ? 'btn-success' : 'btn-primary'}"
                onclick="exerciseManager.toggleComplete(${exercise.id})">
          ${exercise.completed ? '✓ Completat' : 'Marcar completat'}
        </button>
      </div>
      ${exercise.completed ? '<div class="completed-badge">✓ Fet</div>' : ''}
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn')) {
        this.openExerciseModal(exercise.id);
      }
    });

    return card;
  }

  // Generar estrelles de dificultat
  generateStars(difficulty) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="star ${i <= difficulty ? '' : 'empty'}">★</span>`;
    }
    return stars;
  }

  // Obtenir text de categoria
  getCategoryText(category) {
    const categories = {
      'comprovacio': 'Comprovació',
      'sense_efecte': 'Sense efecte',
      'contra_efecte': 'Contra efecte',
      'altres': 'Altres'
    };
    return categories[category] || category;
  }

  // Obtenir exercicis filtrats
  getFilteredExercises() {
    if (this.currentFilter === 'all') {
      return this.exercises;
    }
    return this.exercises.filter(ex => ex.category === this.currentFilter);
  }

  // Canviar estat completat
  toggleComplete(id) {
    const exercise = this.exercises.find(ex => ex.id === id);
    if (exercise) {
      exercise.completed = !exercise.completed;

      // Actualitzar estadístiques
      if (!this.exerciseStats[id]) {
        this.exerciseStats[id] = { timesCompleted: 0, lastCompleted: null };
      }

      if (exercise.completed) {
        this.exerciseStats[id].timesCompleted++;
        this.exerciseStats[id].lastCompleted = new Date().toISOString();
      }

      this.saveStateToStorage();
      this.renderExercises();
      this.updateProgress();

      if (exercise.completed) {
        this.celebrateCompletion();
        this.addHapticFeedback();
      }
    }
  }

  // Celebració quan es completa un exercici
  celebrateCompletion() {
    const card = document.querySelector(`[data-exercise-id="${this.currentExerciseId}"]`);
    if (card) {
      card.classList.add('pulse');
      setTimeout(() => card.classList.remove('pulse'), 500);
    }
  }

  // Actualitzar barra de progrés
  updateProgress() {
    const completed = this.exercises.filter(ex => ex.completed).length;
    const total = this.exercises.length;
    const percentage = (completed / total) * 100;

    document.getElementById('progress-text').textContent =
      `${completed} de ${total} exercicis completats`;
    document.getElementById('progress-fill').style.width = `${percentage}%`;

    if (completed === total) {
      this.showCompletionMessage();
    }
  }

  // Missatge de finalització
  showCompletionMessage() {
    setTimeout(() => {
      alert('🎉 Felicitats! Has completat tots els 21 exercicis d\'escalfament!');
    }, 500);
  }

  // Obrir modal d'exercici
  openExerciseModal(id) {
    this.currentExerciseId = id;
    const exercise = this.exercises.find(ex => ex.id === id);
    if (!exercise) return;

    const modal = document.getElementById('exercise-modal');
    document.getElementById('modal-title').textContent = `Exercici #${exercise.id} - ${exercise.title}`;
    document.getElementById('modal-description').textContent = exercise.description;
    document.getElementById('modal-category').textContent = this.getCategoryText(exercise.category);
    document.getElementById('modal-difficulty').innerHTML = this.generateStars(exercise.difficulty);
    document.getElementById('exercise-notes').value = exercise.notes || '';

    // Afegir notes visuals si n'hi ha
    if (exercise.visualNotes) {
      const visualNotesEl = document.createElement('p');
      visualNotesEl.className = 'visual-notes';
      visualNotesEl.innerHTML = `<strong>💡 Notes visuals:</strong> ${exercise.visualNotes}`;
      visualNotesEl.style.marginTop = '1rem';
      visualNotesEl.style.padding = '0.75rem';
      visualNotesEl.style.background = '#e8f5e9';
      visualNotesEl.style.borderRadius = '4px';
      visualNotesEl.style.fontSize = '0.9rem';

      const modalBody = modal.querySelector('.modal-body');
      const existingNotes = modalBody.querySelector('.visual-notes');
      if (existingNotes) {
        existingNotes.replaceWith(visualNotesEl);
      } else {
        modalBody.insertBefore(visualNotesEl, modalBody.querySelector('.modal-meta'));
      }
    }

    const completeBtn = document.getElementById('modal-complete');
    completeBtn.textContent = exercise.completed ? '✓ Completat' : 'Marcar com completat';
    completeBtn.className = `btn ${exercise.completed ? 'btn-success' : 'btn-primary'}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Tancar modal
  closeModal(modalId = 'exercise-modal') {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Guardar notes si és el modal d'exercici
    if (modalId === 'exercise-modal' && this.currentExerciseId) {
      const notes = document.getElementById('exercise-notes').value;
      const exercise = this.exercises.find(ex => ex.id === this.currentExerciseId);
      if (exercise) {
        exercise.notes = notes;
        this.saveStateToStorage();
      }
    }
  }

  // Navegació modal - anterior
  previousExercise() {
    if (!this.currentExerciseId) return;
    const newId = this.currentExerciseId > 1 ? this.currentExerciseId - 1 : this.exercises.length;
    this.closeModal();
    setTimeout(() => this.openExerciseModal(newId), 100);
  }

  // Navegació modal - següent
  nextExercise() {
    if (!this.currentExerciseId) return;
    const newId = this.currentExerciseId < this.exercises.length ? this.currentExerciseId + 1 : 1;
    this.closeModal();
    setTimeout(() => this.openExerciseModal(newId), 100);
  }

  // Exercici aleatori
  randomExercise() {
    const randomId = Math.floor(Math.random() * this.exercises.length) + 1;
    this.openExerciseModal(randomId);
  }

  // Comprovar si s'ha d'obrir un exercici aleatori a l'inici
  checkForRandomStart() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('random') === 'true') {
      this.randomExercise();
    }
  }

  // Filtrar exercicis
  filterExercises(filter) {
    this.currentFilter = filter;
    this.renderExercises();

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  }

  // Reset de tot el progrés
  resetProgress() {
    if (confirm('Estàs segur que vols esborrar tot el progrés? Aquesta acció no es pot desfer.')) {
      this.exercises.forEach(ex => {
        ex.completed = false;
        ex.notes = '';
      });
      this.saveStateToStorage();
      this.renderExercises();
      this.updateProgress();
      alert('Progrés esborrat correctament.');
    }
  }

  // Mostrar estadístiques
  showStats() {
    const completed = this.exercises.filter(ex => ex.completed).length;
    const total = this.exercises.length;
    const percentage = Math.round((completed / total) * 100);

    const byCategory = {};
    this.exercises.forEach(ex => {
      if (!byCategory[ex.category]) {
        byCategory[ex.category] = { total: 0, completed: 0 };
      }
      byCategory[ex.category].total++;
      if (ex.completed) byCategory[ex.category].completed++;
    });

    // Exercicis més practicats
    const mostPracticed = Object.entries(this.exerciseStats)
      .sort((a, b) => b[1].timesCompleted - a[1].timesCompleted)
      .slice(0, 5)
      .map(([id, stats]) => {
        const exercise = this.exercises.find(ex => ex.id === parseInt(id));
        return { exercise, stats };
      })
      .filter(item => item.exercise);

    let statsHTML = `
      <div style="padding: 1rem;">
        <h3>📊 Resum General</h3>
        <p><strong>Exercicis completats:</strong> ${completed} / ${total} (${percentage}%)</p>

        <h3 style="margin-top: 2rem;">📈 Per Categoria</h3>
    `;

    for (const [category, data] of Object.entries(byCategory)) {
      const catPercentage = Math.round((data.completed / data.total) * 100);
      statsHTML += `
        <p><strong>${this.getCategoryText(category)}:</strong>
        ${data.completed} / ${data.total} (${catPercentage}%)</p>
      `;
    }

    if (mostPracticed.length > 0) {
      statsHTML += '<h3 style="margin-top: 2rem;">🏆 Exercicis més practicats</h3>';
      mostPracticed.forEach(({ exercise, stats }) => {
        statsHTML += `
          <p><strong>#${exercise.id} ${exercise.title}:</strong>
          ${stats.timesCompleted} vegades</p>
        `;
      });
    }

    statsHTML += `
      <div style="margin-top: 2rem;">
        <button class="btn btn-primary" onclick="exerciseManager.exportData()" style="width: 100%; margin-bottom: 0.5rem;">
          📤 Exportar dades
        </button>
        <button class="btn btn-secondary" onclick="document.getElementById('import-file').click()" style="width: 100%;">
          📥 Importar dades
        </button>
        <input type="file" id="import-file" accept=".json" style="display: none;" onchange="exerciseManager.importData(event)">
      </div>
    </div>`;

    document.getElementById('stats-content').innerHTML = statsHTML;
    document.getElementById('stats-modal').classList.add('active');
  }

  // Event listeners
  attachEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        this.closeModal(modal.id);
      });
    });

    // Modal background click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Modal navigation
    document.getElementById('modal-prev').addEventListener('click', () => this.previousExercise());
    document.getElementById('modal-next').addEventListener('click', () => this.nextExercise());
    document.getElementById('modal-complete').addEventListener('click', () => {
      this.toggleComplete(this.currentExerciseId);
      this.closeModal();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterExercises(btn.dataset.filter);
      });
    });

    // Bottom navigation
    document.getElementById('home-btn').addEventListener('click', () => {
      this.currentFilter = 'all';
      this.renderExercises();
      this.setActiveNav('home-btn');
    });

    document.getElementById('stats-btn').addEventListener('click', () => {
      this.showStats();
    });

    document.getElementById('settings-btn').addEventListener('click', () => {
      window.location.href = 'settings.html';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('exercise-modal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') this.previousExercise();
        if (e.key === 'ArrowRight') this.nextExercise();
        if (e.key === 'Escape') this.closeModal();
        if (e.key === ' ') {
          e.preventDefault();
          this.toggleComplete(this.currentExerciseId);
        }
      }
    });

    // Swipe gestures per modal
    const modal = document.getElementById('exercise-modal');
    modal.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    modal.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
  }

  setActiveNav(btnId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(btnId).classList.add('active');
  }

  // Haptic feedback (vibració) per mòbils
  addHapticFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  // Swipe gestures per modal
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
  }

  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe esquerra - següent
        this.nextExercise();
      } else {
        // Swipe dreta - anterior
        this.previousExercise();
      }
    }
  }

  // Exportar dades
  exportData() {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      exercises: this.exercises,
      stats: this.exerciseStats
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `escalfament-billar-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Dades exportades correctament!');
  }

  // Importar dades
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.version || !data.exercises) {
          throw new Error('Format de fitxer invàlid');
        }

        if (confirm('Això sobreescriurà totes les dades actuals. Vols continuar?')) {
          // Importar dades
          this.exercises = data.exercises;
          this.exerciseStats = data.stats || {};

          this.saveStateToStorage();
          this.renderExercises();
          this.updateProgress();

          alert('Dades importades correctament!');
          this.closeModal('stats-modal');
        }
      } catch (error) {
        alert('Error en importar el fitxer: ' + error.message);
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  }
}

// ============================================
// INICIALITZACIÓ
// ============================================
let exerciseManager;

document.addEventListener('DOMContentLoaded', () => {
  exerciseManager = new ExerciseManager();
});
