import Template from '../../template/template';

class Home extends Template {
  static TitleObj = {
    title: 'Home',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  render() {
    this.Title(Home.TitleObj.title);
    return this.element;
  }
}

export default Home;
