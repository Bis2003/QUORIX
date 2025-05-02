import React, { useEffect, useRef } from "react";

export default function CurvedCanvasBackground({ isNight }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawCurve(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let color = "rgba(0,0,0,0.8)";
      for (let i = 0; i < 10; i++) {
        let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        for (let t = -Math.PI / 2; t <= Math.PI / 2; t += 0.05) {
          const x = canvas.width * 0.85 + Math.cos(t + time * 0.002 + i * 0.1) * 150;
          const y = canvas.height * (t / Math.PI) + canvas.height / 2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function animate(time) {
      drawCurve(time);
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate(0);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      id="background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        transition: "background 0.5s ease"
      }}
    />
  );
} 