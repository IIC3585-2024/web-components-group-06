const template = document.createElement('template');
template.innerHTML = `
  <style>
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
  </style>
  <div class="todo-item">
    <span class="text"></span>
    <span class="remove">✖</span>
  </div>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.shadowRoot.querySelector('.text').innerText = newValue;
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.remove').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('remove', { detail: this }));
    });
  }
}

customElements.define('todo-item', TodoItem);
