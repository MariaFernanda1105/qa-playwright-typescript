(() => {
  const STORAGE_KEY = 'qa-demo-todos';
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#new-todo');
  const list = document.querySelector('#todo-list');
  const emptyState = document.querySelector('#empty-state');
  const count = document.querySelector('#items-count');
  const filterButtons = [...document.querySelectorAll('.filter')];
  let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  let activeFilter = 'all';

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render() {
    const visibleTodos = todos.filter((todo) => {
      if (activeFilter === 'active') return !todo.completed;
      if (activeFilter === 'completed') return todo.completed;
      return true;
    });
    list.replaceChildren();
    emptyState.hidden = visibleTodos.length > 0;

    for (const todo of visibleTodos) {
      const item = document.createElement('li');
      item.className = `todo-item${todo.completed ? ' is-completed' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.setAttribute('aria-label', `Concluir ${todo.text}`);
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        save();
        render();
      });

      const label = document.createElement('span');
      label.className = 'todo-label';
      label.textContent = todo.text;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'delete-button';
      remove.textContent = 'Excluir';
      remove.setAttribute('aria-label', `Excluir ${todo.text}`);
      remove.addEventListener('click', () => {
        todos = todos.filter((entry) => entry.id !== todo.id);
        save();
        render();
      });

      item.append(checkbox, label, remove);
      list.append(item);
    }

    const remaining = todos.filter((todo) => !todo.completed).length;
    count.textContent = `${remaining} ${remaining === 1 ? 'tarefa restante' : 'tarefas restantes'}`;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: crypto.randomUUID(), text, completed: false });
    save();
    input.value = '';
    render();
    input.focus();
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((entry) => {
        const isActive = entry === button;
        entry.classList.toggle('is-active', isActive);
        entry.setAttribute('aria-pressed', String(isActive));
      });
      render();
    });
  });

  render();
})();
