# XP PS4 Implementation Plan

> Executar nesta sessão, em sequência. O console da VPS deve ter somente um operador.

Goal: publicar no fork do usuário e na VPS uma interface XP PS4 em português, sem recursos Linux na interface.

Architecture: personalização dos arquivos estáticos do WebKitty; geração do JavaScript legado; publicação no fork público; atualização com backup somente dos arquivos do projeto PS4.

Tech Stack: JavaScript, HTML, CSS, Babel existente, Node test runner, Nginx e Docker existentes.

## Global Constraints

- Fork `VictorRodriguesS0/goldhen`, origem `ArabePixel/webkitty`, revisão inicial `ebc444621163c947de4671d2e99489c9e08657f6`.
- Manter licença, créditos e binários da cadeia de jailbreak.
- Usar logo próxima à referência original, com XP ELETRÔNICOS e um cadeado aberto sobre fundo preto. Incluir QR codes separados para WhatsApp e Instagram, sem links clicáveis nos contatos.
- Português brasileiro inicial, inclusive para clientes com preferências antigas.
- Sem Linux no catálogo, abas ou cache; preferência de aba removida retorna para Ferramentas.
- VPS `/opt/ps4-webkitty`; não reiniciar ou alterar os outros projetos, gateway ou DNS.
- Backup antes da troca e retorno à versão anterior se a verificação falhar.

## Etapas

- [x] Inspecionar a origem, identificar o fork existente, clonar e criar `codex/xp-portugues`.
- [x] Gerar a logo XP e salvar o PNG no repositório.
- [x] Escrever e executar testes de regressão de preferências antigas e catálogo sem Linux, observando as falhas antes da implementação.
- [x] Adicionar `includes/js/languages/pt-BR.js`, preferência inicial e traduções das telas e descrições.
- [x] Remover aba e painel Linux de `index.html`, catálogo correspondente e referências de renderização; corrigir `loadLastTab` para abas removidas.
- [x] Integrar a logo, título, metadados, link do código e domínio; preservar os IDs de interação.
- [x] Atualizar manifests e gerar `includes/js/index-legacy.js` com `npm run build`.
- [x] Executar testes, verificar todos os manifests e revisar o diff sem alterações na cadeia de exploração.
- [x] Conferir a interface, menus e catálogo no navegador em um servidor local sem executar o jailbreak.
- [ ] Publicar os arquivos no fork autenticado e confirmar o commit remoto.
- [ ] Preparar na VPS uma versão dedicada a partir do commit publicado, conferir arquivos e salvar o estado dos serviços e backup.
- [ ] Atualizar somente o projeto PS4, verificar o cache, HTTP/HTTPS e comparar os serviços com o estado imediatamente anterior.
- [ ] Salvar comprovantes, atualizar a documentação e entregar os links do repositório e do site.

Comandos locais: `npm test`, `npm run build`, `git diff --check`. Conferir manifests com caminhos resolvidos dentro da raiz do site e exclusão dos arquivos Linux.
