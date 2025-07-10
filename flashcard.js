class Flashcard {
  constructor({ data }) {
    this.data = {
      frontText: data.frontText || '',
      backText: data.backText || ''
    };
    this.wrapper = null;
  }

  static get toolbox() {
    return {
      title: 'Flashcard',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v122c0 19 15 34 34 34h178c19 0 34-15 34-34v-22h-34v22H79V79h178v71h34z"/></svg>'
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('flashcard');

    // container for the front side
    const frontContainer = document.createElement('div');
    frontContainer.classList.add('flashcard-front-container');

    const front = document.createElement('div');
    front.classList.add('flashcard-front');
    front.contentEditable = true;
    front.innerHTML = this.data.frontText;
    front.setAttribute('placeholder', 'Front of the flashcard...');

    const back = document.createElement('div');
    back.classList.add('flashcard-back');
    back.contentEditable = true;
    back.innerHTML = this.data.backText;
    back.style.display = 'none';
    back.setAttribute('placeholder', 'Back of the flashcard...');

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.innerHTML = '&#8628;'; // downwards arrow with corner
    toggleButton.addEventListener('click', () => {
      const isHidden = back.style.display === 'none';
      back.style.display = isHidden ? 'block' : 'none';
      toggleButton.innerHTML = isHidden ? '&#8629;' : '&#8628;'; // switch between arrows
    });

    // append front and button to their container
    frontContainer.appendChild(front);
    frontContainer.appendChild(toggleButton);

    // append the container and the back to the main wrapper
    this.wrapper.appendChild(frontContainer);
    this.wrapper.appendChild(back);

    return this.wrapper;
  }

  save(blockContent) {
    const front = blockContent.querySelector('.flashcard-front');
    const back = blockContent.querySelector('.flashcard-back');
    return {
      frontText: front.innerHTML,
      backText: back.innerHTML
    };
  }
}