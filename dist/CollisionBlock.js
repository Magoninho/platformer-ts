import AABB from "./AABB.js";
export default class CollisionBlock {
    constructor(x, y, tilesize) {
        this.x = x;
        this.y = y;
        this.tilesize = tilesize;
        this.AABB = new AABB(this.x, this.y, this.tilesize, this.tilesize);
    }
    renderCollision(ctx) {
        this.AABB.setPos(this.x, this.y);
        this.AABB.render(ctx);
    }
    getPosition() {
        return [this.x, this.y];
    }
    getAABB() {
        return this.AABB;
    }
}
//# sourceMappingURL=CollisionBlock.js.map