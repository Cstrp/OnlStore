import Template from '../../template/template';

class Recommendation extends Template {
  static TitleObj = {
    title: 'Recommendation',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  render() {
    this.Title(Recommendation.TitleObj.title);
    return this.element;
  }
}

export default Recommendation;
