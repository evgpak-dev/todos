import './style.css'

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todos: Todo[] = [];

const todoForm = document.querySelector('#todo-form') as HTMLFormElement;
const todoInput = document.querySelector('#todo-input') as HTMLInputElement;
const todoList = document.querySelector('#todo-list') as HTMLUListElement;

function renderTodos(): void {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoStatus(todo.id));

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    if (todo.completed) {
      textSpan.className = 'completed';
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(textSpan);
    todoList.appendChild(listItem);
  });
}

function addTodo(text: string): void {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text:text,
    completed: false,
  };

  todos.push(newTodo);
  renderTodos();
}

function toggleTodoStatus(id: string): void {
  const todoToToggle = todos.find(todo => todo.id === id);
  if (todoToToggle) {
    todoToToggle.completed = !todoToToggle.completed;
    renderTodos();
  }
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    addTodo(todoText);
    todoInput.value = '';
  }
});

renderTodos();
