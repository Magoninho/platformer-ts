import Game from "./Game.js";

(async () => {
	let game = new Game();
	await game.init();
})();