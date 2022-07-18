class CreateDOMElement {
  element: Element;
  constructor(
    tag: string,
    classNames: string,
    parent?: ParentNode | CreateDOMElement | null,
    value?: string | null | unknown,
    attr?: Record<string, unknown>
  ) {
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
}

it('createDOMElement', () => {
  const create = new CreateDOMElement('div', 'test');
  expect(create.element.tagName).toBe('DIV');
  expect(create.element.classList.contains('test')).toBe(true);
});

it('createDOMElement with value', () => {
  const create = new CreateDOMElement('div', 'test', null, 'test');
  expect(create.element.innerHTML).toBe('test');
});

it('createDOMElement with parent', () => {
  const parent = document.createElement('div');
  const create = new CreateDOMElement('div', 'test', parent);
  expect(parent.contains(create.element)).toBe(true);
});

it('createDOMElement with attr', () => {
  const create = new CreateDOMElement('div', 'test', null, null, {
    test: 'test',
  });
  expect(create.element.getAttribute('test')).toBe('test');
});

it('createDOMElement with parent and attr', () => {
  const parent = document.createElement('div');
  const create = new CreateDOMElement('div', 'test', parent, null, {
    test: 'test',
  });
  expect(parent.contains(create.element)).toBe(true);
  expect(create.element.getAttribute('test')).toBe('test');
});
