import { generateId } from '../../../data/utils/randomID';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Template from '../../template/template';
import Character from '../character';
import Error from '../error';
import Home from '../home/index';
import Recommendation from '../recommendation';
import style from './index.module.scss';

export const enum pageID {
  home = 'home',
  characters = 'characters',
  recommendation = 'recommendation',
}

class App {
  private static element: HTMLElement = document.body;
  private static defaultPageID: string = 'defaultID';
  private home: Home;
  private header: Header;
  private footer: Footer;

  static renderPage(id: string) {
    const defaultPage = document.querySelector(`#${App.defaultPageID}`);
    if (defaultPage) {
      defaultPage.remove();
    }
    let page: Template | null;
    if (id === pageID.home) {
      page = new Home(id, 'main');
    } else if (id === pageID.characters) {
      page = new Character(id, 'main');
    } else if (id === pageID.recommendation) {
      page = new Recommendation(id, 'main');
    } else {
      page = new Error(id, 'main', style.error_main);
      App.element.innerHTML = '';
    }
    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID;
      App.element.append(pageHTML);
    }
  }

  constructor() {
    App.element.classList.add(style.body);
    this.header = new Header(generateId(), 'header', style.header);
    this.home = new Home(generateId(), 'main', style.main);
    this.footer = new Footer(generateId(), 'footer', style.footer);
  }

  private router() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
  }

  render() {
    App.element.append(this.header.render());
    App.renderPage(pageID.home);
    App.element.append(this.footer.render());
    this.router();
  }
}

export default App;
