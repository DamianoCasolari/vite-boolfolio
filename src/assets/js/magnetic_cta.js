// Riflesso "liquid glass" che insegue il cursore + leggero pull magnetico
// sui bottoni CTA del sito. Aggiorna solo variabili CSS sull'elemento
// (nessun re-render Vue di mezzo), così resta fluido anche a mousemove
// ad alta frequenza. Va abbinato al mixin `magnetic-cta` in
// src/styles/partials/_magnetic_cta.scss, che legge --mx/--my/--tx/--ty.

export function onMagneticMove(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();

  const mx = ((event.clientX - rect.left) / rect.width) * 100;
  const my = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--mx", `${mx}%`);
  el.style.setProperty("--my", `${my}%`);

  const pull = 0.18;
  const tx = (event.clientX - (rect.left + rect.width / 2)) * pull;
  const ty = (event.clientY - (rect.top + rect.height / 2)) * pull;
  el.style.setProperty("--tx", `${tx.toFixed(1)}px`);
  el.style.setProperty("--ty", `${ty.toFixed(1)}px`);
}

export function onMagneticLeave(event) {
  const el = event.currentTarget;
  el.style.setProperty("--tx", "0px");
  el.style.setProperty("--ty", "0px");
}
