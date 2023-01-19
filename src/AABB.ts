// Think of this as a Collision Box, or even the BoxCollider2D from Unity

import { IRect } from "./Player.js";

export default class AABB {
	public rect: IRect;

	public top: number = 0;
	public bottom: number = 0;
	public left: number = 0;
	public right: number = 0;

	public cropx: number = 0;
	public cropy: number = 0;
	public cropWidth: number = 0;
	public cropHeight: number = 0;

	constructor(x: number, y: number, width: number, height: number, cropx: number = 0, cropy: number = 0, cropWidth: number = 0, cropHeight: number = 0) {
		this.cropx = cropx;
		this.cropy = cropy;
		this.cropWidth = cropWidth;
		this.cropHeight = cropHeight;
		
		this.rect = {
			x: x + this.cropx,
			y: y + this.cropy,
			width: width - this.cropWidth,
			height: height - this.cropHeight
		}

		this.top = this.rect.y;
		this.bottom = this.rect.y + this.rect.height;
		this.left = this.rect.x;
		this.right = this.rect.x + this.rect.width;

		
	}

	public isColliding(aabb2: AABB) {
		return (
			this.rect.x < aabb2.rect.x + aabb2.rect.width &&
			this.rect.x + this.rect.width > aabb2.rect.x &&
			this.rect.y < aabb2.rect.y + aabb2.rect.height &&
			this.rect.height + this.rect.y > aabb2.rect.y
		);
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
	}

	public setPos(x: number, y: number) {
		this.rect.x = x + this.cropx;
		this.rect.y = y + this.cropy;
	}

	public getPos(): number[] {
		return [this.rect.x, this.rect.y];
	}

	public getSize(): number[] {
		return [this.rect.width, this.rect.height];
	}

	public getLeft() {
		return this.rect.x;
	}

	public getRight() {
		return this.rect.x + this.rect.width;
	}

	public getTop() {
		return this.rect.y;
	}

	public getBottom() {
		return this.rect.y + this.rect.height;
	}
}