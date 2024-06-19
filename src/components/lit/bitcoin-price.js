import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';

class BitcoinPrice extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 4px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
      background-color: #f9f9f9;
    }
    h2 { font-size: 1em; }
    .price {
      font-size: 1em;
      color: #333;
    }
    .currency {
      font-size: 0.8em;
      color: #666;
    }
    .loading {
      font-size: 0.8em;
      color: #aaa;
    }
    .currency-selector {
      margin-top: 4px;
    }
    select {
      padding: 4px;
      font-size: 0.5em;
      border: 0.5px solid #ccc;
      border-radius: 2px;
      cursor: pointer;
    }
  `;

  static properties = {
    price: { type: String },
    currency: { type: String },
    currencies: { type: Array }
  };

  constructor() {
    super();
    this.price = 'Loading...';
    this.currency = 'USD';
    this.currencies = [];
    this.fetchBitcoinPrice();
    this.updateInterval = setInterval(() => this.fetchBitcoinPrice(), 2000);
  }

  async fetchBitcoinPrice() {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
      this.currencies = Object.keys(data.bpi);
      this.price = data.bpi[this.currency].rate;
    } catch (error) {
      this.price = 'Error fetching price';
      console.error('Error fetching Bitcoin price:', error);
    }
  }

  handleCurrencyChange(event) {
    this.currency = event.target.value;
    this.fetchBitcoinPrice();
  }

  disconnectedCallback() {
    clearInterval(this.updateInterval);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="bitcoin-price">
        <h2>Bitcoin Price</h2>
        <div class="price">${this.price}</div>
        <div class="currency-selector">
          <select id="currency-select" @change="${this.handleCurrencyChange}">
            ${this.currencies.map(currency => html`<option value="${currency}" ?selected="${currency === this.currency}">In ${currency}</option>`)}
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define('bitcoin-price', BitcoinPrice);
