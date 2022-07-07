import Template from '../template/template';

class Character extends Template {
  static content = {
    title: 'Character',
  };

  constructor(id: string, className: string) {
    super(id);
    this.element.classList.add(className);
  }

  render() {
    const title = this.header(Character.content.title);
    this.element.append(title);
    return this.element;
  }
}

export default Character;
