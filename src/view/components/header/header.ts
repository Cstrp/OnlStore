import { pageId } from '../../pages/App/App';
import Component from '../../pages/template/component';
import styles from './index.module.scss';

const btnHeader = [
  {
    id: pageId.main,
    content: 'Home',
  },
  {
    id: pageId.character,
    content: 'Character',
  },
  {
    id: pageId.recommendation,
    content: 'Recommendation',
  },
];

class Header extends Component {
  constructor(tag: string, className: string) {
    super(tag, className);
  }

  btn() {
    const wrapper = document.createElement('div') as HTMLDivElement;
    const headerWrapper = document.createElement('div') as HTMLDivElement;
    const headerNav = document.createElement('nav');
    const headerList = document.createElement('ul');
    const headerLogo = document.createElement('div');
    const headerLogoLink = document.createElement('a');
    const headerLogoTitle = document.createElement('h2');
    headerLogo.classList.add(styles.headerWrapperLogo);
    headerLogoLink.classList.add(styles.headerWrapperLogoLink);
    headerLogoLink.href = '/';
    headerLogoTitle.classList.add(styles.headerWrapperLogoTitle);
    headerLogoTitle.innerHTML = 'Manga Store';
    headerLogo.append(headerLogoLink);
    headerLogoLink.append(headerLogoTitle);
    headerWrapper.append(headerLogo);
    wrapper.classList.add(styles.wrapper);
    headerWrapper.classList.add(styles.headerWrapper);
    headerNav.classList.add(styles.headerWrapperNav);
    headerList.classList.add(styles.headerWrapperNavList);
    btnHeader.forEach((btns) => {
      const headerListItem = document.createElement('li');
      const headerListItemLink = document.createElement('a') as HTMLAnchorElement;
      headerListItem.classList.add(styles.headerWrapperNavListItem);
      headerListItemLink.classList.add(styles.headerWrapperNavListItemLink);
      headerListItemLink.href = `#${btns.id}`;
      headerListItemLink.innerText = btns.content;
      wrapper.append(headerWrapper);
      headerWrapper.append(headerNav);
      headerNav.append(headerList);
      headerList.append(headerListItem);
      headerListItem.append(headerListItemLink);
    });
    this.element.append(wrapper);
  }

  render(): HTMLElement {
    this.btn();
    return this.element;
  }
}

export default Header;
