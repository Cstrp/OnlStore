import './view/styles/root.scss';
import App from './view/pages/app';

const app = new App().render();

// import taig from 'taig';
// import { Manga } from 'taig/dist/types/Manga';
//
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

// import Taig from 'taig';
// import { Manga } from 'taig/dist/types/Manga';
// type a = string | number | Array<string>;
//
// const Taiga = new Taig('https://api.jikan.moe/v4/manga/1/full');
//
// const Manga = Taiga.gen({ name: 'Manga', path: '?q=&limit=5' });
// const fetchData = async () => {
//   try {
//     const { data }: { data: Manga } = await Manga.method('GET');
//     let url = '';
//     Object.keys(data.data).forEach((key: string) => {
//       // console.log(`${url}${key}`);
//       url += key;
//     });
//     console.log(url);
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// fetchData();

// let url = `${this.link}${endpoint}`;
// Object.keys(urlOption).forEach((key) => {
//   url += `${key}=${urlOption[key]}`;
// });
