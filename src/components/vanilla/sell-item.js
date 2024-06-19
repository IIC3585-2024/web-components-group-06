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
  max-width: 300px;
  background-color: #fff;
  font-family: 'Arial', sans-serif;
  color: #333;
  transition: transform 0.3s ease;
}
:host(:hover) {
  transform: scale(1.02);
  box-shadow: 4px 4px 16px rgba(0,0,0,0.2);
}
img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}
.title {
  font-size: 1.5em;
  margin: 12px 0;
  font-weight: bold;
  text-align: center;
  color: #444;
}
.prices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.price {
  font-weight: bold;
  font-size: 1.2em;
  color: #888;
  text-decoration: line-through;
}
.discount-price {
  font-size: 1.4em;
  color: #e63946;
  font-weight: bold;
}
.discount {
  font-size: 1em;
  color: #e63946;
  font-weight: bold;
}
.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.stars {
  color: gold;
  font-size: 1.2em;
  margin-right: 5px;
}
</style>
<div class="sell-item">
<img class="photo" src="" alt="Product Image">
<div class="title"></div>
<div class="prices">
  <span class="price"></span>
  <span class="discount-price"></span>
</div>
<div class="discount"></div>
<div class="rating">
  <span class="stars"></span>
  <span class="rating-value"></span>
</div>
</div>
`;

class SellItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['photo-url', 'title', 'original-price', 'discount-price', 'discount', 'rating'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'photo-url':
        this.shadowRoot.querySelector('.photo').src = newValue;
        break;
      case 'title':
        this.shadowRoot.querySelector('.title').innerText = newValue;
        break;
      case 'original-price':
        this.shadowRoot.querySelector('.price').innerText = `$${newValue}`;
        break;
      case 'discount-price':
        this.shadowRoot.querySelector('.discount-price').innerText = `$${newValue}`;
        break;
      case 'discount':
        this.shadowRoot.querySelector('.discount').innerText = `Save ${newValue}%`;
        break;
      case 'rating':
        this.shadowRoot.querySelector('.stars').innerHTML = '★'.repeat(Math.floor(newValue)) + '☆'.repeat(5 - Math.floor(newValue));
        this.shadowRoot.querySelector('.rating-value').innerText = newValue;
        break;
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('photo-url')) {
      this.setAttribute('photo-url', 'https://via.placeholder.com/150');
    }
    if (!this.hasAttribute('title')) {
      this.setAttribute('title', 'Default Product');
    }
    if (!this.hasAttribute('original-price')) {
      this.setAttribute('original-price', '0');
    }
    if (!this.hasAttribute('discount-price')) {
      this.setAttribute('discount-price', '0');
    }
    if (!this.hasAttribute('discount')) {
      this.setAttribute('discount', '0');
    }
    if (!this.hasAttribute('rating')) {
      this.setAttribute('rating', '0');
    }
  }
}


customElements.define('sell-item', SellItem);
