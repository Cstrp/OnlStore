import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { settingModal } from '../../../data/settings';
import CreateDOMElement, { Values } from '../../../data/utils/CreateDOMElement';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

class Modal extends CompTemple {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  modalContent() {
    const modalWrapper = new CreateDOMElement('div', style.modalWrapper, this.element).element;
    const modalHeader = new CreateDOMElement('div', style.modalWrapperHeader, modalWrapper).element;
    new CreateDOMElement('h2', style.modalWrapperHeaderTitle, modalHeader, 'Settings').element;
    const modalBody = new CreateDOMElement('div', style.modalWrapperBody, modalWrapper).element;
    const modalFooter = new CreateDOMElement('div', style.modalWrapperFooter, modalWrapper).element;
    const select = new CreateDOMElement('select', '123', modalFooter).element;
    new CreateDOMElement('button', '123', modalFooter, `${settingModal[0].btn[0].close}`).element;
    const slider = new CreateDOMElement('div', '123', modalBody).element;
    noUiSlider.create(<never>slider, {
      start: [0, 27],
      connect: true,
      range: {
        min: 0,
        max: 27,
      },
    });
    settingModal[0].btn.forEach((btn) => {
      new CreateDOMElement('button', '123', modalFooter, `${btn.save}`).element;
      new CreateDOMElement('button', '123', modalFooter, `${btn.cancel}`).element;
      new CreateDOMElement('button', '123', modalFooter, `${btn.reset}`).element;
    });
    settingModal[0].sortBtn.forEach((btn) => {
      new CreateDOMElement('option', '123', select, 'Sort by', { disabled: true }).element;
      const authors = new CreateDOMElement('option', '123', select, `${btn.authors}`).element;
      new CreateDOMElement('option', '123', select, `${btn.genres}`).element;
      new CreateDOMElement('option', '123', select, `${btn.price}`).element;
    });
  }

  classList(className?: Values) {
    if (typeof className === 'string') {
      this.element.classList.toggle(className);
    }
  }

  render() {
    this.classList();
    this.modalContent();
    return this.element;
  }
}

export default Modal;
