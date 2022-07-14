import axios from 'axios';
import Create from '../../../data/utils/create';
import { makeUniq } from '../../../data/utils/makeUniq';
import { get, set } from '../../../data/utils/storage';
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
    this.settings();
    const section = new Create('section', style.section, this.element).element;
    const wrapper = new Create('div', style.wrapper, section).element;
    const titleWrapper = new Create('div', style.tittleWrapper, wrapper).element;
    new Create('div', `${style.tittleWrapperDecor} modal`, titleWrapper).element;
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
            makeUniq(data).map((el) => {
              const card = new Create('div', `${style.card}`, contentWrapper, null, { id: `${el.mal_id}` }).element;
              const cardItem = new Create('div', style.cardItem, card).element;
              new Create('img', style.cardImg, cardItem, null, {
                src: `${el.images.jpg.large_image_url}`,
                alt: `${el.authors[0].name}`,
                title: `${el.synopsis}`,
              }).element;
              const cardLink = new Create('a', style.cardLink, cardItem, null, { href: `${el.url}` }).element;
              new Create('h2', style.cardTitle, cardLink, `${el.title}`).element;
              const content = new Create('div', style.cardContent, card).element;
              const genre = new Create('div', style.cardContentGenre, content, null).element;
              const otherContent = new Create('div', style.cardContentGenreOther, genre).element;
              const genreLink = new Create('a', style.cardContentP, otherContent, null, {
                href: `${el.authors[0].url}`,
              }).element;
              new Create('p', style.cardContentP, genreLink, `${el.authors[0].name}`).element;
              new Create('p', style.cardContentP, otherContent, `Genre: ${el.genres[0].name}`).element;
              new Create('p', style.cardContentP, otherContent, `${el.published.string.replace('to ?', 'to now day')}`)
                .element;
              const other = new Create('div', style.other, card).element;
              const img = new Create('div', style.otherImg, other, null).element;
              const image: HTMLImageElement = <HTMLImageElement>new Create('img', `${style.otherImg}`, img, null, {
                src: 'https://www.svgrepo.com/show/13666/heart.svg',
                title: 'Add to cart',
              }).element;
              const shopCart: HTMLDivElement = <HTMLDivElement>document.querySelector('.counter');
              [image].map((el) => {
                el.addEventListener('click', (evt) => {
                  evt.preventDefault();
                  el.classList.toggle(style.otherImgActive);
                  if (el.classList.contains(style.otherImgActive)) {
                    shopCart.innerHTML = `${Number(shopCart.innerHTML) + 1}`;
                  } else {
                    shopCart.innerHTML = `${Number(shopCart.innerHTML) - 1}`;
                  }
                });
              });
              // save the state of the cards (active) and the value of the counter
              const storageCard = get('card');
              const storageCart = get('counter');

              // window.addEventListener('load', () => {
              //   const storageCardObj = JSON.parse(<string>localStorage.getItem('card'));
              //   if (storageCardObj.includes(el.mal_id)) {
              //     image.classList.add(style.otherImgActive);
              //   }
              //   const storageCartObj = JSON.parse(<string>localStorage.getItem('counter'));
              //   shopCart.innerHTML = `${storageCartObj}`;
              // });
              // window.addEventListener('beforeunload', () => {
              //   localStorage.setItem('card', JSON.stringify(<string>storageCardObj));
              //   localStorage.setItem('counter', JSON.stringify(<string>storageCartObj));
              // });

              const price = new Create('div', '123', other).element;
              new Create('p', style.otherPrice, price, `¥ ${Math.floor(<number>el.members / 123)}`).element;
            });
          });
      } catch (err) {
        throw new Error('Ops', err);
      }
    };
    fetchData();
  }

  /// typeof 'genre' and more for filter

  settings() {
    const section = new Create('section', style.settingsSection, this.element).element;
    const wrapper = new Create('div', style.wrapper, section).element;
    const setting = new Create('div', `${style.settings} settings`, wrapper).element;
    new Create('img', `${style.settingsImg}`, setting, null, {
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
    this.mainContent();
    return this.element;
  }
}

export default Home;
