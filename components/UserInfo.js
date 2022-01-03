export default class UserInfo {
    constructor({ name: userNameSelector, info: userInfoSelector }){
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){ //возвращает объект с данными пользователя
        const userData = {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        };
        return userData;
    }

    setUserInfo(name, info){ //добавляет новые данные на страницу
        this._userName.textContent = name;
        this._userInfo.textContent = info;
    }
}