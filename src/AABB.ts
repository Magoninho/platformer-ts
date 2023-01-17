// Think of this as a Collision Box, or even the BoxCollider2D from Unity

export default class AABB {
	private x: number = 0;
	private y: number = 0;
	private width: number;
	private height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public isColliding(otherAABB: AABB) {
		if (this.x <= otherAABB.x + otherAABB.width
            && this.x + this.width >= otherAABB.x
            && this.y <= otherAABB.y + otherAABB.height
            && this.y + this.height >= otherAABB.y)
            return true;
        return false;
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}

	public setPos(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public getPos(): number[] {
		return [this.x, this.y];
	}

	public getSize(): number[] {
		return [this.width, this.height];
	}
}