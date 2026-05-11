// Scratch card functionality
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Fill canvas with scratch layer (silver/gray with some texture)
ctx.fillStyle = '#C0C0C0';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add some texture to the scratch layer
ctx.fillStyle = 'rgba(160, 160, 160, 0.3)';
for (let i = 0; i < 50; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 3 + 1;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Set composite operation
ctx.globalCompositeOperation = 'destination-out';

let isScratching = false;

// Mouse events
canvas.addEventListener('mousedown', startScratching);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', stopScratching);
canvas.addEventListener('mouseout', stopScratching);

// Touch events
canvas.addEventListener('touchstart', startScratching);
canvas.addEventListener('touchmove', scratch);
canvas.addEventListener('touchend', stopScratching);

function startScratching(e) {
  isScratching = true;
  scratch(e);
}

function stopScratching() {
  isScratching = false;
}

function scratch(e) {
  if (!isScratching) return;
  
  e.preventDefault();
  
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  let x, y;
  if (e.touches) {
    x = (e.touches[0].clientX - rect.left) * scaleX;
    y = (e.touches[0].clientY - rect.top) * scaleY;
  } else {
    x = (e.clientX - rect.left) * scaleX;
    y = (e.clientY - rect.top) * scaleY;
  }
  
  // Draw larger brush for better scratching experience
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
  
  // Check if enough has been scratched to reveal the date
  checkScratchProgress();
}

function checkScratchProgress() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let scratchedPixels = 0;
  
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) { // Alpha channel
      scratchedPixels++;
    }
  }
  
  const totalPixels = canvas.width * canvas.height;
  const scratchedPercentage = (scratchedPixels / totalPixels) * 100;
  
  if (scratchedPercentage > 60) {
    // Reveal the date with animation
    const dateDisplay = document.querySelector('.date-display');
    dateDisplay.style.opacity = '1';
    dateDisplay.style.transform = 'scale(1)';
    canvas.style.opacity = '0.3';
    
    // Add sparkle effect
    createSparkles();
  }
}

function createSparkles() {
  const container = document.querySelector('.scratch-container');
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 3000);
    }, i * 100);
  }
}

// Countdown timer functionality
function setupCountdown() {
  const weddingDate = new Date(config.weddingDate);
  const countdownElement = document.getElementById('countdownTimer');
  
  function updateCountdown() {
    const now = new Date();
    const timeLeft = weddingDate - now;
    
    if (timeLeft <= 0) {
      countdownElement.innerHTML = '<div style="text-align: center; color: var(--champagne-gold); font-size: 1.5rem;">The big day has arrived!</div>';
      return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupCountdown();
});