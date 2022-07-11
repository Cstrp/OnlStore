import Create from '../../data/utils/create.ts';
import style from './index.module.scss';
import axios from 'axios';

abstract class Template {
  protected element: HTMLElement;
  protected input!: HTMLInputElement;
  static TextContent = {};

  protected constructor(id: string, tag: string, className?: string) {
    this.element = document.createElement(tag);
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }

  protected Content(text: string, subtext?: string) {
    const up: HTMLDivElement = new Create('div', style.up, this.element).element;
    const upLink: HTMLLinkElement = new Create('a', style.upLink, up).element;
    upLink.addEventListener('click', (evt: MouseEvent) => {
      evt.preventDefault();
      this.input.focus();
    });
    new Create('img', style.upImg, upLink, null, {
      src: 'https://i.pinimg.com/originals/80/7b/5c/807b5c4b02e765bb4930b7c66662ef4b.gif',
      title: 'Up! Meow!',
      alt: 'lol',
    }).element;
    const section: Element = new Create('section', style.section, this.element).element;
    const wrapper: HTMLElement = new Create('article', style.wrapper, section).element;
    new Create('h2', style.wrapperTitle, wrapper, text).element;
    new Create('p', style.wrapperSubTitle, wrapper, subtext).element;
    const inputWrapper: HTMLElement = new Create('div', style.wrapperInput, wrapper).element;
    this.input = new Create('input', style.wrapperInputField, inputWrapper, null, {
      placeholder: 'Type your text here...',
      type: 'text',
    }).element;
    this.input.addEventListener('keypress', (evt: KeyboardEvent) => {
      const searchData: () => Promise<void> = async () => {
        try {
          await axios
            .get(`https://api.jikan.moe/v4/anime?q=limit=5?q=max_score=5?q= + ${this.input.value}`, {
              method: 'GET',
            })
            .then((response): void => {
              const data: Response = response.data.data;
              const container = new Create('div', style.wrapperResult, wrapper).element;
              const card = new Create('div', '123', container).element;
              Object.keys(data).forEach((key) => {
                const data: Record<string, unknown> = response.data.data[key];
                new Create('p', '123', card, data.title, { style: 'color: black' }).element;
              });
            });
        } catch (error) {
          throw new Error(`Ops... ${error}`);
        }
      };
      if (evt.key === 'Enter') {
        searchData().then((r) => console.log(r));
      }
    });
    const button: HTMLElement = new Create('button', style.wrapperInputButton, inputWrapper, null, { type: 'submit' })
      .element;
    button.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      console.log(this.input.value);
    });
  }

  render() {
    return this.element;
  }
}

export default Template;
