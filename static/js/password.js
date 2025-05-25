function checkPassword(correctPassword) {
    const password = prompt('Enter the password to view client details:');
    if (password === correctPassword) {
      document.getElementById('content').style.display = 'block';
    } else {
      document.getElementById('error').style.display = 'block';
    }
  }