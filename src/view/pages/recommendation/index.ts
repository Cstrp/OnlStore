import Template from '../../template/template';

class Recommendation extends Template {
  static TitleObj = {
    title: 'Recommendation',
    subTitle: 'Browse your Manga recommendation, and view their rankings in realtime',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  render() {
    this.Title(Recommendation.TitleObj.title, Recommendation.TitleObj.subTitle);
    return this.element;
  }
}

export default Recommendation;
