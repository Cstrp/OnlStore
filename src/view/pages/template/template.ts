abstract class Template {
  protected element: HTMLElement;
  static content = {};

  protected constructor(id: string, classNames?: string) {
    this.element = document.createElement('main');
    if (typeof classNames === 'string') {
      this.element.classList.add(...classNames.split(' '));
    }
    this.element.id = id;
  }

  protected header(content: string) {
    const title = document.createElement('h1');
    title.innerText = content;
    return title;
  }

  render() {
    return this.element;
  }
}

export default Template;
