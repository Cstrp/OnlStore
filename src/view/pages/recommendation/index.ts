import axios from 'axios';
import Create from '../../../data/utils/create';
import Template from '../../template/template';
import style from './index.module.scss';

export const insertionSort = (arr: []): [] => {
  for (let i = 1, l = arr.length; i < l; i++) {
    const current = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > current) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }
  return arr;
};

class Recommendation extends Template {
  static TitleObj = {
    title: 'Recommendation',
    subTitle: 'Browse your Manga recommendation, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  content() {
    const section = new Create('section', style.recommendationSection, this.element).element;
    const wrapper = new Create('div', style.wrapper, section).element;
    const recTitleWrapper = new Create('div', style.recommendationTitleWrapper, wrapper).element;
    const decor = new Create('div', style.recommendationTitleWrapperDecor, recTitleWrapper).element;
    const recTitle = new Create('h1', style.recommendationTitleWrapperDecorH1, recTitleWrapper, 'Featured Manga')
      .element;
    const recSubTitle = new Create(
      'p',
      style.recommendationTitleWrapperDecorP,
      recTitleWrapper,
      'Find out what are the best manga  anime and series here'
    ).element;
    const sectionWrapper = new Create('div', style.RecommendationWrapper, wrapper).element;
    const fetchData: () => Promise<void> = async () => {
      const response = await axios.get('https://api.jikan.moe/v4/recommendations/manga'); ///anime?limit=10&q=
      const data = insertionSort(response.data.data);
      Object.keys(data).forEach((key) => {
        const data = response.data.data[key];
        const card = new Create('div', style.recommendationCard, sectionWrapper).element;
        const cardImg = new Create('div', style.recommendationCardImg, card).element;
        const img = new Create('img', style.cardImg, cardImg, null, {
          src: `${data.entry[0].images.jpg.image_url}`,
          alt: `${data.entry[0].title}`,
        }).element;
        const cardContent = new Create('div', style.recommendationCardContent, card).element;
        const cardContentTitle = new Create('h2', style.recommendationCardContentTitle, cardContent).element;
        const cardLink = new Create('a', style.recommendationCardLink, cardContentTitle, `${data.entry[0].title}`, {
          href: `${data.entry[0].url}`,
        }).element;
        const recCardUser = new Create('div', style.recommendationCardContentUser, card).element;
        const recCardUserLink = new Create(
          'a',
          style.recommendationCardLink,
          recCardUser,
          `User: ${data.user.username}`,
          {
            href: `https://myanimelist.net/profile/${data.user.username}`,
          }
        );
        const recCardAnyContent = new Create(
          'div',
          style.recommendationCardContentText,
          card,
          `Description:<br/>${data.content}`
        ).element;
      });
    };
    fetchData();

    this.element.append(section);
  }

  render() {
    this.Title(Recommendation.TitleObj.title, Recommendation.TitleObj.subTitle);
    this.content();
    return this.element;
  }
}

export default Recommendation;
