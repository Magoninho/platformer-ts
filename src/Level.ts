import CollisionBlock from "./CollisionBlock.js";
import ImageUtils from "./ImageUtils.js";
import TileSet from "./TileSet.js";

export default class Level {
	private name: string = "Pink World";
	private tileset: TileSet;
	private imagePath: string;
	private map: number[];
	private collisionBlocks: CollisionBlock[] = new Array(1000).fill(0);

	constructor(imagePath: string, map: number[]) {
		this.imagePath = imagePath;
		this.map = map;
		// setup collision blocks
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				if (this.getTileID(j, i) != 0)
					this.collisionBlocks[j + (i * 100)] = new CollisionBlock(j * 16, i * 16, 16);
			}
		}
		
	}

	public async init() {
		this.tileset = new TileSet((await ImageUtils.loadImageFromUrl(this.imagePath)), 16, 1); // TODO: test scale later
	}

	public getTileID(x: number, y: number) {
		return this.map[x + (y * 100)];
	}

	public render(ctx: CanvasRenderingContext2D) {
		
		for (let j = 0; j < 5; j++) {
			for (let i = 0; i < 50; i++) {
				ctx.drawImage(document.getElementById("bgblue") as HTMLImageElement, i * 64, j * 64, 64, 64);
			}
		}
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				let tileID = this.getTileID(j, i);
				this.tileset.renderTileById(ctx, tileID, (j * 16), i * 16);
				// if (this.getTileID(j, i) != 0)
				// 	this.collisionBlocks[j + (i * 100)].renderCollision(ctx);
				
			}
		}
	}

	public getTileAt(x, y) {
		let col = Math.floor(x / 32);
		let row = Math.floor(y / 32);
		return this.map[col + (row * 100)];
	}

	public isSolidAt(x: number, y: number) {
		let col = Math.floor(x / 32);
		let row = Math.floor(y / 32);
		// if it is different from 0, then it is solid
		if (this.map[col + (row * 100)] === undefined) return true;
		
		return (this.map[col + (row * 100)] != 0);
	}

	public getCollisionBlocks(): CollisionBlock[] {
		return this.collisionBlocks;
	}
}