import Keyboard from './keyboard.js';

class Language {
	static checkLanguage() {
		if (sessionStorage.getItem('lang') === null) {
			sessionStorage.setItem('lang', 0);
			return sessionStorage.getItem('lang');
		}
		return sessionStorage.getItem('lang');
	}

	static changeLanguage() {
		const codes = ['ControlLeft', 'AltLeft'];
		const pressed = new Set();

		document.addEventListener('keydown', (event) => {
			pressed.add(event.code);
			for (const code of codes) {
				if (!pressed.has(code)) {
					return;
				}
			}
			pressed.clear();
			if (sessionStorage.getItem('lang') >= 2) {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') - 2);
			} else {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') + 2);
			}
			Keyboard.rewriteKey();
		});

		document.addEventListener('keyup', (event) => {
			pressed.delete(event.code);
		});
	}
}

export default Language;
