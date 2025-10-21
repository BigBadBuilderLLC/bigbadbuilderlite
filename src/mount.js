export function mount(root){
  const wrap = document.createElement('div');
  wrap.style.cssText = 'font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;padding:20px;max-width:860px;margin:24px auto;background:#141826;color:#e6e6e6;border-radius:16px;border:1px solid #1d2233';
  wrap.innerHTML = `
    <h1 style="margin:0 0 6px">Big Bad Builder — Estimator</h1>
    <p style="opacity:.75;margin-top:0">Vite starter. Replace with your real app.</p>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button id="buy" style="padding:10px 16px;border-radius:9999px;border:1px solid #2c3150;background:#1b2140;color:#e6e6e6;cursor:pointer">Buy Now (placeholder)</button>
      <a href="mailto:sales@bigbadbuilder.com?subject=Instant%20Quote" style="padding:10px 16px;border-radius:9999px;border:1px solid #2c3150;background:#1b2140;color:#e6e6e6;text-decoration:none">Email Us</a>
    </div>
    <pre id="log" style="margin-top:16px;background:#0c0e14;border:1px solid #1d2233;border-radius:10px;padding:12px;min-height:80px"></pre>
  `;
  root.appendChild(wrap);
  document.getElementById('buy').addEventListener('click', () => {
    const log = document.getElementById('log');
    const t = new Date().toLocaleString();
    log.textContent += `[${t}] Buy Now clicked (placeholder)\n`;
  });
}
