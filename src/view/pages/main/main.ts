import Template from '../template/template';

class Main extends Template {
  static TextContent = {
    title: 'Online-store',
  };

  constructor(id: string, className: string) {
    super(id);
    this.element.classList.add(className);
  }

  render() {
    const title = this.header(Main.TextContent.title);
    this.element.append(title);
    return this.element;
  }
}

export default Main;
