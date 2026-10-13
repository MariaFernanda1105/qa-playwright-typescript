# Automação de Testes Web com Playwright e TypeScript

Projeto de portfólio de QA: testes E2E automatizados para uma lista de tarefas simples, executada localmente. O foco está em legibilidade, seletores acessíveis, isolamento dos testes e evidências reproduzíveis.

## O que está incluído

- Aplicação demonstrativa sem dependência de serviços externos (`app/`).
- Testes E2E em Playwright + TypeScript (`tests/todo.spec.ts`).
- Execução em Chromium e servidor local iniciado automaticamente pela configuração.
- Relatório HTML, screenshots e traces em caso de falha.
- Workflow de CI para instalação do Chromium e execução dos testes.

## Cenários automatizados

1. Estado vazio e contador inicial.
2. Inclusão de tarefa, atualização da lista e limpeza do campo.
3. Validação de entrada com espaços em branco.
4. Conclusão de tarefa e atualização do contador.
5. Filtros de tarefas ativas e concluídas.
6. Exclusão de tarefa.
7. Persistência após recarregar a página.

## Pré-requisitos

- Node.js 20 ou superior (recomendado: versão LTS atual).
- npm.

## Como executar

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

O Playwright inicia o servidor de demonstração automaticamente. Para executar com navegador visível:

```bash
npm run test:headed
```

Para abrir a interface interativa do Playwright:

```bash
npm run test:ui
```

Para conferir os tipos TypeScript:

```bash
npm run typecheck
```

## Relatórios e evidências

Após os testes, abra o relatório HTML com:

```bash
npm run report
```

O relatório fica em `playwright-report/`. Em caso de falha, o Playwright também coleta screenshot, vídeo e trace conforme a configuração. Esses artefatos são gerados localmente e não são enviados ao repositório; veja `.gitignore`.

## Estrutura

```text
.
├── .github/workflows/playwright.yml
├── app/                    # aplicação usada como sistema sob teste
├── scripts/serve.mjs        # servidor HTTP local
├── tests/todo.spec.ts       # cenários automatizados
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Decisões de QA

- Os testes usam roles, labels e nomes acessíveis, reduzindo dependência de detalhes de CSS.
- Cada teste recebe um contexto de navegador isolado do Playwright.
- A aplicação salva as tarefas em `localStorage`, permitindo validar persistência sem backend.
- Os testes foram pensados para não depender de um site público, rede externa ou credenciais.

## Próximas melhorias

- Adicionar execução em Firefox e WebKit.
- Criar testes de acessibilidade automatizados.
- Acrescentar matriz de requisitos/riscos e defeitos encontrados em um estudo de caso separado.
- Exportar e anexar o relatório HTML como artefato de CI.
