export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}
