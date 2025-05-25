function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
      button.classList.remove('active');
    });
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    // Highlight selected tab button
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }
  
  function setActiveTab(tabId) {
    showTab(tabId);
  }
  
  function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });