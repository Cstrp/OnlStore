import Create from '../../data/utils/create.ts';
import style from './index.module.scss';

abstract class Template {
  protected element: HTMLElement;
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
    const wrapper = new Create('article', style.wrapper, section).element;
    const title = new Create('h2', style.wrapperTitle, wrapper, text).element;
    const SubTitle = new Create('p', style.wrapperSubTitle, wrapper, subtext).element;
    const inputWrapper = new Create('div', style.wrapperInput, wrapper).element;
    const input = new Create('input', style.wrapperInputField, inputWrapper, null, {
      placeholder: 'Type your text here...',
    }).element;
    const button = new Create('button', style.wrapperInputButton, inputWrapper).element;
  }

  render() {
    return this.element;
  }
}

export default Template;
