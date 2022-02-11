import BaseComponent from 'components/base-component';
import { NAV_BUTTONS_NAMES, PAGE_HASHES } from 'constants/constants';
import 'components/nav/nav.scss';

class Navigation extends BaseComponent {
  public toysButton: BaseComponent<HTMLAnchorElement>;
  public christmasTreeButton: BaseComponent<HTMLAnchorElement>;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createNavList();
  }

  private getButton(content: string, href: string): BaseComponent<HTMLAnchorElement> {
    const button = new BaseComponent<HTMLAnchorElement>(null, 'a', 'nav__link', content);
    button.node.href = href;
    return button;
  }

  private createNavButtons(): HTMLAnchorElement[] {
    this.toysButton = this.getButton(NAV_BUTTONS_NAMES.toys, PAGE_HASHES.toys);
    this.christmasTreeButton = this.getButton(NAV_BUTTONS_NAMES.christmasTree, PAGE_HASHES.christmasTree);
    return [this.toysButton.node, this.christmasTreeButton.node];
  }

  private createNavList(): void {
    const navButtons = this.createNavButtons();
    const navList = new BaseComponent(this.node, 'ul', 'nav__list');

    navButtons.forEach(button => {
      const navListItem = new BaseComponent(navList.node, 'li', 'nav__item');
      navListItem.node.append(button);
    });
  }
}

export default Navigation;
