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

  protected Title(text: string, subtext?: string) {
    const section: Element = new Create('section', style.section, this.element).element;
    const wrapper: HTMLElement = new Create('article', style.wrapper, section).element;
    const title: HTMLElement = new Create('h2', style.wrapperTitle, wrapper, text).element;
    const SubTitle: HTMLElement = new Create('p', style.wrapperSubTitle, wrapper, subtext).element;
    const inputWrapper: HTMLElement = new Create('div', style.wrapperInput, wrapper).element;
    this.input = new Create('input', style.wrapperInputField, inputWrapper, null, {
      placeholder: 'Type your text here...',
      type: 'text',
      autocomplete: 'on',
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
                const data = response.data.data[key];
                const title = new Create('p', '123', card, data.title, { style: 'color: black' }).element;
                
              });
            });
        } catch (error) {
          throw new Error(`Ops... ${error}`);
        }
      };
      if (evt.key === 'Enter') {
        searchData();
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
