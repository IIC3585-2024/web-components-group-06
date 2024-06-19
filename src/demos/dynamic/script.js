const CONFIG = {
    OPENAI_API_KEY: '<YOUR_OPENAI_API_KEY>',
    OPENAI_PROMPT: 'You are a bot named Navon that helps understanding web components',
};

document.addEventListener('DOMContentLoaded', () => {
  const componentButtons = document.querySelectorAll('.component-button');
  const propsFormModal = document.getElementById('props-form-modal');
  const formFields = document.getElementById('form-fields');
  const closeModal = document.getElementById('close-modal');
  const componentsContainer = document.getElementById('components-container');
  let currentComponentType = '';

  const componentDetails = {
      'bitcoin-price': {
          props: ['currency']
      },
      'sell-item': {
          props: ['title', 'original-price', 'discount-price', 'photo-url', 'discount', 'rating']
      },
      'sell-item-lit': {
          props: ['title', 'original-price', 'discount-price', 'photo-url', 'discount', 'rating']
      },
      'todo-list': {
          props: ['title']
      },
      'todo-list-lit': {
          props: ['title']
      },
      'chess-board': {},
      'deep-chat': {
        defaultProps: {
            directConnection: `{"openAI": {"key": "${CONFIG.OPENAI_API_KEY}", "chat": {"max_tokens": 2000, "system_prompt": "${CONFIG.OPENAI_PROMPT}"}}}`
        },
      },
      'model-viewer': {
          props: ['src', 'alt', 'ios-src', 'ios-src-alt'],
          defaultProps: {
              'ar': true,
              'camera-controls': true,
              'auto-rotate': true,
              'autoplay': true,
          }
      },
  };

  componentButtons.forEach(button => {
      button.addEventListener('click', () => {
          currentComponentType = button.getAttribute('data-component');
          displayPropsForm(currentComponentType);
      });
  });

  function displayPropsForm(componentType) {
      const component = componentDetails[componentType];
      const modalName = document.getElementById('modal-name')
      modalName.innerHTML = `Creating <code class="text-red-500 font-normal bg-red-200 p-2 rounded-md">${componentType}</code> component`;
      if (component) {
        if (component.props) {
            formFields.innerHTML = component.props.map(prop => `
                <div class="mb-2">
                    <label class="block text-gray-700">${prop.charAt(0).toUpperCase() + prop.slice(1)}</label>
                    <input type="text" name="${prop}" class="mt-1 block w-full p-2 border rounded">
                </div>
            `).join('');
        }
        propsFormModal.classList.remove('hidden');
    }
  }

  closeModal.addEventListener('click', () => {
      propsFormModal.classList.add('hidden');
  });


  document.getElementById('create-component').addEventListener('click', () => {
      const inputs = formFields.querySelectorAll('input');
      const defaultProps = componentDetails[currentComponentType].defaultProps || {};
      const props = {};

      for (const [key, value] of Object.entries(defaultProps)) {
        props[key] = value;
      }
      inputs.forEach(input => props[input.name] = input.value);

      if (currentComponentType) {

          const newComponent = document.createElement(currentComponentType);
          for (const [key, value] of Object.entries(props)) {
              newComponent.setAttribute(key, value);
          }

          componentsContainer.appendChild(newComponent);
      }

      propsFormModal.classList.add('hidden');
      formFields.innerHTML = '';
  });
});
