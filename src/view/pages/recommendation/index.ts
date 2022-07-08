import axios from 'axios';
import Create from '../../../data/utils/create';
import Template from '../../template/template';
import style from './index.module.scss';

export interface RootObject {
  data: RootObjectData[];
  pagination: RootObjectPagination;
}

export interface RootObjectDataEntryImagesJpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface RootObjectDataEntryImagesWebp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface RootObjectDataEntryImages {
  jpg: RootObjectDataEntryImagesJpg;
  webp: RootObjectDataEntryImagesWebp;
}

export interface RootObjectDataEntry {
  mal_id: number;
  url: string;
  images: RootObjectDataEntryImages;
  title: string;
}

export interface RootObjectDataUser {
  url: string;
  username: string;
}

export interface RootObjectData {
  mal_id: string;
  entry: RootObjectDataEntry[];
  content: string;
  user: RootObjectDataUser;
}

export interface RootObjectPagination {
  last_visible_page: number;
  has_next_page: boolean;
}

class Recommendation extends Template {
  static TitleObj = {
    title: 'Recommendation',
    subTitle: 'Browse your Manga recommendation, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  content() {
    const wrapper = new Create('div', style.wrapper, this.element).element;
    // wrapper.addEventListener('click', () => {
    //   fetchData();
    // });
    const fetchData = async () => {
      const responce = await axios.get('https://api.jikan.moe/v4/recommendations/manga?=&limit=10');
      Object.keys(responce.data.data).forEach((key) => {
        const data = responce.data.data[key];
        const title = data.entry[0].title;
        const url = data.entry[0].url;
        const image = data.entry[0].images.jpg.image_url;
        const user = data.user.username;
        const content = data.content;
        const card = new Create('div', style.recommendationCard, wrapper).element;
        const cardImg = new Create('div', style.recommendationCardImg, card).element;
        const img = new Create('img', 'card-img', cardImg, null, { src: `${image}`, alt: `${title}` }).element;
        const cardContent = new Create('div', 'recommendation-card-content', card).element;
        const cardContentTitle = new Create('div', 'recommendation-card-content-title', cardContent).element;
        const cardLink = new Create('a', '1', cardContentTitle, `${title}`, { href: `${url}` }).element;
        const recCardUser = new Create('div', 'recommendation-card-content-user', card).element;
        const recCardUserLink = new Create('a', '123', recCardUser, `${user}`, {
          href: `https://myanimelist.net/profile/${user}`,
        });
        const recCardAnyContent = new Create('div', 'recommendation-card-content-content', card, `${content}`).element;
      });
    };
    fetchData();

    // `<div class="recommendation-card">
    //         <div class="recommendation-card-image">
    //           <img src="${image}" alt="${title}">
    //         </div>
    //         <div class="recommendation-card-content">
    //           <div class="recommendation-card-content-title">
    //             <a href="${url}">${title}</a>
    //           </div>
    //           <div class="recommendation-card-content-user">
    //             <a href="https://myanimelist.net/profile/${user}">${user}</a>
    //           </div>
    //           <div class="recommendation-card-content-content">
    //             ${content}
    //           </div>
    //         </div>
    //       </div>`;
    // datas.append(html);

    this.element.append(wrapper);
  }

  render() {
    this.Title(Recommendation.TitleObj.title, Recommendation.TitleObj.subTitle);
    this.content();
    return this.element;
  }
}

export default Recommendation;

// const Taig = new taig('https://api.jikan.moe/v4/manga/1/full'); // https://api.jikan.moe/v4/magazines  https://api.jikan.moe/v4/manga/2/full
//
// const Manga = Taig.gen({ name: 'Manga', path: '?q=&limit=5' });
// const fetchData = async () => {
//   try {
//     const { data }: { data: Manga } = await Manga.method('GET');
//     console.log(data.data);
//     // const { authors, background, demographics, images } = data.data;
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// fetchData();
