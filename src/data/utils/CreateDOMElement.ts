export type Values = string | null | unknown;
export type ParentElem = ParentNode | CreateDOMElement | null;

class CreateDOMElement {
  element: Element;

  constructor(tag: string, classNames: string, parent?: ParentElem, value?: Values, attr?: Record<string, unknown>) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classNames.split(' '));
    if (typeof value === 'string') {
      this.element.innerHTML = value;
    }
    parent ? (!(parent instanceof CreateDOMElement) ? parent.appendChild(this.element) : null) : undefined;
    if (attr) {
      for (const key in attr) {
        this.element.setAttribute(key, <string>attr[key]);
      }
    }
  }

  append(element: CreateDOMElement | Node | string) {
    return element ? (!(element instanceof CreateDOMElement) ? this.element.append(element) : null) : undefined;
  }

  remove(element = this.element) {
    return element ? (!(element instanceof CreateDOMElement) ? this.element.remove() : null) : undefined;
  }
}

export default CreateDOMElement;
