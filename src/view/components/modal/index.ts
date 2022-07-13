import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { settingModal } from '../../../data/settings';
import Create, { nullOn } from '../../../data/utils/create';
import CompTemple from '../../template/compTemple';
import style from './index.module.scss';

class Modal extends CompTemple {
  constructor(id: string, tag: string, className?: string) {
    super(id, tag, className);
  }

  modalContent() {
    const modalWrapper = new Create('div', style.modalWrapper, this.element).element;
    const modalHeader = new Create('div', style.modalWrapperHeader, modalWrapper).element;
    new Create('h2', style.modalWrapperHeaderTitle, modalHeader, 'Settings').element;
    const modalBody = new Create('div', style.modalWrapperBody, modalWrapper).element;
    const modalFooter = new Create('div', style.modalWrapperFooter, modalWrapper).element;
    const select = new Create('select', '123', modalFooter).element;
    new Create('button', '123', modalFooter, `${settingModal[0].btn[0].close}`).element;
    const slider = new Create('div', '123', modalBody).element;
    noUiSlider.create(<never>slider, {
      start: [0, 27],
      connect: true,
      range: {
        min: 0,
        max: 27,
      },
    });

    settingModal[0].btn.forEach((btn) => {
      new Create('button', '123', modalFooter, `${btn.save}`).element;
      new Create('button', '123', modalFooter, `${btn.cancel}`).element;
      new Create('button', '123', modalFooter, `${btn.reset}`).element;
    });
    settingModal[0].sortBtn.forEach((btn) => {
      new Create('option', '123', select, 'Sort by', { disabled: true }).element;
      new Create('option', '123', select, `${btn.authors}`).element;
      new Create('option', '123', select, `${btn.genres}`).element;
      new Create('option', '123', select, `${btn.price}`).element;
    });
  }

  classList(className?: nullOn) {
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
