import Template from '../../template/template';

class Character extends Template {
  static TitleObj = {
    title: 'Character',
    subTitle: 'Browse all your favorite Manga characters, and view their rankings in realtime',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  render() {
    this.Title(Character.TitleObj.title, Character.TitleObj.subTitle);
    return this.element;
  }
}

export default Character;
