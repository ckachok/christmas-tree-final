import BaseComponent from 'components/base-component';
import Page from 'pages/page';
import { HOME_PAGE, PAGE_HASHES } from 'constants/constants';
import 'pages/home/home.scss';

class HomePage extends Page {
  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
  }

  private createMainTitle(parentNode: HTMLElement): void {
    const mainTitle = new BaseComponent(parentNode, 'h1', 'main-title frozen-text', HOME_PAGE.mainTitle);
    mainTitle.node.dataset.heading = HOME_PAGE.mainTitle;
  }

  private createStartGameButton(parentNode: HTMLElement): void {
    const startGameButton = new BaseComponent(parentNode, 'button', 'start-game-button', HOME_PAGE.nameButton);
    startGameButton.node.addEventListener('click', () => {
      document.location.hash = PAGE_HASHES.toys;
    });
  }

  private createFallingSnow(parentNode: HTMLElement): void {
    const fallingSnow = new BaseComponent(parentNode, 'div', 'falling-snow');
  }

  protected createMain(): void {
    const main = new BaseComponent(this.parentNode, 'main', 'main');
    const mainContainer = new BaseComponent(main.node, 'div', 'container home-container').node;
    this.createMainTitle(mainContainer);
    this.createStartGameButton(mainContainer);
    this.createFallingSnow(mainContainer);
  }
}

export default HomePage;
