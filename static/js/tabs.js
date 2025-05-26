function showTab(tabId) {
  // Remove active class from all buttons and contents
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    content.setAttribute('aria-hidden', 'true');
  });

  // Add active class to selected button and content
  const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  const selectedContent = document.getElementById(tabId);
  if (selectedButton && selectedContent) {
    selectedButton.classList.add('active');
    selectedButton.setAttribute('aria-selected', 'true');
    selectedContent.classList.add('active');
    selectedContent.setAttribute('aria-hidden', 'false');
  }

  // Update URL hash
  window.history.pushState(null, null, `#${tabId}`);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-content').focus();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
}

// Handle tab selection from URL hash on page load
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showTab(hash);
  } else {
    showTab('brushes'); // Default tab
  }
});