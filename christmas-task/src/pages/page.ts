import BaseComponent from 'components/base-component';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

abstract class Page {
  protected parentNode: HTMLElement;
  protected header: Header;
  protected footer: Footer;

  constructor(parentNode: HTMLElement, id: string) {
    this.parentNode = parentNode;
    this.parentNode.id = id;
    this.header = new Header(this.parentNode, 'header', 'header');
    this.createMain();
    this.footer = new Footer(this.parentNode, 'footer', 'footer');
  }

  protected createMain(): void {
    const main = new BaseComponent(this.parentNode, 'main', 'main');
    const mainContainer = new BaseComponent(main.node, 'div', 'container main__container');
  }
}

export default Page;
