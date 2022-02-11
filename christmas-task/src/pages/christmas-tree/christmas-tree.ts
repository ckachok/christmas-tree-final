import BaseComponent from 'components/base-component';
import Page from 'pages/page';
import ChristmasTreeChoiceMenu from 'components/choice-menu/christmas-tree/christmas-tree';
import BackgroundChoiceMenu from 'components/choice-menu/background/background';
import GarlandChoiceMenu from 'components/choice-menu/garland/garland';
import MainChristmasTree from 'components/main-christmas-tree/main-christmas-tree';
import FavoritesToys from 'components/favorites-toys/favorites-toys';
import { favorites } from 'pages/toys/toys';
import { startAudioAfterReload, stopMusic } from 'utils/secondary-functions';
import {
  BACKGROUND_CHOICE_DATA, CHRISTMAS_TREE_CHOICE_DATA, GARLAND_CHOICE_DATA, RESET_BUTTON_TEXT
} from 'constants/constants';
import { IMainChristmasTree } from 'types/interfaces';
import 'pages/christmas-tree/christmas-tree.scss';

class ChristmasTreePage extends Page {
  private main: BaseComponent<HTMLElement>;
  private mainContainer: HTMLElement;
  private mainChristmasTree: MainChristmasTree;
  private toyShiftX: number;
  private toyShiftY: number;

  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
    this.header.favoritesCounter.counter.innerHTML = favorites.toys ? favorites.toys.length.toString() : '0';
  }

  private createChristmasTreeChoiceMenu(): void {
    const christmasTreeChoiceMenu = new ChristmasTreeChoiceMenu(this.mainContainer, 'div', 'christmas-trees', CHRISTMAS_TREE_CHOICE_DATA);

    christmasTreeChoiceMenu.onChoiceChristmasTree = choiceElem => {
      const url = window.getComputedStyle(choiceElem.node).backgroundImage.slice(5, -2);
      this.mainChristmasTree.christmasTree.node.setAttribute('src', url);
    };
  }

  private createBackgroundChoiceMenu(): void {
    const backgroundChoiceMenu = new BackgroundChoiceMenu(this.mainContainer, 'div', 'bgs', BACKGROUND_CHOICE_DATA);

    backgroundChoiceMenu.onChoiceBackground = () => {
      this.mainChristmasTree.node.style.backgroundImage = localStorage.getItem('activeBackgroundUrl');
    };
  }

  private createGarlandChoiceMenu(): void {
    const garlandChoiceMenu = new GarlandChoiceMenu(this.mainContainer, 'div', 'garlands', GARLAND_CHOICE_DATA);

    garlandChoiceMenu.onChoiceGarland = garland => {
      if (this.mainChristmasTree.garland) {
        this.mainChristmasTree.garland.destroy();
      }

      const colorGarland = garland.id;
      this.mainChristmasTree.createGarland(colorGarland);
    };

    garlandChoiceMenu.onSwitchGarland = checkbox => {
      if (!checkbox.node.checked) {
        this.mainChristmasTree.garland.destroy();
      } else {
        this.mainChristmasTree.createGarland(localStorage.getItem('activeGarlandColor') || 'multicolor');
      }
    };
  }

  private createResetButton(): void {
    const resetButton = new BaseComponent(this.mainContainer, 'button', 'reset-setting', RESET_BUTTON_TEXT);

    resetButton.node.addEventListener('click', () => {
      localStorage.clear();
      this.main.destroy();
      this.createMain();
      stopMusic();
      document.removeEventListener('click', startAudioAfterReload);
    });
  }

  private createMainChristmasTree(): void {
    this.mainChristmasTree = new MainChristmasTree(this.mainContainer, 'div', 'main-christmas-tree');
    this.mainChristmasTree.node.style.backgroundImage = localStorage.getItem('activeBackgroundUrl');

    if (localStorage.getItem('activeGarland')) {
      this.mainChristmasTree.createGarland(localStorage.getItem('activeGarlandColor'));
    }
  }

  private createToySet(): void {
    const toySet = new FavoritesToys(this.mainContainer, 'div', 'toys');

    toySet.onDragStartToy = event => {
      this.toyShiftX = event.offsetX;
      this.toyShiftY = event.offsetY;
    };
  }

  private allowDropToy(event: DragEvent): void {
    event.preventDefault();
  }

  private getCoordsMainChristmasTree(): {coordX: number, coordY: number} {
    return {
      coordX: this.mainChristmasTree.node.getBoundingClientRect().x,
      coordY: this.mainChristmasTree.node.getBoundingClientRect().y
    };
  }

  private getCoordsMouse(event: DragEvent): {coordX: number, coordY: number} {
    return {
      coordX: event.clientX,
      coordY: event.clientY
    };
  }

  private dropToy(event: DragEvent): void {
    const target = event.target as HTMLAreaElement;

    if (target.classList.contains('toys__image')) return;

    const mainChristmasTree = this.getCoordsMainChristmasTree() as IMainChristmasTree;
    mainChristmasTree.width = this.mainChristmasTree.node.getBoundingClientRect().width;

    const mouse = this.getCoordsMouse(event);

    const toyId = event.dataTransfer.getData('toyId');
    const toy = document.getElementById(toyId);
    toy.style.left = `${((mouse.coordX - mainChristmasTree.coordX - this.toyShiftX) / mainChristmasTree.width) * 100}%`;
    toy.style.top = `${mouse.coordY - mainChristmasTree.coordY - this.toyShiftY}px`;
    target.append(toy);
  }

  private startToyDragCycle(): void {
    const dropArea = this.mainChristmasTree.area.node;

    dropArea.addEventListener('dragover', event => this.allowDropToy(event));
    dropArea.addEventListener('drop', event => this.dropToy(event));
  }

  protected createMain(): void {
    this.main = new BaseComponent(null, 'main', 'main');
    this.mainContainer = new BaseComponent(this.main.node, 'div', 'container christmas-tree-container').node;
    this.header.node.after(this.main.node);
    this.createChristmasTreeChoiceMenu();
    this.createBackgroundChoiceMenu();
    this.createGarlandChoiceMenu();
    this.createResetButton();
    this.createMainChristmasTree();
    this.createToySet();
    this.startToyDragCycle();
  }
}

export default ChristmasTreePage;
