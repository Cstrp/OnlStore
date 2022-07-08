import Create from '../../data/utils/create.ts';

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
  protected Title(text: string) {
    const wrapper: Element = new Create('div', '123', this.element);
    const title: HTMLElement = new Create('h2', 'title', wrapper, text).element;
    wrapper.append(title);
  }
  render() {
    return this.element;
  }
}

export default Template;
