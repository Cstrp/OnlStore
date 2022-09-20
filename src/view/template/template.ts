import CreateDOMElement from '../../data/utils/CreateDOMElement.ts';
import { Datum } from '../../data/utils/Interface';
import style from './index.module.scss';
import axios from 'axios';

abstract class Template {
  protected element: HTMLElement;
  protected input!: HTMLInputElement;
  private static defaultClass: string = 'defaultClass';
  static TextContent = {};

  protected constructor(id: string, tag: string, className?: string) {
    this.element = document.createElement(tag);
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }

  protected Content(text: string, subtext?: string) {
    const up: HTMLDivElement = new CreateDOMElement('div', style.up, this.element).element;
    const upLink: HTMLLinkElement = new CreateDOMElement('a', style.upLink, up).element;
    upLink.addEventListener('click', (evt: MouseEvent) => {
      evt.preventDefault();
      this.input.focus();
    });
    new CreateDOMElement('img', style.upImg, upLink, null, {
      src: 'https://i.pinimg.com/originals/80/7b/5c/807b5c4b02e765bb4930b7c66662ef4b.gif',
      title: 'Up! Meow!',
      alt: 'lol',
    }).element;
    const section: Element = new CreateDOMElement('section', style.section, this.element).element;
    const wrapper: HTMLElement = new CreateDOMElement('article', style.wrapper, section).element;
    new CreateDOMElement('h2', style.wrapperTitle, wrapper, text).element;
    new CreateDOMElement('p', style.wrapperSubTitle, wrapper, subtext).element;
    const inputWrapper: HTMLElement = new CreateDOMElement('div', style.wrapperInput, wrapper).element;
    this.input = new CreateDOMElement('input', style.wrapperInputField, inputWrapper, null, {
      placeholder: 'Type your text here...',
      type: 'text',
    }).element;
    const searchData: () => Promise<void> = async () => {
      await axios
        .get(`https://api.jikan.moe/v4/anime?q= + ${this.input.value}`, { method: 'GET' })
        .then((res) => {
          const container = new CreateDOMElement(
            'div',
            `${style.wrapperResult} ${Template.defaultClass}`,
            wrapper,
            null
          ).element;
          const data = res.data.data;
          data.forEach((el: Datum) => {
            const card = new CreateDOMElement('div', `${style.card}`, container).element;
            const cardContent = new CreateDOMElement('div', style.cardContent, card).element;
            new CreateDOMElement('img', style.cardImg, cardContent, null, {
              src: `${el.images.jpg.large_image_url}`,
              alt: `${el.title_japanese}`,
              title: `${el.status}`,
            }).element;
            const textContent = new CreateDOMElement('div', style.cardTextContent, cardContent).element;
            const cardLink = new CreateDOMElement('a', style.cardTextContentText, textContent, null, {
              href: `${el.url}`,
            }).element;
            new CreateDOMElement('h2', style.cardTextContentText, cardLink, `${el.title}`).element;
            if (el.genres[0].name === null) {
              new CreateDOMElement('p', style.cardTextContentText, textContent, `Genre: ${el.genres[0].type}`);
            } else {
              new CreateDOMElement('p', style.cardTextContentText, textContent, `Genre: ${el.genres[0].name}`).element;
            }
            if (el.background === null) {
              new CreateDOMElement('p', style.cardTextContentText, textContent, `${el.synopsis}`).element;
            } else {
              new CreateDOMElement('p', style.cardTextContentText, textContent, `${el.background}`).element;
            }
          });
        })
        .catch((error) => console.log(error));
    };
    this.input.addEventListener('keypress', (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        searchData().catch((err) => console.log(err));
      }
      const defaultClass = document.querySelector(`.${Template.defaultClass}`);
      if (defaultClass) {
        defaultClass.remove();
      }
    });
    const button: Element = new CreateDOMElement('button', style.wrapperInputButton, inputWrapper, null, {
      type: 'submit',
    }).element;
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.input.value;
      searchData().catch((err) => console.log(err));
      const defaultClass = document.querySelector(`.${Template.defaultClass}`);
      if (defaultClass) {
        defaultClass.remove();
      }
    });
  }

  render() {
    return this.element;
  }
}

export default Template;
