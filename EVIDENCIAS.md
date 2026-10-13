# Evidências da execução

**Validação inicial:** suíte Playwright executada localmente em Chromium.

- Resultado: **7 testes aprovados, 0 falhas**.
- Checagem TypeScript: **aprovada** com `npm run typecheck` (`tsc --noEmit`).
- Dependências: instalação npm concluída; auditoria informou **0 vulnerabilidades**.
- Aplicação testada: versão local em `app/`, servida pelo script `npm run serve`.

## Cenários executados

- Estado vazio inicial.
- Inclusão de tarefa e limpeza do campo.
- Campo contendo apenas espaços.
- Marcação como concluída e contador atualizado.
- Filtros de tarefas ativas/concluídas.
- Exclusão de tarefa.
- Persistência após recarregar a página.

Para gerar o relatório HTML novamente, execute `npm test` e depois `npm run report`.
