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
    const decor = new Create('div', style.tittleWrapperDecor, titleWrapper).element;
    const title = new Create('h2', style.tittleWrapperTitle, titleWrapper, 'The best manga for every day').element;
    const subTitle = new Create(
      'p',
      style.tittleWrapperSubTitle,
      titleWrapper,
      'All the best manga collected for you in one place'
    ).element;
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
            const content = dt.map((el) => {
              const img = el.images.jpg.image_url;
              const auth = el.authors[0].name;
              console.log(auth);
              console.log(img);
              const title = new Create('h2', '123', contentWrapper, `${el.title}`).element;
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
