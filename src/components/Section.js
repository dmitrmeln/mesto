class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer(data) {
    this._renderer(data);
    this._items.push(data);
  }

  renderItems(cards) {
    cards.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
