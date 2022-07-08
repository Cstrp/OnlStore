import Template from '../../template/template';

class Home extends Template {
  static TitleObj = {
    title: 'Home',
  };
  constructor(id: string, className?: string) {
    super(id);
    // this.element = document.createElement('div');
    // this.element.id = id;
    // if (typeof className === 'string') {
    //   this.element.classList.add(...className.split(' '));
    // }
  }

  render() {
    const title = this.Title(Home.TitleObj.title);
    // this.element.append(title);
    return this.element;
  }
}

export default Home;
