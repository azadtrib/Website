"use client";

import { useEffect, useRef, useState } from "react";

const REVEAL_AT = 0.45; // share of the foil scratched off before it all clears
const BRUSH = 34;

export default function ScratchCard({ children, onReveal, label = "Scratch to reveal your offer" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const strokes = useRef(0);
  const [revealed, setRevealed] = useState(false);

  // Paint the foil. Sized to the card in CSS pixels, scaled for sharp
  // rendering on high-density phone screens.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#3a3029");
    gradient.addColorStop(0.5, "#c98a63");
    gradient.addColorStop(1, "#3a3029");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // A little grain so it reads as foil rather than a flat block.
    for (let i = 0; i < (width * height) / 40; i += 1) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }

    ctx.fillStyle = "#16130f";
    ctx.font = "700 13px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label.toUpperCase(), width / 2, height / 2);
  }, [label]);

  function reveal() {
    if (revealed) return;
    setRevealed(true);
    onReveal?.();
  }

  function pointAt(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function scratchTo(point) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const from = last.current || point;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x + 0.01, point.y);
    ctx.stroke();
    last.current = point;
  }

  // Sampling every pixel on each move is expensive on a phone, so check how
  // much is cleared only every few strokes, on a sparse grid.
  function clearedShare() {
    const canvas = canvasRef.current;
    const { data } = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total += 1;
      if (data[i] === 0) clear += 1;
    }
    return total ? clear / total : 0;
  }

  function onPointerDown(e) {
    if (revealed) return;
    drawing.current = true;
    last.current = null;
    try {
      // Keeps the stroke going if a finger slides off the card edge.
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Some browsers refuse capture for certain pointers; scratching still works.
    }
    scratchTo(pointAt(e));
  }

  function onPointerMove(e) {
    if (!drawing.current || revealed) return;
    scratchTo(pointAt(e));
    strokes.current += 1;
    if (strokes.current % 6 === 0 && clearedShare() >= REVEAL_AT) reveal();
  }

  function onPointerUp() {
    drawing.current = false;
    last.current = null;
    if (!revealed && clearedShare() >= REVEAL_AT) reveal();
  }

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative h-36 rounded-2xl overflow-hidden border border-teal/40 bg-navy select-none"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          {children}
        </div>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          // touch-none stops the page scrolling while a thumb is scratching.
          className={`absolute inset-0 w-full h-full touch-none cursor-crosshair transition-opacity duration-500 motion-reduce:transition-none ${
            revealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>
      {!revealed && (
        <button
          type="button"
          onClick={reveal}
          className="mt-3 w-full text-sm text-ink/60 hover:text-ink underline underline-offset-4"
        >
          Reveal it without scratching
        </button>
      )}
    </div>
  );
}
