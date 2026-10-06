import { useEffect, useRef } from 'react';

export function useNetworkCanvas(scrollProgressRef) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let lastWidth = 0;
    let isTabHidden = document.hidden;
    let isOffscreen = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node configuration
    const isMobile = () => window.innerWidth < 768;
    const getNodeCount = () => (isMobile() ? 32 : 64);
    const colors = [
      '#3b82f6', // blue
      '#8b5cf6', // violet
      '#22d3ee', // cyan
      '#60a5fa', // light blue
      '#a78bfa', // light violet
    ];

    let nodes = [];

    const initNodes = () => {
      const count = getNodeCount();
      nodes = [];
      for (let i = 0; i < count; i++) {
        const speed = (Math.random() * 0.45 + 0.25) * (isMobile() ? 0.7 : 1);
        const angle = Math.random() * Math.PI * 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          radius: Math.random() * 1.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
        });
      }
    };

    const resizeCanvas = (force = false) => {
      const currentWidth = window.innerWidth;
      // On mobile, ignore height-only resize events (caused by browser address bar toggle)
      if (!force && lastWidth === currentWidth && isMobile()) {
        return;
      }
      lastWidth = currentWidth;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize or clamp existing nodes within bounds
      if (nodes.length === 0 || force) {
        initNodes();
      } else {
        nodes.forEach((node) => {
          if (node.x > width) node.x = Math.random() * width;
          if (node.y > height) node.y = Math.random() * height;
        });
      }
    };

    resizeCanvas(true);

    // Mouse movement handler
    const onMouseMove = (e) => {
      if (isMobile()) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Handle visibility and intersection
    const onVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isOffscreen = !entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Resize event listener
    const onResize = () => {
      resizeCanvas(false);
    };
    window.addEventListener('resize', onResize);

    // Render static frame for prefers-reduced-motion
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      const baseDistance = 140;

      // Draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < baseDistance) {
            const alpha = (1 - dist / baseDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        observer.disconnect();
      };
    }

    // Animation Loop
    let lastTime = performance.now();

    const render = (time) => {
      animationFrameRef.current = requestAnimationFrame(render);

      if (isTabHidden || isOffscreen) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const progress = scrollProgressRef && typeof scrollProgressRef.current === 'number'
        ? scrollProgressRef.current
        : 0;

      // Scroll enhances connection distance and node speed slightly
      const speedMult = 1 + progress * 0.7;
      const connectionDist = 140 + progress * 25;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseRadius = 170;

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Drift
        n.x += n.vx * speedMult * 60 * dt;
        n.y += n.vy * speedMult * 60 * dt;

        // Bounce off bounds
        if (n.x < 0) {
          n.x = 0;
          n.vx = Math.abs(n.vx);
        } else if (n.x > width) {
          n.x = width;
          n.vx = -Math.abs(n.vx);
        }

        if (n.y < 0) {
          n.y = 0;
          n.vy = Math.abs(n.vy);
        } else if (n.y > height) {
          n.y = height;
          n.vy = -Math.abs(n.vy);
        }

        // Mouse gentle repulsion/attraction
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRadius && dist > 1) {
            const force = (1 - dist / mouseRadius) * 25;
            n.x += (dx / dist) * force * dt;
            n.y += (dy / dist) * force * dt;
          }
        }

        // Pulse
        n.pulse += n.pulseSpeed;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Subtle gradient line between node colors
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, nodes[i].color);
            grad.addColorStop(1, nodes[j].color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.15;
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, [scrollProgressRef]);

  return canvasRef;
}
