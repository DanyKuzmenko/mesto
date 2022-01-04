export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', () => this._handleEscClose(event));
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => this._handleEscClose(event));
    }

    _handleEscClose(evt){
        this._openPopup = document.querySelector('popup_opened');
        if (evt.key === 'Escape'){
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')){
                this.close();
            }
        })
    }
}