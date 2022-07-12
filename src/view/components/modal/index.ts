import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Create from '../../../data/utils/create';
import { settingModal } from '../../../data/utils/settings';
import style from './index.module.scss';

class Modal {
  private element = document.createElement('div');
  constructor() {}
  modalContent() {
    const wrapper = new Create('div', style.wrapper, this.element);
    const modalWrapper = new Create('div', style.modalWrapper, wrapper).element;
    const modalHeader = new Create('div', style.modalWrapperHeader, modalWrapper).element;
    new Create('h2', style.modalWrapperHeaderTitle, modalHeader, 'Modal Title').element;

    const modalBody = new Create('div', style.modalWrapperBody, modalWrapper).element;
    const slider = new Create('div', '123', modalBody).element;
    noUiSlider.create(<never>slider, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });
    new Create('p', '123', modalBody, 'Modal Text').element;
    const modalFooter = new Create('div', '123', modalWrapper).element;
    const select = new Create('select', '123', modalFooter).element;
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
    new Create('button', '123', modalFooter, 'Close').element;
    const setting = document.getElementById('#settings');
    console.log(setting);
  }
  render() {
    this.modalContent();
    return this.element;
  }
}

export default Modal;
