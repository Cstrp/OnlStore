type nullOn = string | null | unknown;
type parentOn = ParentNode | Create;

class Create {
  element: Element;
  innerText!: string;
  href!: string;

  constructor(tag: string, classNames: string, parent?: parentOn, value?: nullOn, attr?: Record<string, unknown>) {
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
}

export default Create;
