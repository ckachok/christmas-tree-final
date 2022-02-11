import BaseComponent from 'components/base-component';
import ChoiceMenu from 'components/choice-menu/choice-menu';
import { IChoiceMenuData } from 'types/interfaces';
import 'components/choice-menu/garland/garland.scss';

class GarlandChoiceMenu extends ChoiceMenu {
  public onChoiceGarland: (garland: HTMLElement) => void;
  public onSwitchGarland: (checkbox: BaseComponent<HTMLInputElement>) => void;
  private inputCheckbox: BaseComponent<HTMLInputElement>;

  constructor(parentNode: HTMLElement, tagName: string, className: string, choiceMenuData: IChoiceMenuData) {
    super(parentNode, tagName, className, choiceMenuData);
  }

  protected handleClickChoiceElem(choiceElem: BaseComponent<HTMLElement>): void {
    choiceElem.node.addEventListener('click', () => {
      this.changeChoiceElem(choiceElem);
      this.onChoiceGarland(choiceElem.node);
      this.inputCheckbox.node.checked = true;
      localStorage.setItem('activeGarlandColor', choiceElem.node.id);
      localStorage.setItem('activeGarland', this.inputCheckbox.node.checked.toString());
    });
  }

  private handleCheckboxChange(checkbox: BaseComponent<HTMLInputElement>): void {
    checkbox.node.addEventListener('change', () => {
      this.onSwitchGarland(checkbox);

      if (checkbox.node.checked) {
        localStorage.setItem('activeGarlandColor', this.choiceMenuData.idItems[0]);
        localStorage.setItem('activeGarland', checkbox.node.checked.toString());
      } else {
        localStorage.setItem('activeGarland', '');
      }
    });
  }

  private createSwitchGarland(parentNode: HTMLElement): void {
    this.inputCheckbox = new BaseComponent<HTMLInputElement>(parentNode, 'input', 'garlands__switcher-on-off');
    this.inputCheckbox.node.type = 'checkbox';

    if (localStorage.getItem('activeGarland')) {
      this.inputCheckbox.node.checked = true;
    }

    this.handleCheckboxChange(this.inputCheckbox);
  }

  protected createChoiceMenu(): void {
    const title = new BaseComponent(this.node, 'h2', 'block-title', this.choiceMenuData.title);
    const container = new BaseComponent(this.node, 'div', this.choiceMenuData.classNameContainer).node;
    this.createChoiceElements(container);
    this.createSwitchGarland(container);
  }
}

export default GarlandChoiceMenu;
