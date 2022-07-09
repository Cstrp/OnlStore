import Create from '../../data/utils/create.ts';
import style from './index.module.scss';
import axios from 'axios';

abstract class Template {
  protected element: HTMLElement;
  static TextContent = {};

  protected constructor(id: string, tag: string, className?: string) {
    this.element = document.createElement(tag);
    this.element.id = id;
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }

  protected Title(text: string, subtext?: string) {
    const section: Element = new Create('section', style.section, this.element).element;
    const wrapper: HTMLElement = new Create('article', style.wrapper, section).element;
    const title: HTMLElement = new Create('h2', style.wrapperTitle, wrapper, text).element;
    const SubTitle: HTMLElement = new Create('p', style.wrapperSubTitle, wrapper, subtext).element;
    const inputWrapper: HTMLElement = new Create('div', style.wrapperInput, wrapper).element;
    const input: HTMLInputElement = new Create('input', style.wrapperInputField, inputWrapper, null, {
      placeholder: 'Type your text here...',
      type: 'text',
    }).element;
    input.addEventListener('keypress', (evt: KeyboardEvent) => {
      const searchData: () => Promise<void> = async () => {
        try {
          await axios
            .get(`https://api.jikan.moe/v4/anime?q=limit=5?q=max_score=5?q= + ${input.value}`, {
              // baseURL: 'https://api.jikan.moe/v4/anime',
              method: 'GET',
            })
            .then((response) => {
              const data = response.data.data;
              const container = new Create('div', style.wrapperResult, wrapper).element;
              Object.keys(data).forEach((key) => {
                const data = response.data.data[key];
                // const title = data.title;
                // const url = data.url;
                // const img = data.images.jpg.image_url;
                // const content = data.content;
                // const year = data.year;
                // const genres = data.genres;
                // const cardTitle = new Create();

                const card = new Create('div', '123', container).element;
              });
            });
        } catch (error) {
          throw new Error(`Ops... ${error}`);
        }
      };
      if (evt.key === 'Enter') {
        console.log(input.value);
        searchData();
      }
    });
    const button: HTMLElement = new Create('button', style.wrapperInputButton, inputWrapper, null, { type: 'submit' })
      .element;
    button.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      console.log(input.value);
    });
  }

  render() {
    return this.element;
  }
}

export default Template;

// input.addEventListener('keydown', (evt: KeyboardEvent) => {
//   if (evt.key === 'Enter') {
//     const result = new Create('div', style.wrapperResult, wrapper, null, { style: 'display: flex' }).element;
//     result.style.visible = true;
//     const FetchData: () => Promise<void> = async () => {
//       try {
//         await axios
//           .get(`https://api.jikan.moe/v4/anime?q=limit=5 + ${input.value}`, {
//             method: 'GET',
//             baseURL: 'https://api.jikan.moe/v4/anime',
//           })
//           .then((resp) => {
//             const data = insertionSort(resp.data.data);
//             console.log(
//               data.forEach((elem) => {
//                 console.log(elem);
//               })
//             );
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   }
// });
