import BaseComponent from 'components/base-component';
import getToysData from 'services/services';
import { IToyData } from 'types/interfaces';
import { DEFAULT_NUMBER_TOYS, SRC_IMAGES_TOYS, TITLE_TOYS } from 'constants/constants';
import { preloadPicture } from 'utils/secondary-functions';
import { favorites } from 'pages/toys/toys';
import 'components/favorites-toys/favorites-toys.scss';

class FavoritesToys extends BaseComponent {
  public onDragStartToy: (event: DragEvent) => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createFavoritesToys();
  }

  private handleDragStartToyImage(toyImage: HTMLImageElement): void {
    toyImage.addEventListener('dragstart', event => {
      event.dataTransfer.setData('toyId', toyImage.id);
      this.onDragStartToy(event);
    });
  }

  private returnToy(toyItem: HTMLElement, toyImage: HTMLImageElement): void {
    toyImage.setAttribute('style', '');
    toyItem.append(toyImage);
  }

  private changeNumberCopiesToy(toyItem: HTMLElement, numberCopiesToy: HTMLElement): void {
    const countToys = toyItem.children.length - 1;
    numberCopiesToy.innerHTML = countToys.toString();
  }

  private handleDragEndToyImage(toyItem: HTMLElement, numberCopiesToy: HTMLElement, toyImage: HTMLImageElement): void {
    toyImage.addEventListener('dragend', event => {
      toyImage.hidden = true;
      const elemBelowMouse = document.elementFromPoint(event.clientX, event.clientY);
      toyImage.hidden = false;

      if (elemBelowMouse !== toyImage) {
        this.returnToy(toyItem, toyImage);
      }

      this.changeNumberCopiesToy(toyItem, numberCopiesToy);
    });
  }

  private createToyItem(parentNode: HTMLElement, toyData: IToyData, index: number): void {
    const toyItem = new BaseComponent(parentNode, 'div', 'toys__item').node;
    const numberCopiesToy = new BaseComponent(toyItem, 'span', 'toys__number', toyData.count).node;

    for (let i = 0; i < Number(toyData.count); i++) {
      const toyImage = new BaseComponent<HTMLImageElement>(toyItem, 'img', 'toys__image').node;
      toyImage.alt = toyData.name;
      toyImage.id = `toy-${index}-${i}`;
      toyImage.draggable = true;
      const link = `${SRC_IMAGES_TOYS}${toyData.num}.png`;
      preloadPicture(link, toyImage);
      this.handleDragStartToyImage(toyImage);
      this.handleDragEndToyImage(toyItem, numberCopiesToy, toyImage);
    }
  }

  private async getFavoriteToys(): Promise<IToyData[]> {
    if (favorites.toys && favorites.toys.length) {
      return favorites.toys;
    }

    const newToySet: IToyData[] = [];
    await getToysData().then(toysData => {
      for (let i = 0; i < DEFAULT_NUMBER_TOYS; i++) {
        newToySet.push(toysData[i]);
      }
    });
    return newToySet;
  }

  private async createFavoritesToys(): Promise<void> {
    const title = new BaseComponent(this.node, 'h2', 'block-title', TITLE_TOYS);
    const toysContainer = new BaseComponent(this.node, 'div', 'toys__container').node;

    const toySet = await this.getFavoriteToys();
    toySet.forEach((toy, index) => {
      this.createToyItem(toysContainer, toy, index);
    });
  }
}

export default FavoritesToys;
