import BaseComponent from 'components/base-component';
import Logo from 'components/logo-app/logo-app';
import Navigation from 'components/nav/nav';
import FavoritesCounter from 'components/favorites-counter/favorites-counter';
import { PAGE_HASHES } from 'constants/constants';
import 'components/header/header.scss';

class Header extends BaseComponent {
  private logo: Logo;
  private nav: Navigation;
  public favoritesCounter: FavoritesCounter;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createHeader();
  }

  public changeStyles(activeButton: HTMLAnchorElement): void {
    const navButtons = [this.logo.node, this.nav.toysButton.node, this.nav.christmasTreeButton.node];
    navButtons.forEach(button => {
      button.classList.remove('active');
    });

    activeButton.classList.add('active');

    if (activeButton === this.logo.node) {
      this.favoritesCounter.node.classList.remove('visible');
    } else {
      this.favoritesCounter.node.classList.add('visible');
    }
  }

  private startNavigationCycle(): void {
    const currPageHash = document.location.hash;

    if (currPageHash === PAGE_HASHES.home) {
      this.changeStyles(this.logo.node);
    } else if (currPageHash === PAGE_HASHES.toys) {
      this.changeStyles(this.nav.toysButton.node);
    } else if (currPageHash === PAGE_HASHES.christmasTree) {
      this.changeStyles(this.nav.christmasTreeButton.node);
    }
  }

  private createHeader(): void {
    const headerContainer = new BaseComponent(this.node, 'div', 'container header__container').node;
    this.logo = new Logo(headerContainer, 'a', 'logo active');
    this.nav = new Navigation(headerContainer, 'nav', 'nav');
    this.favoritesCounter = new FavoritesCounter(headerContainer, 'div', 'favorites');
    this.startNavigationCycle();
  }
}

export default Header;
