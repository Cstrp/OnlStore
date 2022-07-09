import axios from 'axios';
import Create from '../../../data/utils/create';
import Template from '../../template/template';
import { insertionSort } from '../recommendation';
import style from './index.module.scss';

class Character extends Template {
  static TitleObj = {
    title: 'Character',
    subTitle: 'Browse all your favorite Manga characters, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  content() {
    const section = new Create('section', style.characterSection, this.element).element;

    const wrapper = new Create('div', style.wrapper, section).element;
    const charTitleWrap = new Create('div', style.characterTitleWrapper, wrapper).element;
    const decor = new Create('div', style.characterTitleWrapperDecor, charTitleWrap).element;
    const charTitle = new Create('h1', style.characterTitleWrapperDecorH1, charTitleWrap, 'Featured manga persons')
      .element;
    const subTitle = new Create(
      'p',
      style.characterTitleWrapperDecorP,
      charTitleWrap,
      'All your favorite anime and manga characters in one place'
    ).element;
    const sectionWrapper = new Create('div', style.characterWrapper, wrapper).element;
    const fetchData: () => Promise<void> = async () => {
      const resp = await axios.get('https://api.jikan.moe/v4/characters');
      const data = insertionSort(resp.data.data);
      Object.keys(data).forEach((key) => {
        const data = resp.data.data[key];
        const test = data.images.jpg;
        const card = new Create('div', style.characterCard, sectionWrapper).element;
        const cardImg = new Create('div', style.characterCardImg, card).element;
        const img = new Create('img', style.cardImg, cardImg, null, {
          src: `${data.images.jpg.image_url}`,
          alt: `${data.name}`,
        });

        const name = new Create('p', style.japanAmazing, cardImg, `${data.name_kanji}`).element;
        // const nickname = new Create('p', style.japanAmazing, cardImg, `${data.nicknames}`).element;

        const cardContent = new Create('div', style.characterCardContent, card).element;
        const cardContentTitle = new Create('h2', style.characterCardContentTitle, cardContent).element;
        const cardLink = new Create('a', style.characterCardLink, cardContentTitle, `${data.name}`, {
          href: `${data.url}`,
        }).element;
        const aboutContent = new Create('div', style.characterCardContent, card).element;
        const content = new Create(
          'div',
          style.characterCardContentText,
          aboutContent,
          `Description: <br/>${data.about}`
        );
      });
    };
    fetchData();
  }

  render() {
    this.Title(Character.TitleObj.title, Character.TitleObj.subTitle);
    this.content();
    return this.element;
  }
}

export default Character;
