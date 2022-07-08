import Template from '../../template/template';

class Home extends Template {
  static TitleObj = {
    title: 'Home',
    subTitle: 'Browse all your favorite Manga, and view their rankings in realtime',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  mainContent() {}

  render() {
    this.Title(Home.TitleObj.title, Home.TitleObj.subTitle);
    return this.element;
  }
}

export default Home;
