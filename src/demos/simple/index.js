document.addEventListener('DOMContentLoaded', () => {
  const vanillaComponent = document.querySelector('sell-item');
  const litComponent = document.querySelector('sell-item-lit');

  document.getElementById('update-vanilla').addEventListener('click', () => {
    vanillaComponent.setAttribute('title', 'Updated Vanilla Gadget');
    vanillaComponent.setAttribute('original-price', '200');
    vanillaComponent.setAttribute('discount-price', '150');
    vanillaComponent.setAttribute('discount', '25');
    vanillaComponent.setAttribute('rating', '4.8');
    console.log('Updated Vanilla Component', vanillaComponent);
  });

  document.getElementById('update-lit').addEventListener('click', () => {
    litComponent.title = 'Updated Lit Gadget';
    litComponent.originalPrice = 200;
    litComponent.discountPrice = 150;
    litComponent.discount = 25;
    litComponent.rating = 4.8;
    console.log('Updated Lit Component', litComponent);
  });

  console.log('Vanilla Web Component:', vanillaComponent);
  console.log('Lit Web Component:', litComponent);
});
