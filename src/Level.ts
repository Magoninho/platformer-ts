import CollisionBlock from "./CollisionBlock.js";
import ImageUtils from "./ImageUtils.js";
import TileSet from "./TileSet.js";

export default class Level {
	private name: string = "Pink World";
	private tileset: TileSet;
	private imagePath: string;
	private map: number[];
	private collisionBlocks: CollisionBlock[] = new Array(1000);

	constructor(imagePath: string, map: number[]) {
		this.imagePath = imagePath;
		this.map = map;
		
	}

	public async init() {
		this.tileset = new TileSet((await ImageUtils.loadImageFromUrl(this.imagePath)), 16, 1); // TODO: test scale later
		
		// setup collision blocks
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				if (this.getTileID(j, i) != 0)
					this.collisionBlocks[j + (i * 100)] = new CollisionBlock(j * 16, i * 16, 16);
			}
		}
		
	}

	public getTileID(x: number, y: number) {
		return this.map[x + (y * 100)];
	}

	public render(ctx: CanvasRenderingContext2D) {
		// this.tileset.renderTileById(ctx, 216, 0, 0);
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 100; j++) {
				let tileID = this.getTileID(j, i);
				this.tileset.renderTileById(ctx, tileID, j * 16, i * 16);
				if (this.getTileID(j, i) != 0)
					this.collisionBlocks[j + (i * 100)].renderCollision(ctx);
				
			}
		}
	}

	public getCollisionBlocks(): CollisionBlock[] {
		return this.collisionBlocks;
	}
}