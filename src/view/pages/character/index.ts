import axios from 'axios';
import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import Template from '../../template/template';
import error from '../error';
import style from './index.module.scss';

class Character extends Template {
  static TitleObj = {
    title: 'This is a holy of saints anime and manga characters',
    subTitle: 'Browse all your favorite Manga characters, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  async content() {
    const section = new CreateDOMElement('section', style.characterSection, this.element).element;
    const wrapper = new CreateDOMElement('div', style.wrapper, section).element;
    const charTitleWrap = new CreateDOMElement('div', style.characterTitleWrapper, wrapper).element;
    new CreateDOMElement('div', style.characterTitleWrapperDecor, charTitleWrap).element;
    new CreateDOMElement('h1', style.characterTitleWrapperDecorH1, charTitleWrap, 'Featured manga persons').element;
    new CreateDOMElement(
      'p',
      style.characterTitleWrapperDecorP,
      charTitleWrap,
      'All your favorite anime and manga characters in one place'
    ).element;
    const sectionWrapper = new CreateDOMElement('div', style.characterWrapper, wrapper).element;
    await axios
      .get('https://api.jikan.moe/v4/characters')
      .then((res) => {
        const data = res.data.data;
        Object.keys(data).forEach((key) => {
          const data = res.data.data[key];
          const card = new CreateDOMElement('div', style.characterCard, sectionWrapper).element;
          const cardImg = new CreateDOMElement('div', style.characterCardImg, card).element;
          new CreateDOMElement('p', style.japanAmazing, cardImg, `${data.name_kanji}`).element;
          new CreateDOMElement('img', style.cardImg, cardImg, null, {
            src: `${data.images.jpg.image_url}`,
            alt: `${data.name}`,
          });
          const cardContent = new CreateDOMElement('div', style.characterCardContent, card).element;
          const cardContentTitle = new CreateDOMElement('h2', style.characterCardContentTitle, cardContent).element;
          new CreateDOMElement('a', style.characterCardLink, cardContentTitle, `${data.name}`, {
            href: `${data.url}`,
          }).element;
          const aboutContent = new CreateDOMElement('div', style.characterCardContent, card).element;
          new CreateDOMElement('div', style.characterCardContentText, aboutContent, `${data.about}`);
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    this.Content(Character.TitleObj.title, Character.TitleObj.subTitle);
    this.content();
    return this.element;
  }
}

export default Character;
