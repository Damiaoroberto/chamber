// Helper for calculating the time since the last visit
const msToDays = 86400000; // Milliseconds per day

const visitMessageArea = document.getElementById('visit-message-area');
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Get current time
const today = Date.now();

// Function to calculate the number of days since the last visit
function checkVisit() {
  const lastVisit = localStorage.getItem('lastVisit');
  
  if (!lastVisit) {
    // First time visit
    visitMessageArea.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const timeDiff = today - lastVisitDate.getTime();
    const daysDiff = Math.floor(timeDiff / msToDays);

    if (daysDiff < 1) {
      visitMessageArea.innerHTML = "<p>Back so soon! Awesome!</p>";
    } else {
      const dayWord = daysDiff === 1 ? 'day' : 'days';
      visitMessageArea.innerHTML = `<p>You last visited ${daysDiff} ${dayWord} ago.</p>`;
    }
  }

  // Store the current visit date
  localStorage.setItem('lastVisit', today);
}

// Load discover cards from JSON data
async function loadDiscoverCards() {
  const response = await fetch('data/discover.json');
  const data = await response.json();
  
  const grid = document.getElementById('discover-grid');
  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <h2>${item.title}</h2>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Initialize the page
function init() {
  checkVisit();
  loadDiscoverCards();
}

// Call the init function on page load
window.onload = init;
