import { DIFFICULTY_LEVEL_TO_NAME } from "@/lib/constants";
import { Escape } from "@/lib/types";
import { BrainCog } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function EscapeDialog({
  selectedEscape,
  onClose,
}: {
  selectedEscape: Escape | undefined;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    if (!selectedEscape) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedEscape, onClose]);

  if (!selectedEscape) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="escape-dialog-title"
    >
      <div
        className="relative bg-[#fffcf6] border-2 border-[#733706] rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2
            id="escape-dialog-title"
            className="text-3xl font-bold text-[#3f1f03]"
          >
            {selectedEscape.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-[#733706] hover:bg-[#733706]/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ImageCarousel
          images={selectedEscape.images}
          title={selectedEscape.title}
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="flex flex-1 border border-[#733706]/40 rounded-md bg-[#fffcf6] divide-x divide-[#733706]/30">
            <MetaStamp label="Joueurs" value={selectedEscape.players} />
            <MetaStamp label="Durée" value={`${selectedEscape.duration} min`} />
            <MetaStamp label="Âge min." value={selectedEscape.age} />
          </div>
          <DifficultyBadge level={selectedEscape.difficulty} />
        </div>

        <p className="text-[#041f1e] mt-6 leading-relaxed">
          {selectedEscape.description}
        </p>

        <div className="flex justify-center mt-6">
          <Link
            href={`/calendar?escapeId=${selectedEscape.id}`}
            className="inline-flex justify-center px-5 py-2.5 rounded bg-[#041f1e] text-[#fffcf6] font-semibold hover:bg-[#063836] transition-colors"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetaStamp({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-2 border-r border-[#733706]/30 last:border-r-0 flex-1 min-w-[72px]">
      <span className="text-[10px] uppercase tracking-[0.12em] text-[#733706]/70 font-semibold">
        {label}
      </span>
      <span className="text-base font-bold text-[#3f1f03] leading-tight mt-0.5">
        {value}
      </span>
    </div>
  );
}

function DifficultyBadge({ level }: { level: string }) {
  const name =
    DIFFICULTY_LEVEL_TO_NAME[level as keyof typeof DIFFICULTY_LEVEL_TO_NAME] ??
    "Inconnue";
  //   const iconSrc = DIFFICULTY_LEVEL_TO_ICON[level];

  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-md bg-[#733706] text-[#fffcf6]">
      {/* Icon slot — replace src once turtle-shell assets exist */}
      {/* <span
        className="inline-block w-6 h-6 rounded-[4px] bg-[#fffcf6]/20 shrink-0"
        aria-hidden="true"
        style={
          iconSrc
            ? {
                backgroundImage: `url(${iconSrc})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundColor: "transparent",
              }
            : undefined
        }
      /> */}
      <BrainCog size={16} />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#fffcf6]/70 font-semibold">
          Difficulté
        </span>
        <span className="text-sm font-bold">{name}</span>
      </div>
    </div>
  );
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  // Keyboard navigation while the carousel area has focus
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div
      className="relative w-full h-64 sm:h-80 rounded-md overflow-hidden border border-[#733706]/40 bg-[#3f1f03]/5"
      tabIndex={hasMultiple ? 0 : -1}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label={`Galerie d'images pour ${title}`}
    >
      <img
        src={images[index]}
        alt={`${title} — image ${index + 1} sur ${images.length}`}
        className="w-full h-full object-cover"
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#fffcf6]/90 border border-[#733706] text-[#3f1f03] hover:bg-[#fffcf6] transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#fffcf6]/90 border border-[#733706] text-[#3f1f03] hover:bg-[#fffcf6] transition-colors"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                aria-current={i === index}
                className={`w-2 h-2 rounded-full border border-[#733706] transition-colors ${
                  i === index ? "bg-[#733706]" : "bg-[#fffcf6]/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
