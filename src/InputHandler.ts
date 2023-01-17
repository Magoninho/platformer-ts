export default class InputHandler {

	private keysDown: {[keyCode: number | string]: boolean} = {};

	constructor() {
		window.addEventListener("keydown", this.onKeyDown.bind(this));

		window.addEventListener("keyup", this.onKeyUp.bind(this));
	}

	public onKeyDown(event) {
		this.keysDown[event.keyCode] = true;
	}

	public onKeyUp(event) {
		delete this.keysDown[event.keyCode];
	}

	public isDown(keyCode: number): boolean {
		return keyCode in this.keysDown;
	}
}