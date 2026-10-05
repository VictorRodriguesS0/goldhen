const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
function storage(initial = {}) {
  const values = { ...initial };
  return { getItem: k => values[k] ?? null, setItem: (k, v) => { values[k] = String(v); } };
}
test('migra a instalação anterior para português uma vez e respeita mudanças posteriores', () => {
  const localStorage = storage({ language: 'en' });
  const context = vm.createContext({ localStorage });
  vm.runInContext(read('includes/js/language.js'), context);
  assert.equal(context.getPreferredLanguage(), 'pt-BR');
  localStorage.setItem('language', 'es');
  assert.equal(context.getPreferredLanguage(), 'es');
});
for (const lastTab of ['linux', 'missing', 'advanced']) {
  test(`preferência antiga ${lastTab} volta para ferramentas`, () => {
    const elements = {};
    for (const id of ['tools', 'homebrew', 'advanced', 'custom']) {
      elements[id] = { classList: { remove: () => {} }, click: () => {}, setAttribute: () => {} };
      elements[id + '-tab'] = { setAttribute: () => {} };
    }
    const user = { lastTab, advancedPayloads: 'false' };
    const localStorage = storage({ lastTab });
    const context = vm.createContext({ user, localStorage, ui: { toolsSection: elements.tools }, document: { getElementById: id => elements[id] || null } });
    vm.runInContext(read('includes/js/payloadsHandler.js'), context);
    context.loadLastTab();
    assert.equal(user.lastTab, 'tools');
    assert.equal(localStorage.getItem('lastTab'), 'tools');
  });
}
test('catálogo mantém ferramentas e homebrew sem carregadores Linux', () => {
  const context = vm.createContext({});
  vm.runInContext(read('includes/js/payloadsList.js') + '\nglobalThis.catalog = payloadsList;', context);
  assert.ok(context.catalog.some(p => p.id === 'FTP'));
  assert.ok(context.catalog.some(p => p.id === 'ApolloSaveTool'));
  assert.equal(context.catalog.some(p => p.category === 'linux' || p.id === 'DetectSouthbridge'), false);
});
test('tradução cobre as mensagens e preserva os campos variáveis', () => {
  const dictionaries = ['en', 'pt-BR'].map(locale => {
    const context = vm.createContext({ window: {} });
    vm.runInContext(read(`includes/js/languages/${locale}.js`), context);
    return context.window.lang;
  });
  for (const [key, value] of Object.entries(dictionaries[0])) {
    if (key === 'payloadsLinuxHeader') continue;
    assert.equal(typeof dictionaries[1][key], 'string', key);
    assert.deepEqual((dictionaries[1][key].match(/\{\w+\}/g) || []).sort(), (value.match(/\{\w+\}/g) || []).sort(), key);
  }
});
test('todos os caches incluem identidade e idioma e apontam para arquivos existentes', () => {
  const directory = path.join(root, 'includes/caches/manifest');
  for (const file of fs.readdirSync(directory)) {
    const manifest = read('includes/caches/manifest/' + file);
    assert.match(manifest, /xp-ps4-logo\.png/, file);
    assert.match(manifest, /whatsapp-qr\.png/, file);
    assert.match(manifest, /instagram-qr\.png/, file);
    assert.match(manifest, /languages\/pt-BR\.js/, file);
    assert.match(manifest, /index-legacy\.js/, file);
    assert.match(manifest, /includes\/js\/status\.js/, file);
    assert.doesNotMatch(manifest, /payloads\/Linux|southbridge/i, file);
    const entries = manifest.split('CACHE:')[1].split('NETWORK:')[0].split(/\r?\n/).filter(s => s.trim() && !s.startsWith('#'));
    for (const entry of entries) assert.ok(fs.existsSync(path.resolve(directory, entry.split('?')[0])), `${file}: ${entry}`);
  }
});
