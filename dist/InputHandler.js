export default class InputHandler {
    constructor() {
        this.keysDown = {};
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    onKeyDown(event) {
        this.keysDown[event.keyCode] = true;
    }
    onKeyUp(event) {
        delete this.keysDown[event.keyCode];
    }
    isDown(keyCode) {
        return keyCode in this.keysDown;
    }
}
//# sourceMappingURL=InputHandler.js.map