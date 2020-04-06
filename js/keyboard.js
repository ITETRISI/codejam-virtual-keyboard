import arr from './data.js';
import Language from './language.js';

export default class Keyboard {
	static pressCaps = false;

	static pressShift = false;

	static drawKeyboard() {
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				document.querySelector(`#keyboard_row-${i}`).innerHTML += `<button id='${arr[i][j].id}' >${arr[i][j].value[Language.checkLanguage()]}</button>`;
			}
		}
	}

	static rewriteKey() {
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				document.querySelector(`#${arr[i][j].id}`).innerText = `${arr[i][j].value[Language.checkLanguage()]}`;
			}
		}
	}

	static pressKey(keyCode) {
		const input = document.getElementById('text_area');
		switch (keyCode) {
		case 'ControlLeft':
			break;
		case 'ControlRight':
			break;
		case 'ShiftLeft':
			this.downShift(keyCode);
			break;
		case 'ShiftRight':
			this.downShift(keyCode);
			break;
		case 'CapsLock':
			break;
		case 'AltLeft':
			break;
		case 'AltRight':
			break;
		case 'MetaLeft':
			break;
		case 'Space':
			input.setRangeText(' ', input.selectionStart, input.selectionEnd, 'end');
			break;
		case 'Tab':
			input.setRangeText('    ', input.selectionStart, input.selectionEnd, 'end');
			break;
		case 'Enter':
			document.getElementById('text_area').value += '\n';
			break;
		case 'Delete':
			input.setRangeText('', input.selectionStart, input.selectionStart + 1, 'end');
			break;
		case 'Backspace':
			if (input.selectionStart !== 0) input.setRangeText('', input.selectionStart - 1, input.selectionStart, 'end');
			break;
		default:
			for (let i = 0; i < arr.length; i++) {
				const result = arr[i].find((key) => key.id === keyCode);
				if (result !== undefined) {
					input.setRangeText(result.value[Language.checkLanguage()], input.selectionStart, input.selectionEnd, 'end');
				}
			}
		}
	}

	static downShift(keyCode) {
		if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
			if (this.pressShift === false && this.pressCaps === false) {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') + 1);
			} else if (this.pressShift === false) {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') - 1);
			}
			this.pressShift = true;
			this.rewriteKey();
		}
	}

	static upShift(keyCode) {
		if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
			if (this.pressShift === true && this.pressCaps === false) {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') - 1);
			} else {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') + 1);
			}
			this.pressShift = false;
			this.rewriteKey();
		}
	}

	static pressCapsLock(keyCode) {
		if (keyCode === 'CapsLock') {
			if (this.pressCaps === true) {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') - 1);
				this.pressCaps = false;
				document.querySelector('#CapsLock').classList.remove('active');
			} else {
				sessionStorage.setItem('lang', +sessionStorage.getItem('lang') + 1);
				this.pressCaps = true;
				document.querySelector('#CapsLock').classList.add('active');
			}
			this.rewriteKey();
		}
	}
}

document.querySelector('body').innerHTML
	+= `<textarea class="text_area" id="text_area" maxlength="500" cols="60" rows="10"></textarea>
    <div class="keyboard" id="keyboard">
        <div id="keyboard_row-0"></div>
        <div id="keyboard_row-1"></div>
        <div id="keyboard_row-2"></div>
        <div id="keyboard_row-3"></div>
        <div id="keyboard_row-4"></div>
	</div>
	<span>Change language Ctrl+Alt</span>`;

document.getElementById('text_area').focus();

Keyboard.drawKeyboard();
Language.changeLanguage();

window.addEventListener('load', () => {
	document.addEventListener('keydown', (event) => {
		event.preventDefault();
		Keyboard.pressKey(event.code);
		document.querySelector(`#${event.code}`).classList.add('active');
	});


	document.addEventListener('keyup', (event) => {
		Keyboard.upShift(event.code);
		document.querySelector(`#${event.code}`).classList.remove('active');
		Keyboard.pressCapsLock(event.code);
	});

	document.getElementById('keyboard').addEventListener('mousedown', (event) => {
		Keyboard.pressKey(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.add('active');
	});

	document.getElementById('keyboard').addEventListener('mouseup', (event) => {
		Keyboard.upShift(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.remove('active');
		Keyboard.pressCapsLock(event.target.id);
	});
});
