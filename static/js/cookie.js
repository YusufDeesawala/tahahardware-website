function getCookie(name) {
    console.log('Checking cookies for:', name);
    let cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].trim();
      if (cookiePair.startsWith(name + '=')) {
        let value = cookiePair.substring(name.length + 1);
        console.log('Found cookie:', name, '=', value);
        return value;
      }
    }
    console.log('No cookie found for:', name);
    return null;
  }
  
  function setCookie(name, value, days) {
    console.log('Setting cookie:', name, '=', value);
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }
  
  function acceptCookies() {
    console.log('Accept cookies triggered');
    let email = prompt('Please enter your email address:');
    if (!email || !email.includes('@')) {
      console.error('Invalid email provided');
      alert('Please provide a valid email address.');
      return;
    }
  
    if (navigator.geolocation) {
      console.log('Attempting geolocation');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let location = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
          console.log('Geolocation success:', location);
          storeUser(email, location);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          let location = prompt('Please enter your location (e.g., City, Country):');
          if (location) {
            storeUser(email, location);
          } else {
            console.error('No location provided');
            alert('Location is required.');
          }
        },
        { timeout: 10000 }
      );
    } else {
      console.log('Geolocation not supported');
      let location = prompt('Please enter your location (e.g., City, Country):');
      if (location) {
        storeUser(email, location);
      } else {
        console.error('No location provided');
        alert('Location is required.');
      }
    }
  }
  
  function storeUser(email, location) {
    console.log('Storing user:', { email_address: email, location });
    fetch('/store-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, location: location })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('User stored:', data);
        setCookie('cookieConsent', 'accepted', 30);
        document.getElementById('cookieModal').style.display = 'none';
      })
      .catch(error => {
        console.error('Error storing user:', error);
        alert('Failed to save data. Please try again.');
      });
  }
  
  function rejectCookies() {
    console.log('Reject cookies triggered');
    setCookie('cookieConsent', 'declined', 30);
    document.getElementById('cookieModal').style.display = 'none';
  }
  
  window.addEventListener('load', function() {
    console.log('Page loaded, checking cookie consent');
    let consent = getCookie('cookieConsent');
    let modal = document.getElementById('cookieModal');
    if (!consent && modal) {
      console.log('No consent cookie, showing modal');
      modal.style.display = 'flex';
    } else {
      console.log('Consent cookie exists or modal not found:', consent);
    }
  });