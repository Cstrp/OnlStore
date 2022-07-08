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
    document.body.classList.add(style.body);
    return this.element;
  }
}

export default Error;
