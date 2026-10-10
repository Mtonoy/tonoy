/* Generates dark-theme application-UI mockup SVGs used as
   "sample images" on the project pages.  Run:  node tools/gen-mockups.js */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'assets', 'img', 'mock');
fs.mkdirSync(OUT, { recursive: true });

/* ---------- tiny SVG helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function shell({ w = 1280, h = 800, accent = '#22d3ee', accent2 = '#6366f1', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs>
  <linearGradient id="app" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0d1330"/><stop offset="55%" stop-color="#111a3d"/><stop offset="100%" stop-color="#0a0f26"/>
  </linearGradient>
  <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${accent}"/><stop offset="100%" stop-color="${accent2}"/>
  </linearGradient>
  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${accent}" stop-opacity=".45"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="area2" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${accent2}" stop-opacity=".4"/><stop offset="100%" stop-color="${accent2}" stop-opacity="0"/>
  </linearGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="10"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#app)"/>
<ellipse cx="${w * 0.82}" cy="${h * 0.08}" rx="240" ry="180" fill="${accent}" opacity=".10" filter="url(#soft)"/>
<ellipse cx="${w * 0.12}" cy="${h * 0.95}" rx="220" ry="170" fill="${accent2}" opacity=".10" filter="url(#soft)"/>
${body}
</svg>`;
}

function topbar(title, accent = '#22d3ee') {
  return `<rect x="0" y="0" width="1280" height="56" fill="#0a0f26"/>
<rect x="0" y="55" width="1280" height="1" fill="rgba(255,255,255,.08)"/>
<circle cx="26" cy="28" r="5" fill="#ff5f57"/><circle cx="44" cy="28" r="5" fill="#febc2e"/><circle cx="62" cy="28" r="5" fill="#28c840"/>
<rect x="88" y="19" width="120" height="18" rx="6" fill="url(#acc)" opacity=".9"/>
<text x="98" y="32" font-family="Segoe UI,Arial" font-size="11" font-weight="700" fill="#06121f">${esc(title)}</text>
<rect x="900" y="18" width="250" height="20" rx="10" fill="rgba(255,255,255,.06)"/>
<text x="914" y="32" font-family="Segoe UI,Arial" font-size="10" fill="#8fa0c8">Search modules, records…</text>
<circle cx="1188" cy="28" r="14" fill="rgba(255,255,255,.10)"/>
<text x="1183" y="32" font-family="Segoe UI,Arial" font-size="10" font-weight="700" fill="#cfe0ff">MT</text>
<circle cx="1226" cy="28" r="14" fill="rgba(255,255,255,.06)"/>
<circle cx="1258" cy="28" r="3" fill="${accent}"/>`;
}

function sidebar(items, activeIdx = 0, accent = '#22d3ee') {
  const g = items.map((it, i) => {
    const y = 84 + i * 36;
    const on = i === activeIdx;
    return `${on ? `<rect x="14" y="${y - 20}" width="192" height="30" rx="8" fill="${accent}" opacity=".16"/>
<rect x="14" y="${y - 20}" width="3" height="30" rx="2" fill="${accent}"/>` : ''}
<rect x="28" y="${y - 12}" width="11" height="11" rx="3" fill="${on ? accent : 'rgba(255,255,255,.28)'}"/>
<text x="48" y="${y - 2}" font-family="Segoe UI,Arial" font-size="11.5" font-weight="${on ? 700 : 400}" fill="${on ? '#eaf2ff' : '#94a3c8'}">${esc(it)}</text>`;
  }).join('');
  return `<rect x="0" y="56" width="220" height="744" fill="rgba(255,255,255,.028)"/>
<rect x="219" y="56" width="1" height="744" fill="rgba(255,255,255,.07)"/>
${g}
<rect x="14" y="700" width="192" height="84" rx="12" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)"/>
<text x="28" y="726" font-family="Segoe UI,Arial" font-size="10" fill="#8fa0c8">Storage used</text>
<text x="28" y="750" font-family="Segoe UI,Arial" font-size="15" font-weight="700" fill="#eaf2ff">68%</text>
<rect x="28" y="760" width="164" height="6" rx="3" fill="rgba(255,255,255,.10)"/>
<rect x="28" y="760" width="112" height="6" rx="3" fill="url(#acc)"/>`;
}

function pageTitle(t, sub) {
  return `<text x="252" y="96" font-family="Segoe UI,Arial" font-size="21" font-weight="700" fill="#eef4ff">${esc(t)}</text>
<text x="252" y="116" font-family="Segoe UI,Arial" font-size="11.5" fill="#8fa0c8">${esc(sub)}</text>
<rect x="1054" y="80" width="94" height="30" rx="8" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.12)"/>
<text x="1078" y="99" font-family="Segoe UI,Arial" font-size="11" font-weight="600" fill="#cfe0ff">Export</text>
<rect x="1160" y="80" width="94" height="30" rx="8" fill="url(#acc)"/>
<text x="1178" y="99" font-family="Segoe UI,Arial" font-size="11" font-weight="700" fill="#06121f">+ New</text>`;
}

function kpiRow(items, y = 138) {
  return items.map((k, i) => {
    const x = 252 + i * 258;
    return `<rect x="${x}" y="${y}" width="238" height="96" rx="14" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.09)"/>
<rect x="${x + 14}" y="${y + 14}" width="30" height="30" rx="9" fill="${k.c}" opacity=".18"/>
<rect x="${x + 24}" y="${y + 24}" width="10" height="10" rx="3" fill="${k.c}"/>
<text x="${x + 14}" y="${y + 66}" font-family="Segoe UI,Arial" font-size="22" font-weight="700" fill="#eef4ff">${esc(k.v)}</text>
<text x="${x + 86}" y="${y + 66}" font-family="Segoe UI,Arial" font-size="10" font-weight="700" fill="${k.c}">${esc(k.d)}</text>
<text x="${x + 14}" y="${y + 84}" font-family="Segoe UI,Arial" font-size="10" fill="#8fa0c8">${esc(k.l)}</text>`;
  }).join('');
}

function chart(x, y, w, h, seed = 1) {
  const n = 12;
  const rnd = (i) => {
    const s = Math.sin((i + seed) * 1.7) * .5 + Math.sin((i + seed) * .63) * .35;
    return .5 + s * .28;
  };
  const pts = Array.from({ length: n }, (_, i) => [x + (i / (n - 1)) * w, y + h - rnd(i) * h * .92]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${x + w} ${y + h} L${x} ${y + h} Z`;
  const bars = Array.from({ length: n }, (_, i) => {
    const bh = (rnd(i + 4) * .55 + .12) * h;
    return `<rect x="${(x + i * (w / n) + 8).toFixed(1)}" y="${(y + h - bh).toFixed(1)}" width="${(w / n - 16).toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="#6366f1" opacity=".28"/>`;
  }).join('');
  const dots = pts.map((p, i) => (i % 3 === 0 ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#0d1330" stroke="#22d3ee" stroke-width="2"/>` : '')).join('');
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
${Array.from({ length: 4 }, (_, i) => `<rect x="${x + 16}" y="${y + 26 + i * (h - 46) / 3}" width="${w - 32}" height="1" fill="rgba(255,255,255,.055)"/>`).join('')}
${bars}<path d="${area}" fill="url(#area)"/><path d="${line}" fill="none" stroke="#22d3ee" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
}

function table(x, y, w, cols, rows) {
  const rowH = 30;
  const head = `<rect x="${x}" y="${y}" width="${w}" height="32" rx="8" fill="rgba(255,255,255,.055)"/>
${cols.map((c, i) => `<text x="${x + 16 + i * (w / cols.length)}" y="${y + 21}" font-family="Segoe UI,Arial" font-size="10" font-weight="700" fill="#8fa0c8" letter-spacing=".5">${esc(c)}</text>`).join('')}`;
  const body = rows.map((r, ri) => {
    const ry = y + 38 + ri * rowH;
    return `${ri % 2 ? `<rect x="${x}" y="${ry - 4}" width="${w}" height="${rowH}" fill="rgba(255,255,255,.022)"/>` : ''}
${r.map((cell, ci) => {
      const cx = x + 16 + ci * (w / cols.length);
      const isBadge = typeof cell === 'object';
      const val = isBadge ? cell.t : cell;
      if (isBadge) {
        return `<rect x="${cx - 6}" y="${ry + 1}" width="${cell.w}" height="18" rx="9" fill="${cell.c}" opacity=".18"/>
<text x="${cx + 2}" y="${ry + 14}" font-family="Segoe UI,Arial" font-size="9.5" font-weight="700" fill="${cell.c}">${esc(val)}</text>`;
      }
      return `<text x="${cx}" y="${ry + 14}" font-family="Segoe UI,Arial" font-size="10.5" fill="${ci === 0 ? '#e6eeff' : '#9fb0d4'}" font-weight="${ci === 0 ? 600 : 400}">${esc(val)}</text>`;
    }).join('')}`;
  }).join('');
  return head + body;
}

function write(name, svg) {
  fs.writeFileSync(path.join(OUT, name), svg, 'utf8');
  console.log('  ✓', name, (svg.length / 1024).toFixed(1) + 'kb');
}

const CY = '#22d3ee', IN = '#6366f1', FU = '#d946ef', AM = '#f59e0b', GR = '#22c55e';

/* ═════════════ ERP ═════════════ */
const erpNav = ['Dashboard', 'Sales Orders', 'Procurement', 'Inventory', 'Finance', 'HR & Payroll', 'Production', 'Reports'];
write('erp-dashboard.svg', shell({
  title: 'Nexus ERP',
  body: topbar('NEXUS ERP', CY) + sidebar(erpNav, 0, CY) +
    pageTitle('Executive Dashboard', 'Consolidated performance across all business units · FY 2024–25') +
    kpiRow([
      { v: '৳ 4.82 Cr', d: '▲ 12.4%', l: 'Revenue YTD', c: GR },
      { v: '1,284', d: '▲ 6.1%', l: 'Open Orders', c: CY },
      { v: '97.3%', d: '▲ 2.2%', l: 'On-Time Delivery', c: IN },
      { v: '৳ 1.9 L', d: '▼ 8.0%', l: 'Pending Claims', c: AM }
    ]) +
    chart(252, 258, 620, 230, 2) +
    `<rect x="890" y="258" width="364" height="230" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Revenue by Division</text>
${[['Retail', 68, CY], ['Distribution', 52, IN], ['Micro-finance', 41, FU], ['Services', 26, AM]].map((d, i) => {
      const yy = 306 + i * 46;
      return `<text x="908" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">${d[0]}</text>
<text x="1160" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" font-weight="700" fill="#e6eeff">${d[1]}%</text>
<rect x="908" y="${yy + 8}" width="326" height="7" rx="4" fill="rgba(255,255,255,.07)"/>
<rect x="908" y="${yy + 8}" width="${(326 * d[1] / 70).toFixed(0)}" height="7" rx="4" fill="${d[2]}"/>`;
    }).join('')}` +
    table(252, 512, 1002, ['Order ID', 'Customer', 'Division', 'Value', 'Status'],
      [['SO-24817', 'BRAC Retail', 'Retail', '৳ 18,40,000', { t: 'Shipped', c: GR, w: 58 }],
        ['SO-24816', 'Priyojon Ltd', 'Distribution', '৳ 9,72,500', { t: 'Approved', c: CY, w: 62 }],
        ['SO-24815', 'BNB Holdings', 'Micro-finance', '৳ 24,10,000', { t: 'In Production', c: AM, w: 84 }],
        ['SO-24814', 'Aloha Group', 'Services', '৳ 3,15,200', { t: 'Delivered', c: GR, w: 64 }]])
}));

write('erp-orders.svg', shell({
  title: 'Nexus ERP',
  accent: '#22d3ee',
  body: topbar('NEXUS ERP', CY) + sidebar(erpNav, 1, CY) +
    pageTitle('Sales Orders', 'Search, approve and track the full order lifecycle') +
    `<rect x="252" y="138" width="1002" height="40" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<rect x="266" y="148" width="300" height="20" rx="6" fill="rgba(255,255,255,.05)"/>
<text x="280" y="162" font-family="Segoe UI,Arial" font-size="10.5" fill="#7e8db4">Filter by customer, division or status…</text>
${['All', 'Pending', 'Approved', 'Shipped', 'Closed'].map((f, i) => `<rect x="${592 + i * 92}" y="146" width="80" height="24" rx="12" fill="${i === 2 ? 'url(#acc)' : 'rgba(255,255,255,.05)'}"/>
<text x="${608 + i * 92}" y="162" font-family="Segoe UI,Arial" font-size="10" font-weight="600" fill="${i === 2 ? '#06121f' : '#9fb0d4'}">${f}</text>`).join('')}` +
    table(252, 196, 1002, ['Order ID', 'Customer', 'Division', 'Order Date', 'Value', 'Status', 'Action'],
      Array.from({ length: 13 }, (_, i) => {
        const cust = ['BRAC Retail', 'Priyojon Ltd', 'BNB Holdings', 'Aloha Group', 'Red Cross BD', 'NRB Bangladesh', 'ASA Trading'][i % 7];
        const div = ['Retail', 'Distribution', 'Micro-finance', 'Services'][i % 4];
        const st = [{ t: 'Shipped', c: GR, w: 58 }, { t: 'Approved', c: CY, w: 62 }, { t: 'Draft', c: '#94a3c8', w: 44 }, { t: 'In Production', c: AM, w: 84 }, { t: 'Delivered', c: GR, w: 64 }][i % 5];
        return [`SO-248${17 - i}`, cust, div, `0${(i % 9) + 1}/0${(i % 7) + 3}/2024`, `৳ ${(12 + i * 3)}.4 L`, st, i % 2 ? 'View' : 'Edit'];
      }))
}));

write('erp-inventory.svg', shell({
  title: 'Nexus ERP', accent: '#22d3ee',
  body: topbar('NEXUS ERP', CY) + sidebar(erpNav, 3, CY) +
    pageTitle('Inventory Control', 'Multi-warehouse stock ledger with live reorder alerts') +
    kpiRow([
      { v: '18,420', d: '▲ 4.0%', l: 'SKUs Active', c: CY },
      { v: '6', d: '—', l: 'Warehouses', c: IN },
      { v: '142', d: '▼ 9.1%', l: 'Reorder Alerts', c: AM },
      { v: '৳ 3.6 Cr', d: '▲ 2.8%', l: 'Stock Value', c: GR }
    ]) +
    chart(252, 258, 620, 220, 5) +
    `<rect x="890" y="258" width="364" height="220" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Stock Health</text>
<circle cx="1072" cy="366" r="66" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="16"/>
<circle cx="1072" cy="366" r="66" fill="none" stroke="#22c55e" stroke-width="16" stroke-dasharray="240 414" stroke-linecap="round" transform="rotate(-90 1072 366)"/>
<circle cx="1072" cy="366" r="66" fill="none" stroke="#f59e0b" stroke-width="16" stroke-dasharray="52 414" stroke-dashoffset="-248" stroke-linecap="round" transform="rotate(-90 1072 366)"/>
<text x="1046" y="372" font-family="Segoe UI,Arial" font-size="20" font-weight="700" fill="#eef4ff">86%</text>
<text x="1046" y="388" font-family="Segoe UI,Arial" font-size="9" fill="#8fa0c8">healthy</text>` +
    table(252, 502, 1002, ['SKU', 'Item', 'Warehouse', 'On Hand', 'Reorder', 'Status'],
      [['RM-4471', 'Cotton Yarn 30s', 'Dhaka Central', '12,400', '8,000', { t: 'Healthy', c: GR, w: 56 }],
        ['RM-1180', 'Steel Bar 12mm', 'Chattogram', '620', '1,500', { t: 'Reorder', c: AM, w: 52 }],
        ['FG-9032', 'Assembly Unit V2', 'Gazipur', '3,180', '2,000', { t: 'Healthy', c: GR, w: 56 }]])
}));

/* ═════════════ FIELD FORCE ═════════════ */
const ffNav = ['Command Centre', 'Field Officers', 'Territories', 'Visits', 'Leads', 'Orders', 'Performance'];
write('ffm-command.svg', shell({
  title: 'FieldForce',
  accent: AM,
  body: topbar('FIELDFORCE', AM) + sidebar(ffNav, 0, AM) +
    pageTitle('Command Centre', 'Live view of every field officer on the road right now') +
    kpiRow([
      { v: '412', d: '▲ 18', l: 'Officers Active', c: GR },
      { v: '1,986', d: '▲ 6.2%', l: 'Visits Today', c: CY },
      { v: '347', d: '▲ 11.8%', l: 'Leads Captured', c: IN },
      { v: '৳ 8.4 L', d: '▲ 9.4%', l: 'Booked Today', c: AM }
    ]) +
    `<rect x="252" y="258" width="620" height="360" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="270" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Territory Coverage</text>
<path d="M300 320 L420 300 L560 340 L700 296 L840 340 L830 470 L700 500 L560 470 L420 510 L300 470 Z" fill="#22c55e" opacity=".08" stroke="rgba(255,255,255,.10)" stroke-width="1.5"/>
${Array.from({ length: 7 }, (_, i) => `<path d="M${300 + i * 90} ${310 + (i % 3) * 40} L${420 + i * 90} ${360 + (i % 2) * 60} L${500 + i * 90} ${320 + (i % 3) * 50}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1"/>`).join('')}
${[['352', '412', GR, 'Rafi'], ['452', '486', CY, 'Nadia'], ['556', '404', GR, 'Tanvir'], ['648', '520', AM, 'Sadia'], ['742', '470', GR, 'Jahid'], ['806', '430', CY, 'Rima']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="16" fill="${c}" opacity=".20"/><circle cx="${x}" cy="${y}" r="6" fill="${c}"/><circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${c}" stroke-width="1.5" opacity=".6"><animate attributeName="r" values="10;30" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="2.4s" repeatCount="indefinite"/></circle>`).join('')}
<text x="270" y="600" font-family="Segoe UI,Arial" font-size="9.5" fill="#8fa0c8">● 312 on-site   ● 74 travelling   ● 26 on leave</text>` +
    `<rect x="890" y="258" width="364" height="360" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Today's Target</text>
<text x="908" y="318" font-family="Segoe UI,Arial" font-size="26" font-weight="700" fill="#eef4ff">74%</text>
<rect x="908" y="332" width="328" height="10" rx="5" fill="rgba(255,255,255,.08)"/>
<rect x="908" y="332" width="243" height="10" rx="5" fill="url(#acc)"/>
${[['Outlet visits', 186, 220], ['New outlets', 34, 45], ['Reorders', 128, 180], ['Collections', 92, 150]].map((d, i) => {
      const yy = 376 + i * 56;
      return `<text x="908" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">${d[0]}</text>
<text x="1180" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" font-weight="700" fill="#e6eeff">${d[1]} / ${d[2]}</text>
<rect x="908" y="${yy + 9}" width="328" height="6" rx="3" fill="rgba(255,255,255,.07)"/>
<rect x="908" y="${yy + 9}" width="${(328 * d[1] / d[2]).toFixed(0)}" height="6" rx="3" fill="${['#22d3ee', '#6366f1', '#f59e0b', '#22c55e'][i]}"/>`;
    }).join('')}`
}));

write('ffm-visits.svg', shell({
  title: 'FieldForce', accent: '#f59e0b',
  body: topbar('FIELDFORCE', AM) + sidebar(ffNav, 3, AM) +
    pageTitle('Visit Schedule', 'Plan, assign and geo-verify every outlet visit') +
    `<rect x="252" y="138" width="1002" height="44" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
${['‹', 'Today', '›'].map((t, i) => `<rect x="${268 + i * 78}" y="146" width="${i === 1 ? 62 : 44}" height="28" rx="8" fill="${i === 1 ? 'url(#acc)' : 'rgba(255,255,255,.05)'}"/>
<text x="${(i === 1 ? 282 : 280) + i * 78}" y="165" font-family="Segoe UI,Arial" font-size="10.5" font-weight="600" fill="${i === 1 ? '#06121f' : '#9fb0d4'}">${t}</text>`).join('')}
${['Dhaka North', 'Dhaka South', 'Gazipur', 'Chattogram'].map((t, i) => `<rect x="${520 + i * 118}" y="148" width="106" height="24" rx="12" fill="${i === 0 ? 'rgba(255,255,255,.10)' : 'rgba(255,255,255,.04)'}"/>
<text x="${540 + i * 118}" y="164" font-family="Segoe UI,Arial" font-size="10" fill="${i === 0 ? '#e6eeff' : '#8fa0c8'}">${t}</text>`).join('')}` +
    table(252, 200, 1002, ['Time', 'Officer', 'Outlet', 'Address', 'Purpose', 'Status'],
      Array.from({ length: 14 }, (_, i) => {
        const st = [{ t: 'Completed', c: GR, w: 66 }, { t: 'In Progress', c: AM, w: 70 }, { t: 'Planned', c: '#94a3c8', w: 54 }, { t: 'Missed', c: '#fb7185', w: 50 }][i % 4];
        return [`0${9 + (i % 2)}:${(i * 7 % 60).toString().padStart(2, '0')}`,
        ['Rafi Ahmed', 'Nadia Islam', 'Tanvir Hasan', 'Sadia Akter', 'Jahid Khan', 'Rima Sultana'][i % 6],
        ['Shahab Superstore', 'Bismillah Store', 'Al-Modina Mart', 'New Century Plaza', 'Bismillah Store', 'Al-Modina Mart'][i % 6],
        ['Mirpur DOHS', 'Uttara Sector-2', 'Gazipur Sadar', 'Dhanmondi 32', 'Uttara Sector-2', 'Savar Upazila'][i % 6],
        ['New Outlet', 'Reorder', 'Collection', 'New Outlet', 'Reorder', 'Collection'][i % 3],
        st];
      }))
}));

/* ═════════════ ACCOUNTING ═════════════ */
const accNav = ['Dashboard', 'Vouchers', 'Ledgers', 'Trial Balance', 'VAT Returns', 'Payables', 'Receivables', 'Reports'];
write('accounts-ledger.svg', shell({
  title: 'FinBooks',
  accent: FU,
  body: topbar('FINBOOKS · NRB', FU) + sidebar(accNav, 2, FU) +
    pageTitle('General Ledger', 'Double-entry ledger with full audit trail · Fiscal Year 2024–25') +
    kpiRow([
      { v: '৳ 8.4 Cr', d: '▲ 5.6%', l: 'Turnover', c: CY },
      { v: '৳ 1.12 Cr', d: '▲ 3.1%', l: 'Gross Profit', c: GR },
      { v: '৳ 21.4 L', d: '▲ 1.8%', l: 'VAT Payable', c: AM },
      { v: '৳ 46 L', d: '▼ 12.5%', l: 'Receivables', c: FU }
    ]) +
    chart(252, 258, 620, 226, 9) +
    `<rect x="890" y="258" width="364" height="226" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Balance Summary</text>
${[['Cash & Bank', '৳ 18,42,300', GR], ['Accounts Receivable', '৳ 46,10,250', CY], ['Inventory', '৳ 32,78,400', IN], ['Accounts Payable', '৳ 27,15,880', AM], ['VAT Payable', '৳ 21,40,600', FU]].map((d, i) => {
      const yy = 316 + i * 32;
      return `<text x="908" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">${d[0]}</text>
<text x="1146" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" font-weight="700" fill="${d[2]}">${d[1]}</text>
<rect x="908" y="${yy + 8}" width="328" height="1" fill="rgba(255,255,255,.05)"/>`;
    }).join('')}` +
    table(252, 508, 1002, ['Voucher', 'Date', 'Particulars', 'Ledger', 'Debit', 'Credit'],
      [['JV-9912', '12/02/2024', 'Sales — A. Rahman Traders', 'Sales', '—', '৳ 4,82,000'],
        ['PV-4487', '12/02/2024', 'Purchase — NRB Supplies', 'Purchase', '৳ 2,10,400', '—'],
        ['CV-1130', '11/02/2024', 'Freight & Logistics', 'Expense', '৳ 18,900', '—'],
        ['JV-9909', '11/02/2024', 'VAT Input Credit', 'VAT', '৳ 36,750', '—']])
}));

write('accounts-vat.svg', shell({
  title: 'FinBooks', accent: '#d946ef',
  body: topbar('FINBOOKS · NRB', FU) + sidebar(accNav, 4, FU) +
    pageTitle('VAT Return — NRB', 'Statutory return auto-generated from validated sales & purchase ledgers') +
    `<rect x="252" y="138" width="620" height="150" rx="14" fill="rgba(217,70,239,.07)" stroke="rgba(217,70,239,.22)"/>
<circle cx="300" cy="196" r="26" fill="rgba(34,197,94,.16)"/>
<path d="M291 196 l7 8 l14 -17" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<text x="344" y="192" font-family="Segoe UI,Arial" font-size="15" font-weight="700" fill="#eef4ff">Filing status: Verified &amp; Ready</text>
<text x="344" y="212" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">Validated against NRB schema · period 01–15 / 2024</text>
<text x="344" y="232" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">Generated 12/02/2024 18:40 · by Md. M. H. Tonoy</text>
<rect x="700" y="176" width="152" height="34" rx="9" fill="url(#acc)"/>
<text x="726" y="197" font-family="Segoe UI,Arial" font-size="11" font-weight="700" fill="#06121f">Submit to NRB</text>` +
    kpiRow([
      { v: '৳ 96,40,000', d: 'Taxable', l: 'Total Sales', c: CY },
      { v: '৳ 9,64,000', d: 'Output', l: 'VAT Charged', c: AM },
      { v: '৳ 4,12,500', d: 'Input', l: 'VAT Paid', c: GR },
      { v: '৳ 5,51,500', d: 'Payable', l: 'Net VAT', c: FU }
    ], 312) +
    table(252, 442, 1002, ['Section', 'Description', 'Taxable Amount', 'Rate', 'Tax Amount'],
      [['A', 'Sales of manufactured goods', '৳ 62,40,000', '15%', '৳ 9,36,000'],
        ['B', 'Sales of trading goods', '৳ 28,10,000', '15%', '৳ 4,21,500'],
        ['C', 'Services', '৳ 5,90,000', '15%', '৳ 88,500'],
        ['D', 'Input VAT credit', '—', '—', '(-) ৳ 4,12,500']])
}));

/* ═════════════ SCHOOL ═════════════ */
const scNav = ['Overview', 'Students', 'Admissions', 'Attendance', 'Exams & Grades', 'Payroll', 'Fees', 'Transport'];
write('school-dashboard.svg', shell({
  title: 'EduCore',
  accent: GR,
  body: topbar('EDUCORE', GR) + sidebar(scNav, 0, GR) +
    pageTitle('School Overview', 'Aloha Bangladesh · Academic Year 2024–25') +
    kpiRow([
      { v: '4,182', d: '▲ 214', l: 'Total Students', c: CY },
      { v: '96.4%', d: '▲ 1.2%', l: 'Avg Attendance', c: GR },
      { v: '248', d: '—', l: 'Teaching Staff', c: IN },
      { v: '৳ 12.6 L', d: '▲ 5.1%', l: 'Fees Collected', c: AM }
    ]) +
    chart(252, 258, 620, 226, 13) +
    `<rect x="890" y="258" width="364" height="226" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Students by Class</text>
${['Class I', 'Class III', 'Class V', 'Class VII', 'Class IX', 'Class XI'].map((c, i) => {
      const yy = 312 + i * 28;
      const w = [180, 220, 260, 210, 300, 240][i];
      return `<text x="908" y="${yy}" font-family="Segoe UI,Arial" font-size="10" fill="#9fb0d4">${c}</text>
<rect x="972" y="${yy - 10}" width="${w}" height="8" rx="4" fill="rgba(255,255,255,.06)"/>
<rect x="972" y="${yy - 10}" width="${(w * 0.7).toFixed(0)}" height="8" rx="4" fill="${[CY, IN, GR, AM, FU, '#22d3ee'][i]}"/>`;
    }).join('')}` +
    table(252, 508, 1002, ['Student ID', 'Name', 'Class', 'Guardian', 'Fees Due', 'Status'],
      [['STU-4021', 'Ayesha Rahman', 'Class IX', 'Md. Rahim', '৳ 2,400', { t: 'Paid', c: GR, w: 42 }],
        ['STU-4022', 'Imran Kabir', 'Class V', 'Nasir Uddin', '৳ 0', { t: 'Paid', c: GR, w: 42 }],
        ['STU-4023', 'Tasnim Jahan', 'Class XI', 'Salma Akter', '৳ 5,600', { t: 'Due', c: AM, w: 38 }]])
}));

write('school-payroll.svg', shell({
  title: 'EduCore', accent: '#22c55e',
  body: topbar('EDUCORE', GR) + sidebar(scNav, 5, GR) +
    pageTitle('Payroll Run', 'Integrated monthly salary with attendance-linked deductions') +
    kpiRow([
      { v: '248', d: 'Staff', l: 'Employees', c: CY },
      { v: '৳ 18,42,600', d: 'Gross', l: 'Total Payroll', c: GR },
      { v: '৳ 1,24,800', d: 'Auto', l: 'Deductions', c: AM },
      { v: '৳ 17,17,800', d: 'Net', l: 'Disbursed', c: IN }
    ]) +
    `<rect x="252" y="258" width="1002" height="58" rx="14" fill="rgba(34,197,94,.07)" stroke="rgba(34,197,94,.22)"/>
<text x="276" y="284" font-family="Segoe UI,Arial" font-size="12.5" font-weight="700" fill="#eef4ff">Attendance sync complete — 2,914 records imported from the biometric device</text>
<text x="276" y="302" font-family="Segoe UI,Arial" font-size="10.5" fill="#9fb0d4">Absence deductions calculated automatically · 11 overrides pending approval</text>
<rect x="1060" y="272" width="176" height="30" rx="9" fill="url(#acc)"/>
<text x="1092" y="291" font-family="Segoe UI,Arial" font-size="11" font-weight="700" fill="#06121f">Approve &amp; Disburse</text>` +
    table(252, 336, 1002, ['Emp ID', 'Name', 'Designation', 'Basic', 'Deductions', 'Net Pay', 'Status'],
      Array.from({ length: 11 }, (_, i) => [
        `EMP-${120 + i}`,
        ['Farhana Ahmed', 'Rifat Hasan', 'Sabina Yasmin', 'Nayeem Chowdhury', 'Tania Akter', 'Shafiq Rahman', 'Maliha Noor', 'Zahid Hasan', 'Rina Paul', 'Asif Iqbal', 'Nusrat Jahan'][i],
        ['Senior Teacher', 'Assistant Teacher', 'Head of Dept.', 'Senior Teacher', 'Accounts Officer', 'Lab Assistant', 'Junior Teacher', 'Senior Teacher', 'Librarian', 'Driver', 'Peon'][i],
        `৳ ${[28000, 22000, 34000, 26000, 25000, 19000, 18000, 29000, 21000, 15000, 12000][i].toLocaleString('en-IN')}`,
        `৳ ${[0, 1200, 0, 800, 2400, 0, 600, 0, 900, 0, 300][i].toLocaleString('en-IN')}`,
        `৳ ${[28000, 20800, 34000, 25200, 22600, 19000, 17400, 29000, 20100, 15000, 11700][i].toLocaleString('en-IN')}`,
        { t: i < 8 ? 'Approved' : 'Pending', c: i < 8 ? GR : AM, w: i < 8 ? 58 : 52 }
      ]))
}));

/* ═════════════ HRM ═════════════ */
const hrNav = ['Dashboard', 'Employees', 'Recruitment', 'Attendance', 'Leave', 'Payroll', 'Performance'];
write('hrm-directory.svg', shell({
  title: 'PeopleHub',
  accent: IN,
  body: topbar('PEOPLEHUB', IN) + sidebar(hrNav, 1, IN) +
    pageTitle('Employee Directory', 'Red Cross Bangladesh · Human resource master records') +
    kpiRow([
      { v: '1,642', d: '▲ 74', l: 'Active Employees', c: CY },
      { v: '96', d: '▲ 18', l: 'This Month', c: GR },
      { v: '11', d: '—', l: 'Departments', c: IN },
      { v: '28', d: '▼ 5', l: 'Open Requisitions', c: AM }
    ]) +
    `<rect x="252" y="258" width="1002" height="44" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<rect x="268" y="268" width="340" height="24" rx="7" fill="rgba(255,255,255,.05)"/>
<text x="284" y="284" font-family="Segoe UI,Arial" font-size="10.5" fill="#7e8db4">Search by name, employee ID or designation…</text>
${['All Departments', 'Health', 'Logistics', 'Finance', 'Programs'].map((t, i) => `<rect x="${640 + i * 122}" y="270" width="112" height="20" rx="10" fill="${i === 0 ? 'url(#acc)' : 'rgba(255,255,255,.05)'}"/>
<text x="${654 + i * 122}" y="284" font-family="Segoe UI,Arial" font-size="9" font-weight="${i === 0 ? 700 : 400}" fill="${i === 0 ? '#06121f' : '#9fb0d4'}">${t}</text>`).join('')}` +
    table(252, 322, 1002, ['Emp ID', 'Name', 'Department', 'Designation', 'Joined', 'Status'],
      Array.from({ length: 12 }, (_, i) => [
        `RCE-${4100 + i}`,
        ['Sumaiya Rahman', 'Abdul Karim', 'Nusrat Jahan', 'Tanvir Ahmed', 'Rehana Begum', 'Shafiq Alam', 'Momena Khatun', 'Jashim Uddin', 'Farhana Ali', 'Rubel Islam', 'Shirin Akter', 'Mizanur Rahman'][i],
        ['Health', 'Logistics', 'Programs', 'Finance', 'Health', 'Logistics', 'Programs', 'Admin', 'Health', 'Finance', 'Programs', 'Admin'][i],
        ['Medical Officer', 'Logistics Officer', 'Programme Manager', 'Accounts Officer', 'Nurse Supervisor', 'Warehouse Officer', 'Field Officer', 'HR Officer', 'Pharmacist', 'Audit Officer', 'Volunteer Coord.', 'IT Support'][i],
        ['12/0' + (i % 9 + 1) + '/2019', '12/0' + (i % 9 + 2) + '/2021', '03/07/2020', '11/04/2022', '06/02/2023', '08/09/2018', '12/12/2021', '02/03/2019', '07/07/2024', '05/05/2020', '01/10/2023', '09/11/2022'][i],
        { t: i === 10 ? 'On Leave' : 'Active', c: i === 10 ? AM : GR, w: i === 10 ? 56 : 44 }
      ]))
}));

write('hrm-leave.svg', shell({
  title: 'PeopleHub', accent: '#6366f1',
  body: topbar('PEOPLEHUB', IN) + sidebar(hrNav, 4, IN) +
    pageTitle('Leave Management', 'Applications, balances and approvals across all departments') +
    kpiRow([
      { v: '46', d: '▲ 9', l: 'Pending Requests', c: AM },
      { v: '2,104', d: '▲ 6%', l: 'Days Taken YTD', c: CY },
      { v: '18', d: 'Approved', l: 'Sanctioned Today', c: GR },
      { v: '31%', d: 'Avg', l: 'Balance Left', c: IN }
    ]) +
    `<rect x="252" y="258" width="620" height="368" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="270" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Leave Balance by Category</text>
${[['Casual', 62, CY], ['Medical', 84, GR], ['Annual', 41, IN], ['Maternity', 22, FU], ['Compensatory', 55, AM]].map((d, i) => {
      const yy = 318 + i * 60;
      return `<text x="270" y="${yy}" font-family="Segoe UI,Arial" font-size="11" fill="#cfe0ff">${d[0]}</text>
<text x="820" y="${yy}" font-family="Segoe UI,Arial" font-size="11" font-weight="700" fill="#e6eeff">${d[1]}%</text>
<rect x="270" y="${yy + 10}" width="550" height="14" rx="7" fill="rgba(255,255,255,.06)"/>
<rect x="270" y="${yy + 10}" width="${(550 * d[1] / 100).toFixed(0)}" height="14" rx="7" fill="${d[2]}" opacity=".75"/>
${Array.from({ length: 22 }, (_, k) => `<rect x="${272 + k * 25}" y="${yy + 10}" width="2" height="14" fill="#0d1330" opacity=".55"/>`).join('')}`;
    }).join('')}
<text x="270" y="612" font-family="Segoe UI,Arial" font-size="9.5" fill="#8fa0c8">Each block = 5 days of entitlement · accrues monthly</text>` +
    `<rect x="890" y="258" width="364" height="368" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)"/>
<text x="908" y="284" font-family="Segoe UI,Arial" font-size="12" font-weight="700" fill="#eef4ff">Pending Approval</text>
${[['Sumaiya Rahman', 'Medical', '3 days', '12 Feb'],
        ['Abdul Karim', 'Casual', '1 day', '12 Feb'],
        ['Tanvir Ahmed', 'Annual', '7 days', '11 Feb'],
        ['Rehana Begum', 'Medical', '2 days', '11 Feb'],
        ['Shafiq Alam', 'Compensatory', '1 day', '10 Feb']].map((d, i) => {
      const yy = 312 + i * 60;
      return `<rect x="908" y="${yy - 18}" width="328" height="48" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)"/>
<text x="922" y="${yy}" font-family="Segoe UI,Arial" font-size="10.5" font-weight="700" fill="#e6eeff">${d[0]}</text>
<text x="922" y="${yy + 15}" font-family="Segoe UI,Arial" font-size="9.5" fill="#8fa0c8">${d[1]} · ${d[2]}</text>
<text x="1180" y="${yy + 8}" font-family="Segoe UI,Arial" font-size="9" fill="#7e8db4">${d[3]}</text>
<rect x="1148" y="${yy + 4}" width="24" height="20" rx="6" fill="rgba(34,197,94,.18)"/>
<path d="M1154 14 l5 6 l8 -11" transform="translate(0,${yy - 32})" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
<rect x="1180" y="${yy + 4}" width="24" height="20" rx="6" fill="rgba(251,113,133,.18)"/>
<path d="M1187 ${yy + 14} l10 10 M1197 ${yy + 14} l-10 10" stroke="#fb7185" stroke-width="2" stroke-linecap="round"/>`;
    }).join('')}`
}));

console.log('\nAll mockups written to assets/img/mock/');