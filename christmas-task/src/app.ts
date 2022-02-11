import ToysPage from 'pages/toys/toys';
import HomePage from 'pages/home/home';
import ChristmasTreePage from 'pages/christmas-tree/christmas-tree';
import { PAGE_HASHES, PAGE_IDS } from 'constants/constants';

class App {
  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  router(): void {
    if (this.container.innerHTML) {
      this.container.innerHTML = '';
    }

    const routes = [
      { hash: PAGE_HASHES.home, id: PAGE_IDS.home, View: HomePage },
      { hash: PAGE_HASHES.toys, id: PAGE_IDS.toys, View: ToysPage },
      { hash: PAGE_HASHES.christmasTree, id: PAGE_IDS.christmasTree, View: ChristmasTreePage }
    ];

    const defaultRoute = routes[0];
    const currDefinedRoute = routes.find(route => window.location.hash.includes(route.hash));
    const currRoute = currDefinedRoute || defaultRoute;

    const currPage = new currRoute.View(this.container, currRoute.id);
  }
}

export default App;
