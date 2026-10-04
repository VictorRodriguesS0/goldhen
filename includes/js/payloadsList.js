const payloadsList = [
  {
    id: "FTP",
    name: "FTP",
    author: "Scene Collective",
    description: "Ativa o servidor FTP para transferir arquivos.",
    specificFW: "",
    category: "tools",
    funcName: "load_FTP"
  },
  {
    id: "BinLoader",
    name: "BinLoader",
    author: "Exploit",
    description: "Inicia o servidor BinLoader na porta 9020 para receber payloads .bin.",
    specificFW: "7.00 - 9.60",
    category: "tools",
    funcName: "load_BinLoader"
  },
  {
    id: "ElfLoader",
    name: "ElfLoader",
    author: "John T&#246;rnblom",
    description: "Inicia o servidor ElfLoader na porta 9021 para receber payloads .elf.",
    specificFW: "",
    category: "tools",
    funcName: "load_Elfldr"
  },
  {
    id: "DisableUpdates",
    name: "Desativar atualizações",
    author: "Scene Collective",
    description: "Desativa as atualizações automáticas do sistema.",
    specificFW: "",
    category: "tools",
    funcName: "load_DisableUpdates"
  },
  {
    id: "FanThreshold",
    name: "Temperatura da ventoinha",
    author: "Scene Collective",
    description: "Define o perfil de resfriamento da ventoinha do PlayStation 4.",
    specificFW: "",
    category: "tools",
    funcName: "chooseFanThreshold"
  },
  {
    id: "HistoryBlocker",
    name: "Bloquear histórico",
    author: "Stooged",
    description: "Impede o navegador de reabrir a última página ao iniciar. Execute novamente para ativar ou desativar.",
    specificFW: "",
    category: "tools",
    funcName: "load_HistoryBlocker"
  },
  {
    id: "WebSrv",
    name: "PS4-Websrv",
    author: "ArabPixel",
    description: "Inicia um servidor web na porta 80 do PS4 para receber payloads de outros dispositivos.",
    specificFW: "",
    category: "tools",
    funcName: "load_WebSrv"
  },
  {
    id: "NpFakeSignin",
    name: "NP Fake Signin",
    author: "earthonion",
    description: "Define o estado da PSN como conectado. Use após a ativação simulada; útil para o vue after free.",
    specificFW: "",
    category: "tools",
    funcName: "load_npFakeSignin"
  },
  {
    id: "OrbisToolbox",
    name: "Orbis-Toolbox",
    author: "OSM-Made",
    description: "Modifica a interface do PlayStation para ajudar a executar e desenvolver homebrew.",
    specificFW: "5.05, 6.72, 7.02, 7.55, 9.00",
    category: "tools",
    funcName: "load_Orbis"
  },
  {
    id: "BackupDB",
    name: "Backup dos dados",
    author: "Stooged",
    description: "Faz backup dos bancos de dados, licenças e dados de usuário. Após reinicializar o sistema, as chaves podem mudar e impedir a restauração.",
    specificFW: "",
    category: "tools",
    funcName: "load_BackupDB"
  },
  {
    id: "RestoreDB",
    name: "Restaurar dados",
    author: "Stooged",
    description: "Restaura os dados salvos pelo payload de backup.",
    specificFW: "",
    category: "tools",
    funcName: "load_RestoreDB"
  },
  {
    id: "DBRebuilder",
    name: "Reconstruir banco de dados",
    author: "4GAMER",
    description: "Reconstrói o banco de dados FPKG e recupera os ícones de homebrew na tela inicial.",
    specificFW: "",
    category: "tools",
    funcName: "load_DBRebuilder"
  },
  {
    id: "ExitIDU",
    name: "Sair do modo IDU",
    author: "Scene Collective",
    description: "Sai do modo IDU e reinicia o console.",
    specificFW: "",
    category: "tools",
    funcName: "load_ExitIDU"
  },
  {
    id: "WebRTE",
    name: "WebRTE",
    author: "Criado por golden<br>atualizado por EchoStretch",
    description: "Ferramenta de modificação de jogos em tempo real pela rede.",
    specificFW: "5.05, 6.72, 7.00-11.00",
    category: "tools",
    funcName: "load_WebRTE"
  },
  {
    id: "App2USB",
    name: "App2USB",
    author: "Stooged",
    description: "Move os aplicativos instalados para uma unidade USB externa de forma não oficial.",
    specificFW: "",
    category: "tools",
    funcName: "load_App2USB"
  },
  {
    id: "PS4Debug",
    name: "PS4-Debug",
    author: "CTN & SiSTR0",
    description: "Ferramentas de depuração para PS4.",
    specificFW: "até 12.02",
    category: "advanced",
    funcName: "load_PS4Debug"
  },
  {
    id: "PUPDecrypt",
    name: "Descriptografar PUP",
    author: "andy-man",
    description: "Descriptografa o conteúdo de um arquivo de atualização de firmware (PUP) no PS4.",
    specificFW: "",
    category: "advanced",
    funcName: "load_PUPDecrypt"
  },
  {
    id: "ModuleDumper",
    name: "Extrair módulos",
    author: "SocraticBliss",
    description: "Copia os módulos descriptografados de /system, /system_ex, /update e da raiz do sistema para um dispositivo USB.",
    specificFW: "",
    category: "advanced",
    funcName: "load_ModuleDumper"
  },
  {
    id: "KernelDumper",
    name: "Extrair kernel",
    author: "Eversion",
    description: "Extrai uma cópia do kernel do PS4.",
    specificFW: "",
    category: "advanced",
    funcName: "load_KernelDumper"
  },
  {
    id: "DisableASLR",
    name: "Desativar ASLR",
    author: "Scene Collective",
    description: "Desativa a randomização de endereços de memória (ASLR), facilitando o trabalho com a memória.",
    specificFW: "",
    category: "advanced",
    funcName: "load_DisableASLR"
  },
  {
    id: "PermanentUART",
    name: "UART permanente",
    author: "JTAG7371",
    description: "Ativa a UART por hardware sem alterar o kernel. A configuração permanece após atualizações.",
    specificFW: "",
    category: "advanced",
    funcName: "load_PermanentUART"
  },
  {
    id: "RIFRenamer",
    name: "Renomear licenças RIF",
    author: "Al Azif",
    description: "Renomeia licenças RIF simuladas como livres para melhorar a compatibilidade com HEN. Use se os PKGs funcionam apenas com Mira+HEN.",
    specificFW: "",
    category: "advanced",
    funcName: "load_RIFRenamer"
  },
  {
    id: "OnlineStoreInstall",
    name: "Instalar Homebrew Store",
    author: "LightningMods",
    description: "Instala a PS4 Homebrew Store.<br>É necessário estar conectado à internet.",
    specificFW: "",
    category: "homebrew",
    funcName: "load_onlineStoreInstaller"
  },
  {
    id: "ApolloSaveTool",
    name: "Instalar Apollo Save Tool",
    author: "Bucanero",
    description: "Instala o Apollo Save Tool para gerenciar os arquivos de jogos salvos do PS4.<br>É necessário estar conectado à internet.",
    specificFW: "",
    category: "homebrew",
    funcName: "load_ApolloSaveTool"
  },
  {
    id: "ItemzFlow",
    name: "Instalar Itemzflow",
    author: "LightningMods",
    description: "Instala o Itemzflow, uma alternativa livre ao menu inicial do PS4.<br>É necessário estar conectado à internet.",
    specificFW: "",
    category: "homebrew",
    funcName: "load_Itemsflow"
  },
  {
    id: "PS4Xplorer2.0",
    name: "Instalar PS4 Xplorer 2.08",
    author: "Lapy",
    description: "Instala o gerenciador de arquivos PS4 Xplorer 2.08.<br>É necessário estar conectado à internet.",
    specificFW: "13.52",
    category: "homebrew",
    funcName: "load_PS4Xplorer"
  },
];