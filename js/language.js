import Keyboard from './keyboard.js';

class Language {
	static checkLanguage() {
		if (sessionStorage.getItem('lang') === null) {
			sessionStorage.setItem('lang', 0);
			return Number(sessionStorage.getItem('lang'));
		}
		return Number(sessionStorage.getItem('lang'));
	}

	static changeLanguage(event) {
		if (event.altKey && event.ctrlKey) {
			if (sessionStorage.getItem('lang') >= 2) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 2);
			} else {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 2);
			}
			Keyboard.rewriteKey();
		}
	}
}

export default Language;
