import BaseComponent from 'components/base-component';
import { PAGE_HASHES } from 'constants/constants';
import 'components/logo-app/logo-app.scss';

class Logo extends BaseComponent<HTMLAnchorElement> {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.node.href = PAGE_HASHES.home;
  }
}

export default Logo;
