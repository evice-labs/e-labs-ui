/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  label: string;
  intensity: number;
}

export default function NetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Pre-generate cryptographic-looking hash strings
  const hashList = [
    '0x72a...8c1', 'sBPF::exec', 'RISC0::proof', 'Groth16::verify',
    'BN254::G1', 'LEZ::state', '0x3d4...99a', 'witness::eval',
    'image_id::0xfe', 'Evice::null', '0x90f...b23', 'λPrize::winner'
  ];

  // Keep track of dimensions with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale canvas for retina display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Create node grid
    const nodes: Node[] = [];
    const nodeCount = Math.min(32, Math.floor((dimensions.width * dimensions.height) / 25000) + 12);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        label: hashList[Math.floor(Math.random() * hashList.length)],
        intensity: Math.random(),
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw structural grid in canvas background for deep technical aesthetics
      ctx.strokeStyle = 'rgba(61, 220, 151, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Draw connection lines first
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 160;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = `rgba(61, 220, 151, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render mouse connection
      if (mouseRef.current.active) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouseRef.current.x;
          const dy = nodes[i].y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const activeDistance = 180;
          if (dist < activeDistance) {
            const alpha = (1 - dist / activeDistance) * 0.15;
            ctx.strokeStyle = `rgba(61, 220, 151, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Attract slightly
            nodes[i].vx += dx * 0.00005;
            nodes[i].vy += dy * 0.00005;
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries checks
        if (node.x < 0 || node.x > dimensions.width) node.vx *= -1;
        if (node.y < 0 || node.y > dimensions.height) node.vy *= -1;

        // Clamp speed to prevent spin off
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 1.0;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Draw node dot
        ctx.fillStyle = node.intensity > 0.5 ? 'rgba(61, 220, 151, 0.4)' : 'rgba(124, 92, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Label rendering for close nodes to mouse or randomly
        let dToMouse = 9999;
        if (mouseRef.current.active) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          dToMouse = Math.sqrt(dx * dx + dy * dy);
        }

        if (dToMouse < 90 || node.intensity > 0.88) {
          ctx.fillStyle = dToMouse < 95 ? 'rgba(237, 237, 239, 0.6)' : 'rgba(138, 138, 146, 0.25)';
          ctx.font = '7px JetBrains Mono, monospace';
          ctx.fillText(node.label, node.x + 6, node.y + 3);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 block h-full w-full pointer-events-none md:pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full pointer-events-none opacity-40 md:opacity-55"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
