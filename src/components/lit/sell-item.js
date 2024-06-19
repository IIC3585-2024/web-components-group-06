// src/components/sell-item-lit.js

import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class SellItemLit extends LitElement {
  static styles = css`
  :host {
    display: block;
    border: 1px solid var(--sell-item-border-color, #ddd);
    border-radius: 8px;
    padding: 16px;
    margin: 10px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
    max-width: 300px;
    background-color: var(--sell-item-background-color, #fff);
    font-family: 'Arial', sans-serif;
    color: var(--sell-item-text-color, #333);
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
    color: var(--sell-item-title-color, #444);
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
    color: var(--sell-item-price-color, #888);
    text-decoration: line-through;
  }
  .discount-price {
    font-size: 1.4em;
    color: var(--sell-item-discount-price-color, #e63946);
    font-weight: bold;
  }
  .discount {
    font-size: 1em;
    color: var(--sell-item-discount-color, #e63946);
    font-weight: bold;
    text-align: center;
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
  `;

  static properties = {
    photoUrl: { type: String, attribute: 'photo-url' },
    title: { type: String },
    originalPrice: { type: Number, attribute: 'original-price' },
    discountPrice: { type: Number, attribute: 'discount-price' },
    discount: { type: Number },
    rating: { type: Number }
  };

  constructor() {
    super();
    this.photoUrl = 'https://via.placeholder.com/300';
    this.title = 'Default Product';
    this.originalPrice = 0;
    this.discountPrice = 0;
    this.discount = 0;
    this.rating = 0;
  }

  render() {
    return html`
      <div class="sell-item">
        <img class="photo" src="${this.photoUrl}" alt="${this.title}">
        <div class="title">LIT ${this.title}</div>
        <div class="prices">
          <span class="price">$${this.originalPrice}</span>
          <span class="discount-price">$${this.discountPrice}</span>
        </div>
        <div class="discount">Save ${this.discount}%</div>
        <div class="rating">
          <span class="stars">
            ${'★'.repeat(Math.floor(this.rating))}${'☆'.repeat(5 - Math.floor(this.rating))}
          </span>
          <span class="rating-value">${this.rating}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('sell-item-lit', SellItemLit);
