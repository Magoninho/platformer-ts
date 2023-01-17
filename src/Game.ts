import InputHandler from "./InputHandler.js";
import Level from "./Level.js";
import Player from "./Player.js";
import { map1 } from "./Data/Map.js";
import AABB from "./AABB.js";

export default class Game {
	public ctx: CanvasRenderingContext2D = (document.getElementById('game-canvas') as HTMLCanvasElement).getContext('2d');
	
	public inputHandler: InputHandler = new InputHandler();
	public player: Player = new Player(this);
	public levels: Level[] = [
		new Level("assets/PixelAdventure/Terrain/terrain.png", map1)
	];

	public AABBList: AABB[] = [];

	public async init() {
		await this.player.init();
		await this.levels[0].init();
		this.ctx.scale(2, 2);
		for (const b of this.levels[0].getCollisionBlocks()) {
			if (b) {
				this.AABBList.push(b.getAABB());
			}
		}
		
		this.ctx.imageSmoothingEnabled = false; // this is the best line ever
		this.run();
	}

	// game loop
	public run(): void {

		this.update();
		this.render(this.ctx);

		// Request to do this again ASAP
		requestAnimationFrame(this.run.bind(this));
	}

	public update() {
		this.player.update();
	}

	public render(ctx: CanvasRenderingContext2D) {
		
		ctx.clearRect(0, 0, 800, 600);
		this.player.render(ctx);
		// ctx.restore();

		this.levels[0].render(ctx); 
	}
}