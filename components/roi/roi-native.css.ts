/** CSS nativo para ROI (sin Tailwind). Inyectado via <style> en Shadow DOM. */
export const ROI_NATIVE_CSS = `
.roi-stitch {
  --roi-bg: #0e0e11;
  --roi-surface: #15181d;
  --roi-surface-low: #1b1b1e;
  --roi-surface-lowest: #0e0e11;
  --roi-border: rgba(77, 77, 77, 0.47);
  --roi-on-surface: #e4e1e6;
  --roi-muted: #c4c7c8;
  --roi-cyan: #2ba7f6;
  --roi-gold: #f7c500;
  --roi-secondary: #c3c6d1;
  box-sizing: border-box;
  color: var(--roi-on-surface);
  font-family: system-ui, -apple-system, Segoe UI, sans-serif;
}
.roi-stitch *, .roi-stitch *::before, .roi-stitch *::after { box-sizing: border-box; }
.roi-stitch.roi-bg-page { background-color: var(--roi-bg); }
.roi-page { position: relative; width: 100%; padding: 2rem 0; }
.roi-wrap { position: relative; z-index: 1; max-width: 64rem; margin: 0 auto; padding: 0 1rem; }
.roi-eyebrow { margin: 0 0 1rem; text-align: center; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--roi-cyan); }
.roi-hero { position: relative; max-width: 48rem; margin: 0 auto 3rem; text-align: center; }
.roi-hero-glow { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; transform: translate(-50%, -50%); border-radius: 9999px; background: var(--roi-gold); opacity: 0.05; pointer-events: none; }
.roi-hero-title { margin: 0 0 1rem; font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 600; line-height: 1.15; color: #fff; }
.roi-hero-desc { margin: 0; font-size: 1.125rem; line-height: 1.6; color: var(--roi-muted); }
.roi-card { position: relative; overflow: hidden; border: 1px solid var(--roi-border); border-radius: 1rem; background: var(--roi-surface); box-shadow: 0 0 50px rgba(43, 167, 246, 0.05); }
.roi-card-pad { position: relative; z-index: 1; padding: 1.25rem 1.5rem; }
.roi-glow-dot { position: absolute; top: 0; right: 0; width: 16rem; height: 16rem; border-radius: 9999px; background: rgba(43, 167, 246, 0.1); filter: blur(80px); pointer-events: none; }
.roi-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 1024px) { .roi-grid { grid-template-columns: 1fr 1fr; gap: 3rem; } }
.roi-stack { display: flex; flex-direction: column; gap: 2rem; }
.roi-field { display: flex; flex-direction: column; gap: 0.75rem; }
.roi-field-head { display: flex; align-items: center; justify-content: space-between; font-size: 1rem; font-weight: 600; color: var(--roi-on-surface); }
.roi-field-value { font-weight: 500; color: var(--roi-cyan); }
.roi-select { width: 100%; padding: 1rem 1.5rem; border: 1px solid var(--roi-border); border-radius: 9999px; background: var(--roi-surface-low); color: var(--roi-on-surface); font-size: 1rem; }
.roi-track { height: 4px; border-radius: 2px; background: #353438; }
.roi-track-fill { height: 100%; border-radius: 2px; background: #fff; }
.roi-panel { position: relative; overflow: hidden; border: 1px solid var(--roi-border); border-radius: 0.75rem; background: var(--roi-surface-lowest); padding: 1.5rem; }
.roi-panel-glow { position: absolute; inset: 0; background: linear-gradient(to bottom right, rgba(106,45,232,0.05), rgba(43,167,246,0.05)); pointer-events: none; }
.roi-panel-body { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 2.5rem; }
.roi-ring-wrap { position: relative; width: 12rem; height: 12rem; }
.roi-ring-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.roi-ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.roi-ring-kicker { margin: 0 0 0.5rem; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--roi-muted); }
.roi-ring-value { margin: 0; font-size: 3rem; font-weight: 700; line-height: 1; color: #fff; }
.roi-ring-pct { font-size: 1.875rem; }
.roi-metrics { display: grid; width: 100%; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: center; }
.roi-metric { display: flex; flex-direction: column; gap: 0.5rem; }
.roi-metric:first-child { border-right: 1px solid var(--roi-border); padding-right: 1rem; }
.roi-metric-kicker { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--roi-muted); }
.roi-metric-val { font-size: 1.75rem; font-weight: 700; color: #fff; }
.roi-btn-cta { display: flex; width: 100%; height: 54px; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; border: none; border-radius: 9999px; background: var(--roi-secondary); color: #0e0e11; font-size: 1rem; font-weight: 600; cursor: pointer; }
.roi-btn-cta:hover { background: #fff; }
.roi-btn-cta:disabled { opacity: 0.6; cursor: not-allowed; }
.roi-footnote { margin: 0; text-align: center; font-size: 0.75rem; line-height: 1.5; color: var(--roi-muted); }
.roi-text-muted { color: var(--roi-muted); }
.roi-text-cyan { color: var(--roi-cyan); }
.roi-text-gold { color: var(--roi-gold); }
.roi-text-on { color: var(--roi-on-surface); }
.roi-text-success { color: #a7f3d0; }
.roi-ambient { position: absolute; width: min(600px, 80vw); height: min(600px, 80vw); border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.roi-ambient-cyan { top: -10%; left: -10%; background: radial-gradient(circle, rgba(43,167,246,0.8) 0%, transparent 70%); }
.roi-ambient-violet { bottom: -10%; right: -10%; background: radial-gradient(circle, rgba(106,45,232,0.8) 0%, transparent 70%); }
.roi-stitch input[type="range"].roi-slider { -webkit-appearance: none; appearance: none; width: 100%; background: transparent; }
.roi-stitch input[type="range"].roi-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border-radius: 50%; background: #fff; box-shadow: 0 0 10px rgba(255,255,255,0.5); cursor: pointer; }
.roi-stitch input[type="range"].roi-slider::-webkit-slider-runnable-track { height: 4px; border-radius: 2px; background: #353438; cursor: pointer; }
.roi-designer-badge { margin: 0 0 1rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; background: rgba(43,167,246,0.15); color: var(--roi-cyan); font-size: 0.75rem; text-align: center; }
.roi-lead-grid { display: grid; gap: 1rem; }
@media (min-width: 640px) { .roi-lead-grid { grid-template-columns: 1fr 1fr; } }
.roi-lead-grid label { display: block; margin-bottom: 0.35rem; font-size: 0.875rem; color: var(--roi-on-surface); }
.roi-lead-grid input { width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--roi-border); border-radius: 0.5rem; background: var(--roi-surface-lowest); color: #fff; font-size: 1rem; }
.roi-lead-box { margin-top: 2rem; padding: 1.5rem; border: 1px solid var(--roi-border); border-radius: 0.75rem; background: var(--roi-surface-low); }
.roi-btn-submit { display: flex; width: 100%; height: 3rem; align-items: center; justify-content: center; margin-top: 1.5rem; border: none; border-radius: 9999px; background: var(--roi-cyan); color: #0e0e11; font-weight: 600; cursor: pointer; }
.roi-error { margin: 0; font-size: 0.875rem; color: #f87171; }
.roi-success { margin-top: 1.5rem; padding: 0.75rem 1rem; border: 1px solid rgba(5,150,105,0.3); border-radius: 0.5rem; background: rgba(5,150,105,0.1); color: #a7f3d0; font-size: 0.875rem; }
`;
