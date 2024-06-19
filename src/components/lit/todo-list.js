import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import './todo-item.js';

class TodoListLit extends LitElement {
  static styles = css`
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
  `;

  static properties = {
    title: { type: String },
    items: { type: Array }
  };

  constructor() {
    super();
    this.title = 'Todo List';
    this.items = [];
  }

  addItem() {
    const input = this.shadowRoot.querySelector('.new-item-input');
    const text = input.value.trim();
    if (text) {
      this.items = [...this.items, text];
      input.value = '';
    }
  }

  removeItem(index) {
    this.items = this.items.filter((_, i) => i !== index);
  }

  render() {
    return html`
      <div class="todo-list">
        <h2>${this.title}</h2>
        <ul class="items">
          ${this.items.map(
            (item, index) => html`
              <todo-item-lit 
                text="${item}" 
                @remove="${() => this.removeItem(index)}">
              </todo-item-lit>
            `
          )}
        </ul>
        <div class="input-group">
          <input type="text" placeholder="Add new item" class="new-item-input">
          <button @click="${this.addItem}">Add</button>
        </div>
      </div>
    `;
  }
}

customElements.define('todo-list-lit', TodoListLit);
