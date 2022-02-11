import BaseComponent from 'components/base-component';
import { IChoiceMenuData } from 'types/interfaces';

abstract class ChoiceMenu extends BaseComponent {
  protected currChoiceElem: BaseComponent<HTMLElement>;
  protected choiceMenuData: IChoiceMenuData;

  constructor(parentNode: HTMLElement, tagName: string, className: string, choiceMenuData: IChoiceMenuData) {
    super(parentNode, tagName, className);
    this.choiceMenuData = choiceMenuData;
    this.createChoiceMenu();
  }

  protected changeChoiceElem(newChoiceElem: BaseComponent<HTMLElement>): void {
    if (this.currChoiceElem === newChoiceElem) return;

    if (!this.currChoiceElem) {
      this.currChoiceElem = newChoiceElem;
    }

    this.currChoiceElem.node.classList.remove('active');
    newChoiceElem.node.classList.add('active');
    this.currChoiceElem = newChoiceElem;
  }

  protected handleClickChoiceElem(choiceElem: BaseComponent<HTMLElement>): void {
    choiceElem.node.addEventListener('click', () => {
      this.changeChoiceElem(choiceElem);
    });
  }

  protected isActiveChoiceElem(choiceElem: HTMLElement): boolean {
    return choiceElem.id === localStorage.getItem('activeTree') ||
           choiceElem.id === localStorage.getItem('activeBackground') ||
           choiceElem.id === localStorage.getItem('activeGarlandColor');
  }

  protected createChoiceElements(parentNode: HTMLElement): void {
    for (let i = 0; i < this.choiceMenuData.numItems; i++) {
      const choiceElem = new BaseComponent(parentNode, 'div', this.choiceMenuData.classNameItems);
      choiceElem.node.id = this.choiceMenuData.idItems[i];

      if (this.isActiveChoiceElem(choiceElem.node)) {
        choiceElem.node.classList.add('active');
        this.currChoiceElem = choiceElem;
      }

      this.handleClickChoiceElem(choiceElem);
    }
  }

  protected createChoiceMenu(): void {
    const title = new BaseComponent(this.node, 'h2', 'block-title', this.choiceMenuData.title);
    const container = new BaseComponent(this.node, 'div', this.choiceMenuData.classNameContainer).node;
    this.createChoiceElements(container);
  }
}

export default ChoiceMenu;
