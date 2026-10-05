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
    name: "Servidor web do PS4",
    author: "ArabPixel",
    description: "Inicia um servidor web na porta 80 do PS4 para receber complementos de outros dispositivos.",
    specificFW: "",
    category: "tools",
    funcName: "load_WebSrv"
  },
  {
    id: "NpFakeSignin",
    name: "Simular conexão com a PSN",
    author: "earthonion",
    description: "Simula o estado conectado da PSN. Use após a ativação simulada do usuário.",
    specificFW: "",
    category: "tools",
    funcName: "load_npFakeSignin"
  },
  {
    id: "BackupDB",
    name: "Cópia de segurança dos dados",
    author: "Stooged",
    description: "Cria uma cópia de segurança dos bancos de dados, licenças e dados de usuário. Após reinicializar o sistema, as chaves podem mudar e impedir a restauração.",
    specificFW: "",
    category: "tools",
    funcName: "load_BackupDB"
  },
  {
    id: "RestoreDB",
    name: "Restaurar dados",
    author: "Stooged",
    description: "Restaura os dados salvos pelo complemento de cópia de segurança.",
    specificFW: "",
    category: "tools",
    funcName: "load_RestoreDB"
  },
  {
    id: "DBRebuilder",
    name: "Reconstruir banco de dados",
    author: "4GAMER",
    description: "Reconstrói o banco de dados FPKG e recupera os ícones de aplicativos na tela inicial.",
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
    id: "PS4Debug",
    name: "Depuração do PS4",
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
    name: "Instalar loja de aplicativos",
    author: "LightningMods",
    description: "Instala a loja de aplicativos PS4 Homebrew Store.<br>É necessário estar conectado à internet.",
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
    id: "PS4Xplorer2.0",
    name: "Instalar PS4 Xplorer 2.08",
    author: "Lapy",
    description: "Instala o gerenciador de arquivos PS4 Xplorer 2.08.<br>É necessário estar conectado à internet.",
    specificFW: "13.52",
    category: "homebrew",
    funcName: "load_PS4Xplorer"
  },
];
