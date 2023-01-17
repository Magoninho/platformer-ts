export default class TileSet {
	private image: HTMLImageElement; // the spritesheet image
	private tilesize: number; // the tile size of each sprite
	private scale: number = 1; // a scale for rendering (default = 1)

	// map dimensions in tiles
	private mapWidth: number;
	private mapHeight: number;

	constructor(image: HTMLImageElement, tilesize: number, scale?: number) {
		this.image = image;
		this.tilesize = tilesize;
		if (scale) this.scale = scale;

		this.mapWidth = Math.ceil(this.image.width / this.tilesize);
		this.mapHeight = Math.ceil(this.image.height / this.tilesize);
	}

	// Renders a sprite from col and row positions on the spritesheet image
	public renderTile(ctx: CanvasRenderingContext2D, col: number, row: number, x: number, y: number): void {
		ctx.drawImage(this.image, col*this.tilesize, row*this.tilesize, this.tilesize, this.tilesize, x, y, this.tilesize*this.scale, this.tilesize*this.scale);
	}

	// Renders a sprite from an ID (x + (y * world_size))
	public renderTileById(ctx: CanvasRenderingContext2D, ID: number, x: number, y: number): void {
		
		// a nice formula to find x and y with a tile ID
		// remember that the tile ID is x + (y * width)
		let spritey = Math.floor(ID/this.mapWidth);
		let spritex = (ID - 1) - (spritey * this.mapWidth);


		ctx.drawImage(
			this.image, // the image
			spritex * this.tilesize, // source x (don't forget to multiply by the tilesize!)
			spritey * this.tilesize, // source y
			this.tilesize, // source width
			this.tilesize, // source height
			x, // target x
			y, // target y
			this.tilesize*this.scale, // target width
			this.tilesize*this.scale  // target height
		);
	}

	public getTileSize(): number {
		return this.tilesize;
	}
}