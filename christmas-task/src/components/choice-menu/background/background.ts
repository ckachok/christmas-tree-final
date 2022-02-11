import BaseComponent from 'components/base-component';
import ChoiceMenu from 'components/choice-menu/choice-menu';
import { IChoiceMenuData } from 'types/interfaces';
import 'components/choice-menu/background/background.scss';

class BackgroundChoiceMenu extends ChoiceMenu {
  public onChoiceBackground: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string, choiceMenuData: IChoiceMenuData) {
    super(parentNode, tagName, className, choiceMenuData);
  }

  protected handleClickChoiceElem(choiceElem: BaseComponent<HTMLElement>): void {
    choiceElem.node.addEventListener('click', () => {
      this.changeChoiceElem(choiceElem);
      localStorage.setItem('activeBackgroundUrl', window.getComputedStyle(choiceElem.node).backgroundImage);
      localStorage.setItem('activeBackground', choiceElem.node.id);
      this.onChoiceBackground();
    });
  }
}

export default BackgroundChoiceMenu;
