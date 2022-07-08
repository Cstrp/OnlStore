import Home from '../home/index';

class App {
  protected element: HTMLElement;
  private home: Home;
  constructor() {
    this.element = document.body;
    this.home = new Home('main', 'main');
  }
  render() {
    const home = this.home.render();
    this.element.append(home);
  }
}

export default App;
