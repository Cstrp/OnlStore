import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://api.jikan.moe/v4/manga?q=&limit=50', {});
  }
}

export default AppLoader;

// https://api.jikan.moe/v4/manga?q=&limit=50
