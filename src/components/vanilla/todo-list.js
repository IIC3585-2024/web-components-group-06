import './todo-item.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 10px;
      box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
      max-width: 400px;
      background-color: #fff;
      font-family: 'Arial', sans-serif;
      color: #333;
    }
    h2 {
      margin-bottom: 10px;
      font-size: 1.5em;
      text-align: center;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    .input-group {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    input {
      flex-grow: 1;
      padding: 8px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 8px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  </style>
  <div class="todo-list">
    <h2 class="title"></h2>
    <ul class="items"></ul>
    <div class="input-group">
      <input type="text" placeholder="Add new item" class="new-item-input">
      <button class="add-button">Add</button>
    </div>
  </div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.shadowRoot.querySelector('.title').innerText = newValue;
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('title')) {
      this.setAttribute('title', 'Todo List');
    }

    this.shadowRoot.querySelector('.add-button').addEventListener('click', this.addItem);
  }

  addItem() {
    const input = this.shadowRoot.querySelector('.new-item-input');
    const text = input.value.trim();
    if (text) {
      const item = document.createElement('todo-item');
      item.setAttribute('text', text);
      item.addEventListener('remove', this.removeItem);
      this.shadowRoot.querySelector('.items').appendChild(item);
      input.value = '';
    }
  }

  removeItem(event) {
    const item = event.detail;
    this.shadowRoot.querySelector('.items').removeChild(item);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.add-button').removeEventListener('click', this.addItem);
  }
}

customElements.define('todo-list', TodoList);
