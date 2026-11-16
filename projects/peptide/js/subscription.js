/* ========================================
   SUBSCRIPTION BOX BUILDER JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const selectedItems = [];
  const maxItems = 4;

  const countEl = document.getElementById('picked-count');
  const slotsList = document.getElementById('box-slots-list');
  const submitBtn = document.getElementById('btn-box-submit');
  const addButtons = document.querySelectorAll('.btn-add-compound');
  const searchInput = document.getElementById('compound-search');
  const filterButtons = document.querySelectorAll('.box-filters .filter-btn');
  const compoundCards = document.querySelectorAll('.compound-card');

  // Add Item to Box
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.compound-card');
      const name = card.dataset.name;
      const price = card.dataset.price;

      if (selectedItems.length >= maxItems) {
        alert('You have already picked 4 items. Remove an item to add another.');
        return;
      }

      selectedItems.push({ name, price });
      renderSlots();
    });
  });

  function renderSlots() {
    countEl.textContent = `${selectedItems.length} of ${maxItems} picked`;

    const slots = slotsList.querySelectorAll('.box-slot');
    slots.forEach((slot, index) => {
      if (selectedItems[index]) {
        slot.className = 'box-slot filled';
        slot.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="slot-number">${index + 1}</div>
            <div class="slot-content">${selectedItems[index].name} ($${selectedItems[index].price})</div>
          </div>
          <button class="btn-remove-slot" data-index="${index}" title="Remove">✕</button>
        `;
      } else {
        slot.className = 'box-slot empty';
        slot.innerHTML = `
          <div class="slot-number">${index + 1}</div>
          <div class="slot-content">${index === selectedItems.length ? 'Pick your next item' : 'Empty slot'}</div>
        `;
      }
    });

    // Attach remove handlers
    const removeButtons = slotsList.querySelectorAll('.btn-remove-slot');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        selectedItems.splice(idx, 1);
        renderSlots();
      });
    });

    // Submit button state
    if (selectedItems.length === maxItems) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Proceed to Checkout →';
      submitBtn.style.background = '#059669';
    } else {
      submitBtn.disabled = true;
      submitBtn.textContent = `Pick ${maxItems - selectedItems.length} more to start`;
      submitBtn.style.background = '';
    }
  }

  // Filter functionality
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      compoundCards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      compoundCards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const type = (card.querySelector('.compound-type')?.textContent || '').toLowerCase();
        if (name.includes(term) || type.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Size option button toggles
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = this.closest('.size-options');
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
