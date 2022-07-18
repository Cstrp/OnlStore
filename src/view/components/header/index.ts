import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import { pageID } from '../../pages/app';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

interface IHeader {
  wrapper: HTMLDivElement;
  headerWrapper: HTMLDivElement;
  headerLogo: HTMLDivElement;
  headerLogoLink: HTMLLinkElement;
  headerTitle: HTMLTitleElement;
  headerNav: HTMLDListElement;
  headerListItem: HTMLOListElement;
  btnWrap: HTMLDivElement;
  shop: HTMLDivElement;
  shopCard: Element;
}

const buttons = [
  { id: pageID.home, text: 'Home' },
  { id: pageID.characters, text: 'Characters' },
  { id: pageID.recommendation, text: 'Recommendation' },
];

class Header extends CompTemple implements IHeader {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  wrapper!: HTMLDivElement;
  headerWrapper!: HTMLDivElement;
  headerLogo!: HTMLDivElement;
  headerLogoLink!: HTMLLinkElement;
  headerTitle!: HTMLTitleElement;
  headerNav!: HTMLDListElement;
  headerListItem!: HTMLOListElement;
  btnWrap!: HTMLDivElement;
  shop!: HTMLDivElement;
  shopCard!: Element;

  headerContent() {
    const wrapper = new CreateDOMElement('div', style.wrapper, this.element).element;
    const headerWrapper = new CreateDOMElement('div', style.headerWrapper, wrapper).element;
    const headerLogo = new CreateDOMElement('div', style.headerWrapperLogo, headerWrapper).element;
    const headerLogoLink = new CreateDOMElement('a', style.headerWrapperLogoLink, headerLogo, null, { href: '/' })
      .element;
    new CreateDOMElement('h2', style.headerWrapperLogoTitle, headerLogoLink, 'Manga Store').element;
    const headerNav = new CreateDOMElement('nav', style.headerWrapperNav, headerWrapper).element;
    const headerList = new CreateDOMElement('ul', style.headerWrapperNavList, headerNav).element;
    buttons.forEach((btn) => {
      const headerListItem = new CreateDOMElement('li', style.headerWrapperNavListItem, headerList).element;
      new CreateDOMElement('a', style.headerWrapperNavListItemLink, headerListItem, `${btn.text}`, {
        href: `#${btn.id}`,
      }).element;
    });
    const btnWrap = new CreateDOMElement('div', style.btnWrap, headerWrapper).element;
    const shop = new CreateDOMElement('div', style.btnWrapShop, btnWrap).element;
    if (Object !== null) {
      new CreateDOMElement('div', `${style.btnWrapShopCouter} counter`, shop).element;
    }
    new CreateDOMElement('img', '123', shop, null, { src: `https://cdn-icons-png.flaticon.com/512/7625/7625953.png` })
      .element;

    new CreateDOMElement('div', style.btnWrapBtn, btnWrap, 'Login In').element;
    new CreateDOMElement('div', style.btnWrapBtn, btnWrap, 'Sign Up').element;
  }

  render(): HTMLElement {
    this.headerContent();
    return this.element;
  }
}

export default Header;
