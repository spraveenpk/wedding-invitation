"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  tw: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isCoarse =
      window.matchMedia("(pointer: coarse)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isCoarse ? 1 : 1.5);
    let particles: Particle[] = [];
    let animationId = 0;

    const getCount = () => {
      const area = window.innerWidth * window.innerHeight;
      const calc = Math.round(area / 16000);
      return Math.max(24, Math.min(isCoarse ? 45 : 110, calc));
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getCount();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.18,
        a: 0.15 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min(64, time - lastTime);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.tw += 0.02;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pulse = 0.7 + 0.3 * Math.sin(p.tw);
        const currentAlpha = Math.max(0.05, Math.min(0.8, p.a * pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 92, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[40]"
    />
  );
}
