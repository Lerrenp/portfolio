<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const canvasRef = ref(null);
let flock = null;

class Flock {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.birds = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.color = '#00658f';
    this.wingColor = '#001e2e';

    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
    window.addEventListener('themechange', () => this.updateColors());

    this.updateColors();
    this.spawn();
    this.tick = this.tick.bind(this);
    this.raf = requestAnimationFrame(this.tick);

    // 派发数量事件给 SiteHeader
    this.emitCount();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
  }

  emitCount() {
    window.dispatchEvent(new CustomEvent('flock-count', { detail: { count: this.birds.length } }));
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.width = w;
    this.height = h;
    const target = Math.max(28, Math.min(80, Math.round((w * h) / 22000)));
    this.resizeFlock(target);
    this.emitCount();
  }

  resizeFlock(target) {
    while (this.birds.length < target) this.birds.push(this.makeBird());
    while (this.birds.length > target) this.birds.pop();
  }

  updateColors() {
    const styles = getComputedStyle(document.documentElement);
    this.color = styles.getPropertyValue('--bird-color').trim() || '#00658f';
    this.wingColor = styles.getPropertyValue('--bird-wing').trim() || '#001e2e';
  }

  spawn() {
    const w = this.width, h = this.height;
    const initial = Math.max(28, Math.min(80, Math.round((w * h) / 22000)));
    for (let i = 0; i < initial; i++) this.birds.push(this.makeBird());
  }

  makeBird() {
    const w = this.width, h = this.height;
    const speed = 1.2 + Math.random() * 1.6;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 4,
      flapPhase: Math.random() * Math.PI * 2,
      flapSpeed: 0.18 + Math.random() * 0.1,
      maxSpeed: 2.6 + Math.random() * 1.2,
    };
  }

  tick() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    for (const b of this.birds) this.update(b);
    this.drawAll(ctx);
    this.raf = requestAnimationFrame(this.tick);
  }

  update(b) {
    const w = this.width, h = this.height;
    let alignX = 0, alignY = 0, cohX = 0, cohY = 0, sepX = 0, sepY = 0;
    let count = 0;
    const perception = 80;

    for (const o of this.birds) {
      if (o === b) continue;
      const dx = o.x - b.x, dy = o.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < perception && dist > 0) {
        alignX += o.vx; alignY += o.vy;
        cohX += o.x; cohY += o.y;
        if (dist < 22) {
          const push = (22 - dist) / 22;
          sepX -= (dx / dist) * push * 1.4;
          sepY -= (dy / dist) * push * 1.4;
        }
        count++;
      }
    }

    if (count > 0) {
      alignX /= count; alignY /= count;
      cohX = cohX / count - b.x;
      cohY = cohY / count - b.y;
      b.vx += alignX * 0.02 + cohX * 0.005 + sepX;
      b.vy += alignY * 0.02 + cohY * 0.005 + sepY;
    }

    if (this.mouse.active) {
      const mdx = this.mouse.x - b.x;
      const mdy = this.mouse.y - b.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 220 && md > 0) {
        const attract = 0.08;
        b.vx += (mdx / md) * attract;
        b.vy += (mdy / md) * attract;
        if (md < 70) {
          const push = (70 - md) / 70;
          b.vx -= (mdx / md) * push * 0.9;
          b.vy -= (mdy / md) * push * 0.9;
        }
      }
    }

    const margin = 60;
    if (b.x < margin) b.vx += (margin - b.x) / margin * 0.4;
    if (b.x > w - margin) b.vx -= (b.x - (w - margin)) / margin * 0.4;
    if (b.y < margin) b.vy += (margin - b.y) / margin * 0.4;
    if (b.y > h - margin) b.vy -= (b.y - (h - margin)) / margin * 0.4;

    const sp = Math.hypot(b.vx, b.vy);
    if (sp > b.maxSpeed) {
      b.vx = (b.vx / sp) * b.maxSpeed;
      b.vy = (b.vy / sp) * b.maxSpeed;
    } else if (sp < 0.6) {
      b.vx += (Math.random() - 0.5) * 0.4;
      b.vy += (Math.random() - 0.5) * 0.4;
    }

    b.x += b.vx;
    b.y += b.vy;

    if (b.x < -20) b.x = w + 20;
    if (b.x > w + 20) b.x = -20;
    if (b.y < -20) b.y = h + 20;
    if (b.y > h + 20) b.y = -20;

    b.flapPhase += b.flapSpeed;
  }

  drawAll(ctx) {
    for (const b of this.birds) {
      const angle = Math.atan2(b.vy, b.vx);
      const flap = Math.sin(b.flapPhase) * 0.55;
      const size = b.size;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(size * 1.4, 0);
      ctx.quadraticCurveTo(size * 0.6, -size * 0.45, -size * 1.1, 0);
      ctx.quadraticCurveTo(size * 0.6, size * 0.45, size * 1.4, 0);
      ctx.fill();

      ctx.fillStyle = this.wingColor;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-size * 0.3, -size * (0.9 + flap), -size * 1.1, -size * 0.1);
      ctx.quadraticCurveTo(-size * 0.5, -size * 0.05, 0, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-size * 0.3, size * (0.9 - flap), -size * 1.1, size * 0.1);
      ctx.quadraticCurveTo(-size * 0.5, size * 0.05, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }
}

onMounted(() => {
  try {
    flock = new Flock(canvasRef.value);
  } catch (err) {
    console.warn('[portfolio] 鸟群动画初始化失败:', err);
  }
});

onBeforeUnmount(() => {
  if (flock) flock.destroy();
});
</script>

<template>
  <canvas id="flock-canvas" ref="canvasRef" aria-hidden="true"></canvas>
</template>
