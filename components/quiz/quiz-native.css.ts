/** CSS nativo Quiz Stitch — sin import .css ni Tailwind arbitrario (Webflow code-island). */
export const QUIZ_NATIVE_CSS = `
.quiz-stitch {
  --qz-bg: #131316;
  --qz-surface: #15181d;
  --qz-surface-low: #1b1b1e;
  --qz-surface-lowest: #0e0e11;
  --qz-surface-high: #2a2a2d;
  --qz-surface-highest: #353438;
  --qz-surface-bright: #39393c;
  --qz-border: rgba(77, 77, 77, 0.47);
  --qz-on: #e4e1e6;
  --qz-muted: #c4c7c8;
  --qz-primary: #ffffff;
  --qz-cyan: #2ba7f6;
  --qz-violet: #6a2de8;
  --qz-gold: #f7c500;
  --qz-error: #ef4444;
  --qz-secondary: #c3c6d1;
  box-sizing: border-box;
  color: var(--qz-on);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
.quiz-stitch *, .quiz-stitch *::before, .quiz-stitch *::after { box-sizing: border-box; }
.quiz-root { position: relative; width: 100%; }
.quiz-ambient { display: none; position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; z-index: 0; }
@media (min-width: 768px) { .quiz-ambient { display: block; } }
.quiz-ambient-violet { top: 10%; left: 10%; width: min(400px, 80vw); height: min(400px, 80vw); background: radial-gradient(circle, rgba(106,45,232,0.8) 0%, transparent 70%); }
.quiz-ambient-cyan { bottom: 20%; right: 10%; width: min(300px, 60vw); height: min(300px, 60vw); background: radial-gradient(circle, rgba(43,167,246,0.8) 0%, transparent 70%); }
.quiz-inner { position: relative; z-index: 1; width: 100%; max-width: 50rem; margin: 0 auto; padding: 0 1rem; }
@media (min-width: 768px) { .quiz-inner { padding: 0 1.5rem; } }
.quiz-designer-badge { margin: 0 0 1rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; background: rgba(43,167,246,0.15); color: var(--qz-cyan); font-size: 0.75rem; text-align: center; }
.quiz-intro { text-align: center; padding: 1.5rem 0 2rem; }
.quiz-eyebrow { display: inline-block; margin: 0 0 1rem; padding: 0.25rem 1rem; border: 1px solid rgba(43,167,246,0.3); border-radius: 9999px; background: rgba(43,167,246,0.1); color: var(--qz-cyan); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
.quiz-intro-title { margin: 0 0 1rem; font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 600; line-height: 1.15; color: var(--qz-primary); }
.quiz-intro-desc { margin: 0 auto 1.5rem; max-width: 36rem; font-size: 1.125rem; line-height: 1.6; color: var(--qz-muted); }
.quiz-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
.quiz-badge { padding: 0.35rem 0.75rem; border-radius: 9999px; border: 1px solid var(--qz-border); background: var(--qz-surface); font-size: 0.75rem; color: var(--qz-muted); }
.quiz-progress { margin-bottom: 0.25rem; }
.quiz-progress-head { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.quiz-progress-label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--qz-muted); }
.quiz-progress-track { width: 100%; height: 4px; border-radius: 9999px; background: var(--qz-surface-highest); overflow: hidden; }
.quiz-progress-fill { height: 100%; border-radius: 9999px; background: var(--qz-cyan); transition: width 0.5s ease; }
.quiz-question-wrap { padding: 1rem 0 1.5rem; }
@media (min-width: 768px) { .quiz-question-wrap { padding: 1.5rem 0 2rem; } }
.quiz-question-title { margin: 0 0 0.75rem; text-align: left; font-size: 1.375rem; font-weight: 600; line-height: 1.25; color: var(--qz-primary); }
@media (min-width: 768px) { .quiz-question-title { margin-bottom: 1rem; text-align: center; font-size: clamp(1.5rem, 3vw, 2rem); } }
.quiz-question-help { margin: 0 0 1.25rem; max-width: none; text-align: left; font-size: 0.9375rem; line-height: 1.55; color: var(--qz-muted); }
@media (min-width: 768px) { .quiz-question-help { margin: 0 auto 2rem; max-width: 37.5rem; text-align: center; font-size: 1.125rem; } }
.quiz-options { display: grid; grid-template-columns: 1fr; gap: 0.875rem; width: 100%; }
@media (min-width: 768px) { .quiz-options { gap: 1.5rem; grid-template-columns: 1fr 1fr; } }
.quiz-option { position: relative; display: flex; flex-direction: column; align-items: flex-start; width: 100%; min-height: 44px; padding: 1rem 1.125rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); text-align: left; cursor: pointer; transition: border-color 0.25s, background 0.25s; -webkit-tap-highlight-color: transparent; }
@media (min-width: 768px) { .quiz-option { padding: 1.5rem; } }
.quiz-option:hover { border-color: var(--qz-muted); background: #1f1f22; }
.quiz-option.is-selected { border-color: var(--qz-cyan); background: #1f1f22; box-shadow: inset 0 0 20px rgba(43,167,246,0.15); }
.quiz-option-icon-wrap { display: flex; width: 3rem; height: 3rem; align-items: center; justify-content: center; margin-bottom: 1rem; border-radius: 9999px; background: var(--qz-surface-high); color: var(--qz-muted); transition: color 0.2s, background 0.2s; }
.quiz-option.is-selected .quiz-option-icon-wrap { color: var(--qz-cyan); }
.quiz-option-title { margin: 0 0 0.35rem; font-size: 1rem; font-weight: 600; color: var(--qz-primary); }
@media (min-width: 768px) { .quiz-option-title { margin-bottom: 0.5rem; font-size: 1.125rem; font-weight: 500; } }
.quiz-option-desc { margin: 0; font-size: 0.875rem; line-height: 1.5; color: var(--qz-muted); word-break: break-word; }
@media (min-width: 768px) { .quiz-option-desc { font-size: 1rem; line-height: 1.6; } }
.quiz-nav { display: flex; flex-direction: column-reverse; align-items: stretch; gap: 0.75rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--qz-border); }
@media (min-width: 640px) { .quiz-nav { flex-direction: row; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 2rem; } }
.quiz-nav .quiz-btn-primary { width: 100%; }
@media (min-width: 640px) { .quiz-nav .quiz-btn-primary { width: auto; } }
.quiz-btn-back { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 44px; border: none; background: transparent; color: var(--qz-muted); font-size: 1rem; font-weight: 600; cursor: pointer; }
@media (min-width: 640px) { .quiz-btn-back { justify-content: flex-start; } }
.quiz-btn-back:hover { color: var(--qz-primary); }
.quiz-btn-back:disabled { opacity: 0.4; cursor: not-allowed; }
.quiz-btn-primary { display: inline-flex; min-height: 48px; height: auto; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: none; border-radius: 9999px; background: var(--qz-primary); color: var(--qz-bg); font-size: 1rem; font-weight: 600; cursor: pointer; }
@media (min-width: 768px) { .quiz-btn-primary { height: 54px; padding: 0 2rem; } }
.quiz-btn-primary:hover { background: #e2e2e2; }
.quiz-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.quiz-btn-ghost { display: inline-flex; height: 54px; align-items: center; justify-content: center; padding: 0 2rem; border: 1px solid var(--qz-border); border-radius: 9999px; background: var(--qz-surface-high); color: var(--qz-primary); font-size: 1rem; font-weight: 600; cursor: pointer; }
.quiz-error { margin: 0 0 1rem; font-size: 0.875rem; color: var(--qz-error); }
.quiz-loading { padding: 3rem; text-align: center; color: var(--qz-muted); }
.quiz-lead-card { padding: 1.5rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); }
.quiz-lead-title { margin: 0 0 0.5rem; font-size: 1.125rem; font-weight: 600; color: var(--qz-primary); }
.quiz-lead-desc { margin: 0 0 1.5rem; font-size: 1rem; line-height: 1.6; color: var(--qz-muted); }
.quiz-field { display: flex; flex-direction: column; gap: 0.35rem; }
.quiz-field label { font-size: 0.875rem; color: var(--qz-on); }
.quiz-field input { width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--qz-border); border-radius: 0.5rem; background: var(--qz-surface-lowest); color: #fff; font-size: 1rem; }
.quiz-field input:focus { border-color: var(--qz-cyan); outline: none; }
.quiz-lead-grid { display: grid; gap: 1rem; }
@media (min-width: 640px) { .quiz-lead-grid { grid-template-columns: 1fr 1fr; } }
.quiz-lead-grid .quiz-field-span2 { grid-column: 1 / -1; }
.quiz-results-hero { text-align: center; padding: 1rem 0 2.5rem; }
.quiz-results-display { margin: 0 0 1.5rem; font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 600; color: var(--qz-primary); }
.quiz-score-pill { display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; border: 1px solid var(--qz-border); border-radius: 9999px; background: var(--qz-surface); }
.quiz-score-pill-val { font-size: 1.75rem; font-weight: 500; color: var(--qz-primary); }
.quiz-result-block { width: 100%; max-width: 100%; }
.quiz-bento { display: grid; grid-template-columns: 1fr; gap: 1rem; margin: 0; width: 100%; }
@media (min-width: 768px) { .quiz-bento { gap: 1.5rem; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); } }
.quiz-panel { position: relative; overflow: hidden; padding: 1.25rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); }
@media (min-width: 768px) { .quiz-panel { padding: 2rem; } }
.quiz-panel-glow { position: absolute; inset: 0; background: rgba(43,167,246,0.05); filter: blur(80px); pointer-events: none; }
.quiz-panel-title { margin: 0 0 1.25rem; text-align: center; font-size: 1.125rem; font-weight: 500; color: var(--qz-primary); }
@media (min-width: 768px) { .quiz-panel-title { margin-bottom: 2rem; } }
.quiz-ring-wrap { position: relative; width: 10rem; height: 10rem; margin: 0 auto 1.25rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(43,167,246,0.15); }
@media (min-width: 768px) { .quiz-ring-wrap { width: 12rem; height: 12rem; margin-bottom: 1.5rem; } }
.quiz-ring-inner { position: relative; z-index: 1; display: flex; width: 8.25rem; height: 8.25rem; flex-direction: column; align-items: center; justify-content: center; border-radius: 9999px; border: 1px solid var(--qz-border); background: var(--qz-surface); }
@media (min-width: 768px) { .quiz-ring-inner { width: 10rem; height: 10rem; } }
.quiz-ring-score { font-size: 2.5rem; font-weight: 600; line-height: 1; color: var(--qz-primary); }
@media (min-width: 768px) { .quiz-ring-score { font-size: 3.25rem; } }
.quiz-ring-kicker { margin-top: 0.25rem; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--qz-muted); }
.quiz-level-label { margin: 0 0 0.5rem; text-align: center; font-size: 1.75rem; font-weight: 500; color: var(--qz-cyan); }
.quiz-level-summary { margin: 0 auto 1.25rem; max-width: 24rem; text-align: center; font-size: 0.9375rem; line-height: 1.6; color: var(--qz-muted); }
@media (min-width: 768px) { .quiz-level-summary { margin-bottom: 2rem; font-size: 1rem; } }
.quiz-scale { width: 100%; }
.quiz-scale-track { display: flex; height: 8px; border-radius: 9999px; overflow: hidden; background: var(--qz-surface-highest); }
.quiz-scale-seg { flex: 1; height: 100%; background: var(--qz-border); border-left: 1px solid var(--qz-surface); }
.quiz-scale-seg.is-active { background: var(--qz-cyan); }
.quiz-scale-labels { display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.75rem; color: var(--qz-muted); }
.quiz-bars-title { margin: 0 0 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--qz-border); font-size: 1.125rem; font-weight: 500; color: var(--qz-primary); }
@media (min-width: 768px) { .quiz-bars-title { margin-bottom: 2rem; padding-bottom: 1rem; } }
.quiz-bar-row { margin-bottom: 1.25rem; }
.quiz-bar-head { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1rem; font-weight: 600; color: var(--qz-on); }
.quiz-bar-pct { font-size: 0.75rem; color: var(--qz-muted); }
.quiz-bar-track { height: 6px; border-radius: 9999px; background: var(--qz-surface-highest); overflow: hidden; }
.quiz-bar-fill { height: 100%; border-radius: 9999px; background: var(--qz-primary); }
.quiz-bar-fill.is-gold { background: var(--qz-gold); }
.quiz-bar-fill.is-error { background: var(--qz-error); }
.quiz-bar-fill.is-secondary { background: var(--qz-secondary); }
.quiz-section-title { margin: 0 0 1rem; text-align: center; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 500; color: var(--qz-primary); }
.quiz-section-desc { margin: 0 auto 2rem; max-width: 32rem; text-align: center; color: var(--qz-muted); }
.quiz-two-col { display: grid; grid-template-columns: 1fr; gap: 1rem; margin: 0; width: 100%; }
@media (min-width: 768px) { .quiz-two-col { gap: 1.5rem; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
.quiz-insight { padding: 1.25rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); }
@media (min-width: 768px) { .quiz-insight { padding: 1.5rem; } }
.quiz-insight-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
.quiz-insight-icon { display: flex; width: 2.5rem; height: 2.5rem; align-items: center; justify-content: center; border-radius: 9999px; }
.quiz-insight-icon.is-good { border: 1px solid rgba(43,167,246,0.3); background: rgba(43,167,246,0.1); color: var(--qz-cyan); }
.quiz-insight-icon.is-warn { border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.1); color: var(--qz-error); }
.quiz-insight h3 { margin: 0; font-size: 1.125rem; font-weight: 500; color: var(--qz-primary); }
.quiz-insight ul { margin: 0; padding: 0; list-style: none; }
.quiz-insight li { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 1rem; line-height: 1.5; color: var(--qz-muted); }
.quiz-priorities { margin: 0; width: 100%; }
.quiz-priorities h2 { margin: 0 0 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--qz-border); font-size: 1.75rem; font-weight: 500; color: var(--qz-primary); }
.quiz-priority-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; width: 100%; }
@media (min-width: 768px) { .quiz-priority-grid { gap: 1.5rem; grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.quiz-priority-card { position: relative; overflow: hidden; padding: 1.25rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); min-height: 8rem; }
.quiz-priority-card-standalone { width: 100%; }
@media (min-width: 768px) { .quiz-priority-card { padding: 1.5rem; } }
.quiz-priority-num { position: absolute; right: -0.5rem; bottom: -1rem; font-size: 5.5rem; line-height: 1; color: var(--qz-surface-high); pointer-events: none; }
@media (min-width: 768px) { .quiz-priority-num { font-size: 7.5rem; } }
.quiz-empty-msg { margin: 0; padding: 1rem; text-align: center; font-size: 0.875rem; color: var(--qz-muted); border: 1px dashed var(--qz-border); border-radius: 0.75rem; }
.quiz-priority-card h3 { position: relative; z-index: 1; margin: 0 0 0.5rem; font-size: 1rem; font-weight: 600; color: var(--qz-primary); }
.quiz-priority-card p { position: relative; z-index: 1; margin: 0; font-size: 1rem; line-height: 1.5; color: var(--qz-muted); }
.quiz-services { display: grid; gap: 1rem; margin-bottom: 2.5rem; }
@media (min-width: 640px) { .quiz-services { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .quiz-services { grid-template-columns: repeat(4, 1fr); } }
.quiz-service-card { padding: 1.5rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); font-size: 1rem; font-weight: 600; color: var(--qz-primary); }
.quiz-cta-box { position: relative; overflow: hidden; padding: 2.5rem 1.5rem; border: 1px solid var(--qz-border); border-radius: 1rem; background: var(--qz-surface); text-align: center; }
.quiz-cta-glow { position: absolute; inset: 0; background: rgba(106,45,232,0.1); filter: blur(100px); pointer-events: none; }
.quiz-cta-box h2 { position: relative; z-index: 1; margin: 0 0 1.5rem; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; color: var(--qz-primary); }
.quiz-cta-box p { position: relative; z-index: 1; margin: 0 auto 2rem; max-width: 32rem; font-size: 1.125rem; line-height: 1.6; color: var(--qz-muted); }
.quiz-cta-actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
`;
