const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function host(saved, options = {}) {
  const elements = {
    state: { textContent: 'Status do desbloqueio', className: '' },
    'jb-result': { textContent: '', hidden: true, attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } }
  };
  const values = saved ? { xpJbResult: saved } : {};
  const events = {};
  let mutation;
  const window = { addEventListener: (name, callback) => { events[name] = callback; } };
  const context = vm.createContext({
    window,
    sessionStorage: { getItem: k => values[k] || null, setItem: (k, v) => { values[k] = v; } },
    user: { exploitChain: options.chain },
    document: { readyState: options.loading ? 'loading' : 'complete', getElementById: id => elements[id] || null,
      addEventListener: (name, callback) => { events[name] = callback; } },
    MutationObserver: function (callback) { mutation = callback; this.observe = () => {}; }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../includes/js/status.js'), 'utf8'), context);
  return { api: window.XPStatus, result: elements['jb-result'], values, events, context,
    state(text, className = '') { elements.state.textContent = text; elements.state.className = className; mutation(); return elements.state.textContent; } };
}

test('o resultado definitivo DONE permanece em português e em verde', () => {
  const page = host();
  page.api.begin();
  page.api.success();
  assert.equal(page.state('DONE'), 'Desbloqueio concluído com sucesso!');
  assert.equal(page.result.attrs['data-state'], 'success');
  assert.equal(page.result.hidden, false);
});

test('falha após alteração do kernel orienta reiniciar em vermelho', () => {
  const page = host();
  page.api.begin();
  assert.match(page.state('Restart your console'), /Reinicie o PS4/);
  assert.equal(page.result.attrs['data-state'], 'error');
  assert.match(page.result.textContent, /Falha no desbloqueio/);
});

test('etapas intermediárias e provas OK não são interpretadas como sucesso', () => {
  const page = host();
  page.api.begin();
  page.state('running the primitive...', 'warn');
  page.state('PROOF-OK: kernel patched');
  assert.equal(page.result.attrs['data-state'], 'running');
  assert.equal(page.values.xpJbResult, 'running');
});

test('nova tentativa remove o resultado verde anterior', () => {
  const page = host('success');
  assert.match(page.result.textContent, /Último resultado/);
  page.api.begin();
  assert.equal(page.result.attrs['data-state'], 'running');
  assert.doesNotMatch(page.result.textContent, /sucesso/);
});

test('erro explícito do motor é vermelho e pode ser seguido de nova tentativa', () => {
  const page = host();
  page.api.begin();
  page.state('threw', 'bad');
  assert.equal(page.result.attrs['data-state'], 'error');
  page.api.begin();
  assert.equal(page.result.attrs['data-state'], 'running');
});

test('recarregar durante execução informa interrupção sem afirmar sucesso', () => {
  const page = host('running');
  assert.equal(page.result.attrs['data-state'], 'error');
  assert.match(page.result.textContent, /interrompida/);
  assert.doesNotMatch(page.result.textContent, /sucesso/);
});

test('erro fora de uma tentativa não é apresentado como falha do jailbreak', () => {
  const page = host();
  page.events.unhandledrejection({});
  assert.equal(page.result.hidden, true);
  page.api.begin();
  page.events.unhandledrejection({});
  assert.equal(page.result.attrs['data-state'], 'error');
});

test('inicialização do modo simplificado não confunde tentativa atual com interrupção', () => {
  const page = host(null, { loading: true });
  page.api.begin();
  page.events.DOMContentLoaded();
  assert.equal(page.result.attrs['data-state'], 'running');
});

for (const incomplete of ['FAILED', 'ROOT + KERNEL PATCHED -- NO REBOOT', 'REPAIRED -- NO REBOOT NEEDED']) {
  test(`SlopKit ${incomplete} não gera falso sucesso nem autoriza recarregar`, () => {
    const page = host(null, { chain: 5 });
    page.api.begin();
    page.state(incomplete);
    assert.equal(page.api.success(), false);
    assert.equal(page.result.attrs['data-state'], 'error');
    assert.doesNotMatch(page.result.textContent, /Atualize/);
  });
}

test('SlopKit ALL DONE é aceito como conclusão', () => {
  const page = host(null, { chain: 6 });
  page.api.begin();
  page.state('ALL DONE');
  assert.equal(page.api.success(), true);
  assert.equal(page.result.attrs['data-state'], 'success');
});

test('CSSFontFace que termina sem confirmar sucesso apresenta falha', async () => {
  const page = host(null, { chain: 3 });
  page.api.begin();
  page.context.log = () => {};
  page.context.getScript = async () => {};
  page.context.doCssFontFaceJailbreak = async () => {};
  const source = fs.readFileSync(path.join(__dirname, '../includes/js/index.js'), 'utf8');
  vm.runInContext(source.slice(source.indexOf('async function cssFontFaceJailbreak()'), source.indexOf('async function slopKit()')), page.context);
  await page.context.cssFontFaceJailbreak();
  assert.equal(page.result.attrs['data-state'], 'error');
});
