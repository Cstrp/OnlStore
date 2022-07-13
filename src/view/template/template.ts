import Create from '../../data/utils/create.ts';
import { Datum } from '../../data/utils/inderface';
import { generateId } from '../../data/utils/randomID';
import Footer from '../components/footer';
import footer from '../components/footer';
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
    const searchData: () => Promise<void> = async () => {
      try {
        await axios
          .get(`https://api.jikan.moe/v4/anime?q= + ${this.input.value}`, {
            method: 'GET',
          })
          .then((response): void => {
            const container = new Create('div', `${style.wrapperResult} ${Template.defaultClass}`, wrapper, null)
              .element;
            const data = response.data.data;
            const makeUniq = (arr: Datum[]) => {
              return arr.filter((el, id: number) => arr.indexOf(el) - id === 0);
            };
            makeUniq(data).map((el) => {
              const card = new Create('div', `${style.card}`, container).element;
              const cardContent = new Create('div', style.cardContent, card).element;
              new Create('img', style.cardImg, cardContent, null, {
                src: `${el.images.jpg.large_image_url}`,
                alt: `${el.title_japanese}`,
                title: `${el.status}`,
              }).element;
              const textContent = new Create('div', style.cardTextContent, cardContent).element;
              const cardLink = new Create('a', style.cardTextContentText, textContent, null, {
                href: `${el.url}`,
              }).element;
              new Create('h2', style.cardTextContentText, cardLink, `${el.title}`).element;
              new Create('p', style.cardTextContentText, textContent, `Genre: ${el.genres[0].name}`).element;
              if (el.background === null) {
                new Create('p', style.cardTextContentText, textContent, `${el.synopsis}`).element;
              } else {
                new Create('p', style.cardTextContentText, textContent, `${el.background}`).element;
              }
            });
          });
      } catch (error) {
        throw new Error(`Ops... ${error}`);
      }
    };
    this.input.addEventListener('keypress', (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        searchData();
      }
      const defaultClass = document.querySelector(`.${Template.defaultClass}`);
      if (defaultClass) {
        defaultClass.remove();
      }
    });
    const button: Element = new Create('button', style.wrapperInputButton, inputWrapper, null, { type: 'submit' })
      .element;
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.input.value;
      searchData();
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
