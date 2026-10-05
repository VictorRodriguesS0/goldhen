/* Presentation only: the exploit reports its result; this file never runs it. */
(function () {
    var active = false;
    var messages = {
        running: 'Desbloqueio em andamento. Aguarde...',
        success: 'Desbloqueio concluído com sucesso!',
        error: 'Falha no desbloqueio. Veja os detalhes abaixo antes de tentar novamente.',
        retry: 'Falha no desbloqueio. Atualize a página e tente novamente.',
        restart: 'Falha no desbloqueio. Reinicie o PS4 antes de tentar novamente.',
        interrupted: 'A tentativa anterior foi interrompida. Tente novamente.',
        previousSuccess: 'Último resultado: desbloqueio concluído com sucesso.'
    };

    function save(value) {
        try { sessionStorage.setItem('xpJbResult', value); } catch (e) {}
    }

    function show(kind, message) {
        var result = document.getElementById('jb-result');
        if (!result) return;
        result.hidden = false;
        result.setAttribute('data-state', kind);
        result.textContent = message;
    }

    var api = window.XPStatus = {
        begin: function () {
            active = true;
            save('running');
            show('running', messages.running);
        },
        success: function () {
            var state = document.getElementById('state');
            var raw = state ? String(state.textContent).trim() : '';
            var chain = typeof user !== 'undefined' ? user.exploitChain
                : typeof exploitChain !== 'undefined' ? exploitChain : null;
            // SlopKit calls jailbreakSuccess even after partial/failed results.
            // Its definitive result must confirm the payload actually started.
            if ((chain === 5 || chain === 6) && raw !== 'ALL DONE' && raw !== messages.success) {
                api.fail(/REBOOT/.test(raw) && !/NO REBOOT/.test(raw));
                return false;
            }
            active = false;
            save('success');
            show('success', messages.success);
            return true;
        },
        fail: function (restart) {
            active = false;
            var kind = restart === true ? 'restart' : restart === 'retry' ? 'retry' : 'error';
            save(kind);
            show('error', messages[kind]);
        },
        isRunning: function () { return active; }
    };

    function translateState() {
        var state = document.getElementById('state');
        if (!state) return;
        var raw = String(state.textContent).trim();
        var text = raw;
        switch (raw) {
            case 'DONE':
            case 'ALL DONE':
                api.success();
                text = messages.success;
                break;
            case 'Restart your console':
                api.fail(true);
                text = 'Reinicie o PS4';
                break;
            case 'Refresh the page and run again':
                api.fail('retry');
                text = 'Atualize a página e tente novamente';
                break;
            case 'threw':
                api.fail(false);
                text = 'Falha no desbloqueio';
                break;
            case 'no offsets for this firmware':
                api.fail(false);
                text = 'Versão do sistema incompatível';
                break;
            case 'ROOT + KERNEL PATCHED -- NO REBOOT':
                api.fail(false);
                text = 'O complemento não foi iniciado';
                break;
            case 'ROOT -- NO REBOOT NEEDED':
            case 'REPAIRED -- NO REBOOT NEEDED':
            case 'no commit':
                api.fail(false);
                text = 'Desbloqueio incompleto';
                break;
            case 'REBOOT THE CONSOLE':
            case 'KERNEL R/W -- REBOOT NEEDED':
                api.fail(true);
                text = 'Reinicie o PS4';
                break;
            case 'running the primitive...': text = 'Preparando o desbloqueio...'; break;
            case 'Fetching the payload..': text = 'Carregando o complemento...'; break;
            case 'loading the kernel patches..': text = 'Carregando os ajustes do sistema...'; break;
            case 'Applying the exploit': text = 'Aplicando o desbloqueio...'; break;
        }
        if (/^FAILED(?:\s|$)/.test(raw)) {
            api.fail(/REBOOT/.test(raw));
            text = 'Falha no desbloqueio';
        }
        if (active && /(^|\s)bad(\s|$)/.test(state.className)) api.fail(false);
        // Changing only different text prevents recursive MutationObserver updates.
        if (raw !== text) state.textContent = text;
    }

    function init() {
        var previous;
        try { previous = sessionStorage.getItem('xpJbResult'); } catch (e) {}
        if (!active) {
            if (previous === 'success') show('success', messages.previousSuccess);
            else if (previous === 'running') show('error', messages.interrupted);
            else if (previous === 'restart' || previous === 'retry' || previous === 'error') {
                show('error', 'Último resultado: ' + messages[previous]);
            }
        }
        var state = document.getElementById('state');
        if (state && typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(translateState);
            observer.observe(state, { childList: true, characterData: true, subtree: true,
                attributes: true, attributeFilter: ['class'] });
        }
        translateState();
    }

    window.addEventListener('error', function () { if (active) api.fail(false); });
    window.addEventListener('unhandledrejection', function () { if (active) api.fail(false); });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
