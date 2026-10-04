// @ts-nocheck
var user = {
  currentLanguage: getPreferredLanguage(),
  currentJbFlavor: localStorage.getItem('jailbreakFlavor') || 'GoldHEN',
  platform: "PS4", // PS4/PC/Mobile etc..
  lastTab: localStorage.getItem('lastTab') || 'tools',
  advancedPayloads: localStorage.getItem('advancedPayloads') || false, // True/false
  ip: localStorage.getItem('PayLoaderIp') || window.location.hostname,
  ps4Fw: localStorage.getItem('ps4Fw'),  // Used for the case of sending the payload over the network
  clearLog: true,
  bareboneJB: localStorage.getItem('bareboneJB') === 'true',
  exploitChain: parseFloat(localStorage.getItem('exploitChain')), //Exploit chain method
  blockJailbreak: false,  // Prevent double jailbreak execution
}
var autoJbInterval;
let lastScrollY = 0;
let lastSection = "initial";
var devMode = false;   // Dev mode for PC debugging
var rtlLangs = ["ar", "fa"];

const webKitMin = 6.70;
const webKitMax = 13.52;
const projectName = "XP Eletrônicos · PS4";

const ui = {
  mainContainer: document.querySelector('.mainContainer'),

  // Sections
  initialScreen: document.getElementById('initial-screen'),
  exploitScreen: document.getElementById('exploit-main-screen'),

  // Initial screen elements
  settingsBtn: document.getElementById("settings-btn"),
  aboutBtn: document.getElementById("about-btn"),
  psLogoContainer: document.getElementById('ps-logo-container'),
  clickToStartText: document.getElementById('click-to-start-text'),
  ps4FwStatus: document.getElementById('PS4FW'),
  stopAutoJbBtn: document.getElementById('stopAutoJb'),
  updateCacheBtn: document.getElementById("updateCache"),

  // Exploit screen elements
  consoleElement: document.getElementById('console'),
  exploitState: document.getElementById('state'),
  toolsSection: document.getElementById('tools'),
  toolsTab: document.getElementById('tools-tab'),
  homebrewSection: document.getElementById("homebrew"),
  homebrewTab: document.getElementById("homebrew-tab"),
  advancedPayloadsSection: document.getElementById('advanced'),
  advancedPayloadsTab: document.getElementById('advanced-tab'),
  advancedPayloadsContainer: document.querySelector('.advancedPayloadsTab'),
  advancedPayloadsInput: document.getElementById('advancedPayloadsInput'),
  customPayloadsSection: document.getElementById('custom'),
  customPayloadsTab: document.getElementById('custom-tab'),
  customPayloadInput: document.getElementById('customPayloadInput'),
  sendCustomPayloadBtn: document.getElementById('sendCustomPayloadBtn'),
  successRateText: document.getElementById('successRate'),

  payloadsSection: document.getElementById('payloadsSection'),
  payloadsList: document.getElementById("payloadsGrid"),
  payloadsSectionTitle: document.getElementById('payloads-section-title'),
  exploitRunBtn: document.getElementById('exploitRun'),
  secondHostBtn: document.querySelectorAll('.secondHostBtn'),
  ps4IpInput: document.getElementById('ps4IpInput'),
  ps4FwSelect: document.getElementById('ps4FwSelect'),
  // Popups
  aboutPopupOverlay: document.getElementById('about-popup-overlay'),
  aboutPopup: document.getElementById('about-popup'),
  settingsPopupOverlay: document.getElementById('settings-popup-overlay'),
  settingsPopup: document.getElementById('settings-popup'),
  themePopupOverlay: document.getElementById('theme-popup-overlay'),
  themePopup: document.getElementById('theme-popup'),
  chooseFanThresholdOverlay: document.getElementById('choose-fanThreshold-overlay'),
  chooseFanThreshold: document.getElementById('choose-fanThreshold'),
  scanGoldHENPayLoader: document.getElementById('scanPayLoader'),
  shutdownServerBtn: document.getElementById('shutdownServerBtn'),
  autoJbRetry: document.getElementById('autoJbRetry'),
  bareboneJbBtn: document.getElementById('bareboneJB'),
  bareboneJBInput: document.getElementById('bareboneJBInput'),
  exploitChainTitle: document.getElementById('exploitChainTitle'),

  // Settings elements
  langRadios: document.querySelectorAll('#chooselang input[name="language"]'),
};

// Jailbreak-related functions
async function jailbreak() {
  if (user.platform !== "PS4") return;

  // clear terminal
  ui.consoleElement.textContent = '';
  // stop counter
  if (autoJbInterval) clearInterval(autoJbInterval);

  // Make it retry untill success
  sessionStorage.setItem('autoJbRetry', 'true');

  // Skip if payload were chosen, useful when a payload were chosen from payloads.js
  const payloadPath = sessionStorage.getItem('payload_path');
  if (!payloadPath || payloadPath === "null" || payloadPath === "undefined") {
    // Choose HEN
    chooseHEN();
  }

  cleanUp();

  // barebone exploit prefered? go to exploit file
  if (user.bareboneJB) {
    window.location.href = "./exploit.html";
    return;
  }
  // add one jailbreak attempt to stats
  // prevent double exploit attempt for 6.7x
  if (sessionStorage.getItem('jailbreakNow') != "true") {
    updateJbStats(1, 0);
  }

  // checkFw.js already guarantees exploitChain is valid for the current firmware
  switch (user.exploitChain) {
    case 0: // modular psfree lapse
    case 1: // bundle psfree lapse
      psfreeLapse();
      break;
    case 2: // badhoist (6.70 - 6.72 only)
      badHoistJailbreak();
      break;
    case 3: // cssfontface netctrl
    case 4: // cssfontface lapse
      cssFontFaceJailbreak();
      break;
    case 5: // slopkit lapse
    case 6: // slopkit netctrl
      slopKit();
      break;
    case 7: // relapse (13.02 - 13.52)
      relapseJailbreak();
      break;
    default:
      log("Erro: método de desbloqueio inválido", "red");
  }
}

async function psfreeLapse() {
  // Exploit chain method check
  if (user.exploitChain == 0) { // modular lapse
    try {
      log("Carregando PSFree Lapse modular de Al-Azif...");
      await getScript('./src/psfree-lapse/alert.mjs');
    } catch (e) {
      log("alert.mjs não está definido", "red");
    }
  } else { // bundle lapse
    log("Carregando PSFree Lapse integrado de Feyzee61...");
    try {
      await loadScript('./src/psfree-lapse/bundle.js');

      if (typeof doJailBreak === "function") {
        doJailBreak();
      } else {
        log("Erro: doJailBreak não está definido", "red");
      }
    } catch (e) {
      log("Falha ao carregar script integrado: " + e.message, "red");
    }
  }
}

// Taken from Feyzee61 ps4jb
async function badHoistJailbreak() {
  log("Iniciando desbloqueio...");
  var jailbreakNow = sessionStorage.getItem('jailbreakNow') == null;
  if (jailbreakNow) {
    // set jailbreakNow to true, on reload to load userland exploit
    sessionStorage.setItem('jailbreakNow', "true");
    location.reload();
    return;
  }
  if (window.entrypoint672_result < 1) {
    log("Erro ao iniciar Bad Hoist\nTentando novamente...", "orange");
    await sleep(2000);
    location.reload();
    return;
  }
  else
    log("Bad Hoist iniciado com sucesso");
  if (window.exploitsetup672_result < 1) {
    log("Erro ao preparar desbloqueio\nAtualize a página e tente novamente...", "red");
    return;
  }
  else
    log("Preparação concluída\n");
  log("Iniciando desbloqueio do kernel...");
  await sleep(200); // Wait 200ms

  await loadScript('./src/badhoist/672kexploit.js');
  var result = KernelExploit672();

  if (result === 0 || result === 91) {
    log("\nDesbloqueio do kernel concluído", "green");
    // Inject HEN payload
    getPayload672(sessionStorage.getItem('payload_path'));

    log("\nBad Hoist by Fire30, 6.7x Kernel Exploit by Sleirsgoevy");
    log("Implementação de Feyzee61");
    jailbreakSuccess();
  } else if (result === 179) {
    getPayload672(sessionStorage.getItem('payload_path'));

    log("\nPS4 já desbloqueado, continuando...", "green");
    jailbreakSuccess();
  } else {
    log("\nErro no desbloqueio do kernel\nReinicie o console e tente novamente...", "red");
  }
}

async function cssFontFaceJailbreak() {
  log("Carregando CSSFontFace de ufm42...");
  await getScript('src/cssfontface/main.js');
  doCssFontFaceJailbreak();
}

async function slopKit() {
  log("Carregando SlopKit de Raw Game...");
  try {
    if (user.exploitChain === 6) {
      await getScript("src/slopkit/chain_poops.js", true);
    } else {
      await getScript("src/slopkit/chain_lapse.js", true);
    }
  } catch (error) {
    log(error);
  }

}

async function relapseJailbreak() {
  log("Carregando Relapse de Raw Game...");
  try {
    await getScript("src/relapse/jb.js?v=10", true);
  } catch (error) {
    log(error);
  }
}

// Apply lanuage after loading the language file
async function initLanguage() {
  try {
    await loadLanguage();
    applyLanguage(user.currentLanguage);
    updateJbStats(false, false);
  } catch (e) {
    console.error(e);
  }
}

// Load settings
async function loadSettings() {
  try {
    CheckFW();
    loadJbFlavor();
    await initLanguage();
    loadTheme();
    loadColor();
    renderPayloads(payloadsList);
    loadAdvancedPayloads();
    loadLastTab();
    loadGoldHENVer();
    getReloadAfterJb();
    autoJailbreak();
    updateBareboneJB();
    loadExploitChain();
  } catch (e) {
    alert("Erro ao carregar configurações: " + e.message);
  }
}

async function ipGuess() {
  await getScript("./includes/js/goldhenScanner.js");
  guessIp();
}

// A try to free up some memory to improve success rate
function cleanUp() {
  if (autoJbInterval) {
    clearInterval(autoJbInterval);
    autoJbInterval = null;
  }

  if (ui.initialScreen) {
    ui.initialScreen.style.display = 'none';
  }

  // 3. Ensure the exploit status console is displayed
  const exploitContainer = document.getElementById('exploitContainer');
  const payloadsSection = document.getElementById('payloadsSection');
  const playButton = document.getElementById('exploitRun');
  if (exploitContainer && payloadsSection) {
    exploitContainer.style.display = 'block';
    payloadsSection.style.display = 'none';
    playButton.style.display = 'none';
  }
}

function updateBareboneJB() {
  if (ui.bareboneJBInput) {
    ui.bareboneJBInput.checked = user.bareboneJB;
  }
}

// select exploit option when loading the page
function loadExploitChain() {
  // Protective check
  var radioElement = document.querySelector(`input[name="exploitChain"][value="${user.exploitChain}"]`);
  if (radioElement) {
    radioElement.checked = true;
  }
}
