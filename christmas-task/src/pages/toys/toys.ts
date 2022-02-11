import BaseComponent from 'components/base-component';
import Header from 'components/header/header';
import Settings from 'components/settings/settings';
import ToyCard from 'components/toy-card/toy-card';
import Page from 'pages/page';
import getToysData from 'services/services';
import { MAX_NUM_FAVORITE_TOYS, NO_MATCH_MESSAGE, PAGE_HASHES, SORTING_TYPES } from 'constants/constants';
import { IToyData } from 'types/interfaces';
import 'pages/toys/toys.scss';

export const favorites: {toys: IToyData[]} = {
  toys: null
}

class ToysPage extends Page {
  protected header: Header;
  private settings: Settings;
  private toysContainer: BaseComponent<HTMLElement>;
  private originalSetCards: ToyCard [] = [];
  private filteredSetCard: ToyCard[];
  private favoritesError: HTMLElement;
  private favoritesCounter: HTMLElement;
  favoritesToys: IToyData[] = [];

  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
  }

  private showFilteredCards(): void {
    this.toysContainer.node.innerHTML = '';
    if (this.filteredSetCard.length) {
      this.filteredSetCard.forEach(card => {
        this.toysContainer.node.append(card.node);
      });
      this.toysContainer.node.classList.remove('empty');
    } else {
      this.toysContainer.node.classList.add('empty');
      this.toysContainer.node.innerText = NO_MATCH_MESSAGE;
    }
  }

  private applySearch(): void {
    const searchValue = this.settings.search.node.value.toLowerCase();

    if (!this.filteredSetCard || !this.filteredSetCard.length) {
      this.filteredSetCard = this.originalSetCards.slice(0);
    }

    this.filteredSetCard = this.filteredSetCard.filter(card => card.toyData.name.toLowerCase().includes(searchValue));

    this.showFilteredCards();

    if (!searchValue) {
      this.applyFilters();
    }
  }

  private applySorting(): void {
    const select = this.settings.sorting.select.node;

    if (!this.filteredSetCard) {
      this.filteredSetCard = this.originalSetCards.slice(0);
    }

    this.filteredSetCard.sort((a, b) => {
      switch (select.value) {
        case SORTING_TYPES.byNameAsc:
          if (a.toyData.name < b.toyData.name) return -1;
          break;
        case SORTING_TYPES.byNameDesc:
          if (a.toyData.name > b.toyData.name) return -1;
          break;
        case SORTING_TYPES.byYearAsc:
          if (Number(a.toyData.year) < Number(b.toyData.year)) return -1;
          break;
        case SORTING_TYPES.byYearDesc:
          if (Number(a.toyData.year) > Number(b.toyData.year)) return -1;
          break;
      }
      return 0;
    });

    this.showFilteredCards();
  }

  private applyRangeFilters(): void {
    const minValueFilterByCopies = this.settings.filters.filterByCopies.minRangeValue.node.innerText;
    const maxValueFilterByCopies = this.settings.filters.filterByCopies.maxRangeValue.node.innerText;
    const minValueFilterByYears = this.settings.filters.filterByYears.minRangeValue.node.innerText;
    const maxValueFilterByYears = this.settings.filters.filterByYears.maxRangeValue.node.innerText;

    this.filteredSetCard = this.filteredSetCard.filter(
      card => Number(card.toyData.count) >= Number(minValueFilterByCopies) && Number(card.toyData.count) <= Number(maxValueFilterByCopies)
    );
    this.filteredSetCard = this.filteredSetCard.filter(
      card => Number(card.toyData.year) >= Number(minValueFilterByYears) && Number(card.toyData.year) <= Number(maxValueFilterByYears)
    );
  }

  private applyValueFilters(): void {
    const activeBtnShape = this.settings.filters.shapeFilter.activeFilterButtons;
    const activeBtnColor = this.settings.filters.colorFilter.activeFilterButtons;
    const activeBtnSize = this.settings.filters.sizeFilter.activeFilterButtons;
    const activeBtnFilters = [activeBtnShape, activeBtnColor, activeBtnSize];
    activeBtnFilters.forEach(setButtons => {
      if (setButtons && setButtons.length) {
        this.filteredSetCard = this.filteredSetCard
          .filter(card => setButtons
            .some(button => button.id === card.toyData.shape || button.id === card.toyData.color || button.id === card.toyData.size));
      }
    });
  }

  private applyFavoritesFilter(): void {
    const activeBtnFavorite = this.settings.filters.favoritesFilter.activeFilterButton;

    if (activeBtnFavorite) {
      this.filteredSetCard = this.filteredSetCard.filter(card => card.toyData.favorite === 'yes');
    }
  }

  private applyFilters(): void {
    this.filteredSetCard = this.originalSetCards.slice(0);

    this.applyRangeFilters();
    this.applyValueFilters();
    this.applyFavoritesFilter();
    this.applySorting();
  }

  private resetFilters(): void {
    this.toysContainer.node.classList.remove('empty');
    this.filteredSetCard = this.originalSetCards.slice(0);
    this.toysContainer.node.innerHTML = '';
    this.filteredSetCard.forEach(card => {
      this.toysContainer.node.append(card.node);
    });
    this.applySorting();
  }

  private resetSettings(): void {
    this.resetFilters();

    this.filteredSetCard.forEach(card => {
      card.node.classList.remove('favorite');
    });

    this.header.favoritesCounter.counter.innerText = '0';
    this.header.favoritesCounter.errorMessage.classList.remove('active');
  }

  private startRangeFiltersCycle(): void {
    const rangeFilters = [
      this.settings.filters.filterByCopies.filter.noUiSlider,
      this.settings.filters.filterByYears.filter.noUiSlider
    ];
    rangeFilters.forEach(rangeFilter => {
      rangeFilter.on('update', () => {
        if (this.originalSetCards) {
          this.applyFilters();
        }
      });
    });
  }

  private startValueFiltersCycle(): void {
    this.settings.filters.shapeFilter.onFilter = () => this.applyFilters();
    this.settings.filters.colorFilter.onFilter = () => this.applyFilters();
    this.settings.filters.sizeFilter.onFilter = () => this.applyFilters();
    this.settings.filters.favoritesFilter.onFilter = () => this.applyFilters();
  }

  private startToyPageCycle(): void {
    this.settings.search.onSearch = () => this.applySearch();
    this.settings.sorting.onSorting = () => this.applySorting();

    this.startRangeFiltersCycle();
    this.startValueFiltersCycle();

    this.settings.onResetFilters = () => this.resetFilters();
    this.settings.onResetSettings = () => this.resetSettings();
  }

  private addToyCardToFavorites(card: ToyCard): void {
    this.favoritesError = this.header.favoritesCounter.errorMessage;
    this.favoritesCounter = this.header.favoritesCounter.counter;
    let counterValue = Number(this.favoritesCounter.innerText);

    if (card.node.classList.contains('favorite')) {
      if (counterValue === MAX_NUM_FAVORITE_TOYS) {
        card.node.classList.remove('favorite');
        this.favoritesError.classList.add('active');
      } else {
        this.favoritesToys.push(card.toyData);
        counterValue += 1;
      }
    } else {
      const toyCanceledIndex = this.favoritesToys.findIndex(toy => (toy.num === card.toyData.num ? toy : -1));
      this.favoritesToys.splice(toyCanceledIndex, 1);
      this.favoritesError.classList.remove('active');
      counterValue -= 1;
    }

    this.favoritesCounter.innerText = counterValue.toString();
    favorites.toys = this.favoritesToys;
  }

  private async createSetToyCards(parentNode: HTMLElement): Promise<void> {
    const toysData = await getToysData();
    toysData.forEach(toyData => {
      const card = new ToyCard(parentNode, 'div', 'toy-card', toyData);
      card.onToyCard = () => {
        this.addToyCardToFavorites(card);
      };

      this.originalSetCards.push(card);
    });
  }

  protected createMain(): void {
    const main = new BaseComponent(this.parentNode, 'main', 'main');
    const mainContainer = new BaseComponent(main.node, 'div', 'container main__container');
    this.settings = new Settings(mainContainer.node, 'div', 'settings');
    this.toysContainer = new BaseComponent(mainContainer.node, 'div', 'toys-container');
    this.createSetToyCards(this.toysContainer.node);
    this.startToyPageCycle();
  }
}

export default ToysPage;
