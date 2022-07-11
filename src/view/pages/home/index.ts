import axios from 'axios';
import Create from '../../../data/utils/create';
import { Datum } from '../../../data/utils/inderface';
import Template from '../../template/template';
import style from './index.module.scss';

class Home extends Template {
  static TitleObj = {
    title: 'Welcome dear travel',
    subTitle: 'Browse all your favorite Manga, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  mainContent() {
    const section = new Create('section', style.section, this.element).element;
    const wrapper = new Create('div', style.wrapper, section).element;
    const titleWrapper = new Create('div', style.tittleWrapper, wrapper).element;
    new Create('div', style.tittleWrapperDecor, titleWrapper).element;
    new Create('h2', style.tittleWrapperTitle, titleWrapper, 'The best manga for every day').element;
    new Create('p', style.tittleWrapperSubTitle, titleWrapper, 'All the best manga collected for you in one place')
      .element;
    const contentWrapper = new Create('div', style.contentWrapper, wrapper).element;
    const fetchData: () => Promise<void> = async () => {
      try {
        axios
          .get('https://api.jikan.moe/v4/manga', {
            method: 'GET',
            baseURL: 'https://api.jikan.moe/v4/manga',
          })
          .then((response) => {
            const data = response.data.data;
            const makeUniq = (arr: Datum[]) => {
              return arr.filter((el, id: number) => arr.indexOf(el) === id);
            };
            const dt = makeUniq(data);
            dt.map((el) => {
              const card = new Create('div', style.card, contentWrapper).element;
              const cardItem = new Create('div', style.cardItem, card).element;
              const cardLink = new Create('a', style.cardLink, cardItem, null, { href: `${el.url}` }).element;
              new Create('h2', style.cardTitle, cardLink, `${el.title}`).element;
              new Create('img', style.cardImg, cardItem, null, {
                src: `${el.images.jpg.image_url}`,
                alt: `${el.authors[0].name}`,
              }).element;
              const content = new Create('div', style.cardContent, card).element;
              const genre = new Create('div', style.cardContentGenre, content, null).element;
              const genreContent = new Create('div', style.cardContentGenreOther, genre).element;
              const otherContent = new Create('div', style.cardContentGenreOther, genre).element;
              new Create('p', style.cardContentP, genreContent, `${el.title_japanese}`);
              const genreLink = new Create('a', style.cardContentP, genreContent, null, {
                href: `${el.authors[0].url}`,
              }).element;
              new Create('p', style.cardContentP, genreLink, `Author: ${el.authors[0].name}`).element;
              new Create('p', style.cardContentP, genreContent, `Genre: ${el.genres[0].name}`).element;
              new Create('p', style.cardContentP, otherContent, `Rating: ${el.score}`).element;
              new Create('p', style.cardContentP, otherContent, `Add to favorites: ${el.favorites}`).element;
              const text = new Create('div', style.cardContentText, content).element;
              new Create('p', style.cardContentP, text, `${el.background}`).element;
              new Create('p', style.cardContentP, text, `${el.synopsis}`).element;
              const btnWrapper = new Create('div', style.cardBtn, card).element;
              new Create('button', style.cardBtnBtn, btnWrapper, `Add to cart`).element;
              new Create('button', style.cardBtnBtn, btnWrapper, `Add to favorite`).element;
            });
          });
      } catch (err) {
        throw new Error('Ops', err);
      }
    };
    fetchData();
  }

  render() {
    this.Content(Home.TitleObj.title, Home.TitleObj.subTitle);
    this.mainContent();
    return this.element;
  }
}

export default Home;
