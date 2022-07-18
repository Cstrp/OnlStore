import CreateDOMElement from '../../../data/utils/CreateDOMElement';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

class Footer extends CompTemple {
  public static def: string= 'dfltClss'
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  footerContent() {
    const wrapper = new CreateDOMElement('div', `${style.wrapper} ${Footer.def}`, this.element).element;
    const footerWrapper = new CreateDOMElement('div', style.footerWrapper, wrapper).element;
    const footerLogo = new CreateDOMElement('div', style.footerWrapperLogo, footerWrapper).element;
    const footerLogoLink = new CreateDOMElement('a', style.footerWrapperLogoLink, footerLogo, null, { href: '/' })
      .element;
    new CreateDOMElement('h2', style.footerWrapperLogoTitle, footerLogoLink, 'Manga Store').element;
    const footerLogoRS = new CreateDOMElement('div', style.footerWrapperLogoImg, footerWrapper).element;
    const footerLogoLinkRs = new CreateDOMElement('a', style.footerWrapperLogoImg, footerLogoRS, null, {
      href: 'https://wearecommunity.io/communities/the-rolling-scopes',
    }).element;
    new CreateDOMElement('img', style.footerWrapperLogoRSImg, footerLogoLinkRs, null, {
      src: 'https://rollingscopes.com/images/logo_rs_text.svg',
    }).element;
    const footerLogoGit = new CreateDOMElement('div', style.footerWrapperLogoImg, footerWrapper).element;
    const footerLogoGitLink = new CreateDOMElement('a', style.footerWrapperLogoImg, footerLogoGit, null, {
      href: 'https://github.com/Cstrp',
    }).element;
    new CreateDOMElement('img', style.footerWrapperLogoImg, footerLogoGitLink, null, {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_logo_2013.svg',
    }).element;
  }
  
  remove(className: string) {
    this.remove(Footer.def)
  }
  
  render() {
    this.footerContent();
    return this.element;
  }
}

export default Footer;
