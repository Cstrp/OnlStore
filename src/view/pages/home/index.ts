import axios from 'axios';
import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import { makeUniq } from '../../../data/utils/makeUniq';
import { get, remove, set } from '../../../data/utils/storage';
import Modal from '../../components/modal';
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
    const section = new CreateDOMElement('section', style.section, this.element).element;
    const wrapper = new CreateDOMElement('div', style.wrapper, section).element;
    const titleWrapper = new CreateDOMElement('div', style.tittleWrapper, wrapper).element;
    new CreateDOMElement('div', `${style.tittleWrapperDecor} modal`, titleWrapper).element;
    new CreateDOMElement('h2', style.tittleWrapperTitle, titleWrapper, 'The best manga for every day').element;
    new CreateDOMElement(
      'p',
      style.tittleWrapperSubTitle,
      titleWrapper,
      'All the best manga collected for you in one place'
    ).element;
    const contentWrapper = new CreateDOMElement('div', style.contentWrapper, wrapper).element;
    const fetchData: () => Promise<void> = async () => {
      axios.get('https://api.jikan.moe/v4/manga', { method: 'GET' }).then((res) => {
        const data = res.data.data;
        makeUniq(data).forEach((el) => {
          const card = new CreateDOMElement('div', `${style.card}`, contentWrapper, null).element;
          const cardItem = new CreateDOMElement('div', style.cardItem, card).element;
          new CreateDOMElement('img', style.cardImg, cardItem, null, {
            src: `${el.images.jpg.large_image_url}`,
            alt: `${el.authors[0].name}`,
            title: `${el.synopsis}`,
          }).element;
          const cardLink = new CreateDOMElement('a', style.cardLink, cardItem, null, { href: `${el.url}` }).element;
          new CreateDOMElement('h2', style.cardTitle, cardLink, `${el.title}`).element;
          const content = new CreateDOMElement('div', style.cardContent, card).element;
          const genre = new CreateDOMElement('div', style.cardContentGenre, content, null).element;
          const otherContent = new CreateDOMElement('div', style.cardContentGenreOther, genre).element;
          const genreLink = new CreateDOMElement('a', style.cardContentP, otherContent, null, {
            href: `${el.authors[0].url}`,
          }).element;
          new CreateDOMElement('p', style.cardContentP, genreLink, `${el.authors[0].name}`).element;
          new CreateDOMElement('p', style.cardContentP, otherContent, `Genre: ${el.genres[0].name}`).element;
          new CreateDOMElement(
            'p',
            style.cardContentP,
            otherContent,
            `${el.published.string.replace('to ?', 'to now day')}`
          ).element;
          const other = new CreateDOMElement('div', style.other, card).element;
          const img = new CreateDOMElement('div', style.otherImg, other, null).element;
          const image: HTMLImageElement = <HTMLImageElement>(
            new CreateDOMElement('img', `${style.otherImg}`, img, null, {
              src: 'https://www.svgrepo.com/show/13666/heart.svg',
              title: 'Add to cart',
            }).element
          );
          const shopCart: HTMLDivElement = <HTMLDivElement>document.querySelector('.counter');
          [image].forEach((el) => {
            el.onclick = (evt) => {
              evt.preventDefault();
              get('counter');
              el.classList.toggle(style.otherImgActive);
              if (el.classList.contains(style.otherImgActive) && shopCart) {
                set('counter', (shopCart.innerHTML = `${Number(shopCart.innerHTML) + 1}`));
              } else {
                set('counter', (shopCart.innerHTML = `${Number(shopCart.innerHTML) - 1}`));
              }
              console.log(get('counter'));
            };
          });
          const price = new CreateDOMElement('div', style.otherPrice, other).element;
          new CreateDOMElement('p', style.otherPrice, price, `¥ ${Math.floor(<number>el.members / 123)}`).element;
        });
      });
    };
    fetchData().catch((err) => console.log(err));
  }

  settings() {
    const section = new CreateDOMElement('section', style.settingsSection, this.element).element;
    const wrapper = new CreateDOMElement('div', style.wrapper, section).element;
    const setting = new CreateDOMElement('div', `${style.settings} settings`, wrapper).element;
    new CreateDOMElement('img', `${style.settingsImg}`, setting, null, {
      src: 'https://img.icons8.com/nolan/64/apple-settings.png',
    }).element;
    const modal = new Modal('123', 'div', style.modalWrapper);
    section.append(modal.render());
    setting.addEventListener('click', () => {
      modal.classList(style.modalWrapperAtcive);
    });
  }

  render() {
    this.Content(Home.TitleObj.title, Home.TitleObj.subTitle);
    this.settings();
    this.mainContent();
    return this.element;
  }
}

export default Home;
