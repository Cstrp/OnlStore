import CreateDOMElement from '../../../data/utils/CreateDOMElement';
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
    document.body.style.overflow = 'hidden';
    const wrapper = new CreateDOMElement('div', style.wrapper, this.element).element;
    const title = new CreateDOMElement('h1', style.error, wrapper, '404:   Error! Page is not found...').element;
    wrapper.append(title);
    return this.element;
  }
}

export default Error;
