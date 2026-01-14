// Starfield Engine
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let starArray = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.2 + 0.05;
    this.alpha = Math.random();
    this.blink = Math.random() * 0.02;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    if (this.y < 0) this.y = canvas.height;
    this.alpha += this.blink;
    if (this.alpha > 1 || this.alpha < 0) this.blink *= -1;
  }
}

function initStars() {
  starArray = [];
  for (let i = 0; i < 250; i++) starArray.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  starArray.forEach((star) => {
    star.draw();
    star.update();
  });
  requestAnimationFrame(animate);
}

// Mouse Sparkle (Enhanced)
window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = x + "px";
  s.style.top = y + "px";
  document.body.appendChild(s);

  const destX = x + (Math.random() - 0.5) * 60;
  const destY = y + (Math.random() - 0.5) * 60;

  s.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`,
        opacity: 0,
      },
    ],
    { duration: 1500, easing: "ease-out" }
  ).onfinish = () => s.remove();
}

// Reveal on Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function unlock() {
  const overlay = document.getElementById("intro-overlay");
  overlay.style.opacity = "0";
  overlay.style.transform = "scale(1.1)";
  setTimeout(() => overlay.remove(), 2500);
}

window.addEventListener("resize", resize);
resize();
initStars();
animate();

