/* SlideDope — make slide decks in Obsidian.
 *
 * Opens .html deck files (<div id="deck"> with <section class="slide"> children)
 * in a PPTX-like editor tab. Keyboard-first: arrows navigate, Shift+arrows
 * multi-select, ⌘X/⌘C/⌘V cut/copy/paste (slides and images), Delete removes,
 * ⌘↑/⌘↓ reorders, ⌘Z/⌘⇧Z undo/redo. A floating format toolbar (bold / theme
 * colors / font size / clear) appears on text selection; pastes are downgraded
 * to plain text and serialized HTML is normalized so decks stay clean. Images
 * paste from the clipboard into <deck folder>/images/ and can be dragged
 * (with center snap guides), nudged with arrow keys, and resized by the
 * corner grip.
 *
 * Decks are single self-contained HTML files that play in any browser: page
 * counter, fullscreen (F), hash page memory, and print-to-PDF CSS included.
 *
 * "AI mode" (optional) sends the selected slide + deck CSS + an instruction
 * to the local `claude` CLI (headless -p) and swaps in the regenerated
 * <section>.
 *
 * Non-deck .html files fall back to a read-only preview and round-trip
 * byte-identical on save.
 */
'use strict';

const { Plugin, TextFileView, Notice, Modal, PluginSettingTab, Setting, normalizePath } = require('obsidian');

const VIEW_TYPE = 'slidedope';
const NATIVE_W = 1280;
const NATIVE_H = 720;
const MAX_UNDO = 50;
const SNAP_PX = 8;

const DEFAULT_SETTINGS = {
  claudeCmd: 'claude',
  claudeModel: '',
  newFileFolder: 'presentations',
};

/* ================================================================
 * i18n — English default, Traditional Chinese when Obsidian runs zh
 * (Obsidian stores its UI language in localStorage under "language")
 * ================================================================ */

const LANG = (() => {
  try {
    const l = window.localStorage.getItem('language');
    if (l && l.toLowerCase().startsWith('zh')) return 'zh-TW';
  } catch (e) { /* no localStorage (tests) → en */ }
  return 'en';
})();

const STRINGS = {
  en: {
    aiMode: '✨ AI mode',
    editMode: '✏️ Edit mode',
    partLabel: 'Section label',
    partPlaceholder: 'e.g. ① Intro',
    duplicateSlideBtn: '＋ Duplicate slide',
    blankSlideBtn: '＋ Blank slide',
    previewBtn: '▶ Preview',
    saved: 'Saved',
    unsaved: 'Unsaved',
    sidebarHint: 'Shift+↑↓ multi-select · ⌘X/⌘C/⌘V cut/copy/paste · Delete removes · ⌘↑↓ reorder · ⌘Z undo | select text = format toolbar | images: click then arrow keys to nudge (Shift=10px), ⌘X/⌘C/Delete, drag corner to resize',
    chatTitle: 'AI edit',
    chatTarget: (n) => `Target: slide ${n}`,
    chatHint: '(click a thumbnail to switch target, Enter to send)',
    chatPlaceholder: 'Tell the AI how to change this slide…',
    send: 'Send',
    fallbackMsg: 'This HTML file has no <div id="deck"> structure — showing a read-only preview.',
    noPartLabel: '(no section label)',
    unnamedPart: '(unnamed section)',
    noticeCopiedSlides: (n) => `Copied ${n} slide${n > 1 ? 's' : ''} — ⌘V to paste`,
    noticeKeepOneNoCutAll: 'At least one slide must remain — cannot cut all',
    noticeKeepOne: 'At least one slide must remain',
    noticeDeleted: (n) => `Deleted ${n} slide${n > 1 ? 's' : ''} (⌘Z to undo)`,
    noticeCutImage: 'Image cut — go to the target slide and press ⌘V',
    noticeCopiedImage: 'Image copied — ⌘V to paste',
    imgSaveFailed: (msg) => 'Failed to save image: ' + msg,
    aiBusy: 'AI is still working, please wait',
    aiTimeout: 'Timed out after 4 minutes, aborted',
    aiNoSection: 'No <section> slide found in the response',
    aiInvalidSection: 'The returned <section> is not a valid slide (missing class="slide")',
    aiUpdated: (n) => `✅ Updated slide ${n} (⌘Z to undo)`,
    aiGenerating: '⏳ Claude is generating…',
    chatUserPrefix: (n) => `Slide ${n}: `,
    upgradeNotDeck: 'The current file is not a deck — cannot upgrade',
    upgradeNoScript: 'Deck navigation script (partNav) not found — cannot upgrade',
    upgradeDone: 'Player upgraded: page counter, fullscreen (F), page memory, print-to-PDF',
    upgradeUpToDate: 'This deck already has the latest player',
    extTaken: 'SlideDope: .html is handled by another plugin. Disable it, then re-enable SlideDope.',
    createdFile: (path) => 'Created ' + path,
    duplicated: (path) => 'Created copy: ' + path,
    newSlideKicker: 'Section label',
    newSlideTitle: 'New slide title',
    newSlideBody: 'Double-click to start editing…',
    fmtBoldTitle: 'Bold',
    fmtSizeUp: 'A+', fmtSizeUpTitle: 'Font size: larger',
    fmtSizeReset: 'A', fmtSizeResetTitle: 'Font size: reset',
    fmtSizeDown: 'A−', fmtSizeDownTitle: 'Font size: smaller',
    fmtClear: 'Clear format', fmtClearTitle: 'Remove bold/color/size from the selection',
    fmtColorTitle: (c) => 'Text color ' + c,
    cmdNew: 'New presentation (choose template)',
    cmdSave: 'Save presentation',
    cmdDuplicate: 'Duplicate current presentation',
    cmdUpgrade: 'Upgrade deck player (page counter / fullscreen / page memory / PDF)',
    setCmdName: 'claude command',
    setCmdDesc: 'CLI command used by AI mode (run via login shell; usually just "claude")',
    setModelName: 'claude model',
    setModelDesc: 'Leave empty for the CLI default; e.g. sonnet / opus / haiku',
    setFolderName: 'New deck folder',
    setFolderDesc: 'Where the "New presentation" command creates files',
    chooseTemplate: 'Choose a template',
    tplPreviewText: 'Aa Title',
    tplDarkName: 'Midnight gold', tplDarkDesc: 'Dark background with gold & purple accents',
    tplCreamName: 'Cream orange', tplCreamDesc: 'Cream background, ochre accent, serif headings',
    tplWhiteName: 'Minimal white', tplWhiteDesc: 'White, black text, a dash of red',
    tplBlankName: 'Blank', tplBlankDesc: 'A single empty white slide',
    starterPart1: '① Intro', starterPart2: '② Content', starterPart3: '③ Closing',
    stKicker1: 'Opening',
    stTitle: 'Presentation title', stAccent: 'Key message',
    stSubtitle: 'Subtitle goes here',
    stLede: 'One sentence on what this deck delivers to the audience.',
    stKicker2: 'Key points', stContentTitle: 'Content slide title',
    stBullet1: 'Point one: <b>keyword</b> explained',
    stBullet2: 'Point two: supporting detail',
    stBullet3: 'Point three: supporting detail',
    stKicker3: 'Finally', stQA: 'Q&amp;A',
    stQABody: 'Happy to take any questions now.',
    blankTitle: 'Title',
    navPrev: 'Previous slide', navNext: 'Next slide',
    navFullscreen: 'Fullscreen', navFullscreenTitle: 'Fullscreen (F)',
  },
  'zh-TW': {
    aiMode: '✨ AI 模式',
    editMode: '✏️ 編輯模式',
    partLabel: '段落標籤',
    partPlaceholder: '例如：① 開場',
    duplicateSlideBtn: '＋ 複製目前頁',
    blankSlideBtn: '＋ 空白投影片',
    previewBtn: '▶ 預覽',
    saved: '已儲存',
    unsaved: '未儲存',
    sidebarHint: 'Shift+↑↓ 多選・⌘X/⌘C/⌘V 剪下複製貼上・Delete 刪除・⌘↑↓ 移動順序・⌘Z 復原｜選取文字＝格式工具列｜圖片：點選後方向鍵微調（Shift=10px）、⌘X/⌘C/Delete、拖角落縮放',
    chatTitle: 'AI 修改',
    chatTarget: (n) => `目標：第 ${n} 頁`,
    chatHint: '（點左側縮圖切換目標，Enter 送出）',
    chatPlaceholder: '告訴 AI 要怎麼修改這一頁…',
    send: '送出',
    fallbackMsg: '這個 HTML 沒有 <div id="deck"> 簡報結構，以唯讀模式預覽。',
    noPartLabel: '(無段落標籤)',
    unnamedPart: '(未命名段落)',
    noticeCopiedSlides: (n) => `已複製 ${n} 張投影片，⌘V 貼上`,
    noticeKeepOneNoCutAll: '至少要保留一張投影片，無法剪下全部',
    noticeKeepOne: '至少要保留一張投影片',
    noticeDeleted: (n) => `已刪除 ${n} 張投影片（⌘Z 可復原）`,
    noticeCutImage: '已剪下圖片，到目標投影片按 ⌘V 貼上',
    noticeCopiedImage: '已複製圖片，⌘V 貼上',
    imgSaveFailed: (msg) => '圖片儲存失敗：' + msg,
    aiBusy: 'AI 正在處理中，請稍候',
    aiTimeout: '等待超過 4 分鐘，已中止',
    aiNoSection: '回應中找不到 <section> 投影片',
    aiInvalidSection: '回應的 <section> 不是合法投影片（缺 class="slide"）',
    aiUpdated: (n) => `✅ 已更新第 ${n} 頁（⌘Z 可復原）`,
    aiGenerating: '⏳ Claude 產生中…',
    chatUserPrefix: (n) => `第 ${n} 頁：`,
    upgradeNotDeck: '目前檔案不是簡報，無法升級',
    upgradeNoScript: '找不到簡報導覽 script（partNav），無法升級',
    upgradeDone: '已升級播放功能：頁碼、全螢幕（F）、記住頁數、Cmd+P 匯出 PDF',
    upgradeUpToDate: '此簡報播放功能已是最新',
    extTaken: 'SlideDope：.html 已被其他外掛接管，請先停用它再重新啟用本外掛。',
    createdFile: (path) => '已建立 ' + path,
    duplicated: (path) => '已建立複本：' + path,
    newSlideKicker: '段落標籤',
    newSlideTitle: '新投影片標題',
    newSlideBody: '點兩下開始編輯內容…',
    fmtBoldTitle: '粗體',
    fmtSizeUp: '大', fmtSizeUpTitle: '字級：放大',
    fmtSizeReset: '中', fmtSizeResetTitle: '字級：還原',
    fmtSizeDown: '小', fmtSizeDownTitle: '字級：縮小',
    fmtClear: '清除格式', fmtClearTitle: '移除選取範圍的粗體/顏色/字級',
    fmtColorTitle: (c) => '文字顏色 ' + c,
    cmdNew: '新增簡報（選擇模板）',
    cmdSave: '儲存簡報',
    cmdDuplicate: '複製目前簡報',
    cmdUpgrade: '升級簡報播放功能（頁碼／全螢幕／記住頁數／PDF）',
    setCmdName: 'claude 指令',
    setCmdDesc: 'AI 模式呼叫的 CLI 指令（透過登入 shell 執行，通常保持 claude 即可）',
    setModelName: 'claude 模型',
    setModelDesc: '留空使用 CLI 預設；可填 sonnet / opus / haiku 等',
    setFolderName: '新簡報資料夾',
    setFolderDesc: '「新增簡報」指令建立檔案的位置',
    chooseTemplate: '選擇簡報模板',
    tplPreviewText: 'Aa 標題',
    tplDarkName: '暗夜金紫', tplDarkDesc: '深色底、金色與紫色點綴',
    tplCreamName: '奶油暖橘', tplCreamDesc: '奶油底、赭橘主色、襯線標題',
    tplWhiteName: '極簡白', tplWhiteDesc: '白底黑字、一抹紅點綴，乾淨俐落',
    tplBlankName: '全空白', tplBlankDesc: '白底單頁空白，從零開始',
    starterPart1: '① 開場', starterPart2: '② 內容', starterPart3: '③ 結尾',
    stKicker1: '開場',
    stTitle: '簡報標題', stAccent: '副標重點',
    stSubtitle: '副標題說明',
    stLede: '一句話說明這份簡報要帶給觀眾什麼。',
    stKicker2: '重點', stContentTitle: '內容頁標題',
    stBullet1: '重點一：<b>關鍵詞</b>說明',
    stBullet2: '重點二：說明文字',
    stBullet3: '重點三：說明文字',
    stKicker3: '最後', stQA: 'Q&amp;A',
    stQABody: '有任何問題，現在都可以提出來。',
    blankTitle: '標題',
    navPrev: '上一頁', navNext: '下一頁',
    navFullscreen: '全螢幕', navFullscreenTitle: '全螢幕（F）',
  },
};

const t = (key, ...args) => {
  const table = STRINGS[LANG] || STRINGS.en;
  const v = (key in table) ? table[key] : STRINGS.en[key];
  if (v === undefined) return key;
  return typeof v === 'function' ? v(...args) : v;
};

// Editor-only chrome injected into canvas/thumbnail iframes. Never serialized:
// cleanSlideClone() strips it, wireImageWrap() recreates it on every load.
const IMG_WRAP_STYLE = `<style>
  .editor-img-wrap{ position:absolute; }
  .editor-img-wrap img{ pointer-events:none; user-select:none; -webkit-user-drag:none; }
  .editor-img-del{
    position:absolute; top:-10px; right:-10px; width:22px; height:22px; border-radius:50%;
    background:#e05a5a; color:#fff; font-size:14px; line-height:22px; text-align:center;
    cursor:pointer; display:none; font-family:sans-serif; box-shadow:0 2px 6px rgba(0,0,0,0.4);
  }
  .editor-img-resize{
    position:absolute; right:-8px; bottom:-8px; width:16px; height:16px; border-radius:4px;
    background:#7c6bff; border:2px solid #fff; cursor:nwse-resize; display:none;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
  }
  .editor-img-wrap:hover .editor-img-del,
  .editor-img-wrap:hover .editor-img-resize,
  .editor-img-wrap.editor-img-selected .editor-img-del,
  .editor-img-wrap.editor-img-selected .editor-img-resize{ display:block; }
  .editor-img-wrap:hover{ outline:2px dashed #7c6bff; outline-offset:2px; }
  .editor-img-wrap.editor-img-selected{ outline:2px solid #7c6bff; outline-offset:2px; }
  .editor-guide-v{ position:absolute; left:50%; top:0; bottom:0; width:0;
    border-left:1px dashed #e8b04b; z-index:9; pointer-events:none; }
  .editor-guide-h{ position:absolute; top:50%; left:0; right:0; height:0;
    border-top:1px dashed #e8b04b; z-index:9; pointer-events:none; }
</style>`;

/* ================================================================
 * Deck templates for the 新增簡報 command
 * ================================================================ */

const NAV_SCRIPT = `
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  let idx = 0;
  const hashPage = parseInt((location.hash || '').slice(1), 10);
  if (hashPage >= 1 && hashPage <= total) idx = hashPage - 1;
  const partNav = document.getElementById('partNav');
  const pageCounter = document.getElementById('pageCounter');
  const parts = [];
  slides.forEach((s,i)=>{
    const raw = s.dataset.part || '';
    const label = raw.replace(/^[\\u2460-\\u2468]\\s*/,'');
    const last = parts[parts.length-1];
    if(last && last.label === label){ last.lastIdx = i; }
    else { parts.push({ label, firstIdx:i, lastIdx:i }); }
  });
  parts.forEach((p,i)=>{
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.innerHTML = '<span class="seg-fill"></span><span class="seg-num">'+(i+1)+'</span><span class="seg-label">'+p.label+'</span>';
    seg.addEventListener('click', ()=>{ idx = p.firstIdx; render(); });
    partNav.appendChild(seg);
  });
  const segEls = partNav.querySelectorAll('.seg');
  const segFills = partNav.querySelectorAll('.seg-fill');
  function render(){
    slides.forEach((s,i)=> s.classList.toggle('active', i===idx));
    if(pageCounter) pageCounter.textContent = (idx+1) + ' / ' + total;
    try { history.replaceState(null, '', '#' + (idx+1)); } catch(e) {}
    const partIdx = parts.findIndex(p=> idx>=p.firstIdx && idx<=p.lastIdx);
    segEls.forEach((seg,i)=> seg.classList.toggle('active', i===partIdx));
    if(partIdx > -1){
      const p = parts[partIdx];
      const span = p.lastIdx - p.firstIdx;
      const pct = span === 0 ? 100 : ((idx - p.firstIdx) / span) * 100;
      segFills.forEach((fill,i)=> fill.style.width = (i===partIdx ? pct : 0) + '%');
    }
  }
  function go(delta){ idx = Math.min(total-1, Math.max(0, idx+delta)); render(); }
  function toggleFullscreen(){
    if(document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
  document.getElementById('prevBtn').addEventListener('click', ()=>go(-1));
  document.getElementById('nextBtn').addEventListener('click', ()=>go(1));
  const fsBtn = document.getElementById('fsBtn');
  if(fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
  function isTypingTarget(){
    const ae = document.activeElement;
    return ae && ['INPUT','TEXTAREA'].includes(ae.tagName);
  }
  window.addEventListener('keydown', (e)=>{
    if(isTypingTarget()) return;
    if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)) { go(1); e.preventDefault(); }
    if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)) { go(-1); e.preventDefault(); }
    if(e.key === 'Home'){ idx=0; render(); }
    if(e.key === 'End'){ idx=total-1; render(); }
    if(e.key === 'f' || e.key === 'F'){ toggleFullscreen(); }
  });
  let touchX = null;
  window.addEventListener('touchstart', e=>{ if(!isTypingTarget()) touchX = e.touches[0].clientX; });
  window.addEventListener('touchend', e=>{
    if(touchX===null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX = null;
  });
  render();
`;

// 頁碼與列印（瀏覽器 Cmd+P 即可匯出 PDF）樣式。
// 開頭的 marker 註解供「升級簡報播放功能」指令判斷是否已注入，勿改字。
const PLAYER_EXTRA_CSS = `
  /* pe-player-extra */
  .nav .page-counter{ color:var(--text-dim); font-size:0.85rem; margin-right:4px; letter-spacing:0.05em; }
  @media print{
    html,body{ overflow:visible; height:auto; }
    .deck{ width:auto; height:auto; display:block; }
    .slide{ position:relative; inset:auto; display:flex !important; width:1280px; height:720px;
      page-break-after:always; break-after:page; overflow:hidden; }
    .nav, .part-nav{ display:none !important; }
  }
  @page{ size:1280px 720px; margin:0; }`;

const NAV_MARKUP = `<div class="nav">
  <span class="page-counter" id="pageCounter"></span>
  <button id="prevBtn" aria-label="${t('navPrev')}">‹</button>
  <button id="nextBtn" aria-label="${t('navNext')}">›</button>
  <button id="fsBtn" aria-label="${t('navFullscreen')}" title="${t('navFullscreenTitle')}">⛶</button>
</div>`;

function deckShell(title, css, slidesHtml) {
  return `<!DOCTYPE html>
<html lang="${LANG === 'zh-TW' ? 'zh-Hant' : 'en'}"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
${css}
</style>
</head>
<body>

<div class="deck" id="deck">${slidesHtml}</div>

${NAV_MARKUP}

<nav class="part-nav" id="partNav"></nav>

<script>
${NAV_SCRIPT}
</script>

</body></html>`;
}

// shared structural rules every template needs for the editor + player to work
function baseDeckCss(v) {
  return `  :root{
    --bg:${v.bg}; --panel:${v.panel}; --accent:${v.accent}; --accent-2:${v.accent2};
    --text:${v.text}; --text-dim:${v.textDim}; --line:${v.line}; --radius:20px;
  }
  *{box-sizing:border-box;}
  html,body{ margin:0; padding:0; height:100%; background:var(--bg); color:var(--text);
    font-family:${v.font}; overflow:hidden; }
  .deck{ position:relative; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; }
  .slide{ position:absolute; inset:0; display:none; flex-direction:column; justify-content:center;
    padding: 6vh 9vw calc(6vh + 64px) 9vw; background:${v.slideBg}; }
  .slide.active{ display:flex; }
  .kicker{ display:inline-flex; align-items:center; gap:10px; font-size:0.85rem; letter-spacing:0.14em;
    text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:22px; }
  .kicker::before{ content:""; width:26px; height:2px; background:var(--accent); display:inline-block; }
  h1{ font-size:clamp(2rem, 4.6vw, 3.4rem); line-height:1.25; margin:0 0 18px 0; font-weight:800; ${v.h1Extra || ''} }
  h1 .accent{ color:var(--accent); }
  .subtitle{ font-size:clamp(1.05rem, 1.6vw, 1.35rem); color:var(--text-dim); margin:0 0 8px 0; font-weight:400; line-height:1.6; }
  .lede{ font-size:clamp(1.1rem, 1.8vw, 1.5rem); color:var(--text); line-height:1.7; max-width:56ch; font-weight:500; }
  .grid{ display:grid; gap:22px; margin-top:28px; }
  .grid.cols-2{ grid-template-columns:1fr 1fr; }
  .grid.cols-3{ grid-template-columns:repeat(3,1fr); }
  .card{ background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); padding:26px 28px; }
  .card h3{ margin:0 0 12px 0; font-size:1.15rem; color:var(--accent-2); display:flex; align-items:center; gap:10px; }
  .card ul{ margin:0; padding-left:1.2em; color:var(--text); line-height:1.75; font-size:1.02rem;}
  .card p{ margin:0; color:var(--text); line-height:1.75; font-size:1.02rem;}
  ul.bullets{ margin:22px 0 0 0; padding-left:0; list-style:none; }
  ul.bullets li{ position:relative; padding-left:34px; margin-bottom:16px;
    font-size:clamp(1rem,1.5vw,1.22rem); line-height:1.65; color:var(--text); }
  ul.bullets li::before{ content:"—"; position:absolute; left:0; color:var(--accent); font-weight:700; }
  ul.bullets li b{ color:var(--accent); }
  .badge{ display:inline-block; background:${v.badgeBg}; color:var(--accent);
    border:1px solid ${v.badgeBorder}; border-radius:999px; padding:6px 16px;
    font-size:0.9rem; font-weight:700; margin-bottom:18px; }
  .nav{ position:fixed; bottom:78px; right:28px; display:flex; align-items:center; gap:14px; z-index:55; }
  .nav button{ background:var(--panel); border:1px solid var(--line); color:var(--text);
    width:42px; height:42px; border-radius:50%; cursor:pointer; font-size:1.1rem;
    display:flex; align-items:center; justify-content:center; transition:background .2s; }
  .nav button:hover{ background:var(--accent-2); color:var(--bg); }
  .part-nav{ position:fixed; left:0; right:0; bottom:0; z-index:50; display:flex;
    background:${v.partNavBg}; -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px);
    border-top:1px solid var(--line); }
  .part-nav .seg{ position:relative; flex:1; display:flex; align-items:center; justify-content:center; gap:9px;
    padding:15px 8px; border-right:1px solid var(--line); background:transparent; color:var(--text-dim);
    font-size:0.72rem; letter-spacing:0.09em; font-weight:700; text-transform:uppercase;
    cursor:pointer; overflow:hidden; white-space:nowrap; transition:background .25s ease, color .25s ease; }
  .part-nav .seg:last-child{ border-right:none; }
  .part-nav .seg .seg-num{ color:var(--text-dim); opacity:0.55; font-weight:800; }
  .part-nav .seg:hover{ color:var(--text); }
  .part-nav .seg.active{ background:${v.segActiveBg}; color:var(--accent); }
  .part-nav .seg.active .seg-num{ color:var(--accent); opacity:1; }
  .part-nav .seg .seg-fill{ position:absolute; left:0; bottom:0; height:3px; width:0%;
    background:var(--accent); transition:width .35s ease; }
${PLAYER_EXTRA_CSS}`;
}

function starterSlides(part1, part2, part3) {
  return `<section class="slide active" data-part="${part1}">
    <div class="kicker">${t('stKicker1')}</div>
    <h1>${t('stTitle')}<br><span class="accent">${t('stAccent')}</span></h1>
    <p class="subtitle">${t('stSubtitle')}</p>
    <p class="lede">${t('stLede')}</p>
  </section><section class="slide" data-part="${part2}">
    <div class="kicker">${t('stKicker2')}</div>
    <h1>${t('stContentTitle')}</h1>
    <ul class="bullets">
      <li>${t('stBullet1')}</li>
      <li>${t('stBullet2')}</li>
      <li>${t('stBullet3')}</li>
    </ul>
  </section><section class="slide" data-part="${part3}">
    <div class="kicker">${t('stKicker3')}</div>
    <h1>${t('stQA')}</h1>
    <p class="lede">${t('stQABody')}</p>
  </section>`;
}

const TEMPLATES = [
  {
    id: 'dark-gold',
    name: t('tplDarkName'),
    desc: t('tplDarkDesc'),
    swatch: { bg: '#0f0f17', fg: '#e8b04b', fg2: '#7c6bff' },
    html(title) {
      const css = baseDeckCss({
        bg: '#0f0f17', panel: '#1c1c2b', accent: '#e8b04b', accent2: '#7c6bff',
        text: '#f3f1ea', textDim: '#a9a6bd', line: '#33334a',
        font: '"Noto Sans TC","PingFang TC","Microsoft JhengHei",-apple-system,"Segoe UI",sans-serif',
        slideBg: 'radial-gradient(circle at 12% 10%, rgba(124,107,255,0.16), transparent 45%),radial-gradient(circle at 90% 85%, rgba(232,176,75,0.12), transparent 40%),var(--bg)',
        badgeBg: 'rgba(232,176,75,0.14)', badgeBorder: 'rgba(232,176,75,0.4)',
        partNavBg: 'rgba(23,23,35,0.92)',
        segActiveBg: 'linear-gradient(180deg, rgba(232,176,75,0.16), rgba(232,176,75,0.08))',
      });
      return deckShell(title, css, starterSlides(t('starterPart1'), t('starterPart2'), t('starterPart3')));
    },
  },
  {
    id: 'cream-orange',
    name: t('tplCreamName'),
    desc: t('tplCreamDesc'),
    swatch: { bg: '#F2EDE4', fg: '#C75B2A', fg2: '#2B2521' },
    html(title) {
      const css = baseDeckCss({
        bg: '#F2EDE4', panel: '#ECE5D8', accent: '#C75B2A', accent2: '#A8481F',
        text: '#2B2521', textDim: '#6F665B', line: '#D9CFBE',
        font: '"Noto Sans TC","PingFang TC",sans-serif',
        slideBg: 'radial-gradient(circle at 50% 0%, rgba(199,91,42,0.05), transparent 60%),var(--bg)',
        badgeBg: 'rgba(199,91,42,0.12)', badgeBorder: 'rgba(199,91,42,0.4)',
        partNavBg: 'rgba(236,229,216,0.94)',
        segActiveBg: 'linear-gradient(180deg, rgba(199,91,42,0.14), rgba(199,91,42,0.06))',
        h1Extra: 'font-family:"Noto Serif TC","Songti TC",serif;',
      });
      return deckShell(title, css, starterSlides(t('starterPart1'), t('starterPart2'), t('starterPart3')));
    },
  },
  {
    id: 'minimal-white',
    name: t('tplWhiteName'),
    desc: t('tplWhiteDesc'),
    swatch: { bg: '#ffffff', fg: '#e63946', fg2: '#111111' },
    html(title) {
      const css = baseDeckCss({
        bg: '#ffffff', panel: '#f7f7f7', accent: '#e63946', accent2: '#111111',
        text: '#111111', textDim: '#777777', line: '#e5e5e5',
        font: '"Noto Sans TC","PingFang TC","Helvetica Neue",sans-serif',
        slideBg: 'var(--bg)',
        badgeBg: 'rgba(230,57,70,0.08)', badgeBorder: 'rgba(230,57,70,0.35)',
        partNavBg: 'rgba(255,255,255,0.94)',
        segActiveBg: 'rgba(230,57,70,0.08)',
        h1Extra: 'letter-spacing:-0.01em;',
      });
      return deckShell(title, css, starterSlides(t('starterPart1'), t('starterPart2'), t('starterPart3')));
    },
  },
  {
    id: 'blank',
    name: t('tplBlankName'),
    desc: t('tplBlankDesc'),
    swatch: { bg: '#ffffff', fg: '#bbbbbb', fg2: '#dddddd' },
    html(title) {
      const css = baseDeckCss({
        bg: '#ffffff', panel: '#f7f7f7', accent: '#555555', accent2: '#999999',
        text: '#222222', textDim: '#888888', line: '#e8e8e8',
        font: '"Noto Sans TC","PingFang TC",sans-serif',
        slideBg: 'var(--bg)',
        badgeBg: '#f0f0f0', badgeBorder: '#dddddd',
        partNavBg: 'rgba(255,255,255,0.94)',
        segActiveBg: '#f2f2f2',
      });
      const slides = `<section class="slide active" data-part="">
    <h1>${t('blankTitle')}</h1>
  </section>`;
      return deckShell(title, css, slides);
    },
  },
];

/* ================================================================
 * Editor view
 * ================================================================ */

class PresentationEditorView extends TextFileView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.slides = [];
    this.parsedDoc = null;
    this.docHead = '';
    this.selectedIndex = 0;
    this.selectionAnchor = 0;
    this.clipboard = null;        // copied/cut slides
    this.imageClipboard = null;   // copied/cut image wrap (cleaned clone)
    this.lastCutKind = null;      // 'slides' | 'image' — most recent wins on ⌘V
    this.frameNode = null;        // slide node currently *loaded* in mainFrame (identity, not index)
    this.undoStack = [];
    this.redoStack = [];
    this.dragSrcIndex = null;
    this.dropTarget = null;       // { index, before } during thumbnail drag
    this.fallbackMode = false;
    this.rawData = '';
    this.aiMode = false;
    this.aiBusy = false;
    this.chatHistory = [];
    this._nudgePending = null;
    this._nudgeTimer = null;
    this._textPending = null;  // pre-burst snapshot for contenteditable typing
    this._textTimer = null;
    this._activeIdoc = null;   // contentDocument currently wired in mainFrame
    this._fmtColorKey = '';    // cached palette key so swatches only rebuild on change
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return this.file ? this.file.basename : 'Presentation'; }
  getIcon() { return 'presentation'; }
  canAcceptExtension(ext) { return ext === 'html'; }

  // ---------- Obsidian TextFileView contract ----------

  getViewData() {
    if (this.fallbackMode || !this.parsedDoc) return this.rawData;
    this.syncCurrentSlideFromFrame();
    const deck = this.parsedDoc.getElementById('deck');
    deck.innerHTML = '';
    this.slides.forEach((node, i) => {
      const c = this.cleanSlideClone(node);
      if (i === 0) c.classList.add('active');
      deck.appendChild(c);
    });
    this.cleanDocumentJunk(this.parsedDoc);
    return '<!DOCTYPE html>\n' + this.parsedDoc.documentElement.outerHTML;
  }

  // 瀏覽器外掛（如沉浸式翻譯）在瀏覽器裡開啟簡報時會注入元素與屬性，
  // 之後被存回檔案；序列化前整份文件清一次。
  cleanDocumentJunk(doc) {
    doc.querySelectorAll('[id*="immersive-translate"], [class*="immersive-translate"]').forEach((el) => el.remove());
    doc.querySelectorAll('*').forEach((el) => {
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith('data-immersive-translate')) el.removeAttribute(attr.name);
      }
    });
  }

  setViewData(data, clear) {
    this.rawData = data;
    if (clear) this.resetState();
    const doc = new DOMParser().parseFromString(data, 'text/html');
    const deck = doc.getElementById('deck');
    const slideNodes = deck ? Array.from(deck.querySelectorAll(':scope > .slide')) : [];
    if (!deck || slideNodes.length === 0) {
      this.fallbackMode = true;
      this.renderFallback();
      return;
    }
    this.fallbackMode = false;
    this.parsedDoc = doc;
    this.docHead = doc.head.innerHTML;
    this.slides = slideNodes.map((n) => this.cleanSlideClone(n));
    this.selectedIndex = 0;
    this.selectionAnchor = 0;
    this.undoStack = [];
    this.redoStack = [];
    this.renderEditor();
    this.setSaveStatus(true);
  }

  clear() { this.resetState(); }

  resetState() {
    this.slides = [];
    this.parsedDoc = null;
    this.docHead = '';
    this.selectedIndex = 0;
    this.selectionAnchor = 0;
    this.clipboard = null;
    this.imageClipboard = null;
    this.lastCutKind = null;
    this.frameNode = null;
    this.undoStack = [];
    this.redoStack = [];
    this.chatHistory = [];
    this._activeIdoc = null;
    this._fmtColorKey = '';
    clearTimeout(this._textTimer);
    this._textPending = null;
    this._textTimer = null;
    clearTimeout(this._nudgeTimer);
    this._nudgePending = null;
    this._nudgeTimer = null;
  }

  onResize() {
    if (!this.fallbackMode && this.canvasArea) this.fitMainCanvas();
  }

  cleanSlideClone(node) {
    const c = node.cloneNode(true);
    c.classList.remove('active');
    c.removeAttribute('contenteditable');
    c.querySelectorAll('.editor-img-del, .editor-img-resize, .editor-guide-v, .editor-guide-h').forEach((el) => el.remove());
    c.querySelectorAll('.editor-img-wrap').forEach((w) => w.classList.remove('editor-img-selected'));
    c.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
    this.normalizeSlideDom(c);
    return c;
  }

  // contenteditable / execCommand leave <font> tags, empty spans and stray
  // attributes behind; every serialization path funnels through here so the
  // saved HTML stays clean.
  normalizeSlideDom(root) {
    // 圖片定位一律存 %：編輯器固定 1280×720，但播放時 .slide 是 100vw×100vh
    // 撐滿視窗，px 不會等比縮放（所見即所得的關鍵）。px 舊值在此換算。
    root.querySelectorAll('.editor-img-wrap').forEach((w) => {
      const conv = (prop, base) => {
        const v = w.style[prop];
        if (v && v.endsWith('px')) w.style[prop] = (parseFloat(v) / base * 100).toFixed(2) + '%';
      };
      conv('left', NATIVE_W);
      conv('top', NATIVE_H);
      conv('width', NATIVE_W);
    });
    root.querySelectorAll('font').forEach((f) => {
      const color = f.getAttribute('color');
      if (color) {
        const span = root.ownerDocument.createElement('span');
        span.style.color = color;
        while (f.firstChild) span.appendChild(f.firstChild);
        f.replaceWith(span);
      } else {
        f.replaceWith(...f.childNodes);
      }
    });
    root.querySelectorAll('*').forEach((el) => {
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith('data-immersive-translate')) el.removeAttribute(attr.name);
      }
      if (el.hasAttribute('style') && !el.getAttribute('style').trim()) el.removeAttribute('style');
    });
    // unwrap spans that no longer carry any attribute (often left by removeFormat)
    let again = true;
    while (again) {
      again = false;
      root.querySelectorAll('span').forEach((s) => {
        if (s.attributes.length === 0) {
          s.replaceWith(...s.childNodes);
          again = true;
        }
      });
    }
  }

  markDirty() {
    this.setSaveStatus(false);
    this.requestSave();
  }

  async save(clear) {
    await super.save(clear);
    this.setSaveStatus(true);
  }

  setSaveStatus(saved) {
    if (!this.statusEl) return;
    this.statusEl.toggleClass('pe-status-saved', saved);
    this.statusEl.toggleClass('pe-status-dirty', !saved);
    this.statusTextEl.textContent = saved ? t('saved') : t('unsaved');
  }

  // ---------- DOM skeleton ----------

  async onOpen() {
    const root = this.contentEl;
    root.empty();
    root.addClass('pe-root');

    this.toolbarEl = root.createDiv({ cls: 'pe-toolbar' });
    const statusWrap = this.toolbarEl.createDiv({ cls: 'pe-status-wrap' });
    this.statusEl = statusWrap.createSpan({ cls: 'pe-status pe-status-saved' });
    this.statusTextEl = statusWrap.createSpan({ cls: 'pe-status-text', text: t('saved') });

    this.modeBtn = this.toolbarEl.createEl('button', { cls: 'pe-mode-btn', text: t('aiMode') });
    this.toolbarEl.createSpan({ cls: 'pe-part-label', text: t('partLabel') });
    this.partInput = this.toolbarEl.createEl('input', { cls: 'pe-part-input', type: 'text', placeholder: t('partPlaceholder') });
    this.toolbarEl.createDiv({ cls: 'pe-spacer' });
    this.addBtn = this.toolbarEl.createEl('button', { text: t('duplicateSlideBtn') });
    this.addBlankBtn = this.toolbarEl.createEl('button', { text: t('blankSlideBtn') });
    this.previewBtn = this.toolbarEl.createEl('button', { text: t('previewBtn') });

    const main = root.createDiv({ cls: 'pe-main' });
    const sidebarCol = main.createDiv({ cls: 'pe-sidebar-col' });
    sidebarCol.createDiv({
      cls: 'pe-sidebar-hint',
      text: t('sidebarHint'),
    });
    this.sidebarEl = sidebarCol.createDiv({ cls: 'pe-sidebar' });
    this.canvasArea = main.createDiv({ cls: 'pe-canvas-area' });
    this.canvasWrap = this.canvasArea.createDiv({ cls: 'pe-canvas-wrap' });
    this.mainFrame = this.canvasWrap.createEl('iframe');
    this.fmtBar = this.canvasArea.createDiv({ cls: 'pe-fmt-bar' });
    this.buildFmtBar();
    this.fmtBar.hide();

    this.chatPanel = this.canvasArea.createDiv({ cls: 'pe-chat' });
    const chatHead = this.chatPanel.createDiv({ cls: 'pe-chat-head' });
    chatHead.createSpan({ text: t('chatTitle') });
    this.chatTargetEl = chatHead.createSpan({ cls: 'pe-chat-target', text: t('chatTarget', 1) });
    chatHead.createSpan({ cls: 'pe-chat-hint', text: t('chatHint') });
    this.chatLogEl = this.chatPanel.createDiv({ cls: 'pe-chat-log' });
    const inputRow = this.chatPanel.createDiv({ cls: 'pe-chat-input-row' });
    this.chatInput = inputRow.createEl('textarea', { cls: 'pe-chat-input' });
    this.chatInput.rows = 2;
    this.chatInput.placeholder = t('chatPlaceholder');
    this.chatSendBtn = inputRow.createEl('button', { cls: 'pe-primary', text: t('send') });
    this.chatPanel.hide();

    this.partNavPreview = this.canvasArea.createDiv({ cls: 'pe-part-nav' });

    this.fallbackEl = root.createDiv({ cls: 'pe-fallback' });
    this.fallbackEl.hide();

    this.modeBtn.addEventListener('click', () => this.toggleAiMode());
    this.addBtn.addEventListener('click', () => this.addSlide());
    this.addBlankBtn.addEventListener('click', () => this.addBlankSlide());
    this.previewBtn.addEventListener('click', () => this.previewInBrowser());
    this.chatSendBtn.addEventListener('click', () => this.sendAiRequest());
    this.chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendAiRequest(); }
    });
    this.partInput.addEventListener('input', () => {
      if (this.fallbackMode || !this.slides.length) return;
      this.slides[this.selectedIndex].setAttribute('data-part', this.partInput.value);
      this.markDirty();
      this.refreshThumb(this.selectedIndex);
      this.renderPartNavPreview();
    });

    this.registerDomEvent(this.sidebarEl, 'keydown', (e) => this.onSidebarKeydown(e));

    // undo/redo 統一入口：涵蓋側欄（冒泡上來）、畫布區、工具列——
    // 但原生輸入框（段落標籤、AI 輸入）保留瀏覽器自己的文字 undo。
    this.registerDomEvent(this.contentEl, 'keydown', (e) => {
      if (this.fallbackMode) return;
      if (e.target && e.target.closest && e.target.closest('input, textarea')) return;
      const meta = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if (meta && key === 'z' && !e.shiftKey) { e.preventDefault(); this.undo(); }
      else if (meta && ((key === 'z' && e.shiftKey) || key === 'y')) { e.preventDefault(); this.redo(); }
    });
  }

  renderFallback() {
    this.toolbarEl.hide();
    this.sidebarEl.parentElement.hide();
    this.canvasArea.hide();
    this.fallbackEl.show();
    this.fallbackEl.empty();
    this.fallbackEl.createDiv({ cls: 'pe-fallback-msg', text: t('fallbackMsg') });
    const frame = this.fallbackEl.createEl('iframe', { cls: 'pe-fallback-frame' });
    frame.setAttribute('sandbox', 'allow-same-origin');
    frame.srcdoc = this.injectBaseHref(this.rawData);
  }

  renderEditor() {
    this.fallbackEl.hide();
    this.toolbarEl.show();
    this.sidebarEl.parentElement.show();
    this.canvasArea.show();
    this.sidebarEl.empty(); // force full rebuild on (re)load
    this.renderSidebar();
    this.selectSlide(0);
  }

  // ---------- resource-path plumbing ----------

  getBaseHref() {
    if (!this.file) return '';
    const res = this.app.vault.adapter.getResourcePath(this.file.path);
    const noQuery = res.split('?')[0];
    return noQuery.slice(0, noQuery.lastIndexOf('/') + 1);
  }

  injectBaseHref(html) {
    const base = `<base href="${this.getBaseHref()}" target="_blank">`;
    if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (m) => m + base);
    return base + html;
  }

  buildFrameSrcdoc(slideNode) {
    const clone = slideNode.cloneNode(true);
    clone.classList.add('active');
    return `<!DOCTYPE html><html><head><base href="${this.getBaseHref()}" target="_blank">` +
      `${this.docHead}${IMG_WRAP_STYLE}</head>` +
      `<body><div class="deck">${clone.outerHTML}</div></body></html>`;
  }

  mountFrame(iframe, wrapEl, targetWidth) {
    const scale = targetWidth / NATIVE_W;
    wrapEl.style.width = targetWidth + 'px';
    wrapEl.style.height = (NATIVE_H * scale) + 'px';
    iframe.style.width = NATIVE_W + 'px';
    iframe.style.height = NATIVE_H + 'px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = 'top left';
  }

  slideLabel(node) { return node.getAttribute('data-part') || ''; }

  // ---------- sidebar (diffed: only changed positions reload their iframe) ----------

  renderSidebar() {
    while (this.sidebarEl.children.length > this.slides.length) this.sidebarEl.lastChild.remove();
    while (this.sidebarEl.children.length < this.slides.length) this.createThumbItem(this.sidebarEl.children.length);
    this.slides.forEach((node, i) => {
      const item = this.sidebarEl.children[i];
      if (item._slideNode !== node) this.assignThumb(item, node);
    });
    this.updateSelectionHighlight();
  }

  assignThumb(item, node) {
    item._slideNode = node;
    const wrap = item.querySelector('.pe-thumb-frame-wrap');
    const iframe = wrap.querySelector('iframe');
    item.querySelector('.pe-thumb-part').textContent = this.slideLabel(node) || t('noPartLabel');

    // iframe 已載入且 head（CSS）沒變 → 原地替換投影片 DOM。
    // 重設 srcdoc 等於整頁重載（先白屏再重繪），打字時每個 input 都會觸發，
    // 縮圖就會快速閃爍；原地替換完全不重載。
    const idoc = iframe.contentDocument;
    const deck = idoc && idoc.querySelector('.deck');
    if (deck && iframe._peHead === this.docHead) {
      const clone = idoc.importNode(node, true);
      clone.classList.add('active');
      deck.replaceChildren(clone);
      return;
    }
    iframe._peHead = this.docHead;
    iframe.srcdoc = this.buildFrameSrcdoc(node);
    this.mountFrame(iframe, wrap, wrap.getBoundingClientRect().width || 230);
  }

  createThumbItem(position) {
    const item = this.sidebarEl.createDiv({ cls: 'pe-thumb-item' });
    item.draggable = true;
    item.tabIndex = 0;
    item._slideNode = null;

    item.createDiv({ cls: 'pe-thumb-num', text: String(position + 1) });
    const thumb = item.createDiv({ cls: 'pe-thumb' });
    const wrap = thumb.createDiv({ cls: 'pe-thumb-frame-wrap' });
    const iframe = wrap.createEl('iframe');
    iframe.setAttribute('sandbox', 'allow-same-origin');
    thumb.createDiv({ cls: 'pe-thumb-part', text: '' });

    const idx = () => Array.prototype.indexOf.call(this.sidebarEl.children, item);

    item.addEventListener('click', (e) => { this.selectSlide(idx(), e.shiftKey); item.focus(); });
    item.addEventListener('dragstart', (e) => {
      this.dragSrcIndex = idx();
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const rect = item.getBoundingClientRect();
      const before = e.clientY < rect.top + rect.height / 2;
      this.clearInsertIndicators();
      item.addClass(before ? 'pe-insert-before' : 'pe-insert-after');
      this.dropTarget = { index: idx(), before };
    });
    item.addEventListener('dragleave', () => {
      item.removeClass('pe-insert-before');
      item.removeClass('pe-insert-after');
    });
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const target = this.dropTarget;
      this.clearInsertIndicators();
      if (this.dragSrcIndex === null || !target) return;
      const insertAt = target.index + (target.before ? 0 : 1);
      this.reorderInsert(this.dragSrcIndex, insertAt);
      this.dragSrcIndex = null;
      this.dropTarget = null;
    });
    item.addEventListener('dragend', () => {
      this.clearInsertIndicators();
      this.dragSrcIndex = null;
      this.dropTarget = null;
    });
    return item;
  }

  clearInsertIndicators() {
    this.sidebarEl.querySelectorAll('.pe-insert-before, .pe-insert-after').forEach((el) => {
      el.removeClass('pe-insert-before');
      el.removeClass('pe-insert-after');
    });
  }

  focusThumb(i) {
    const el = this.sidebarEl.children[i];
    if (el) el.focus();
  }

  getSelectionRange() {
    return [Math.min(this.selectionAnchor, this.selectedIndex), Math.max(this.selectionAnchor, this.selectedIndex)];
  }

  updateSelectionHighlight() {
    const [lo, hi] = this.getSelectionRange();
    Array.from(this.sidebarEl.children).forEach((item, idx) => {
      item.toggleClass('pe-selected', idx === this.selectedIndex);
      item.toggleClass('pe-in-range', idx >= lo && idx <= hi && idx !== this.selectedIndex);
    });
  }

  refreshThumb(index) {
    const item = this.sidebarEl.children[index];
    if (!item) return;
    this.assignThumb(item, this.slides[index]);
  }

  onSidebarKeydown(e) {
    if (this.fallbackMode) return;
    const meta = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();

    if (meta && key === 'x') {
      e.preventDefault();
      // if an image is visually selected in the canvas, cut it — never the slide
      const idoc = this.mainFrame.contentDocument;
      const selImg = idoc && idoc.querySelector('.editor-img-wrap.editor-img-selected');
      if (selImg) this.cutImageWrap(selImg);
      else this.cutSelection();
      return;
    }
    if (meta && key === 'c') {
      e.preventDefault();
      const idoc = this.mainFrame.contentDocument;
      const selImg = idoc && idoc.querySelector('.editor-img-wrap.editor-img-selected');
      if (selImg) this.copyImageWrap(selImg);
      else this.copySelection();
      return;
    }
    if (meta && key === 'v') {
      e.preventDefault();
      if (this.lastCutKind === 'image' && this.imageClipboard) this.pasteImageClipboard();
      else this.pasteClipboard();
      return;
    }
    // undo/redo 由 contentEl 層的 handler 統一處理（sidebar 事件會冒泡上去）

    if (meta && e.key === 'ArrowUp') { e.preventDefault(); this.moveSelection(-1); return; }
    if (meta && e.key === 'ArrowDown') { e.preventDefault(); this.moveSelection(1); return; }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      this.deleteSlides();
      return;
    }

    if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      const next = Math.min(this.selectedIndex + 1, this.slides.length - 1);
      if (next !== this.selectedIndex) { this.selectSlide(next, e.shiftKey); this.focusThumb(next); }
    } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      const prev = Math.max(this.selectedIndex - 1, 0);
      if (prev !== this.selectedIndex) { this.selectSlide(prev, e.shiftKey); this.focusThumb(prev); }
    }
  }

  // ---------- undo / redo ----------

  snapshotState() {
    return {
      slides: this.slides.map((n) => n.cloneNode(true)),
      selectedIndex: this.selectedIndex,
      selectionAnchor: this.selectionAnchor,
    };
  }

  commitUndo(snap) {
    this.undoStack.push(snap);
    if (this.undoStack.length > MAX_UNDO) this.undoStack.shift();
    this.redoStack = [];
  }

  // 打字與方向鍵微調用 debounce 延後 commit；任何結構操作或 undo/redo
  // 進來時要先把未 commit 的快照補進 undoStack，堆疊順序才正確。
  flushPendingSnapshots() {
    if (this._textTimer) { clearTimeout(this._textTimer); this._textTimer = null; }
    if (this._textPending) {
      this.commitUndo(this._textPending);
      this._textPending = null;
    }
    if (this._nudgeTimer) { clearTimeout(this._nudgeTimer); this._nudgeTimer = null; }
    if (this._nudgePending) {
      this.commitUndo(this._nudgePending);
      this._nudgePending = null;
      this.syncCurrentSlideFromFrame();
      this.markDirty();
    }
  }

  pushUndo() {
    this.flushPendingSnapshots();
    this.commitUndo(this.snapshotState());
  }

  // 文字輸入 burst 的第一下拍快照（此時 slides 陣列仍是變更前內容），
  // 停頓 800ms 才 commit——整段輸入成為一步 undo。beforeinput 與
  // execCommand 路徑（貼上純文字）都要經過這裡。
  noteTextEdit() {
    if (!this._textPending) this._textPending = this.snapshotState();
    clearTimeout(this._textTimer);
    this._textTimer = setTimeout(() => {
      if (this._textPending) {
        this.commitUndo(this._textPending);
        this._textPending = null;
      }
      this._textTimer = null;
    }, 800);
  }

  restoreState(state) {
    this.slides = state.slides.map((n) => n.cloneNode(true));
    this.selectedIndex = Math.min(state.selectedIndex, this.slides.length - 1);
    this.selectionAnchor = Math.min(state.selectionAnchor, this.slides.length - 1);
    this.markDirty();
    this.renderSidebar();
    this.selectSlide(this.selectedIndex);
    this.focusThumb(this.selectedIndex);
  }

  undo() {
    this.flushPendingSnapshots();
    if (this.undoStack.length === 0) return;
    this.syncCurrentSlideFromFrame();
    const current = this.snapshotState();
    this.redoStack.push(current);
    this.restoreState(this.undoStack.pop());
  }

  redo() {
    this.flushPendingSnapshots();
    if (this.redoStack.length === 0) return;
    this.syncCurrentSlideFromFrame();
    const current = this.snapshotState();
    this.undoStack.push(current);
    this.restoreState(this.redoStack.pop());
  }

  // ---------- structural ops ----------

  reorderInsert(fromIndex, insertAt) {
    if (insertAt === fromIndex || insertAt === fromIndex + 1) return; // no-op drop
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const selectedNode = this.slides[this.selectedIndex];
    const [moved] = this.slides.splice(fromIndex, 1);
    if (insertAt > fromIndex) insertAt--;
    this.slides.splice(insertAt, 0, moved);
    this.selectedIndex = this.slides.indexOf(selectedNode);
    this.selectionAnchor = this.selectedIndex;
    this.markDirty();
    this.renderSidebar();
    this.renderPartNavPreview();
  }

  moveSelection(delta) {
    const [lo, hi] = this.getSelectionRange();
    if (delta < 0 && lo === 0) return;
    if (delta > 0 && hi === this.slides.length - 1) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const block = this.slides.splice(lo, hi - lo + 1);
    this.slides.splice(lo + delta, 0, ...block);
    this.selectedIndex += delta;
    this.selectionAnchor += delta;
    this.markDirty();
    this.renderSidebar();
    this.renderPartNavPreview();
    this.focusThumb(this.selectedIndex);
  }

  copySelection() {
    const [lo, hi] = this.getSelectionRange();
    this.syncCurrentSlideFromFrame();
    this.clipboard = this.slides.slice(lo, hi + 1).map((n) => n.cloneNode(true));
    this.lastCutKind = 'slides';
    new Notice(t('noticeCopiedSlides', hi - lo + 1));
  }

  cutSelection() {
    const [lo, hi] = this.getSelectionRange();
    const count = hi - lo + 1;
    if (this.slides.length - count < 1) { new Notice(t('noticeKeepOneNoCutAll')); return; }
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const cut = this.slides.splice(lo, count);
    this.clipboard = cut.map((n) => n.cloneNode(true));
    this.lastCutKind = 'slides';
    this.markDirty();
    const next = Math.min(lo, this.slides.length - 1);
    this.renderSidebar();
    this.selectSlide(next);
    this.focusThumb(next);
  }

  pasteClipboard() {
    if (!this.clipboard || this.clipboard.length === 0) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const insertAt = this.selectedIndex + 1;
    this.slides.splice(insertAt, 0, ...this.clipboard.map((n) => n.cloneNode(true)));
    this.markDirty();
    this.renderSidebar();
    this.selectSlide(insertAt);
    this.focusThumb(insertAt);
  }

  addSlide() {
    if (this.fallbackMode || !this.slides.length) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    this.slides.splice(this.selectedIndex + 1, 0, this.slides[this.selectedIndex].cloneNode(true));
    this.markDirty();
    this.renderSidebar();
    this.selectSlide(this.selectedIndex + 1);
    this.focusThumb(this.selectedIndex);
  }

  addBlankSlide() {
    if (this.fallbackMode || !this.slides.length) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const partLabel = this.slideLabel(this.slides[this.selectedIndex]);
    const section = document.createElement('section');
    section.className = 'slide';
    section.setAttribute('data-part', partLabel || '');
    const kicker = document.createElement('div');
    kicker.className = 'kicker';
    kicker.textContent = t('newSlideKicker');
    const h1 = document.createElement('h1');
    h1.textContent = t('newSlideTitle');
    const lede = document.createElement('p');
    lede.className = 'lede';
    lede.textContent = t('newSlideBody');
    section.append(kicker, h1, lede);
    this.slides.splice(this.selectedIndex + 1, 0, section);
    this.markDirty();
    this.renderSidebar();
    this.selectSlide(this.selectedIndex + 1);
    this.focusThumb(this.selectedIndex);
  }

  deleteSlides() {
    if (this.fallbackMode || !this.slides.length) return;
    const [lo, hi] = this.getSelectionRange();
    const count = hi - lo + 1;
    if (this.slides.length - count < 1) { new Notice(t('noticeKeepOne')); return; }
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    this.slides.splice(lo, count);
    this.markDirty();
    new Notice(t('noticeDeleted', count));
    const next = Math.min(lo, this.slides.length - 1);
    this.renderSidebar();
    this.selectSlide(next);
    this.focusThumb(next);
  }

  async previewInBrowser() {
    if (!this.file) return;
    await this.save();
    this.app.openWithDefaultApp(this.file.path);
  }

  // 把舊 deck 的播放端升級成最新模板功能（冪等：重跑不會重複注入）
  upgradePlayback() {
    if (this.fallbackMode || !this.parsedDoc) { new Notice(t('upgradeNotDeck')); return; }
    const doc = this.parsedDoc;
    let changed = false;

    const script = Array.from(doc.querySelectorAll('script')).find((s) => s.textContent.includes('partNav'));
    if (!script) { new Notice(t('upgradeNoScript')); return; }
    if (script.textContent !== NAV_SCRIPT) { script.textContent = NAV_SCRIPT; changed = true; }

    const nav = doc.querySelector('.nav');
    if (nav) {
      if (!doc.getElementById('pageCounter')) {
        const span = doc.createElement('span');
        span.className = 'page-counter';
        span.id = 'pageCounter';
        nav.insertBefore(span, nav.firstChild);
        changed = true;
      }
      if (!doc.getElementById('fsBtn')) {
        const btn = doc.createElement('button');
        btn.id = 'fsBtn';
        btn.setAttribute('aria-label', t('navFullscreen'));
        btn.setAttribute('title', t('navFullscreenTitle'));
        btn.textContent = '⛶';
        nav.appendChild(btn);
        changed = true;
      }
    }

    const style = doc.querySelector('head style');
    if (style && !style.textContent.includes('pe-player-extra')) {
      style.textContent += '\n' + PLAYER_EXTRA_CSS;
      changed = true;
    }

    if (changed) {
      this.docHead = doc.head.innerHTML;
      this.markDirty();
      new Notice(t('upgradeDone'));
    } else {
      new Notice(t('upgradeUpToDate'));
    }
  }

  // ---------- part-nav preview ----------

  renderPartNavPreview() {
    this.partNavPreview.empty();
    const parts = [];
    this.slides.forEach((node, i) => {
      const label = this.slideLabel(node).replace(/^[①②③④⑤⑥⑦⑧⑨]\s*/, '');
      const last = parts[parts.length - 1];
      if (last && last.label === label) last.lastIdx = i;
      else parts.push({ label, firstIdx: i, lastIdx: i });
    });
    parts.forEach((p, i) => {
      const seg = this.partNavPreview.createDiv({
        cls: 'pe-pn-seg' + (this.selectedIndex >= p.firstIdx && this.selectedIndex <= p.lastIdx ? ' pe-active' : ''),
      });
      seg.createSpan({ cls: 'pe-pn-num', text: String(i + 1) });
      seg.createSpan({ cls: 'pe-pn-label', text: p.label || t('unnamedPart') });
      seg.addEventListener('click', () => { this.selectSlide(p.firstIdx); this.focusThumb(p.firstIdx); });
    });
  }

  // ---------- canvas / frame sync ----------

  // Syncs by node identity, not index: the frame may still show a slide whose
  // array position changed since it loaded.
  syncCurrentSlideFromFrame() {
    if (!this.frameNode) return;
    const idx = this.slides.indexOf(this.frameNode);
    if (idx === -1) return;
    const idoc = this.mainFrame.contentDocument;
    if (!idoc) return;
    const el = idoc.querySelector('.slide');
    if (!el) return;
    const clone = this.cleanSlideClone(el);
    this.slides[idx] = clone;
    this.frameNode = clone;
    this.refreshThumb(idx);
  }

  fitMainCanvas() {
    const previewH = this.partNavPreview.getBoundingClientRect().height;
    const chatH = this.aiMode ? this.chatPanel.getBoundingClientRect().height + 14 : 0;
    const gap = previewH > 0 ? 14 : 0;
    const availW = this.canvasArea.clientWidth - 40;
    const availH = this.canvasArea.clientHeight - 40 - previewH - gap - chatH;
    let w = availW;
    let h = (w * NATIVE_H) / NATIVE_W;
    if (h > availH) { h = availH; w = (h * NATIVE_W) / NATIVE_H; }
    this.mountFrame(this.mainFrame, this.canvasWrap, Math.max(w, 100));
  }

  selectSlide(i, extend = false) {
    this.syncCurrentSlideFromFrame();
    this.selectedIndex = i;
    if (!extend) this.selectionAnchor = i;
    const node = this.slides[this.selectedIndex];
    this.partInput.value = this.slideLabel(node);
    this.renderPartNavPreview();
    this.updateChatTarget();

    // srcdoc loads async: contentDocument still holds the previous slide until
    // `load` fires. frameNode may only point at `node` after that, or a sync in
    // the gap would overwrite the new slide with stale content.
    this.fmtBar.hide();
    this.mainFrame.onload = () => {
      this.frameNode = node;
      const idoc = this.mainFrame.contentDocument;
      this._activeIdoc = idoc;
      const el = idoc.querySelector('.slide');
      if (el) {
        el.setAttribute('contenteditable', 'true');
        // beforeinput 在 DOM 變更前發生（execCommand 不會觸發，該路徑
        // 由呼叫端自行 noteTextEdit）
        el.addEventListener('beforeinput', () => this.noteTextEdit());
        el.addEventListener('input', () => {
          this.syncCurrentSlideFromFrame();
          this.markDirty();
        });
        el.addEventListener('paste', (e) => this.handleSlidePaste(e, idoc, el));
        idoc.querySelectorAll('.editor-img-wrap').forEach((wrap) => this.wireImageWrap(wrap, el, idoc));
        idoc.addEventListener('mousedown', (e) => {
          if (!e.target.closest || !e.target.closest('.editor-img-wrap')) {
            idoc.querySelectorAll('.editor-img-selected').forEach((w) => w.classList.remove('editor-img-selected'));
          }
        });
        idoc.addEventListener('keydown', (e) => this.onFrameKeydown(e, idoc, el));
        idoc.addEventListener('selectionchange', () => this.updateFmtBar(idoc, el));
      }
      this.fitMainCanvas();
    };
    this.mainFrame.srcdoc = this.buildFrameSrcdoc(node);
    this.updateSelectionHighlight();
  }

  onFrameKeydown(e, idoc, slideEl) {
    const meta = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();

    // undo/redo 永遠交給自家系統（文字編輯已透過 beforeinput 進 undoStack；
    // iframe 是獨立 document，事件不會冒泡到 contentEl，這裡要自己攔）
    if (meta && key === 'z' && !e.shiftKey) { e.preventDefault(); this.undo(); return; }
    if (meta && ((key === 'z' && e.shiftKey) || key === 'y')) { e.preventDefault(); this.redo(); return; }

    const selected = idoc.querySelector('.editor-img-wrap.editor-img-selected');
    if (!selected) return; // plain text editing — leave everything else native

    if (meta && key === 'x') { e.preventDefault(); this.cutImageWrap(selected); return; }
    if (meta && key === 'c') { e.preventDefault(); this.copyImageWrap(selected); return; }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      this.deleteImageWrap(selected);
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      // first nudge of a burst captures the pre-move snapshot; the debounce
      // commits one undo entry + one sync for the whole burst
      if (!this._nudgePending) {
        this.syncCurrentSlideFromFrame();
        this._nudgePending = this.snapshotState();
        // sync replaced the live slide's stored clone, but the LIVE wrap element
        // is still what we mutate below — re-query it in the live document
      }
      clearTimeout(this._nudgeTimer);
      const step = e.shiftKey ? 10 : 1;
      const slideRect = slideEl.getBoundingClientRect();
      const wrapRect = selected.getBoundingClientRect();
      // style.left 可能是 %，用 rect 取目前像素位置
      let left = wrapRect.left - slideRect.left;
      let top = wrapRect.top - slideRect.top;
      if (e.key === 'ArrowLeft') left -= step;
      if (e.key === 'ArrowRight') left += step;
      if (e.key === 'ArrowUp') top -= step;
      if (e.key === 'ArrowDown') top += step;
      selected.style.left = Math.max(0, Math.min(left, slideRect.width - wrapRect.width)) + 'px';
      selected.style.top = Math.max(0, Math.min(top, slideRect.height - wrapRect.height)) + 'px';
      this._nudgeTimer = setTimeout(() => {
        this.commitUndo(this._nudgePending);
        this._nudgePending = null;
        this.syncCurrentSlideFromFrame();
        this.markDirty();
      }, 500);
    }
  }

  // ---------- floating text-format toolbar ----------

  buildFmtBar() {
    const bar = this.fmtBar;
    bar.empty();
    // preventDefault keeps the iframe text selection alive while clicking here
    bar.addEventListener('mousedown', (e) => e.preventDefault());

    const btn = (parent, text, title, cls, fn) => {
      const b = parent.createEl('button', { cls: 'pe-fmt-btn' + (cls ? ' ' + cls : ''), text });
      b.title = title;
      b.addEventListener('click', fn);
      return b;
    };

    btn(bar, 'B', t('fmtBoldTitle'), 'pe-fmt-bold', () => this.execFmt('bold'));
    this.fmtColorWrap = bar.createDiv({ cls: 'pe-fmt-colors' });
    bar.createDiv({ cls: 'pe-fmt-sep' });
    btn(bar, t('fmtSizeUp'), t('fmtSizeUpTitle'), '', () => this.applyFontSize('1.25em'));
    btn(bar, t('fmtSizeReset'), t('fmtSizeResetTitle'), '', () => this.applyFontSize(''));
    btn(bar, t('fmtSizeDown'), t('fmtSizeDownTitle'), '', () => this.applyFontSize('0.85em'));
    bar.createDiv({ cls: 'pe-fmt-sep' });
    btn(bar, t('fmtClear'), t('fmtClearTitle'), 'pe-fmt-clear', () => this.execFmt('removeFormat'));
  }

  // swatches follow the deck's own palette so template switches stay coherent
  refreshFmtColors(idoc) {
    const cs = idoc.defaultView.getComputedStyle(idoc.documentElement);
    const colors = ['--accent', '--accent-2', '--text', '--text-dim']
      .map((v) => cs.getPropertyValue(v).trim())
      .filter(Boolean);
    const key = colors.join('|');
    if (key === this._fmtColorKey) return;
    this._fmtColorKey = key;
    this.fmtColorWrap.empty();
    colors.forEach((color) => {
      const b = this.fmtColorWrap.createEl('button', { cls: 'pe-fmt-btn pe-fmt-swatch' });
      b.style.background = color;
      b.title = t('fmtColorTitle', color);
      b.addEventListener('click', () => this.execFmt('foreColor', color));
    });
  }

  updateFmtBar(idoc, slideEl) {
    if (idoc !== this._activeIdoc) return;
    const sel = idoc.getSelection();
    const active = sel && sel.rangeCount > 0 && !sel.isCollapsed &&
      slideEl.contains(sel.anchorNode) &&
      !(sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.editor-img-wrap'));
    if (active) {
      this.refreshFmtColors(idoc);
      this.fmtBar.show();
    } else {
      this.fmtBar.hide();
    }
  }

  execFmt(cmd, value) {
    const idoc = this._activeIdoc;
    if (!idoc) return;
    // execCommand 不觸發 beforeinput，undo 快照要自己拍
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    idoc.execCommand('styleWithCSS', false, cmd !== 'bold'); // bold as <b>: deck CSS 用 b 做強調色
    idoc.execCommand(cmd, false, value);
    this.syncCurrentSlideFromFrame();
    this.markDirty();
  }

  applyFontSize(em) {
    const idoc = this._activeIdoc;
    if (!idoc) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    // execCommand 沒有相對字級：先打 size 7 當標記，再改寫成 em
    idoc.execCommand('styleWithCSS', false, true);
    idoc.execCommand('fontSize', false, '7');
    idoc.querySelectorAll('span').forEach((s) => {
      if (s.style.fontSize === 'xxx-large') s.style.fontSize = em;
    });
    this.syncCurrentSlideFromFrame();
    this.markDirty();
  }

  // ---------- images ----------

  async saveImageToVault(file) {
    const parent = this.file.parent;
    const folder = normalizePath((parent.path === '/' ? '' : parent.path + '/') + 'images');
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder).catch(() => {});
    }
    let ext = (file.type.split('/')[1] || 'png').toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext.includes('svg')) ext = 'svg';
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const name = `img-${stamp}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
    await this.app.vault.createBinary(normalizePath(folder + '/' + name), await file.arrayBuffer());
    return 'images/' + name;
  }

  handleSlidePaste(e, idoc, slideEl) {
    if (this.lastCutKind === 'image' && this.imageClipboard) {
      e.preventDefault();
      this.pasteImageClipboard();
      return;
    }
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    let imageFile = null;
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) { imageFile = item.getAsFile(); break; }
    }
    if (!imageFile) {
      // 富文字貼上會把外部 inline style 帶進投影片——一律降為純文字
      const text = e.clipboardData.getData('text/plain');
      if (text) {
        e.preventDefault();
        this.noteTextEdit(); // execCommand 不觸發 beforeinput，快照自己拍
        idoc.execCommand('insertText', false, text);
      }
      return;
    }
    e.preventDefault();
    this.saveImageToVault(imageFile)
      .then((relPath) => this.insertImageIntoSlide(idoc, slideEl, relPath))
      .catch((err) => new Notice(t('imgSaveFailed', err.message)));
  }

  insertImageIntoSlide(idoc, slideEl, relPath) {
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const img = idoc.createElement('img');
    img.setAttribute('src', relPath);
    img.setAttribute('style', 'display:block;width:100%;height:auto;');
    img.draggable = false;

    const wrap = idoc.createElement('div');
    wrap.className = 'editor-img-wrap';
    wrap.setAttribute('contenteditable', 'false');
    wrap.style.position = 'absolute';
    wrap.style.left = '30%';
    wrap.style.top = '29%';
    wrap.style.width = '39%';
    wrap.appendChild(img);

    slideEl.appendChild(wrap);
    this.wireImageWrap(wrap, slideEl, idoc);
    this.syncCurrentSlideFromFrame();
    this.markDirty();
  }

  cutImageWrap(wrap) {
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const clone = wrap.cloneNode(true);
    clone.classList.remove('editor-img-selected');
    clone.querySelectorAll('.editor-img-del, .editor-img-resize').forEach((el) => el.remove());
    this.imageClipboard = clone;
    this.lastCutKind = 'image';
    wrap.remove();
    this.syncCurrentSlideFromFrame();
    this.markDirty();
    new Notice(t('noticeCutImage'));
  }

  copyImageWrap(wrap) {
    const clone = wrap.cloneNode(true);
    clone.classList.remove('editor-img-selected');
    clone.querySelectorAll('.editor-img-del, .editor-img-resize').forEach((el) => el.remove());
    this.imageClipboard = clone;
    this.lastCutKind = 'image';
    new Notice(t('noticeCopiedImage'));
  }

  deleteImageWrap(wrap) {
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    wrap.remove();
    this.syncCurrentSlideFromFrame();
    this.markDirty();
  }

  pasteImageClipboard() {
    if (!this.imageClipboard) return;
    this.syncCurrentSlideFromFrame();
    this.pushUndo();
    const target = this.slides[this.selectedIndex];
    if (!target) return;
    const clone = target.ownerDocument.importNode(this.imageClipboard, true);
    // cascade-offset if an image already sits at the same spot (unit-aware: % or px)
    const collide = () => Array.from(target.querySelectorAll('.editor-img-wrap'))
      .some((w) => w.style.left === clone.style.left && w.style.top === clone.style.top);
    const bump = (v, pxStep, pctStep) => {
      const n = parseFloat(v) || 0;
      return String(v).includes('%') ? (n + pctStep) + '%' : (n + pxStep) + 'px';
    };
    while (collide()) {
      clone.style.left = bump(clone.style.left, 24, 2);
      clone.style.top = bump(clone.style.top, 24, 3);
    }
    target.appendChild(clone);
    this.markDirty();
    this.refreshThumb(this.selectedIndex);
    // reload the canvas without re-syncing stale frame content over our change
    this.frameNode = null;
    this.selectSlide(this.selectedIndex);
  }

  wireImageWrap(wrap, slideEl, idoc) {
    wrap.setAttribute('contenteditable', 'false'); // stripped on serialize, restored here every load
    wrap.querySelectorAll('.editor-img-del, .editor-img-resize').forEach((el) => el.remove());
    const del = idoc.createElement('div');
    del.className = 'editor-img-del';
    del.textContent = '×';
    wrap.appendChild(del);
    const grip = idoc.createElement('div');
    grip.className = 'editor-img-resize';
    wrap.appendChild(grip);

    del.addEventListener('mousedown', (ev) => ev.stopPropagation());
    del.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.deleteImageWrap(wrap);
    });

    grip.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.syncCurrentSlideFromFrame();
      const pendingSnap = this.snapshotState();
      let moved = false;
      const startX = e.clientX;
      const startWidth = wrap.getBoundingClientRect().width;
      const slideRect = slideEl.getBoundingClientRect();
      // style.left 可能是 %（序列化後的格式），一律用 rect 取目前像素位置
      const left = wrap.getBoundingClientRect().left - slideRect.left;
      const onMove = (ev) => {
        moved = true;
        let newW = startWidth + (ev.clientX - startX);
        newW = Math.max(60, Math.min(newW, slideRect.width - left));
        wrap.style.width = newW + 'px';
      };
      const onUp = () => {
        idoc.removeEventListener('mousemove', onMove);
        idoc.removeEventListener('mouseup', onUp);
        if (moved) {
          this.commitUndo(pendingSnap);
          this.syncCurrentSlideFromFrame();
          this.markDirty();
        }
      };
      idoc.addEventListener('mousemove', onMove);
      idoc.addEventListener('mouseup', onUp);
    });

    wrap.addEventListener('mousedown', (e) => {
      if (e.target === del || e.target === grip) return;
      e.preventDefault();
      e.stopPropagation();
      idoc.querySelectorAll('.editor-img-selected').forEach((w) => w.classList.remove('editor-img-selected'));
      wrap.classList.add('editor-img-selected');
      // preventDefault blocks natural focus transfer — without this, ⌘X after
      // clicking an image lands on the sidebar and cuts the whole slide
      idoc.defaultView.focus();

      this.syncCurrentSlideFromFrame();
      const pendingSnap = this.snapshotState();
      let moved = false;
      const startX = e.clientX;
      const startY = e.clientY;
      const slideRect = slideEl.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      // style.left 可能是 %（序列化後的格式），一律用 rect 取目前像素位置；
      // 拖曳過程寫 px（編輯器恰為 1280×720），sync 時 normalize 會轉回 %
      const startLeft = wrapRect.left - slideRect.left;
      const startTop = wrapRect.top - slideRect.top;

      // center alignment guides
      const guideV = idoc.createElement('div');
      guideV.className = 'editor-guide-v';
      guideV.style.display = 'none';
      const guideH = idoc.createElement('div');
      guideH.className = 'editor-guide-h';
      guideH.style.display = 'none';
      slideEl.appendChild(guideV);
      slideEl.appendChild(guideH);

      const onMove = (ev) => {
        moved = true;
        let newLeft = startLeft + (ev.clientX - startX);
        let newTop = startTop + (ev.clientY - startY);
        newLeft = Math.max(0, Math.min(newLeft, slideRect.width - wrapRect.width));
        newTop = Math.max(0, Math.min(newTop, slideRect.height - wrapRect.height));
        // snap to slide center
        const cx = newLeft + wrapRect.width / 2;
        const cy = newTop + wrapRect.height / 2;
        if (Math.abs(cx - slideRect.width / 2) < SNAP_PX) {
          newLeft = slideRect.width / 2 - wrapRect.width / 2;
          guideV.style.display = '';
        } else guideV.style.display = 'none';
        if (Math.abs(cy - slideRect.height / 2) < SNAP_PX) {
          newTop = slideRect.height / 2 - wrapRect.height / 2;
          guideH.style.display = '';
        } else guideH.style.display = 'none';
        wrap.style.left = newLeft + 'px';
        wrap.style.top = newTop + 'px';
      };
      const onUp = () => {
        idoc.removeEventListener('mousemove', onMove);
        idoc.removeEventListener('mouseup', onUp);
        guideV.remove();
        guideH.remove();
        if (moved) {
          this.commitUndo(pendingSnap);
          this.syncCurrentSlideFromFrame();
          this.markDirty();
        }
      };
      idoc.addEventListener('mousemove', onMove);
      idoc.addEventListener('mouseup', onUp);
    });
  }

  // ---------- AI mode (local claude CLI) ----------

  toggleAiMode() {
    this.aiMode = !this.aiMode;
    this.modeBtn.toggleClass('pe-mode-ai', this.aiMode);
    this.modeBtn.textContent = this.aiMode ? t('editMode') : t('aiMode');
    if (this.aiMode) {
      this.chatPanel.show();
      this.updateChatTarget();
      this.renderChatLog();
      this.chatInput.focus();
    } else {
      this.chatPanel.hide();
    }
    this.fitMainCanvas();
  }

  updateChatTarget() {
    if (this.chatTargetEl) this.chatTargetEl.textContent = t('chatTarget', this.selectedIndex + 1);
  }

  renderChatLog() {
    this.chatLogEl.empty();
    this.chatHistory.forEach((m) => {
      const cls = m.role === 'user' ? 'pe-chat-user' : (m.role === 'error' ? 'pe-chat-err' : 'pe-chat-ai');
      this.chatLogEl.createDiv({ cls: 'pe-chat-msg ' + cls, text: m.text });
    });
    this.chatLogEl.scrollTop = this.chatLogEl.scrollHeight;
  }

  buildAiPrompt(slideHtml, instruction) {
    const styleMatch = this.docHead.match(/<style[\s\S]*?<\/style>/i);
    const css = styleMatch ? styleMatch[0] : '';
    return [
      'You are a presentation HTML generator. Below are the CSS of an HTML slide deck and the source of one of its slides.',
      'Regenerate that slide according to the instruction.',
      '',
      'Rules:',
      '- Output exactly one complete <section class="slide" ...>...</section> — no other text, explanation, or markdown fences.',
      '- Keep the original data-part attribute value (unless the instruction says otherwise).',
      '- Only use classes that exist in the CSS plus inline styles; use inline SVG for charts or diagrams.',
      '- Keep the slide content in the same language as the original slide.',
      '',
      '[CSS]',
      css,
      '',
      '[ORIGINAL SLIDE]',
      slideHtml,
      '',
      '[INSTRUCTION]',
      instruction,
    ].join('\n');
  }

  runClaude(prompt) {
    return new Promise((resolve, reject) => {
      const { spawn } = require('child_process');
      const s = this.plugin.settings;
      const modelArg = s.claudeModel ? ` --model ${s.claudeModel}` : '';
      const cmd = `${s.claudeCmd} -p --output-format text${modelArg}`;
      const basePath = this.app.vault.adapter.basePath || undefined;
      // login shell so the GUI process resolves the user's PATH (homebrew etc.)
      const child = spawn('/bin/zsh', ['-lc', cmd], { cwd: basePath });
      let out = '';
      let err = '';
      const timer = setTimeout(() => {
        child.kill('SIGKILL');
        reject(new Error(t('aiTimeout')));
      }, 240000);
      child.stdout.on('data', (d) => { out += d.toString(); });
      child.stderr.on('data', (d) => { err += d.toString(); });
      child.on('error', (e) => { clearTimeout(timer); reject(e); });
      child.on('close', (code) => {
        clearTimeout(timer);
        if (code === 0) resolve(out);
        else reject(new Error(err.trim() || `claude exit code ${code}`));
      });
      child.stdin.write(prompt);
      child.stdin.end();
    });
  }

  async sendAiRequest() {
    if (this.aiBusy) { new Notice(t('aiBusy')); return; }
    const instruction = this.chatInput.value.trim();
    if (!instruction) return;
    const target = this.selectedIndex;
    const targetNode = this.slides[target];
    if (!targetNode) return;

    this.syncCurrentSlideFromFrame();
    const slideHtml = this.cleanSlideClone(this.slides[target]).outerHTML;

    this.chatInput.value = '';
    this.aiBusy = true;
    this.chatSendBtn.disabled = true;
    this.chatSendBtn.textContent = '⏳';
    this.chatHistory.push({ role: 'user', text: t('chatUserPrefix', target + 1) + instruction });
    this.chatHistory.push({ role: 'ai', text: t('aiGenerating') });
    this.renderChatLog();
    const pendingMsg = this.chatHistory[this.chatHistory.length - 1];

    try {
      const output = await this.runClaude(this.buildAiPrompt(slideHtml, instruction));
      const m = output.match(/<section[\s\S]*<\/section>/);
      if (!m) throw new Error(t('aiNoSection'));
      const doc = new DOMParser().parseFromString(m[0], 'text/html');
      const newSlide = doc.querySelector('section.slide');
      if (!newSlide) throw new Error(t('aiInvalidSection'));

      this.pushUndo();
      // the target may have moved while Claude worked — relocate by identity
      let idx = this.slides.indexOf(targetNode);
      if (idx === -1) idx = Math.min(target, this.slides.length - 1);
      this.slides[idx] = this.cleanSlideClone(newSlide);
      this.markDirty();
      this.refreshThumb(idx);
      if (idx === this.selectedIndex) {
        this.frameNode = null;
        this.selectSlide(idx);
      }
      pendingMsg.text = t('aiUpdated', idx + 1);
    } catch (e) {
      pendingMsg.role = 'error';
      pendingMsg.text = '❌ ' + (e.message || String(e));
    } finally {
      this.aiBusy = false;
      this.chatSendBtn.disabled = false;
      this.chatSendBtn.textContent = t('send');
      this.renderChatLog();
    }
  }
}

/* ================================================================
 * Template picker modal
 * ================================================================ */

class TemplatePickerModal extends Modal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
  }

  onOpen() {
    this.contentEl.empty();
    this.contentEl.createEl('h3', { text: t('chooseTemplate') });
    const grid = this.contentEl.createDiv({ cls: 'pe-tpl-grid' });
    TEMPLATES.forEach((tpl) => {
      const card = grid.createDiv({ cls: 'pe-tpl-card' });
      const preview = card.createDiv({ cls: 'pe-tpl-preview' });
      preview.style.background = tpl.swatch.bg;
      preview.style.color = tpl.swatch.fg;
      preview.createSpan({ text: t('tplPreviewText') });
      const bar = preview.createDiv();
      bar.style.cssText = `width:46px;height:6px;border-radius:3px;margin-left:10px;background:${tpl.swatch.fg2};`;
      card.createDiv({ cls: 'pe-tpl-name', text: tpl.name });
      card.createDiv({ cls: 'pe-tpl-desc', text: tpl.desc });
      card.addEventListener('click', () => {
        this.close();
        this.onChoose(tpl);
      });
    });
  }

  onClose() { this.contentEl.empty(); }
}

/* ================================================================
 * Settings
 * ================================================================ */

class PresentationEditorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName(t('setCmdName'))
      .setDesc(t('setCmdDesc'))
      .addText((txt) => txt.setValue(this.plugin.settings.claudeCmd).onChange(async (v) => {
        this.plugin.settings.claudeCmd = v.trim() || 'claude';
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName(t('setModelName'))
      .setDesc(t('setModelDesc'))
      .addText((txt) => txt.setValue(this.plugin.settings.claudeModel).onChange(async (v) => {
        this.plugin.settings.claudeModel = v.trim();
        await this.plugin.saveSettings();
      }));

    new Setting(containerEl)
      .setName(t('setFolderName'))
      .setDesc(t('setFolderDesc'))
      .addText((txt) => txt.setValue(this.plugin.settings.newFileFolder).onChange(async (v) => {
        this.plugin.settings.newFileFolder = v.trim() || 'presentations';
        await this.plugin.saveSettings();
      }));
  }
}

/* ================================================================
 * Plugin
 * ================================================================ */

module.exports = class PresentationEditorPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    this.registerView(VIEW_TYPE, (leaf) => new PresentationEditorView(leaf, this));
    try {
      this.registerExtensions(['html'], VIEW_TYPE);
    } catch (e) {
      new Notice(t('extTaken'));
    }

    this.addCommand({
      id: 'new-presentation',
      name: t('cmdNew'),
      callback: () => {
        new TemplatePickerModal(this.app, (tpl) => this.createFromTemplate(tpl)).open();
      },
    });

    // 不設預設快捷鍵（Obsidian guideline）；可在快捷鍵設定自行綁定（如 ⌘S）
    this.addCommand({
      id: 'save-presentation',
      name: t('cmdSave'),
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(PresentationEditorView);
        if (!view) return false;
        if (!checking) view.save();
        return true;
      },
    });

    this.addCommand({
      id: 'duplicate-presentation',
      name: t('cmdDuplicate'),
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(PresentationEditorView);
        if (!view || !view.file) return false;
        if (!checking) this.duplicatePresentation(view);
        return true;
      },
    });

    this.addCommand({
      id: 'upgrade-playback',
      name: t('cmdUpgrade'),
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(PresentationEditorView);
        if (!view || view.fallbackMode) return false;
        if (!checking) view.upgradePlayback();
        return true;
      },
    });

    this.addSettingTab(new PresentationEditorSettingTab(this.app, this));
  }

  async saveSettings() { await this.saveData(this.settings); }

  async duplicatePresentation(view) {
    await view.save();
    const file = view.file;
    const folder = file.parent.path === '/' ? '' : file.parent.path + '/';
    const base = file.basename + '-copy';
    let path = normalizePath(folder + base + '.html');
    let n = 2;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = normalizePath(folder + base + '-' + n + '.html');
      n++;
    }
    const content = await this.app.vault.read(file);
    const copy = await this.app.vault.create(path, content);
    await this.app.workspace.getLeaf('tab').openFile(copy);
    new Notice(t('duplicated', path));
  }

  async createFromTemplate(tpl) {
    const folder = normalizePath(this.settings.newFileFolder);
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder).catch(() => {});
    }
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    let base = `presentation-${dateStr}`;
    let path = normalizePath(`${folder}/${base}.html`);
    let n = 2;
    while (this.app.vault.getAbstractFileByPath(path)) {
      path = normalizePath(`${folder}/${base}-${n}.html`);
      n++;
    }
    const title = base;
    const file = await this.app.vault.create(path, tpl.html(title));
    await this.app.workspace.getLeaf('tab').openFile(file);
    new Notice(t('createdFile', path));
  }
};

/* nosourcemap */