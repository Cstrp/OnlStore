import Template from '../template/template';

class Recomendation extends Template {
  static content = {
    title: 'Recomendation',
  };

  constructor(id: string, className: string) {
    super(id);
    this.element.classList.add(className);
  }

  render() {
    const title = this.header(Recomendation.content.title);
    title.classList.add('a');
    this.element.append(title);
    return this.element;
  }
}

export default Recomendation;
