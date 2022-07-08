class Create {
  protected element: HTMLElement;

  constructor(
    parent: ParentNode | Create,
    tag: string,
    classNames: string,
    value?: string,
    attr?: Record<string, unknown>
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classNames.split(' '));
    if (typeof value === 'string') {
      this.element.innerHTML = value;
    }
    if ('appendChild' in parent) {
      parent.appendChild(this.element);
    }
    if (attr) {
      for (const key in attr) {
        this.element.setAttribute(key, <string>attr[key]);
      }
    }
  }

  append(element: HTMLElement) {
    this.element.append(element);
  }
}

export default Create;
