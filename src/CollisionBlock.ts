import AABB from "./AABB.js";

export default class CollisionBlock {
	private x: number;
	private y: number;
	private tilesize: number;
	private AABB: AABB;

	constructor(x: number, y: number, tilesize: number) {
		this.x = x;
		this.y = y;
		this.tilesize = tilesize;
		this.AABB = new AABB(this.x, this.y, this.tilesize, this.tilesize);
	}

	public renderCollision(ctx: CanvasRenderingContext2D) {
		this.AABB.setPos(this.x, this.y);
		this.AABB.render(ctx);
	}

	public getPosition(): number[] {
		return [this.x, this.y];
	}

	public getAABB(): AABB {
		return this.AABB;
	}
}