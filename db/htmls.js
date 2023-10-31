const htmls = {
    loginWindow: () => {
        return `<div class="login-window-wrapper" data-login="window-wrapper">
        <div class="login-window">

            <div class="header">
                <div class="logo"></div>
                <span class="header__title">
                    Po<span class="title__selection">Chat</span>Ok
                </span>
            </div>

            <div class="login-hello">
                <span>Привет! Представься, и погнали общаться!</span>
            </div>

            <form class="login__form" name="login-form" novalidate>
                <input class="login__email-input login__form-item" name="email" type="email" placeholder="Почта" required>
                <input class="login__pass-input login__form-item" name="password" type="password" placeholder="Пароль" required>

                <div class="login__btns">
                    <button class="login__enter-btn login__btns-item" type="submit" id="login-window-enter-btn">Вход</button>
                    <button class="login__new-user-btn login__btns-item" type="button" id="login-window-reg-btn">Регистрация</button>
                </div>
            </form> 
        </div>
    </div>`
    },

    regWindow: () => {
        return `<div class="modal__registration-wrapper" data-registartion="window-wrapper">
        <div class="registration-window">
            <div class="registration-window__avatar-box" data-registartion="avatar-image"></div>
            <div class="reg-form__select-avatar">
                <span class="select-avatar">Выбрать</span>
                <input class="select-avatar__input" name="avatar" type="file" data-registartion="input-avatar">
            </div>

            <div class="registration__form-box">
                <form class="registration__form" name="reg-form" novalidate>
                    <label class="user-name__box registration-form__item-box">
                        <input class="registration-form__item" name="nickname" type="text" placeholder="Ник (макс. 10 символов)" maxlength="10" required>
                    </label>
                    <label class="user-age__box registration-form__item-box">
                        <input class="registration-form__item" name="age" type="text" placeholder="Возраст" required>
                    </label>
                    <select class="user-gender__box" name="gender">
                        <option class="user-gender__item" value="male" selected name="male">Мужской</option>
                        <option class="user-gender__item" value="female" name="female">Женский</option>
                    </select>
                    <label class="user-city__box registration-form__item-box">
                        <input class="registration-form__item" name="city" type="text" placeholder="Город" required>
                    </label>
                    <label class="user-email__box registration-form__item-box">
                        <input class="registration-form__item" name="email" type="email" placeholder="Почта" required>
                    </label>
                    <label class="user-pass__box registration-form__item-box">
                        <input class="registration-form__item" name="password" type="text" minlength="6" placeholder="Пароль" required>
                    </label>
                    
                    <div class="registration___btns">
                        <button class="registration__ok registration__btns-item" type="submit" id="reg-window-ok">ОК</button>
                        <button class="registration__edit registration__btns-item" type="button" id="reg-window-cancel">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`
    }
}

module.exports = htmls;