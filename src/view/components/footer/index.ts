// import Create from '../../../data/utils/create';
import CompTempl from '../../template/compTempl';

class Footer extends CompTempl {
  constructor(id: string, tag: string, className: string) {
    super(id, tag, className);
  }

  footerContent() {}

  render() {
    this.footerContent();
    return this.element;
  }
}

export default Footer;
