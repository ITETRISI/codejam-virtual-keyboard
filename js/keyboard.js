import arrayOfKeys from './data.js';
import Language from './language.js';

export default class Keyboard {
	static pressCaps = false;

	static pressShift = false;

	drawKeyboard() {
		for (let i = 0; i < arrayOfKeys.length; i++) {
			for (let j = 0; j < arrayOfKeys[i].length; j++) {
				document.querySelector(`#keyboard_row-${i}`).innerHTML += `<button id='${arrayOfKeys[i][j].id}' >${arrayOfKeys[i][j].value[Language.checkLanguage()]}</button>`;
			}
		}
	}

	rewriteKey() {
		for (let i = 0; i < arrayOfKeys.length; i++) {
			for (let j = 0; j < arrayOfKeys[i].length; j++) {
				document.querySelector(`#${arrayOfKeys[i][j].id}`).innerText = `${arrayOfKeys[i][j].value[Language.checkLanguage()]}`;
			}
		}
	}

	pressKey(keyCode) {
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
			input.setRangeText('\n', input.selectionStart, input.selectionEnd, 'end');
			break;
		case 'Delete':
			input.setRangeText('', input.selectionStart, input.selectionStart + 1, 'end');
			break;
		case 'Backspace':
			if (input.selectionStart !== 0) input.setRangeText('', input.selectionStart - 1, input.selectionStart, 'end');
			break;
		default:
			for (let i = 0; i < arrayOfKeys.length; i++) {
				const result = arrayOfKeys[i].find((key) => key.id === keyCode);
				if (result) {
					input.setRangeText(result.value[Language.checkLanguage()], input.selectionStart, input.selectionEnd, 'end');
				}
			}
		}
	}

	isShift = (key) => key === 'ShiftRight' || key === 'ShiftLeft'

	downShift(keyCode) {
		if (this.isShift(keyCode)) {
			if (Keyboard.pressShift === false && Keyboard.pressCaps === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
			} else if (this.pressShift === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
			}
			Keyboard.pressShift = true;
			this.rewriteKey();
		}
	}

	upShift(keyCode) {
		if (this.isShift(keyCode)) {
			if (Keyboard.pressShift === true && Keyboard.pressCaps === false) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
			} else {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
			}
			Keyboard.pressShift = false;
			this.rewriteKey();
		}
	}

	pressCapsLock(keyCode) {
		if (keyCode === 'CapsLock') {
			if (Keyboard.pressCaps === true) {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) - 1);
				Keyboard.pressCaps = false;
				document.querySelector('#CapsLock').classList.remove('active');
			} else {
				sessionStorage.setItem('lang', Number(sessionStorage.getItem('lang')) + 1);
				Keyboard.pressCaps = true;
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
document.getElementById('text_area').onblur = () => {
	document.getElementById('text_area').focus();
};

const keyboard = new Keyboard();

keyboard.drawKeyboard();

window.addEventListener('load', () => {
	document.addEventListener('keydown', (event) => {
		event.preventDefault();
		Language.changeLanguage(event);
		keyboard.pressKey(event.code);
		document.querySelector(`#${event.code}`).classList.add('active');
	});

	document.addEventListener('keyup', (event) => {
		keyboard.upShift(event.code);
		document.querySelector(`#${event.code}`).classList.remove('active');
		keyboard.pressCapsLock(event.code);
	});

	document.getElementById('keyboard').addEventListener('mousedown', (event) => {
		keyboard.pressKey(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.add('active');
	});

	document.getElementById('keyboard').addEventListener('mouseup', (event) => {
		keyboard.upShift(event.target.id);
		document.querySelector(`#${event.target.id}`).classList.remove('active');
		keyboard.pressCapsLock(event.target.id);
	});
});
