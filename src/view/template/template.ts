import Create from '../../data/utils/create.ts';
import style from './index.module.scss';

abstract class Template {
  protected element: HTMLElement;
  static TextContent = {};
  protected constructor(id: string, className?: string) {
    this.element = document.createElement('div');
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }
  protected Title(text: string) {
    const wrapper: Element = new Create(this.element, 'div', style.wrapper);
    const title: HTMLElement = new Create(wrapper, 'h2', 'title', text);

    // return title;
  }
  render() {
    return this.element;
  }
}

export default Template;
