import {get, set} from '../../../data/utils/storage';
import generateId from '../../../data/utils/randomID';
import Header from '../../components/header';
import Template from '../../template/template';
import Character from '../character';
import Error from '../error';
import Home from '../home/index';
import Recommendation from '../recommendation';
import style from './index.module.scss';
import Footer from '../../components/footer/index';

export const enum pageID {
  home = '/home',
  characters = '/characters',
  recommendation = '/recommendation',
}

class App {
  private static element: HTMLElement = document.body;
  private static staticID: string = 'staticID';
  private header: Header;
  private footer: Footer;
  
  static renderPage(id: string) {
    const defaultPage = document.querySelector(`#${App.staticID}`);
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
      HTML.id = App.staticID;
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
      App.renderPage(App.staticID);
    }
    window.addEventListener('load', () => {
      const hash = window.location.hash.slice(1);
      App.renderPage(hash);
    });
    window.addEventListener('beforeunload', () => {
      set('page', window.location.hash.slice(1));
    });
  }
  
  render() {
    this.router();
    this.StoragePage();
    App.element.append(this.header.render());
    App.renderPage(pageID.home);
   // render footer all pages and remove copy
    window.addEventListener('hashchange', ()=>{
      App.element.append(this.footer.render())
    })
    const footer = document.querySelector(Footer.def)
    if (footer) {
      footer.remove()
    }
    return App.element;
    
  }
}

export default App;
