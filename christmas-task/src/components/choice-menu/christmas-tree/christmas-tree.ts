import BaseComponent from 'components/base-component';
import ChoiceMenu from 'components/choice-menu/choice-menu';
import { IChoiceMenuData } from 'types/interfaces';
import 'components/choice-menu/christmas-tree/christmas-tree.scss';

class ChristmasTreeChoiceMenu extends ChoiceMenu {
  public onChoiceChristmasTree: (choiceElem: BaseComponent<HTMLElement>) => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string, choiceMenuData: IChoiceMenuData) {
    super(parentNode, tagName, className, choiceMenuData);
  }

  protected handleClickChoiceElem(choiceElem: BaseComponent<HTMLElement>): void {
    choiceElem.node.addEventListener('click', () => {
      this.changeChoiceElem(choiceElem);
      this.onChoiceChristmasTree(choiceElem);
      localStorage.setItem('activeTree', this.currChoiceElem.node.id);
    });
  }
}

export default ChristmasTreeChoiceMenu;
