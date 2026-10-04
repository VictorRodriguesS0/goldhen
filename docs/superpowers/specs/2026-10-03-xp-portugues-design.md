# XP PS4 em português

Personalizar o fork público `VictorRodriguesS0/goldhen`, cuja revisão inicial é `ebc444621163c947de4671d2e99489c9e08657f6`, conforme a solicitação do usuário. Preservar o histórico, a licença AGPL e os créditos do WebKitty.

A interface mantém a estrutura existente, com a marca XP PS4, a nova logo derivada da referência fornecida e português brasileiro como idioma inicial. A migração de preferências troca o idioma antigo para português uma única vez. Depois disso, as escolhas explícitas de idioma continuam funcionando.

Remover a aba, o painel, os carregadores e o detector de Southbridge voltados a Linux do catálogo oferecido. Uma preferência antiga da aba Linux deve passar para Ferramentas. Manter os IDs e funções dos outros payloads e preservar a cadeia de exploração e os binários GoldHEN, HEN e patches de firmware.

Traduzir menus, configurações, mensagens de cache, erros de interface, descrições de payloads e telas auxiliares. Atualizar os manifests de cache para incluir a tradução, a logo e a versão JavaScript legada efetivamente carregada. Atualizar a versão dos manifests para que o PS4 obtenha a interface nova.

A logo mantém o celular e controle da referência original, com cadeado aberto discreto, ciano, magenta e amarelo, texto XP ELETRÔNICOS e fundo preto. Dois QR codes separados mostram WhatsApp +55 61 99514-9019 e Instagram @eletronicos.xp, sem links clicáveis de contato. Ambos foram decodificados no tamanho exibido de 132px. Sua integração conserva os IDs usados pelo fluxo de início e a compatibilidade dos layouts existentes.

Publicar as alterações no fork antes de atualizar a VPS. A atualização prepara os arquivos em uma pasta dedicada, valida os manifests e mantém backup da versão atual. Trocar somente os arquivos públicos do projeto `/opt/ps4-webkitty`; não alterar o gateway, DNS, firewall nem os outros projetos. Registrar novamente o estado dos contêineres e respostas dos hosts antes e depois.

Verificar o build legado, preferências antigas, catálogo sem Linux, traduções completas, arquivos do cache, interface no computador, HTTP/HTTPS públicos e preservação dos serviços existentes. A execução no PS4 depende do console do usuário.
