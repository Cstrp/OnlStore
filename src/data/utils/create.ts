export type Values = string | null | unknown;
export type ParentElem = ParentNode | Create | null;

class Create {
  element: Element;

  constructor(tag: string, classNames: string, parent?: ParentElem, value?: Values, attr?: Record<string, unknown>) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classNames.split(' '));
    if (typeof value === 'string') {
      this.element.innerHTML = value;
    }
    parent ? (!(parent instanceof Create) ? parent.appendChild(this.element) : null) : undefined;
    if (attr) {
      for (const key in attr) {
        this.element.setAttribute(key, <string>attr[key]);
      }
    }
  }

  append(element: Create | Node | string) {
    return element ? (!(element instanceof Create) ? this.element.append(element) : null) : undefined;
  }

  remove(element = this.element) {
    return element ? (!(element instanceof Create) ? this.element.remove() : null) : undefined;
  }
}

export default Create;
