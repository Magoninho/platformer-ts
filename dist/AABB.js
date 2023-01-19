// Think of this as a Collision Box, or even the BoxCollider2D from Unity
export default class AABB {
    constructor(x, y, width, height, cropx = 0, cropy = 0, cropWidth = 0, cropHeight = 0) {
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.cropx = 0;
        this.cropy = 0;
        this.cropWidth = 0;
        this.cropHeight = 0;
        this.cropx = cropx;
        this.cropy = cropy;
        this.cropWidth = cropWidth;
        this.cropHeight = cropHeight;
        this.rect = {
            x: x + this.cropx,
            y: y + this.cropy,
            width: width - this.cropWidth,
            height: height - this.cropHeight
        };
        this.top = this.rect.y;
        this.bottom = this.rect.y + this.rect.height;
        this.left = this.rect.x;
        this.right = this.rect.x + this.rect.width;
    }
    isColliding(aabb2) {
        return (this.rect.x < aabb2.rect.x + aabb2.rect.width &&
            this.rect.x + this.rect.width > aabb2.rect.x &&
            this.rect.y < aabb2.rect.y + aabb2.rect.height &&
            this.rect.height + this.rect.y > aabb2.rect.y);
    }
    render(ctx) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }
    setPos(x, y) {
        this.rect.x = x + this.cropx;
        this.rect.y = y + this.cropy;
    }
    getPos() {
        return [this.rect.x, this.rect.y];
    }
    getSize() {
        return [this.rect.width, this.rect.height];
    }
    getLeft() {
        return this.rect.x;
    }
    getRight() {
        return this.rect.x + this.rect.width;
    }
    getTop() {
        return this.rect.y;
    }
    getBottom() {
        return this.rect.y + this.rect.height;
    }
}
//# sourceMappingURL=AABB.js.map