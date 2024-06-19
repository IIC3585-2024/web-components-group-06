import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class TodoItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
    .text {
      flex-grow: 1;
    }
    .remove {
      cursor: pointer;
      color: red;
    }
  `;

  static properties = {
    text: { type: String }
  };

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`
      <div class="todo-item">
        <span class="text">${this.text}</span>
        <span class="remove" @click="${this._remove}">✖</span>
      </div>
    `;
  }

  _remove() {
    this.dispatchEvent(new CustomEvent('remove', { detail: this }));
  }
}

customElements.define('todo-item-lit', TodoItem);
