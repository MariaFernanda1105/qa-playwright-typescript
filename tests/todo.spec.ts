import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Lista de tarefas', () => {
  test('exibe estado vazio ao abrir sem tarefas', async ({ page }) => {
    await expect(page.getByText('Nenhuma tarefa por enquanto.')).toBeVisible();
    await expect(page.getByText('0 tarefas restantes')).toBeVisible();
  });

  test('adiciona uma tarefa e limpa o campo de entrada', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Nova tarefa' });
    await input.fill('Revisar critérios de aceite');
    await page.getByRole('button', { name: 'Adicionar' }).click();

    await expect(page.getByText('Revisar critérios de aceite')).toBeVisible();
    await expect(input).toHaveValue('');
    await expect(page.getByText('1 tarefa restante')).toBeVisible();
  });

  test('não cria tarefa quando o campo contém apenas espaços', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Nova tarefa' });
    await input.fill('   ');
    await page.getByRole('button', { name: 'Adicionar' }).click();

    await expect(page.getByText('Nenhuma tarefa por enquanto.')).toBeVisible();
    await expect(page.locator('.todo-item')).toHaveCount(0);
  });

  test('marca uma tarefa como concluída e atualiza o contador', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nova tarefa' }).fill('Executar testes');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.getByRole('checkbox', { name: 'Concluir Executar testes' }).check();

    await expect(page.getByRole('checkbox', { name: 'Concluir Executar testes' })).toBeChecked();
    await expect(page.getByText('0 tarefas restantes')).toBeVisible();
  });

  test('filtra tarefas ativas e concluídas', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Nova tarefa' });
    await input.fill('Tarefa ativa');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await input.fill('Tarefa concluída');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.getByRole('checkbox', { name: 'Concluir Tarefa concluída' }).check();

    await page.getByRole('button', { name: 'Ativas' }).click();
    await expect(page.getByText('Tarefa ativa')).toBeVisible();
    await expect(page.getByText('Tarefa concluída')).toHaveCount(0);

    await page.getByRole('button', { name: 'Concluídas' }).click();
    await expect(page.getByText('Tarefa concluída')).toBeVisible();
    await expect(page.getByText('Tarefa ativa')).toHaveCount(0);
  });

  test('exclui uma tarefa', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nova tarefa' }).fill('Tarefa temporária');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.getByRole('button', { name: 'Excluir Tarefa temporária' }).click();

    await expect(page.getByText('Tarefa temporária')).toHaveCount(0);
    await expect(page.getByText('Nenhuma tarefa por enquanto.')).toBeVisible();
  });

  test('mantém as tarefas após recarregar a página', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nova tarefa' }).fill('Tarefa persistente');
    await page.getByRole('button', { name: 'Adicionar' }).click();
    await page.reload();

    await expect(page.getByText('Tarefa persistente')).toBeVisible();
  });
});
