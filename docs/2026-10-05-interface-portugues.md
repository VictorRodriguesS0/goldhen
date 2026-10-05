# Interface XP PS4 1.2

Amplia a tradução de configurações, ferramentas e aplicativos. Os nomes oficiais dos projetos, autores e diagnósticos técnicos do motor são preservados.

O aviso de resultado usa verde para conclusão confirmada pelo motor e vermelho para falha ou tentativa interrompida. O estado de execução aparece em azul. Etapas intermediárias, reparo da memória ou acesso ao kernel sem conclusão não são classificados como sucesso.

Para SlopKit, o callback original somente é aceito quando o estado final é `ALL DONE`. Resultados incompletos preservam o diagnóstico e não incrementam estatísticas nem recarregam a página. Relapse tem os estados finais traduzidos sem modificar seu código. CSSFontFace que retorna sem confirmar conclusão informa falha. O modo simplificado usa os mesmos avisos.

Quando o motor pede reiniciar, o aviso orienta reiniciar o PS4. Quando pede atualizar, o aviso orienta atualizar. Demais falhas mostram orientação genérica. Se o navegador ou console interromper a execução, ao voltar à página o aviso informa interrupção; não afirma qual foi a causa.

O último resultado é mantido somente na sessão do navegador. Ao iniciar uma tentativa nova, a mensagem anterior é substituída. Os nove manifests de cache incluem o novo script de apresentação.

Validação: 20 testes, build Babel, revisão de código e prévia em navegador com simulação dos sinais de sucesso/falha. A execução do motor em PS4 físico deve ser validada no console; a simulação verifica apenas a apresentação dos resultados.
