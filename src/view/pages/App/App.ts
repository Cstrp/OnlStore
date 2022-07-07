import { generateId } from '../../../data/utils/randomID';
import Header from '../../components/header/header';
import Character from '../Character/Character';
import ErrorPage, { ErrorTypes } from '../error/error';
import Main from '../main/main';
import Recomendation from '../Recomendation/Recomendation';
import styles from './index.module.scss';

export const enum pageId {
  main = 'main',
  character = 'character',
  recommendation = 'recommendation',
}

class App {
  private static container: HTMLElement = document.body;
  private static currentPage: string = 'current__page';
  private MainPage: Main;
  private header: Header;

  static renderPage(id: string, className?: string) {
    const currentPage = document.querySelector(`#${this.currentPage}`);
    if (currentPage) {
      currentPage.remove();
    }
    let page: Main | null;
    if (id === pageId.main) {
      page = new Main(id, styles.main);
    } else if (id === pageId.character) {
      page = new Character(id, styles.main);
    } else if (id === pageId.recommendation) {
      page = new Recomendation(id, styles.main);
    } else {
      page = new ErrorPage(id, ErrorTypes.Error_404, 'error-page');
      App.container.innerHTML = '';
    }
    if (page) {
      const HTML = page.render();
      HTML.id = App.currentPage;
      App.container.append(HTML);
    }
  }

  constructor() {
    this.MainPage = new Main('main', styles.main);
    this.header = new Header('header', styles.header);
  }

  private route() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
  }

  render() {
    App.container.append(this.header.render());
    App.renderPage('main');
    this.route();
  }
}

export default App;
