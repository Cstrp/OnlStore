import axios from 'axios';
import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import Template from '../../template/template';
import style from './index.module.scss';

class Recommendation extends Template {
  static TitleObj = {
    title: 'Small selection from our favorite users',
    subTitle: 'Browse your Manga recommendation, and view their rankings in realtime',
  };

  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  content() {
    const section = new CreateDOMElement('section', style.recommendationSection, this.element).element;
    const wrapper = new CreateDOMElement('div', style.wrapper, section).element;
    const recTitleWrapper = new CreateDOMElement('div', style.recommendationTitleWrapper, wrapper).element;
    new CreateDOMElement('div', style.recommendationTitleWrapperDecor, recTitleWrapper).element;
    new CreateDOMElement('h1', style.recommendationTitleWrapperDecorH1, recTitleWrapper, 'Featured Manga').element;
    new CreateDOMElement(
      'p',
      style.recommendationTitleWrapperDecorP,
      recTitleWrapper,
      'Find out what are the best manga  anime and series here'
    ).element;
    const sectionWrapper = new CreateDOMElement('div', style.RecommendationWrapper, wrapper).element;
    const fetchData: () => Promise<void> = async () => {
      const response = await axios.get('https://api.jikan.moe/v4/recommendations/manga');
      const data = response.data.data;
      Object.keys(data).forEach((key) => {
        const data = response.data.data[key];
        const card = new CreateDOMElement('div', style.recommendationCard, sectionWrapper).element;
        const cardImg = new CreateDOMElement('div', style.recommendationCardImg, card).element;
        new CreateDOMElement('img', style.cardImg, cardImg, null, {
          src: `${data.entry[0].images.jpg.image_url}`,
          alt: `${data.entry[0].title}`,
        }).element;
        const cardContent = new CreateDOMElement('div', style.recommendationCardContent, card).element;
        const cardContentTitle = new CreateDOMElement('h2', style.recommendationCardContentTitle, cardContent).element;
        new CreateDOMElement('a', style.recommendationCardLink, cardContentTitle, `${data.entry[0].title}`, {
          href: `${data.entry[0].url}`,
        }).element;
        const recCardUser = new CreateDOMElement('div', style.recommendationCardContentUser, card).element;
        new CreateDOMElement('a', style.recommendationCardLink, recCardUser, `User: ${data.user.username}`, {
          href: `https://myanimelist.net/profile/${data.user.username}`,
        });
        new CreateDOMElement('div', style.recommendationCardContentText, card, `Description:<br/>${data.content}`)
          .element;
      });
    };
    fetchData().catch((err) => console.log(err));
    this.element.append(section);
  }

  render() {
    this.Content(Recommendation.TitleObj.title, Recommendation.TitleObj.subTitle);
    this.content();
    return this.element;
  }
}

export default Recommendation;
