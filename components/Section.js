class Section {
    constructor({ items, renderer }, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    addItem(element){
        this._containerSelector.append(element);
    }
}