"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter } from "@/lib/data";
import Reveal from "./Reveal";

function Slider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    update(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border border-surface-border shadow-card"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Après (image de fond) */}
      <Image
        src={after}
        alt={`${title} — après`}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover"
      />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink-950">
        Après
      </span>

      {/* Avant (clipée) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${title} — avant`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-bold text-white">
          Avant
        </span>
      </div>

      {/* Poignée */}
      <div
        className="absolute inset-y-0 z-20 flex w-0.5 items-center justify-center bg-white"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-label="Glisser pour comparer"
          className="flex h-11 w-11 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-ink-950/90 text-white shadow-lg"
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparateur avant après"
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function BeforeAfter() {
  const item = beforeAfter[0];
  return (
    <section id="avant-apres" className="section">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Avant / Après</span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            La différence MyClean, en un coup d&apos;œil
          </h2>
          <p className="mt-4 text-[#aeb6c7]">
            Glissez le curseur pour découvrir la transformation. Des résultats
            visibles, à chaque intervention.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <Slider before={item.before} after={item.after} title={item.title} />
          <p className="mt-4 text-center text-sm text-[#aeb6c7]">{item.title}</p>
        </Reveal>
      </div>
    </section>
  );
}
