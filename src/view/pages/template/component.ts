abstract class Component {
  protected element: HTMLElement;
  protected constructor(tag: string, className: string, value?: string, attr?: string[]) {
    this.element = document.createElement(tag);
    this.element.classList.add(...className.split(' '));
    if (typeof value === 'string') {
      this.element.innerHTML = value;
    }
    if (attr) {
      for (const key in attr) {
        this.element.setAttribute(key, attr[key]);
      }
    }
  }
  render() {
    return this.element;
  }
}

export default Component;
