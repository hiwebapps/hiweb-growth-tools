/**
 * Estilos scoped para ROI. Sin import .css (evita localhost en bundle)
 * y sin clases Tailwind `text-[var(--...)]` (rompen el parser de Webflow Designer).
 */
const ROI_STITCH_CSS = `
.roi-stitch {
  --roi-bg: #0e0e11;
  --roi-surface: #15181d;
  --roi-surface-low: #1b1b1e;
  --roi-surface-lowest: #0e0e11;
  --roi-border: rgba(77, 77, 77, 0.47);
  --roi-on-surface: #e4e1e6;
  --roi-muted: #c4c7c8;
  --roi-cyan: #2ba7f6;
  --roi-violet: #6a2de8;
  --roi-gold: #f7c500;
  --roi-secondary: #c3c6d1;
  color: var(--roi-on-surface);
}
.roi-stitch .roi-text-muted { color: var(--roi-muted); }
.roi-stitch .roi-text-cyan { color: var(--roi-cyan); }
.roi-stitch .roi-text-gold { color: var(--roi-gold); }
.roi-stitch .roi-text-on { color: var(--roi-on-surface); }
.roi-stitch .roi-bg-surface { background-color: var(--roi-surface); }
.roi-stitch .roi-bg-lowest { background-color: var(--roi-surface-lowest); }
.roi-stitch .roi-bg-low { background-color: var(--roi-surface-low); }
.roi-stitch .roi-border { border-color: var(--roi-border); }
.roi-stitch .roi-panel {
  border: 1px solid var(--roi-border);
  background-color: var(--roi-surface-lowest);
}
.roi-stitch .roi-panel-glow {
  background: linear-gradient(
    to bottom right,
    rgba(106, 45, 232, 0.05),
    rgba(43, 167, 246, 0.05)
  );
}
.roi-stitch .roi-card {
  border: 1px solid var(--roi-border);
  background-color: var(--roi-surface);
  box-shadow: 0 0 50px rgba(43, 167, 246, 0.05);
}
.roi-stitch .roi-glow-dot {
  background-color: rgba(43, 167, 246, 0.1);
}
.roi-stitch .roi-btn-cta {
  background-color: var(--roi-secondary);
  color: #0e0e11;
}
.roi-stitch .roi-btn-cta:hover { background-color: #ffffff; }
.roi-stitch .roi-btn-submit {
  background-color: var(--roi-cyan);
  color: #0e0e11;
}
.roi-stitch .roi-ambient {
  position: absolute;
  width: min(600px, 80vw);
  height: min(600px, 80vw);
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;
}
.roi-stitch .roi-ambient-cyan {
  background: radial-gradient(circle, rgba(43, 167, 246, 0.8) 0%, transparent 70%);
  top: -10%;
  left: -10%;
}
.roi-stitch .roi-ambient-violet {
  background: radial-gradient(circle, rgba(106, 45, 232, 0.8) 0%, transparent 70%);
  bottom: -10%;
  right: -10%;
}
.roi-stitch input[type="range"].roi-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
}
.roi-stitch input[type="range"].roi-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  margin-top: -10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transition: transform 0.2s;
}
.roi-stitch input[type="range"].roi-slider::-webkit-slider-thumb:hover {
  transform: scale(1.12);
}
.roi-stitch input[type="range"].roi-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #353438;
  border-radius: 2px;
}
.roi-stitch input[type="range"].roi-slider:focus { outline: none; }
.roi-stitch .roi-select {
  appearance: none;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--roi-surface-low);
  border: 1px solid var(--roi-border);
  border-radius: 9999px;
  color: var(--roi-on-surface);
}
.roi-stitch .roi-select:focus {
  border-color: var(--roi-cyan);
  outline: none;
}
.roi-stitch .roi-lead-grid label { color: var(--roi-on-surface); }
.roi-stitch .roi-lead-grid input {
  border-color: var(--roi-border);
  background-color: var(--roi-surface-lowest);
  color: #ffffff;
}
`;

export function RoiStitchStyles() {
  return <style>{ROI_STITCH_CSS}</style>;
}
