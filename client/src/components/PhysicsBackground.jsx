import { useEffect, useRef } from "react";

export default function PhysicsBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking
    const mouse = { x: width / 2, y: height / 2, active: false, radius: 180 };
    const smoothMouse = { x: width / 2, y: height / 2 };

    let cursorTrail = [];
    let shockwaves = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn glowing trail particles on mouse move
      for (let i = 0; i < 2; i++) {
        cursorTrail.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          radius: Math.random() * 3 + 1.5,
          color: Math.random() > 0.4 ? "#7ad7cf" : Math.random() > 0.5 ? "#f5c95c" : "#38bdf8",
          alpha: 1.0,
          decay: Math.random() * 0.03 + 0.015,
          rotation: Math.random() * Math.PI * 2
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // On Click: Quantum Shockwave Burst
    const handleClick = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 160,
        alpha: 0.9,
        color: Math.random() > 0.5 ? "#7ad7cf" : "#f5c95c"
      });

      // Particle burst
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16;
        const speed = Math.random() * 3 + 2;
        cursorTrail.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.5 + 2,
          color: i % 2 === 0 ? "#7ad7cf" : "#f5c95c",
          alpha: 1.0,
          decay: 0.025,
          rotation: angle
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Physics Elements Data
    let particles = [];
    let atoms = [];
    let formulas = [];
    let waves = [];

    const formulaList = [
      "E = mc²",
      "F = ma",
      "λ = h / p",
      "Δx · Δp ≥ ℏ/2",
      "iℏ (∂Ψ/∂t) = ĤΨ",
      "∇ × E = -∂B/∂t",
      "F = G(m₁m₂)/r²",
      "V = IR",
      "P = IV",
      "PV = nRT",
      "c = 1 / √(ε₀μ₀)",
      "T = 2π√(l/g)"
    ];

    function initElements() {
      // 1. Quantum Particles
      const particleCount = Math.floor((width * height) / 16000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? "#7ad7cf" : Math.random() > 0.5 ? "#f5c95c" : "#38bdf8",
          alpha: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseAngle: Math.random() * Math.PI * 2
        });
      }

      // 2. Rotating Atomic Orbits
      atoms = [
        {
          x: width * 0.18,
          y: height * 0.35,
          radius: Math.min(width, height) * 0.16,
          orbits: [
            { rx: 110, ry: 42, angle: 0.3, speed: 0.015, electronAngle: 0, color: "rgba(122, 215, 207, 0.4)" },
            { rx: 110, ry: 42, angle: -0.8, speed: -0.012, electronAngle: 2, color: "rgba(245, 201, 92, 0.4)" },
            { rx: 110, ry: 42, angle: 1.2, speed: 0.018, electronAngle: 4, color: "rgba(56, 189, 248, 0.4)" }
          ]
        },
        {
          x: width * 0.82,
          y: height * 0.68,
          radius: Math.min(width, height) * 0.18,
          orbits: [
            { rx: 130, ry: 50, angle: -0.4, speed: 0.014, electronAngle: 1, color: "rgba(122, 215, 207, 0.4)" },
            { rx: 130, ry: 50, angle: 0.7, speed: -0.016, electronAngle: 3, color: "rgba(245, 201, 92, 0.4)" },
            { rx: 130, ry: 50, angle: -1.3, speed: 0.011, electronAngle: 5, color: "rgba(168, 85, 247, 0.4)" }
          ]
        }
      ];

      // 3. Floating Formulas
      const formulaCount = Math.min(12, Math.floor(width / 140));
      formulas = [];
      for (let i = 0; i < formulaCount; i++) {
        formulas.push({
          text: formulaList[i % formulaList.length],
          x: Math.random() * (width - 150) + 75,
          y: Math.random() * (height - 100) + 50,
          vy: -(Math.random() * 0.25 + 0.1),
          vx: (Math.random() - 0.5) * 0.15,
          fontSize: Math.floor(Math.random() * 4 + 14),
          alpha: Math.random() * 0.35 + 0.15,
          fadeSpeed: Math.random() * 0.005 + 0.002,
          fadeDir: Math.random() > 0.5 ? 1 : -1
        });
      }

      // 4. Sine Waves
      waves = [
        { amplitude: 18, frequency: 0.008, speed: 0.02, phase: 0, y: height * 0.85, color: "rgba(122, 215, 207, 0.15)" },
        { amplitude: 25, frequency: 0.005, speed: -0.015, phase: 1, y: height * 0.15, color: "rgba(245, 201, 92, 0.12)" }
      ];
    }

    initElements();

    let ringRotation = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position lag for fluid cursor effect
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.15;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.15;
      ringRotation += 0.02;

      // Draw background tech grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.022)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Sine Waves
      waves.forEach((w) => {
        w.phase += w.speed;
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x += 5) {
          const y = w.y + Math.sin(x * w.frequency + w.phase) * w.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw Atomic Orbits
      atoms.forEach((atom) => {
        const glowGradient = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, 35);
        glowGradient.addColorStop(0, "rgba(245, 201, 92, 0.8)");
        glowGradient.addColorStop(0.5, "rgba(122, 215, 207, 0.3)");
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#f5c95c";
        ctx.shadowColor = "#f5c95c";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        atom.orbits.forEach((orbit) => {
          orbit.electronAngle += orbit.speed;
          ctx.save();
          ctx.translate(atom.x, atom.y);
          ctx.rotate(orbit.angle);

          ctx.beginPath();
          ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
          ctx.strokeStyle = orbit.color;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          const ex = orbit.rx * Math.cos(orbit.electronAngle);
          const ey = orbit.ry * Math.sin(orbit.electronAngle);

          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#7ad7cf";
          ctx.shadowColor = "#7ad7cf";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.restore();
        });
      });

      // Draw Quantum Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulseAngle) * 0.2);

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Force field interaction with mouse
        if (mouse.active) {
          const dx = smoothMouse.x - p.x;
          const dy = smoothMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.8;
            p.y -= (dy / dist) * force * 1.8;

            // Connect laser line from cursor to nearby particles
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(smoothMouse.x, smoothMouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(122, 215, 207, ${(1 - dist / 130) * 0.45})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(122, 215, 207, " + (1 - dist / 110) * 0.18 + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Floating Formulas
      formulas.forEach((f) => {
        f.y += f.vy;
        f.x += f.vx;
        f.alpha += f.fadeSpeed * f.fadeDir;
        if (f.alpha > 0.45) f.fadeDir = -1;
        if (f.alpha < 0.12) f.fadeDir = 1;

        if (f.y < -30) {
          f.y = height + 30;
          f.x = Math.random() * (width - 150) + 75;
        }

        ctx.font = `600 ${f.fontSize}px "Courier New", Courier, monospace`;
        ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
        ctx.shadowColor = "#7ad7cf";
        ctx.shadowBlur = 6;
        ctx.fillText(f.text, f.x, f.y);
        ctx.shadowBlur = 0;
      });

      // Render Mouse Shockwaves (Click Ripple)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 4;
        sw.alpha -= 0.02;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // Render Mouse Particle Sparkle Trail
      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const pt = cursorTrail[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= pt.decay;
        pt.radius *= 0.96;

        if (pt.alpha <= 0 || pt.radius <= 0.2) {
          cursorTrail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // Render Beautiful Mouse Pointer Target Halo & Quantum Orb
      if (mouse.active) {
        // Radial Gradient Aura
        const mouseGlow = ctx.createRadialGradient(
          smoothMouse.x,
          smoothMouse.y,
          0,
          smoothMouse.x,
          smoothMouse.y,
          100
        );
        mouseGlow.addColorStop(0, "rgba(122, 215, 207, 0.25)");
        mouseGlow.addColorStop(0.4, "rgba(245, 201, 92, 0.1)");
        mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 100, 0, Math.PI * 2);
        ctx.fill();

        // Inner Glowing Quantum Core Orb
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#7ad7cf";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer Rotating Concentric Target Ring
        ctx.save();
        ctx.translate(smoothMouse.x, smoothMouse.y);
        ctx.rotate(ringRotation);

        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(122, 215, 207, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 8]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(245, 201, 92, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="physics-bg-wrapper">
      <canvas ref={canvasRef} className="physics-canvas" />
      <div className="physics-nebula nebula-1" />
      <div className="physics-nebula nebula-2" />
      <div className="physics-nebula nebula-3" />
      <div className="physics-bg-content">{children}</div>
    </div>
  );
}
