import Template from '../template/template';
import style from './index.module.scss';

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Template {
  private readonly errorType: ErrorTypes | string;

  static content: { [key: string]: string } = {
    '404': 'Error! Page not found...',
  };

  constructor(id: string, errorType: ErrorTypes | string, className: string) {
    super(id);
    this.errorType = errorType;
    this.element.classList.add(className);
  }

  noise() {}

  render() {
    document.body.classList.add(style.body);
    const title = this.header(ErrorPage.content[this.errorType]);
    title.classList.add(style.error);
    this.element.append(title);
    return this.element;
  }
}

export default ErrorPage;
