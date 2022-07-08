import Create from '../../../data/utils/create';
import { pageID } from '../../pages/app';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

const buttons = [
  { id: pageID.home, text: 'Home' },
  { id: pageID.characters, text: 'Characters' },
  { id: pageID.recommendation, text: 'Recommendation' },
];

class Header extends CompTemple {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  headerContent() {
    const wrapper = new Create('div', style.wrapper, this.element);
    const headerWrapper = new Create('div', style.headerWrapper, wrapper).element;
    const headerLogo = new Create('div', style.headerWrapperLogo, headerWrapper).element;
    const headerLogoLink = new Create('a', style.headerWrapperLogoLink, headerLogo, null, { href: '/' }).element;
    const headerLogoTitle = new Create('h2', style.headerWrapperLogoTitle, headerLogoLink, 'Manga Store').element;
    const headerNav = new Create('nav', style.headerWrapperNav, headerWrapper).element;
    const headerList = new Create('ul', style.headerWrapperNavList, headerNav).element;
    buttons.forEach((btn) => {
      const headerListItem = new Create('li', style.headerWrapperNavListItem, headerList).element;
      const btnLink = new Create('a', style.headerWrapperNavListItemLink, headerListItem, `${btn.text}`, {
        href: `#${btn.id}`,
      }).element;
    });
    wrapper.append(headerWrapper);
  }

  render(): HTMLElement {
    this.headerContent();
    return this.element;
  }
}

export default Header;
