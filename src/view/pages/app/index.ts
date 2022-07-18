import { get, set } from '../../../data/utils/storage';
import generateId from '../../../data/utils/randomID';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Template from '../../template/template';
import Character from '../character';
import Error from '../error';
import Home from '../home/index';
import Recommendation from '../recommendation';
import style from './index.module.scss';

export const enum pageID {
  home = '/home',
  characters = '/characters',
  recommendation = '/recommendation',
}

class App {
  private static element: HTMLElement = document.body;
  private static defaultPageID: string = 'defaultID';
  private header: Header;
  private footer: Footer;

  static renderPage(id: string) {
    const defaultPage = document.querySelector(`#${App.defaultPageID}`);
    if (defaultPage) {
      defaultPage.remove();
    }
    let page: Template | null;
    switch (id) {
      case pageID.home:
        page = new Home(generateId(), 'main', style.home);
        break;
      case pageID.characters:
        page = new Character(generateId(), 'main', style.characters);
        break;
      case pageID.recommendation:
        page = new Recommendation(generateId(), 'main', style.recommendation);
        break;
      default:
        page = new Home(generateId(), 'main', style.main);
        break;
    }
    if (page) {
      const HTML = page.render();
      HTML.id = App.defaultPageID;
      App.element.append(HTML);
    }
  }

  constructor() {
    this.header = new Header(generateId(), 'header', style.header);
    App.element.classList.add(style.body);
    this.footer = new Footer(generateId(), 'footer', style.footer);
  }

  private router() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '/').slice(1);
      if (hash !== pageID.home && hash !== pageID.characters && hash !== pageID.recommendation) {
        const error = new Error(generateId(), 'main', style.error);
        App.element.append(error.render());
      } else {
        App.renderPage(hash);
      }
    });
  }

  private StoragePage() {
    const storage = get('page');
    if (storage) {
      App.renderPage(storage);
    } else {
      App.renderPage(App.defaultPageID);
    }
    window.addEventListener('load', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
    window.addEventListener('beforeunload', () => {
      set('page', window.location.hash.slice(1));
    });
    console.log(get('counter'));
  }

  render() {
    this.router();
    this.StoragePage();
    App.element.append(this.header.render());
    App.renderPage(pageID.home);
    // new Promise((resolve, reject) => {
    //   reject();
    // }).then(() => App.element.append(this.footer.render()));
  }
}

export default App;
