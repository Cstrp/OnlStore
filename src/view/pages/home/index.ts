import axios from 'axios';
import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import {Datum} from '../../../data/utils/Interface';
import {get, set} from '../../../data/utils/storage';
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
  
  async mainContent<T>() {
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
    await axios
      .get('https://api.jikan.moe/v4/manga', {method: 'GET'})
      .then((res) => {
        const data = res.data.data;
        const dataAttr = data.map((item: Datum) => {
          return {
            mal_id: item.mal_id,
            title: item.title.slice(0, 15),
            images: item.images,
            authors: item.authors,
            status: item.status,
            genres: item.genres,
            synopsis: item.synopsis,
            url: item.url,
            published: item.published.string.replace('to ?', 'to now days'),
            members: Math.floor(item.members / 123),
          };
        });
        const cardWrapper = new CreateDOMElement('div', `${style.card}`, contentWrapper).element;
        dataAttr.forEach((item: Datum) => {
          const card = new CreateDOMElement('div', style.cardItem, cardWrapper, null, {id: `${item.mal_id}`}).element;
          const cardHeader = new CreateDOMElement('div', `${style.cardItem}`, card).element;
          const cardBody = new CreateDOMElement('div', `${style.cardItem}`, card).element;
          const cardFooter = new CreateDOMElement('div', style.other, card).element;
          const cardLink = new CreateDOMElement('a', `${style.cardLink}`, cardHeader).element;
          new CreateDOMElement('h2', `${style.cardTitle}`, cardLink, `${item.title}`).element;
          new CreateDOMElement('img', `${style.cardImg}`, cardBody, null, {
            src: `${item.images.jpg.image_url}`,
            alt: `${item.authors}`,
            title: `${item.synopsis}`,
          }).element;
          const authorLink = new CreateDOMElement('a', `${style.cardContentP}`, cardBody, null, {
            href: `${item.authors[0].url}`,
          }).element;
          new CreateDOMElement('p', `${style.cardContentP}`, authorLink, `Author: ${item.authors[0].name}`).element;
          new CreateDOMElement('p', `${style.cardContentP}`, cardBody, `Genre: ${item.genres[0].name}`).element;
          new CreateDOMElement('p', `${style.cardContentP}`, cardBody, `Release: ${item.published}`).element;
          const addToCart: HTMLImageElement = <HTMLImageElement>(
            new CreateDOMElement('img', `${style.otherImg}`, cardFooter, null, {
              src: `https://www.svgrepo.com/show/13666/heart.svg`,
              title: `Add to cart`,
            }).element
          );
          const counter: HTMLDivElement = <HTMLDivElement>document.querySelector('.counter');
          [addToCart].forEach((elem) => {
            elem.onclick = (evt) => {
              evt.preventDefault();
              const activeImage = get('activeImage');
              get('counter');
              elem.classList.toggle(style.otherImgActive);
              if (elem.classList.contains(style.otherImgActive)) {
                set('counter', (counter.innerHTML = `${Number(counter.innerHTML) + 1}`));
              } else {
                set('counter', (counter.innerHTML = `${Number(counter.innerHTML) - 1}`));
              }
            };
          });
          const price = new CreateDOMElement('p', `${style.otherPrice}`, cardFooter, `Price: ¥ ${item.members}`)
            .element;
          const result = get('counter');
          if (result && result != null && result != '0') {
            counter.innerHTML = result.toString();
          } else {
            counter.innerHTML = '0';
          }
        });
      })
      .catch((error) => console.log(error));
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
