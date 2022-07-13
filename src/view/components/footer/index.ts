import Create from '../../../data/utils/create';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

class Footer extends CompTemple {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  footerContent() {
    const wrapper = new Create('div', style.wrapper, this.element);
    const footerWrapper = new Create('div', style.footerWrapper, wrapper).element;
    const footerLogo = new Create('div', style.footerWrapperLogo, footerWrapper).element;
    const footerLogoLink = new Create('a', style.footerWrapperLogoLink, footerLogo, null, { href: '/' }).element;
    new Create('h2', style.footerWrapperLogoTitle, footerLogoLink, 'Manga Store').element;
    const footerLogoRS = new Create('div', style.footerWrapperLogoImg, footerWrapper).element;
    const footerLogoLinkRs = new Create('a', style.footerWrapperLogoImg, footerLogoRS, null, {
      href: 'https://wearecommunity.io/communities/the-rolling-scopes',
    }).element;
    new Create('img', style.footerWrapperLogoRSImg, footerLogoLinkRs, null, {
      src: 'https://rollingscopes.com/images/logo_rs_text.svg',
    }).element;
    const footerLogoGit = new Create('div', style.footerWrapperLogoImg, footerWrapper).element;
    const footerLogoGitLink = new Create('a', style.footerWrapperLogoImg, footerLogoGit, null, {
      href: 'https://github.com/Cstrp',
    }).element;
    new Create('img', style.footerWrapperLogoImg, footerLogoGitLink, null, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_logo_2013.svg',
    }).element;
    wrapper.append(footerWrapper);
  }

  render() {
    this.footerContent();
    return this.element;
  }
}

export default Footer;
