const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 400;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        // The smaller the z, the faster it moves (parallax)
        this.radius = (1 - this.z / canvas.width) * 2;
        this.alpha = (1 - this.z / canvas.width) + 0.1;
    }
    update() {
        // Slow drift upwards and to the left to simulate drifting through space
        this.y -= (1 - this.z / canvas.width) * 0.5;
        this.x -= (1 - this.z / canvas.width) * 0.2;
        
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
        if (this.x < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Sometimes make the stars red-tinted to match the theme!
        if(Math.random() > 0.98) {
             ctx.fillStyle = `rgba(229, 9, 20, ${this.alpha})`; // Accent Red
        } else {
             ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        }
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    // Semi-transparent black to leave trails
    ctx.fillStyle = "rgba(5, 5, 5, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animate);
}
animate();
