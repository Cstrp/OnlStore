abstract class CompTemple {
  protected element: HTMLElement;
  static TextObj = {};

  protected constructor(id: string, tag: string, className?: string) {
    this.element = document.createElement(tag);
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }

  render() {
    return this.element;
  }
}

export default CompTemple;
