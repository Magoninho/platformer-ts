// Think of this as a Collision Box, or even the BoxCollider2D from Unity
export default class AABB {
    constructor(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
    }
    isColliding(otherAABB) {
        if (this.x < otherAABB.x + otherAABB.width
            && this.x + this.width > otherAABB.x
            && this.y < otherAABB.y + otherAABB.height
            && this.y + this.height > otherAABB.y)
            return true;
        return false;
    }
    render(ctx) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    getPos() {
        return [this.x, this.y];
    }
    getSize() {
        return [this.width, this.height];
    }
    getLeft() {
        return this.x;
    }
    getRight() {
        return this.x + this.width;
    }
    getTop() {
        return this.y;
    }
    getBottom() {
        return this.y + this.height;
    }
}
//# sourceMappingURL=AABB.js.map