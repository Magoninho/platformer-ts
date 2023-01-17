// Think of this as a Collision Box, or even the BoxCollider2D from Unity
export default class AABB {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
    isColliding(otherAABB) {
        if (this.x <= otherAABB.x + otherAABB.width
            && this.x + this.width >= otherAABB.x
            && this.y <= otherAABB.y + otherAABB.height
            && this.y + this.height >= otherAABB.y)
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
}
//# sourceMappingURL=AABB.js.map