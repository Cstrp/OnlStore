import Template from '../../template/template';

class Character extends Template {
  static TitleObj = {
    title: 'Character',
  };
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  render() {
    this.Title(Character.TitleObj.title);
    return this.element;
  }
}

export default Character;
