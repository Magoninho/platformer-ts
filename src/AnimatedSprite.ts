import ImageUtils from "./ImageUtils.js";

export default class AnimatedSprite {
	private spritesheet: HTMLImageElement;
	private imagePath: string;
	private tileWidth: number;
	private tileHeight: number;
	private frameCount: number;
	private animationSpeed: number = 1;
	private frame: number = 0;

	constructor(imagePath: string, tileWidth: number, tileHeight: number) {
		this.imagePath = imagePath;	
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
	}

	public async init() {
		this.spritesheet = await ImageUtils.loadImageFromUrl(this.imagePath);

		// finding how many cols we have for a spritesheet
		this.frameCount = this.spritesheet.width / this.tileWidth;
	}

	public update() {
		this.frame = (this.frame + this.animationSpeed) % this.frameCount;
	}

	public render(ctx: CanvasRenderingContext2D, x: number, y: number, flipped?: boolean) {

		ctx.save();
		ctx.translate(x + this.tileWidth / 2, y + this.tileHeight / 2);
		ctx.scale(flipped ? -1 : 1, 1);
		ctx.drawImage(
			this.spritesheet,

			(Math.floor(this.frame)) * this.tileWidth,
			0,

			this.tileWidth,
			this.tileHeight,
			// TODO: camera offset?
			-this.tileWidth / 2,
			-this.tileHeight / 2,
			this.tileWidth,
			this.tileHeight
		);
		ctx.restore();
	}


	public setAnimationSpeed(speed: number) {
		this.animationSpeed = speed;
	}
}