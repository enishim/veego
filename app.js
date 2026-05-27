/* =============================================
   VigoPRO — ISP Manager | App Logic
   ============================================= */

// ---- NAVIGATION ----
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  if (pg) pg.classList.add('active');
  const link = document.querySelector(`.nav-item[data-page="${id}"]`);
  if (link) link.classList.add('active');
  window.scrollTo && window.scrollTo(0,0);
  document.querySelector('.content') && (document.querySelector('.content').scrollTop = 0);
}

function showTab(pageId, tabId) {
  showPage(pageId);
  setTimeout(() => {
    const container = document.getElementById('page-' + pageId);
    if (!container) return;
    container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById(`tab-${pageId}-${tabId}`);
    if (pane) pane.classList.add('active');
    const btn = container.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (btn) btn.classList.add('active');
  }, 10);
}

// ---- TOAST ----
function toast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ---- MODAL ----
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

// ---- RADIUS SIMULATOR ----
function bloquearCliente(nome) {
  if (confirm(`Bloquear acesso RADIUS de "${nome}"?`)) {
    toast(`🔒 ${nome} bloqueado no RADIUS com sucesso.`);
  }
}
function desbloquearCliente(nome) {
  toast(`🔓 ${nome} desbloqueado no RADIUS.`);
}
function reconectarCliente(nome) {
  toast(`🔄 Sessão de ${nome} reiniciada.`);
}

// ---- BOLETO SIMULATOR ----
function gerarBoleto(nome, valor, venc) {
  toast(`🧾 Boleto de R$${valor} gerado para ${nome} · Venc: ${venc}`);
}
function enviarWhatsApp(nome, valor) {
  toast(`💬 Boleto de R$${valor} enviado via WhatsApp para ${nome}`);
}
function copiarCodigo() {
  const code = '03399.26209 01001.637702 10001.202170 2 95460000008990';
  navigator.clipboard && navigator.clipboard.writeText(code);
  toast('📋 Código de barras copiado!');
}

// ---- ICLASS SYNC SIMULATOR ----
function sincronizarIclass() {
  toast('🔄 Sincronizando com iClass...');
  setTimeout(() => toast('✅ iClass sincronizado — 923 alunos atualizados.'), 1800);
}

// ---- RADIUS SYNC ----
function testarRadius() {
  toast('🔌 Testando conexão com servidor RADIUS...');
  setTimeout(() => toast('✅ RADIUS respondeu em 3ms — OK!'), 1200);
}
function salvarRadius() {
  toast('💾 Configurações RADIUS salvas com sucesso.');
}

// ---- FORM HELPERS ----
function preencherLogin() {
  const nome = document.getElementById('inp-nome');
  const login = document.getElementById('inp-login');
  if (nome && login && nome.value) {
    login.value = nome.value.toLowerCase().replace(/\s+/g, '.') + '@vigo';
  }
}

function gerarSenha() {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 10; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  const el = document.getElementById('inp-senha');
  if (el) { el.value = pwd; el.type = 'text'; }
  toast('🔑 Senha gerada: ' + pwd);
}

function buscarCep() {
  const cep = document.getElementById('inp-cep');
  if (!cep || cep.value.length < 8) return toast('⚠ Informe o CEP completo.');
  toast('📍 Buscando endereço pelo CEP...');
  setTimeout(() => {
    const end = document.getElementById('inp-logradouro');
    const bairro = document.getElementById('inp-bairro');
    if (end) end.value = 'Rua Exemplo da Silva';
    if (bairro) bairro.value = 'Centro';
    toast('✅ Endereço preenchido automaticamente.');
  }, 900);
}

// ---- SAVE SIMULATORS ----
function salvarCliente() {
  const nome = document.getElementById('inp-nome');
  const n = nome ? nome.value : 'cliente';
  toast(`✅ Cliente "${n}" salvo! Acesso RADIUS criado.`);
  setTimeout(() => showTab('clientes','lista'), 1500);
}
function salvarBanco() { toast('💾 Configuração bancária salva.'); }
function salvarIclass() { toast('💾 Integração iClass salva.'); }
function salvarSmtp() { toast('💾 Configuração de e-mail salva.'); }
function salvarWhatsapp() { toast('💾 Configuração WhatsApp salva.'); }

// ---- RELATORIO ----
function exportarRelatorio(tipo) {
  toast(`📥 Gerando relatório de ${tipo}... (em produção, geraria um CSV/PDF)`);
}

// ---- TABLE SEARCH ----
function filtrarTabela(inputId, tbodyId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll(`#${tbodyId} tr`).forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  showPage('dashboard');

  // Nav item clicks via data-page
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.page));
  });

  // Tab button clicks
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.page');
      if (!container) return;
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(`tab-${container.id.replace('page-','')}-${btn.dataset.tab}`);
      if (pane) pane.classList.add('active');
    });
  });

  // Modal close on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Escape key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
  });

  console.log('VigoPRO ISP Manager — iniciado.');
});
