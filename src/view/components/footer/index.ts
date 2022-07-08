// import Create from '../../../data/utils/create';
import CompTemple from '../../template/compTemple';

class Footer extends CompTemple {
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
