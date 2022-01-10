export default class UserInfo {
    constructor({ name: userNameSelector, info: userInfoSelector }){
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){ //возвращает объект с данными пользователя
        const userData = {
            name: this._userName.textContent,
            info: this._userInfo.textContent,
            id: this._id
        };
        return userData;
    }

    setUserInfo(name, info, id){ //добавляет новые данные на страницу
        this._userName.textContent = name;
        this._userInfo.textContent = info;
        this._userId = id;
    }

    getUserId(){ // возвращает id пользователя
        return this._userId;
    }
}