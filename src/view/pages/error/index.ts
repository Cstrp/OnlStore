import Create from '../../../data/utils/create';
import Template from '../../template/template';
import style from './index.module.scss';

class Error extends Template {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
    if (typeof className === 'string') {
      this.element.classList.add(...className.split(' '));
    }
  }

  render() {
    const wrapper = new Create('div', style.wrapper, this.element).element;
    const title = new Create('h1', style.error, wrapper).element;
    return this.element;
  }
}

export default Error;
