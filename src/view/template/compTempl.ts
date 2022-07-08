abstract class CompTempl {
  protected element: HTMLElement;
  static TextObj = {};

  protected constructor(id: string, tag: string, className?: string, value?: string) {
    this.element = document.createElement(tag);
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
    if (typeof value === 'string') {
      this.element.innerHTML = value;
    }
  }

  render() {
    return this.element;
  }
}

export default CompTempl;
