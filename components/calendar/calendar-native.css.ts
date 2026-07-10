/** CSS nativo Calendario Stitch — compatible Webflow code-island. */
export const CALENDAR_NATIVE_CSS = `
.cal-stitch {
  --cal-bg: #0e0e11;
  --cal-surface: #15181d;
  --cal-surface-low: #1b1b1e;
  --cal-surface-lowest: #0e0e11;
  --cal-surface-high: #2a2a2d;
  --cal-border: rgba(77, 77, 77, 0.47);
  --cal-on: #e4e1e6;
  --cal-muted: #c4c7c8;
  --cal-primary: #ffffff;
  --cal-cyan: #2ba7f6;
  --cal-violet: #6a2de8;
  --cal-error: #ef4444;
  --cal-success: #a7f3d0;
  box-sizing: border-box;
  color: var(--cal-on);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
.cal-stitch *, .cal-stitch *::before, .cal-stitch *::after { box-sizing: border-box; }
.cal-root { position: relative; width: 100%; }
.cal-ambient { display: none; position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; z-index: 0; }
@media (min-width: 768px) { .cal-ambient { display: block; } }
.cal-ambient-violet { top: 8%; left: 8%; width: min(360px, 70vw); height: min(360px, 70vw); background: radial-gradient(circle, rgba(106,45,232,0.8) 0%, transparent 70%); }
.cal-ambient-cyan { bottom: 12%; right: 8%; width: min(280px, 55vw); height: min(280px, 55vw); background: radial-gradient(circle, rgba(43,167,246,0.8) 0%, transparent 70%); }
.cal-inner { position: relative; z-index: 1; width: 100%; max-width: 42rem; margin: 0 auto; padding: 0 1rem; }
.cal-intro { text-align: center; padding: 1.5rem 0 2rem; }
.cal-eyebrow { display: inline-block; margin: 0 0 1rem; padding: 0.25rem 1rem; border: 1px solid rgba(43,167,246,0.3); border-radius: 9999px; background: rgba(43,167,246,0.1); color: var(--cal-cyan); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
.cal-intro-title { margin: 0 0 1rem; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 600; line-height: 1.15; color: var(--cal-primary); }
.cal-intro-desc { margin: 0 auto 1.5rem; max-width: 36rem; font-size: 1.0625rem; line-height: 1.6; color: var(--cal-muted); }
.cal-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
.cal-badge { padding: 0.35rem 0.75rem; border-radius: 9999px; border: 1px solid var(--cal-border); background: var(--cal-surface); font-size: 0.75rem; color: var(--cal-muted); }
.cal-card { position: relative; overflow: hidden; border: 1px solid var(--cal-border); border-radius: 1rem; background: var(--cal-surface); box-shadow: 0 0 50px rgba(43, 167, 246, 0.05); }
.cal-card-pad { position: relative; z-index: 1; padding: 1.25rem 1.5rem; }
.cal-glow-dot { position: absolute; top: 0; right: 0; width: 14rem; height: 14rem; border-radius: 9999px; background: rgba(43, 167, 246, 0.1); filter: blur(80px); pointer-events: none; }
.cal-step { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
.cal-progress { margin-bottom: 0.25rem; }
.cal-progress-head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.cal-progress-label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--cal-muted); }
.cal-progress-track { width: 100%; height: 4px; border-radius: 9999px; background: var(--cal-surface-high); overflow: hidden; }
.cal-progress-fill { height: 100%; border-radius: 9999px; background: var(--cal-cyan); transition: width 0.35s ease; }
.cal-field { display: flex; flex-direction: column; gap: 0.5rem; }
.cal-field-head { display: flex; align-items: center; justify-content: space-between; font-size: 1rem; font-weight: 600; color: var(--cal-on); }
.cal-field-hint { margin: 0; font-size: 0.8125rem; line-height: 1.45; color: var(--cal-muted); }
.cal-select { width: 100%; padding: 1rem 1.25rem; border: 1px solid var(--cal-border); border-radius: 9999px; background: var(--cal-surface-low); color: var(--cal-on); font-size: 1rem; cursor: pointer; }
.cal-date-row { display: flex; gap: 0.625rem; overflow-x: auto; padding-bottom: 0.25rem; -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
.cal-date-chip { flex: 0 0 auto; min-width: 5.5rem; padding: 0.75rem 0.875rem; border: 1px solid var(--cal-border); border-radius: 0.875rem; background: var(--cal-surface-low); color: var(--cal-on); font-size: 0.875rem; font-weight: 500; text-align: left; cursor: pointer; transition: border-color 0.2s, background 0.2s; -webkit-tap-highlight-color: transparent; }
.cal-date-chip:hover { border-color: var(--cal-muted); }
.cal-date-chip.is-selected { border-color: var(--cal-cyan); background: rgba(43,167,246,0.12); color: var(--cal-primary); box-shadow: inset 0 0 16px rgba(43,167,246,0.12); }
.cal-slot-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.625rem; }
@media (min-width: 640px) { .cal-slot-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.cal-slot { min-height: 44px; padding: 0.625rem 0.5rem; border: 1px solid var(--cal-border); border-radius: 0.75rem; background: var(--cal-surface-low); color: var(--cal-on); font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
.cal-slot:hover { border-color: var(--cal-cyan); }
.cal-slot.is-selected { border-color: var(--cal-cyan); background: rgba(43,167,246,0.12); color: var(--cal-cyan); }
.cal-loading { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 0; color: var(--cal-muted); font-size: 0.9375rem; }
.cal-spinner { width: 1.25rem; height: 1.25rem; border: 2px solid var(--cal-border); border-top-color: var(--cal-cyan); border-radius: 50%; animation: cal-spin 0.7s linear infinite; }
@keyframes cal-spin { to { transform: rotate(360deg); } }
.cal-empty { margin: 0; padding: 0.75rem 0; font-size: 0.9375rem; color: var(--cal-muted); }
.cal-lead-grid { display: grid; gap: 1rem; }
@media (min-width: 640px) { .cal-lead-grid { grid-template-columns: 1fr 1fr; } }
.cal-lead-grid .cal-field-span2 { grid-column: 1 / -1; }
.cal-field label { font-size: 0.875rem; color: var(--cal-on); }
.cal-field input { width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--cal-border); border-radius: 0.5rem; background: var(--cal-surface-lowest); color: #fff; font-size: 1rem; }
.cal-field input:focus { border-color: var(--cal-cyan); outline: none; }
.cal-nav { display: flex; flex-direction: column-reverse; gap: 0.75rem; margin-top: 0.5rem; }
@media (min-width: 640px) { .cal-nav { flex-direction: row; align-items: center; justify-content: space-between; } }
.cal-nav .cal-btn-primary { width: 100%; }
@media (min-width: 640px) { .cal-nav .cal-btn-primary { width: auto; min-width: 12rem; } }
.cal-btn-primary { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: none; border-radius: 9999px; background: var(--cal-primary); color: var(--cal-bg); font-size: 1rem; font-weight: 600; cursor: pointer; }
.cal-btn-primary:hover { background: #e2e2e2; }
.cal-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.cal-btn-back { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: 0.35rem; border: none; background: transparent; color: var(--cal-muted); font-size: 1rem; font-weight: 600; cursor: pointer; }
.cal-btn-back:hover { color: var(--cal-primary); }
.cal-error { margin: 0; font-size: 0.875rem; color: var(--cal-error); }
.cal-success-panel { padding: 1.25rem; border: 1px solid rgba(167,243,208,0.25); border-radius: 1rem; background: rgba(5,150,105,0.08); }
.cal-success-badge { display: inline-block; margin-bottom: 1rem; padding: 0.25rem 0.75rem; border-radius: 9999px; background: rgba(5,150,105,0.2); color: var(--cal-success); font-size: 0.75rem; font-weight: 600; }
.cal-summary { margin: 0; display: grid; gap: 0.875rem; }
.cal-summary div { display: grid; gap: 0.2rem; }
.cal-summary dt { font-size: 0.75rem; color: var(--cal-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.cal-summary dd { margin: 0; font-size: 1rem; font-weight: 500; color: var(--cal-primary); }
.cal-designer-badge { margin: 0 0 1rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; background: rgba(43,167,246,0.15); color: var(--cal-cyan); font-size: 0.75rem; text-align: center; }
.cal-loading-page { padding: 3rem; text-align: center; color: var(--cal-muted); }
`;
