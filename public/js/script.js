// Scratch card functionality
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Fill the canvas with a scratch-off layer
ctx.fillStyle = '#c0c0c0';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set composite operation to erase
ctx.globalCompositeOperation = 'destination-out';

// Variables for scratching
let isScratching = false;

// Mouse events for scratching
canvas.addEventListener('mousedown', startScratching);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', stopScratching);
canvas.addEventListener('mouseout', stopScratching);

// Touch events for mobile
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
    
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

// Load images from the images folder
async function loadImages() {
    try {
        const response = await fetch('/api/images');
        const images = await response.json();
        
        const gallery = document.getElementById('imageGallery');
        
        images.forEach(imageName => {
            const img = document.createElement('img');
            img.src = `images/${imageName}`;
            img.alt = 'Wedding memory';
            img.loading = 'lazy';
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error loading images:', error);
        // Fallback: show a message
        const gallery = document.getElementById('imageGallery');
        gallery.innerHTML = '<p>No images found. Add some to the images folder!</p>';
    }
}

// Load images when the page loads
window.addEventListener('load', loadImages);