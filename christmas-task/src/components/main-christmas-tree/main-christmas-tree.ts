import BaseComponent from 'components/base-component';
import {
  audio, startAudioAfterReload, startMusic, stopMusic
} from 'utils/secondary-functions';
import { CHRISTMAS_TREE_DATA, GARLAND_DATA, MAP_IMAGE_DATA } from 'constants/constants';
import 'components/main-christmas-tree/main-christmas-tree.scss';

class MainChristmasTree extends BaseComponent {
  public christmasTree: BaseComponent<HTMLImageElement>;
  public garland: BaseComponent<HTMLElement>;
  private musicSwitch: BaseComponent<HTMLElement>;
  public area: BaseComponent<HTMLAreaElement>;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createMainChristmasTree();
  }

  private handleClickMusicSwitch(): void {
    this.musicSwitch.node.addEventListener('click', () => {
      if (audio.paused) {
        this.musicSwitch.node.classList.add('active');
        startMusic();
      } else {
        this.musicSwitch.node.classList.remove('active');
        stopMusic();
      }

      localStorage.setItem('musicSwitch', this.musicSwitch.node.className);
    });
  }

  private createMusicSwitch(): void {
    this.musicSwitch = new BaseComponent(this.node, 'div', localStorage.getItem('musicSwitch') || 'music-switch-on-off');

    if (this.musicSwitch.node.classList.contains('active')) {
      document.addEventListener('click', startAudioAfterReload);
    }

    this.handleClickMusicSwitch();
  }

  private handleClickFallingSnow(snow: BaseComponent<HTMLElement>, snowSwitch: BaseComponent<HTMLElement>): void {
    snowSwitch.node.addEventListener('click', () => {
      snowSwitch.node.classList.toggle('active');
      snow.node.classList.toggle('active');
      localStorage.setItem('snowSwitch', snowSwitch.node.className);
      localStorage.setItem('snow', snow.node.className);
    });
  }

  private createFallingSnow(): void {
    const snow = new BaseComponent(this.node, 'div', localStorage.getItem('snow') || 'falling-snow');
    const snowSwitch = new BaseComponent(this.node, 'div', localStorage.getItem('snowSwitch') || 'snow-switch-on-off');
    this.handleClickFallingSnow(snow, snowSwitch);
  }

  private createChristmasTree(): void {
    this.christmasTree = new BaseComponent<HTMLImageElement>(this.node, 'img', 'main-christmas-tree__image');

    let imageNumber = CHRISTMAS_TREE_DATA.num;

    if (localStorage.getItem('activeTree')) {
      imageNumber = localStorage.getItem('activeTree').slice(5);
    }

    this.christmasTree.node.src = `${CHRISTMAS_TREE_DATA.src}${imageNumber}.png`;
    this.christmasTree.node.alt = CHRISTMAS_TREE_DATA.alt;
    this.christmasTree.node.useMap = CHRISTMAS_TREE_DATA.useMap;
  }

  private createMapImage(): void {
    const mapImage = new BaseComponent<HTMLMapElement>(this.node, 'map');
    mapImage.node.name = MAP_IMAGE_DATA.name;

    this.area = new BaseComponent<HTMLAreaElement>(mapImage.node, 'area');
    this.area.node.coords = MAP_IMAGE_DATA.areaCoords;
    this.area.node.shape = MAP_IMAGE_DATA.areaShape;
    this.area.node.id = MAP_IMAGE_DATA.areaId;
  }

  public createGarland(colorGarland: string): void {
    this.garland = new BaseComponent(this.node, 'div', 'garland');
    const { rotate } = GARLAND_DATA;
    let { margin, translate, rotateStep } = GARLAND_DATA;

    for (let i = 0; i < GARLAND_DATA.numLedsInSet.length; i++) {
      const ledSet = new BaseComponent(this.garland.node, 'ul', 'garland__led-set');
      ledSet.node.style.margin = `${margin}px 0 0 0`;

      const middle = Math.ceil(GARLAND_DATA.numLedsInSet[i] / 2);

      for (let j = 1; j <= GARLAND_DATA.numLedsInSet[i]; j++) {
        const led = new BaseComponent(ledSet.node, 'li', `garland__led ${colorGarland}`);
        led.node.style.transform = `rotate(${rotate + (middle - j) * rotateStep}deg) translate(${translate}px)`;
      }

      translate += GARLAND_DATA.translateIncrease;
      rotateStep -= GARLAND_DATA.rotateStepIncrease;
      margin += GARLAND_DATA.marginIncrease;
    }
  }

  private createMainChristmasTree(): void {
    this.createMusicSwitch();
    this.createFallingSnow();
    this.createChristmasTree();
    this.createMapImage();
  }
}

export default MainChristmasTree;
